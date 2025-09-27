import flask
from flask import request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import os
import numpy as np
import json
from PIL import Image
import io

# AI Imports for ViT
import torch
from torchvision import transforms
from transformers import ViTForImageClassification, ViTImageProcessor

# Gemini API Imports
import google.generativeai as genai

# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv() 

# Initialize the Flask application
app = flask.Flask(__name__)
CORS(app)


# --- CROP RECOMMENDATION MODEL LOADING ---
CROP_MODEL_PATH = 'model.pkl'
crop_model = None
CROP_DICT = {
    1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut", 6: "Papaya", 7: "Orange",
    8: "Apple", 9: "Muskmelon", 10: "Watermelon", 11: "Grapes", 12: "Mango", 13: "Banana",
    14: "Pomegranate", 15: "Lentil", 16: "Blackgram", 17: "Mungbean", 18: "Mothbeans",
    19: "Pigeonpeas", 20: "Kidneybeans", 21: "Chickpea", 22: "Coffee"
}
try:
    with open(CROP_MODEL_PATH, 'rb') as f:
        crop_model = pickle.load(f)
    print("Crop recommendation model loaded successfully.")
except Exception as e:
    print(f"Error loading crop recommendation model: {e}")


# --- DISEASE DETECTION MODEL LOADING ---
DISEASE_MODEL_PATH = 'vit_model.pth' 
CLASS_NAMES_PATH = 'class_names.json' 
disease_model = None
processor = None
class_names = []
device = "cuda" if torch.cuda.is_available() else "cpu"

try:
    with open(CLASS_NAMES_PATH, 'r') as f:
        class_names = json.load(f)
    
    processor = ViTImageProcessor.from_pretrained('google/vit-base-patch16-224')
    
    disease_model = ViTForImageClassification.from_pretrained(
        'google/vit-base-patch16-224',
        num_labels=len(class_names),
        ignore_mismatched_sizes=True 
    )
    
    disease_model.load_state_dict(torch.load(DISEASE_MODEL_PATH, map_location=device))
    disease_model.to(device)
    disease_model.eval()
    print("Disease detection model loaded successfully.")

except Exception as e:
    print(f"Error loading disease detection model: {e}")


# --- GEMINI API SETUP ---
try:
    # Load the API key from the .env file
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

    if GEMINI_API_KEY:
        genai.configure(api_key=GEMINI_API_KEY)
        gemini_model = genai.GenerativeModel('models/gemini-2.5-pro')
        print("Gemini API configured successfully.")
    else:
        print("GEMINI_API_KEY not found in .env file. Gemini features will be disabled.")
        gemini_model = None
except Exception as e:
    print(f"Error configuring Gemini API: {e}")
    gemini_model = None


# --- API ENDPOINTS ---

@app.route('/recommend-crop', methods=['POST'])
def recommend_crop():
    if crop_model is None:
        return jsonify({'error': 'The crop recommendation model is not loaded.'}), 500
    data = request.get_json()
    try:
        features = [
            float(data['N']), float(data['P']), float(data['K']), float(data['temperature']),
            float(data['humidity']), float(data['ph']), float(data['rainfall'])
        ]
        prediction_num = crop_model.predict([features])[0]
        if isinstance(prediction_num, np.generic):
            prediction_num = prediction_num.item()
        crop_name = CROP_DICT.get(prediction_num, "Unknown Crop") 
        return jsonify({'recommendation': crop_name})
    except Exception as e:
        print(f"Error during crop prediction: {e}")
        return jsonify({'error': 'An error occurred during the crop prediction process.'}), 500


@app.route('/diagnose-disease', methods=['POST'])
def diagnose_disease():
    if disease_model is None or processor is None:
        return jsonify({'error': 'The disease detection model is not loaded.'}), 500
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
        
    file = request.files['file']
    language_code = request.form.get('language', 'en') 

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        image_bytes = file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        inputs = processor(images=image, return_tensors="pt").to(device)

        with torch.no_grad():
            outputs = disease_model(**inputs)
            logits = outputs.logits
            predicted_class_idx = logits.argmax(-1).item()
            predicted_class = class_names[predicted_class_idx]
            confidence = torch.nn.functional.softmax(logits, dim=-1)[0][predicted_class_idx].item()

        recommendation = "Could not get a recommendation."
        if gemini_model:
            try:
                language_map = { 'en': 'English', 'hi': 'Hindi', 'te': 'Telugu' }
                full_language_name = language_map.get(language_code, 'English')
                
                prompt = f"Provide a concise, organic treatment plan for a farmer dealing with the plant disease '{predicted_class}'. Important: Your entire response must be in the {full_language_name} language."
                response = gemini_model.generate_content(prompt)
                recommendation = response.text
            except Exception as e:
                print(f"Gemini API call failed: {e}")

        return jsonify({
            'disease': predicted_class,
            'confidence': confidence,
            'recommendation': recommendation
        })

    except Exception as e:
        print(f"Error during disease diagnosis: {e}")
        return jsonify({'error': 'An error occurred during the diagnosis process.'}), 500


@app.route('/ask-agribot', methods=['POST'])
def ask_agribot():
    if gemini_model is None:
        return jsonify({'error': 'The Gemini model is not configured.'}), 500
    
    data = request.get_json()
    question = data.get('question')
    language_code = data.get('language', 'en')

    if not question:
        return jsonify({'error': 'No question provided.'}), 400
        
    try:
        language_map = { 'en': 'English', 'hi': 'Hindi', 'te': 'Telugu' }
        full_language_name = language_map.get(language_code, 'English')
        
        prompt = f"Answer the following farmer's question in the {full_language_name} language. Keep the answer concise and conversational, like a chatbot (2-3 sentences max). Question: {question}"
        
        response = gemini_model.generate_content(prompt)
        answer = response.text
        
        return jsonify({'answer': answer})

    except Exception as e:
        print(f"Agri-Bot Gemini API call failed: {e}")
        return jsonify({'error': 'An error occurred while getting an answer.'}), 500

# --- RUN THE APP ---
if __name__ == '__main__':
    app.run(debug=True, port=5000)

