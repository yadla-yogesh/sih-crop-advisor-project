<div align="center">
<img src="https://www.google.com/search?q=https://placehold.co/1200x300/6D28D9/FFFFFF%3Ftext%3DAgri-Advisor%26font%3Draleway" alt="Agri-Advisor Banner">
<h1 align="center">🌱 Agri-Advisor: AI-Powered Agricultural Support System</h1>
<p align="center">
A modern, web-based decision support system for farmers, built for the Smart India Hackathon.
</p>
</div>

Agri-Advisor is designed to provide farmers with hyper-localized, data-driven advice to optimize crop selection, diagnose diseases, and receive expert guidance in their native language. By leveraging machine learning and generative AI, Agri-Advisor acts as a digital companion for the modern farmer.

✨ Core Features
🤖 AI Crop Recommender: Automatically detects user location and real-time weather, then recommends the most suitable crop based on soil data (N, P, K, pH).

🌿 AI Leaf Disease Detector: Uses a Vision Transformer (ViT) model to identify plant diseases from an uploaded image and provides organic treatment plans via the Gemini API.

💬 Multilingual Agri-Bot: A fully interactive chatbot powered by the Gemini API that answers any agricultural question.

🌐 Full Language & Voice Support:

Interface available in English, Hindi, and Telugu.

Text-to-Speech for the bot's responses.

Voice-to-Text for asking questions without typing.

☀️ Dynamic UI: Includes a sleek dark/light mode switcher and a modern, responsive design.

🛠️ Tech Stack
<p align="center">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/React-20232A%3Fstyle%3Dfor-the-badge%26logo%3Dreact%26logoColor%3D61DAFB" alt="React">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Vite-646CFF%3Fstyle%3Dfor-the-badge%26logo%3Dvite%26logoColor%3Dwhite" alt="Vite">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Tailwind_CSS-38B2AC%3Fstyle%3Dfor-the-badge%26logo%3Dtailwind-css%26logoColor%3Dwhite" alt="Tailwind CSS">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Python-3776AB%3Fstyle%3Dfor-the-badge%26logo%3Dpython%26logoColor%3Dwhite" alt="Python">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Flask-000000%3Fstyle%3Dfor-the-badge%26logo%3Dflask%26logoColor%3Dwhite" alt="Flask">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/scikit--learn-F7931E%3Fstyle%3Dfor-the-badge%26logo%3Dscikit-learn%26logoColor%3Dwhite" alt="Scikit-learn">
<img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white" alt="PyTorch">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Google_Gemini-8E44AD%3Fstyle%3Dfor-the-badge%26logo%3Dgoogle-gemini%26logoColor%3Dwhite" alt="Google Gemini">
</p>

🚀 Getting Started: How to Run This Project
Follow these steps to get the project up and running on your local machine.

Step 1: Get the Code
Clone the repository to your local machine:

git clone [https://github.com/yadla-yogesh/sih-crop-advisor-project.git](https://github.com/yadla-yogesh/sih-crop-advisor-project.git)
cd sih-crop-advisor-project

Step 2: Download the ML Models
This project requires three pre-trained model and data files.

Crop Recommender Model: Download model.pkl from this repository.

Disease Detection Model: You will need your own trained vit_model.pth file.

Disease Class Names: You will need your corresponding class_names.json file.

Once downloaded, place all three files inside the backend/ folder.

Step 3: Set Up the Backend Server
Navigate to the backend directory.

cd backend

Create and activate a Python virtual environment.

# On Windows
py -m venv venv
.\venv\Scripts\activate

Install the required Python packages.

pip install Flask Flask-Cors scikit-learn pandas torch torchvision transformers pillow python-dotenv google-generativeai

Create your secret .env file.

Create a file named .env inside the backend folder.

Add your Gemini API key to it:

GEMINI_API_KEY=YOUR_API_KEY_HERE

Step 4: Set Up the Frontend Application
Navigate to the frontend directory.

cd ../frontend 
# (If you are in the backend folder)

Install the npm packages.

npm install

Step 5: Run the Application!
You need to run both servers at the same time in two separate terminals.

Terminal 1 (Backend):

cd backend
# Make sure your venv is active
py app.py

Terminal 2 (Frontend):

cd frontend
npm run dev
