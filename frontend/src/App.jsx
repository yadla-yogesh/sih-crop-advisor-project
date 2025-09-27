import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Sprout, Leaf, Bot, Languages, Menu, X, Cloud, CloudFog, CloudDrizzle, CloudRain, CloudLightning, Zap, Loader2, UploadCloud, FileImage, AlertTriangle, CheckCircle, SendHorizontal, Volume2, VolumeX, Mic, MicOff } from 'lucide-react';

// --- TRANSLATION SETUP ---
const translations = {
  en: {
    cropRecommender: "AI Crop Recommender",
    cropRecommenderSubtitle: "Get a data-driven crop recommendation based on your farm's conditions.",
    diseaseDetection: "Leaf Disease Detection",
    agriBot: "Agri-Bot Assistant",
    gettingLocation: "Getting your location and real-time weather...",
    locationError: "Could not get location. Please allow location access and refresh.",
    yourLocation: "Your Location",
    currentWeather: "Current Weather",
    temperature: "Temperature",
    humidity: "Humidity",
    rainfall: "Rainfall",
    enterSoilData: "Enter Your Soil Data",
    nitrogen: "Nitrogen (N)",
    phosphorus: "Phosphorus (P)",
    potassium: "Potassium (K)",
    ph: "Soil pH",
    recommendCrop: "Recommend Crop",
    ourRecommendation: "Our Recommendation for Your Farm",
    basedOnData: "Based on the provided soil and live weather data, the most suitable crop is:",
    errorRecommending: "An error occurred while getting your recommendation. Please ensure the backend server is running and try again.",
    diseaseDetectionSubtitle: "Upload an image of a plant leaf to get an instant diagnosis and treatment advice.",
    uploadLeafImage: "1. Upload Leaf Image",
    clickToUpload: "Click to upload",
    diagnosePlant: "Diagnose Plant",
    diagnosing: "Diagnosing...",
    diagnosisResult: "2. Diagnosis Result",
    diagnosisPlaceholder: "Your diagnosis will appear here.",
    errorOccurred: "An Error Occurred",
    errorNetwork: "Could not connect to the diagnosis server. Please ensure it's running.",
    errorProcessing: "The server encountered an error processing the image.",
    organicTreatment: "Recommended Organic Treatment:",
    agriBotSubtitle: "Your personal AI farming expert. Ask me anything!",
    agriBotPlaceholder: "Type your question here or use the mic...",
    initialBotMessage: "Hello! I am your Agri-Bot. How can I help you with your farming questions today?",
    botError: "Sorry, I couldn't get an answer. Please try again."
  },
  hi: {
    cropRecommender: "एआई फसल सिफ़ारिशकर्ता",
    cropRecommenderSubtitle: "अपने खेत की स्थितियों के आधार पर डेटा-संचालित फसल की सिफारिश प्राप्त करें।",
    diseaseDetection: "पत्ती रोग का पता लगाना",
    agriBot: "एग्री-बॉट सहायक",
    gettingLocation: "आपका स्थान और वास्तविक समय का मौसम प्राप्त हो रहा है...",
    locationError: "स्थान प्राप्त नहीं हो सका। कृपया स्थान की अनुमति दें और ताज़ा करें।",
    yourLocation: "आपका स्थान",
    currentWeather: "वर्तमान मौसम",
    temperature: "तापमान",
    humidity: "नमी",
    rainfall: "वर्षा",
    enterSoilData: "अपनी मिट्टी का डेटा दर्ज करें",
    nitrogen: "नाइट्रोजन (N)",
    phosphorus: "फॉस्फोरस (P)",
    potassium: "पोटेशियम (K)",
    ph: "मिट्टी का पीएच",
    recommendCrop: "फसल की सिफारिश करें",
    ourRecommendation: "आपके खेत के लिए हमारी सिफारिश",
    basedOnData: "प्रदान की गई मिट्टी और जीवंत मौसम डेटा के आधार पर, सबसे उपयुक्त फसल है:",
    errorRecommending: "आपकी सिफारिश प्राप्त करते समय एक त्रुटि हुई। कृपया सुनिश्चित करें कि बैकएंड सर्वर चल रहा है और फिर से प्रयास करें।",
    diseaseDetectionSubtitle: "तुरंत निदान और उपचार सलाह पाने के लिए पौधे की पत्ती की एक छवि अपलोड करें।",
    uploadLeafImage: "१. पत्ती की छवि अपलोड करें",
    clickToUpload: "अपलोड करने के लिए क्लिक करें",
    diagnosePlant: "पौधे का निदान करें",
    diagnosing: "निदान हो रहा है...",
    diagnosisResult: "२. निदान का परिणाम",
    diagnosisPlaceholder: "आपका निदान यहां दिखाई देगा।",
    errorOccurred: "एक त्रुटि हुई",
    errorNetwork: "निदान सर्वर से कनेक्ट नहीं हो सका। कृपया सुनिश्चित करें कि यह चल रहा है।",
    errorProcessing: "सर्वर को छवि संसाधित करने में एक त्रुटि का सामना करना पड़ा।",
    organicTreatment: "अनुशंसित जैविक उपचार:",
    agriBotSubtitle: "आपका व्यक्तिगत AI खेती विशेषज्ञ। मुझसे कुछ भी पूछें!",
    agriBotPlaceholder: "अपना प्रश्न यहाँ लिखें या माइक का उपयोग करें...",
    initialBotMessage: "नमस्ते! मैं आपका एग्री-बॉट हूँ। आज मैं आपके खेती संबंधी सवालों में कैसे मदद कर सकता हूँ?",
    botError: "क्षमा करें, मुझे उत्तर नहीं मिल सका। कृपया पुनः प्रयास करें।"
  },
  te: {
    cropRecommender: "AI పంట సిఫార్సుదారు",
    cropRecommenderSubtitle: "మీ పొలం పరిస్థితుల ఆధారంగా డేటా-ఆధారిత పంట సిఫార్సును పొందండి.",
    diseaseDetection: "ఆకు వ్యాధిని గుర్తించడం",
    agriBot: "అగ్రి-బాట్ సహాయకుడు",
    gettingLocation: "మీ స్థానం మరియు నిజ-సమయ వాతావరణం పొందబడుతోంది...",
    locationError: "స్థానాన్ని పొందడంలో విఫలమైంది. దయచేసి స్థాన అనుమతిని ఇచ్చి, రిఫ్రెష్ చేయండి.",
    yourLocation: "మీ స్థానం",
    currentWeather: "ప్రస్తుత వాతావరణం",
    temperature: "ఉష్ణోగ్రత",
    humidity: "తేమ",
    rainfall: "వర్షపాతం",
    enterSoilData: "మీ నేల డేటాను నమోదు చేయండి",
    nitrogen: "నత్రజని (N)",
    phosphorus: "భాస్వరం (P)",
    potassium: "పొటాషియం (K)",
    ph: "నేల pH",
    recommendCrop: "పంటను సిఫార్సు చేయండి",
    ourRecommendation: "మీ పొలం కోసం మా సిఫార్సు",
    basedOnData: "అందించిన నేల మరియు ప్రత్యక్ష వాతావరణ డేటా ఆధారంగా, అత్యంత అనువైన పంట:",
    errorRecommending: "మీ సిఫార్సును పొందుతున్నప్పుడు లోపం సంభవించింది. దయచేసి బ్యాకెండ్ సర్వర్ నడుస్తోందని నిర్ధారించుకుని, మళ్లీ ప్రయత్నించండి.",
    diseaseDetectionSubtitle: "తక్షణ నిర్ధారణ మరియు చికిత్స సలహా పొందడానికి మొక్క ఆకు చిత్రాన్ని అప్‌లోడ్ చేయండి.",
    uploadLeafImage: "1. ఆకు చిత్రాన్ని అప్‌లోడ్ చేయండి",
    clickToUpload: "అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి",
    diagnosePlant: "మొక్కను నిర్ధారించండి",
    diagnosing: "నిర్ధారణ జరుగుతోంది...",
    diagnosisResult: "2. నిర్ధారణ ఫలితం",
    diagnosisPlaceholder: "మీ నిర్ధారణ ఇక్కడ కనిపిస్తుంది.",
    errorOccurred: "ఒక లోపం సంభవించింది",
    errorNetwork: "నిర్ధారణ సర్వర్‌కు కనెక్ట్ కాలేకపోయింది. దయచేసి ఇది నడుస్తోందని నిర్ధారించుకోండి.",
    errorProcessing: "సర్వర్ చిత్రాన్ని ప్రాసెస్ చేయడంలో లోపం ఎదుర్కొంది.",
    organicTreatment: "సిఫార్సు చేయబడిన సేంద్రీయ చికిత్స:",
    agriBotSubtitle: "మీ వ్యక్తిగత AI వ్యవసాయ నిపుణుడు. నన్ను ఏదైనా అడగండి!",
    agriBotPlaceholder: "మీ ప్రశ్నను ఇక్కడ టైప్ చేయండి లేదా మైక్ ఉపయోగించండి...",
    initialBotMessage: "నమస్కారం! నేను మీ అగ్రి-బాట్‌ని. ఈ రోజు మీ వ్యవసాయ ప్రశ్నలతో నేను మీకు ఎలా సహాయపడగలను?",
    botError: "క్షమించండి, నాకు సమాధానం రాలేదు. దయచేసి మళ్లీ ప్రయత్నించండి."
  }
};

