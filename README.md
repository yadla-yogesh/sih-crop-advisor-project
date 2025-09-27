🌱 Agri-Advisor: AI-Powered Agricultural Support System
Agri-Advisor is a modern, web-based decision support system designed for the Smart India Hackathon. It provides farmers with hyper-localized, data-driven advice to optimize crop selection, diagnose diseases, and receive expert guidance in their native language.

This project was built to address the challenges farmers face, such as lack of access to timely information, language barriers, and the need for personalized agricultural support. By leveraging machine learning and generative AI, Agri-Advisor acts as a digital companion for the modern farmer.

✨ Core Features
🤖 AI Crop Recommender: The core feature of the application. It automatically detects the user's location and real-time weather data. Farmers can input their soil test results (N, P, K, pH), and the machine learning model recommends the most suitable crop for their specific conditions.

🌿 AI Leaf Disease Detector: Farmers can upload an image of a plant leaf, and a Vision Transformer (ViT) model will identify the disease. The system then uses the Gemini API to provide a detailed, organic treatment plan.

💬 Multilingual Agri-Bot: A fully interactive chatbot powered by the Gemini API. Farmers can ask any agricultural question via text or voice and receive a concise, conversational answer.

🌐 Full Language & Voice Support:

The entire interface is available in English, Hindi, and Telugu.

Text-to-Speech: The Agri-Bot's responses can be read aloud in the selected language.

Voice-to-Text: Farmers can speak their questions directly into the Agri-Bot, removing the need to type.

☀️ Dynamic UI: Includes a sleek dark/light mode theme switcher and a modern, responsive design.

🛠️ Technology Stack
This project uses a modern, full-stack approach:

Frontend:

React: For building a fast, interactive, and component-based user interface.

Vite: As the next-generation frontend build tool for a blazing-fast development experience.

Tailwind CSS: For creating a modern, utility-first, and fully responsive design.

Lucide React: For clean and lightweight icons.

Backend:

Python: The core language for our server and machine learning tasks.

Flask: A lightweight web framework used to create the API that connects our frontend to the AI models.

Scikit-learn: For running the pre-trained Random Forest model for crop recommendation.

PyTorch & Transformers: For loading and running the powerful Vision Transformer (ViT) model for disease detection.

AI & Machine Learning:

Random Forest Classifier: A pre-trained model (.pkl) used for the crop recommendation feature.

Vision Transformer (ViT): A pre-trained deep learning model (.pth) for high-accuracy image classification of plant diseases.

Google Gemini API: Used for generative AI tasks, including providing organic treatment plans and powering the Agri-Bot.

🚀 How to Run This Project Locally
To set up and run this project on your local machine, please follow these steps.

Prerequisites
Node.js and npm installed.

Python installed.

A Gemini API Key from Google AI Studio.

1. Clone the Repository
git clone [https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git)
cd YOUR_REPOSITORY_NAME

2. Set Up the Backend
Navigate to the backend directory.

cd backend

Create and activate a Python virtual environment.

# On Windows
py -m venv venv
.\venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate

Install the required Python packages.

pip install -r requirements.txt

(Note: You will need to create a requirements.txt file or install the packages manually as listed in the development steps).

Create a secret .env file for your API key.

Create a file named .env inside the backend folder.

Add your Gemini API key to it:

GEMINI_API_KEY=AIzaSy...your...key...here

Place your ML model files (model.pkl, vit_model.pth, class_names.json) inside the backend folder.

3. Set Up the Frontend
Navigate to the frontend directory.

cd ../frontend

Install the npm packages.

npm install

4. Run the Application
You will need to run both servers simultaneously in two separate terminals.

Terminal 1 (Backend):

cd backend
# Make sure your venv is active
py app.py

Terminal 2 (Frontend):

cd frontend
npm run dev