// --- HELPER & FEATURE COMPONENTS ---

const getWeatherInfo = (code) => {
    const weatherMap = {
      0: { description: 'Clear sky', icon: <Sun size={24} className="text-yellow-400" /> },
      1: { description: 'Mainly clear', icon: <Sun size={24} className="text-yellow-400" /> },
      2: { description: 'Partly cloudy', icon: <Cloud size={24} className="text-gray-400" /> },
      45: { description: 'Fog', icon: <CloudFog size={24} className="text-gray-400" /> },
      61: { description: 'Slight rain', icon: <CloudRain size={24} className="text-blue-400" /> },
      63: { description: 'Moderate rain', icon: <CloudRain size={24} className="text-blue-500" /> },
      80: { description: 'Rain showers', icon: <CloudLightning size={24} className="text-yellow-500" /> },
      95: { description: 'Thunderstorm', icon: <Zap size={24} className="text-yellow-600" /> },
    };
    return weatherMap[code] || { description: 'Unknown', icon: <Sun size={24} /> };
};

const CropRecommender = ({ t }) => {
    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(true);
    const [locationError, setLocationError] = useState(null);
    
    const [N, setN] = useState('');
    const [P, setP] = useState('');
    const [K, setK] = useState('');
    const [ph, setPh] = useState('');

    const [recommendation, setRecommendation] = useState(null);
    const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false);
    const [recommendationError, setRecommendationError] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const geoResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const geoData = await geoResponse.json();
                    setLocation(geoData.address.city || geoData.address.town || 'Your Location');
                    
                    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,rain`);
                    const weatherData = await weatherResponse.json();
                    setWeather(weatherData.current);
                } catch (error) {
                    console.error("Error fetching location/weather data:", error);
                    setLocationError(t('locationError'));
                } finally {
                    setIsLoadingLocation(false);
                }
            },
            (error) => {
                console.error("Geolocation error:", error);
                setLocationError(t('locationError'));
                setIsLoadingLocation(false);
            },
            { enableHighAccuracy: true }
        );
    }, [t]);

    const handleRecommend = async (e) => {
        e.preventDefault();
        setIsLoadingRecommendation(true);
        setRecommendation(null);
        setRecommendationError(null);

        const payload = {
            N: parseFloat(N),
            P: parseFloat(P),
            K: parseFloat(K),
            temperature: weather.temperature_2m,
            humidity: weather.relative_humidity_2m,
            ph: parseFloat(ph),
            rainfall: weather.rain,
        };

        try {
            const response = await fetch('http://localhost:5000/recommend-crop', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setRecommendation(data.recommendation);
        } catch (error) {
            console.error("Recommendation error:", error);
            setRecommendationError(t('errorRecommending'));
        } finally {
            setIsLoadingRecommendation(false);
        }
    };
    
    const inputClasses = "w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500";

    return (
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold">{t('cropRecommender')}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 mb-6">{t('cropRecommenderSubtitle')}</p>

        {isLoadingLocation && <div className="flex items-center text-gray-500"><Loader2 className="animate-spin mr-2" /> {t('gettingLocation')}</div>}
        {locationError && <div className="text-red-500">{locationError}</div>}
        
        {location && weather && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-900/50 p-4 rounded-lg shadow-md"><strong>{t('yourLocation')}:</strong> {location}</div>
              <div className="bg-white dark:bg-gray-900/50 p-4 rounded-lg shadow-md">
                <strong>{t('currentWeather')}:</strong> {weather.temperature_2m}°C, {weather.relative_humidity_2m}% {t('humidity')}, {weather.rain}mm {t('rainfall')}
              </div>
            </div>

            <form onSubmit={handleRecommend}>
              <div className="bg-white dark:bg-gray-900/50 p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">{t('enterSoilData')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <input type="number" value={N} onChange={(e) => setN(e.target.value)} placeholder={t('nitrogen')} required className={inputClasses} />
                  <input type="number" value={P} onChange={(e) => setP(e.target.value)} placeholder={t('phosphorus')} required className={inputClasses} />
                  <input type="number" value={K} onChange={(e) => setK(e.target.value)} placeholder={t('potassium')} required className={inputClasses} />
                  <input type="number" step="0.1" value={ph} onChange={(e) => setPh(e.target.value)} placeholder={t('ph')} required className={inputClasses} />
                </div>
              </div>

              <button type="submit" disabled={isLoadingRecommendation} className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 flex items-center justify-center">
                {isLoadingRecommendation ? <Loader2 className="animate-spin" /> : t('recommendCrop')}
              </button>
            </form>
          </>
        )}

        {recommendation && (
            <div className="mt-8 bg-green-100 dark:bg-green-900/50 p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-bold text-green-800 dark:text-green-200">{t('ourRecommendation')}</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{t('basedOnData')}</p>
                <p className="text-4xl font-extrabold text-green-600 dark:text-green-400 mt-4 capitalize">{recommendation}</p>
            </div>
        )}
        {recommendationError && <div className="mt-8 text-red-500 text-center">{recommendationError}</div>}
      </div>
    );
};

const DiseaseDetection = ({ t, language }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      setResult(null);
      setError(null);
    }
  };

  const handleDiagnose = async () => {
    if (!image) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    const formData = new FormData();
    formData.append('file', image);
    formData.append('language', language);

    try {
      const response = await fetch('http://localhost:5000/diagnose-disease', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
      
      const data = await response.json();
      
      setResult({
        disease: data.disease.replace(/___/g, ' ').replace(/_/g, ' '),
        confidence: `${(data.confidence * 100).toFixed(2)}%`,
        recommendation: data.recommendation
      });

    } catch (err) {
      console.error("Diagnosis failed:", err);
      if (err instanceof TypeError) setError(t('errorNetwork'));
      else setError(t('errorProcessing'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-2">{t('diseaseDetection')}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">{t('diseaseDetectionSubtitle')}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-900/50 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">{t('uploadLeafImage')}</h2>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center">
            <input type="file" id="disease-file-upload" className="hidden" accept="image/*" onChange={handleImageChange} />
            {preview ? (
              <div className="relative">
                <img src={preview} alt="Selected leaf" className="max-h-64 mx-auto rounded-lg" />
                <button onClick={() => { setPreview(null); setImage(null); setResult(null); setError(null); }} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600"><X size={16} /></button>
              </div>
            ) : (
              <label htmlFor="disease-file-upload" className="cursor-pointer flex flex-col items-center">
                <UploadCloud size={48} className="text-gray-400 dark:text-gray-500 mb-2" />
                <span className="font-semibold text-purple-600 dark:text-purple-400">{t('clickToUpload')}</span>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">or drag and drop (PNG, JPG)</p>
              </label>
            )}
          </div>
          <button onClick={handleDiagnose} disabled={!image || isLoading} className="w-full mt-6 bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center transition-colors">
            {isLoading ? <><Loader2 size={20} className="animate-spin mr-2" />{t('diagnosing')}</> : t('diagnosePlant')}
          </button>
        </div>
        <div className="bg-white dark:bg-gray-900/50 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">{t('diagnosisResult')}</h2>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full"><Loader2 size={48} className="animate-spin text-purple-500" /><p className="mt-4 text-gray-500 dark:text-gray-400">Analyzing image...</p></div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full text-center bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
              <AlertTriangle size={48} className="text-red-500" />
              <h3 className="mt-4 font-bold text-red-600 dark:text-red-400">{t('errorOccurred')}</h3>
              <p className="mt-2 text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : result ? (
            <div>
              <div className="flex items-center bg-green-100 dark:bg-green-900/50 p-4 rounded-lg">
                <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
                <div className="ml-3">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">{result.disease}</h3>
                  <p className="text-sm text-green-700 dark:text-green-300">Confidence: {result.confidence}</p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-bold text-gray-800 dark:text-white">{t('organicTreatment')}</h4>
                <p className="mt-2 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{result.recommendation}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <FileImage size={48} className="text-gray-400 dark:text-gray-500" />
              <p className="mt-4 text-gray-500 dark:text-gray-400">{t('diagnosisPlaceholder')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AgriBotPage = ({ t, language }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([{ text: t('initialBotMessage'), sender: 'bot' }]);
  }, [t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/ask-agribot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input, language: language }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      const botResponse = { text: data.answer, sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Failed to get response from bot:", error);
      const errorResponse = { text: t('botError'), sender: 'bot' };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSpeak = (text, lang, msgIndex) => {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        if (speakingId === msgIndex) {
            setSpeakingId(null);
            return;
        }
    }
    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'te': 'te-IN'
    };
    utterance.lang = langMap[lang] || 'en-US';
    utterance.onstart = () => setSpeakingId(msgIndex);
    utterance.onend = () => setSpeakingId(null);
    speechSynthesis.speak(utterance);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Sorry, your browser doesn't support speech recognition.");
      return;
    }
    
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    const langMap = { 'en': 'en-US', 'hi': 'hi-IN', 'te': 'te-IN' };
    recognition.lang = langMap[language] || 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      setInput(transcript);
    };

    recognition.start();
  };

  return (
    <div className="p-4 md:p-8 h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-2">{t('agriBot')}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">{t('agriBotSubtitle')}</p>
      
      <div className="flex-1 bg-white dark:bg-gray-900/50 p-4 rounded-2xl shadow-lg overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex my-2 items-center ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-lg px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
              {msg.text}
            </div>
            {msg.sender === 'bot' && (
                <button 
                    onClick={() => handleSpeak(msg.text, language, index)} 
                    className="ml-2 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
                    aria-label="Read message aloud"
                >
                    {speechSynthesis.speaking && speakingId === index ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl bg-gray-200 dark:bg-gray-700">
              <Loader2 size={20} className="animate-spin text-gray-500" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="mt-6">
        <div className="relative">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={t('agriBotPlaceholder')} className="w-full py-3 pl-12 pr-12 bg-white dark:bg-gray-900 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500" disabled={isLoading} />
          <button type="button" onClick={handleVoiceInput} className={`absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${isRecording ? 'text-red-500' : 'text-gray-500'}`}>
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <button type="submit" disabled={isLoading || !input.trim()} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition-colors">
            <SendHorizontal size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};


// --- MAIN APP COMPONENT ---
export default function App() {
  const [activeView, setActiveView] = useState('Crop Recommender');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const t = (key) => translations[language]?.[key] || key;
  
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);
  
  const NavItem = ({ icon, name, viewName }) => (
    <a href="#" onClick={(e) => { e.preventDefault(); setActiveView(viewName); if (window.innerWidth < 768) setIsSidebarOpen(false); }} 
       className={`flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-700 hover:text-purple-600 dark:hover:text-white transition-colors duration-200 ${activeView === viewName ? 'bg-purple-50 dark:bg-purple-800 text-purple-600 dark:text-white border-r-4 border-purple-500' : ''}`}>
        {icon} <span className="ml-4 font-medium">{name}</span>
    </a>
  );

  const MainContent = () => {
    switch (activeView) {
      case 'Crop Recommender': return <CropRecommender t={t} />;
      case 'Disease Detection': return <DiseaseDetection t={t} language={language} />;
      case 'Agri-Bot': return <AgriBotPage t={t} language={language} />;
      default: return <CropRecommender t={t} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <aside className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-lg dark:shadow-none transition-transform duration-300 ease-in-out z-40 ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'} md:relative md:translate-x-0 md:w-64 flex-shrink-0 flex flex-col`}>
        <div className="p-6 text-2xl font-bold border-b border-gray-200 dark:border-gray-700 text-purple-600">Agri-Advisor</div>
        <nav className="mt-6 flex-1">
          <NavItem icon={<Sprout size={20} />} name={t('cropRecommender')} viewName="Crop Recommender" />
          <NavItem icon={<Leaf size={20} />} name={t('diseaseDetection')} viewName="Disease Detection" />
          <NavItem icon={<Bot size={20} />} name={t('agriBot')} viewName="Agri-Bot" />
        </nav>
      </aside>
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-30 border-b border-gray-200 dark:border-gray-700">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 dark:text-gray-400 focus:outline-none md:hidden"><Menu size={24} /></button>
          <div className="flex items-center ml-auto space-x-4">
            <div className="relative">
              <Languages className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
              <select onChange={(e) => setLanguage(e.target.value)} value={language} className="bg-gray-200 dark:bg-gray-700 rounded-lg py-2 pl-10 pr-4 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm">
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="te">తెలుగు</option>
              </select>
            </div>
            <button onClick={toggleTheme} className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 bg-gray-200 dark:bg-gray-700">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>
        <main className="flex-1 h-full overflow-y-auto">
          <MainContent />
        </main>
      </div>
    </div>
  );
}

