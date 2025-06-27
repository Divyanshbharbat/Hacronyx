import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Send, Paperclip, Mic } from 'lucide-react';
import MermaidDiagram from '../Components/MermaidDiagram';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import FeedbackModal from '../Components/FeedbackModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const token = localStorage.getItem('cookie');
  const navigate = useNavigate();

  const ideaPool = [
    'Build a modern e-commerce site with cart and payment',
    'Create a job portal with resume upload and filters',
    'Develop a social media dashboard using React and MongoDB',
    'Create a portfolio builder tool for developers',
    'Design a smart notes app with tagging and markdown',
    'Build a chatbot with AI integration',
    'Build an expense tracker with charts',
    'Create a learning management system',
    'Build a collaborative whiteboard app',
    'Design a crypto portfolio tracker',
    'Create a personal habit tracker with gamification'
  ];

  useEffect(() => {
    if (!token) {
      toast.error('Please login to access projects.');
      navigate('/login');
    }
  }, [token]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    setInputValue('');
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP}/api/divyansh`,
        { concept: inputValue, background: 'user' },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const roadmap = res?.data?.roadmap || [];
      if (!roadmap.length) throw new Error('Empty roadmap');

      toast.success('✅ Project generated!');
      setIsLoading(false);

      // Optional delay for better animation effect
      setTimeout(() => navigate('/projects'), 1000);
    } catch (error) {
      toast.error('❌ Generation failed. Try again.');
      setIsLoading(false);
    }
  };

  const generateMermaidDiagram = (steps = [], title = 'Project') => {
    const lines = [`graph TD`, `A[${title}]`];
    let last = 'A';
    steps.forEach((step, index) => {
      const current = `S${index}`;
      lines.push(`${last} --> ${current}[${step}]`);
      last = current;
    });
    return lines.join('\n');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue((prev) => prev + ' ' + transcript);
    };

    recognition.onerror = (event) => {
      toast.error('🎤 Mic error or permission denied.');
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark position-relative">
     

      {/* Welcome Section */}
      {messages.length === 0 && !isLoading && (
        <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center px-3 text-center">
          <div className="container">
            <h1 className="display-5 fw-bold text-gradient mb-4">What can I help you build?</h1>
            <div className="row justify-content-center g-4">
              <div className="col-md-5">
                <div className="card shadow border-0 h-100">
                  <div className="card-body">
                    <div className="bg-primary text-white rounded-circle d-inline-flex justify-content-center align-items-center mb-3" style={{ width: '40px', height: '40px' }}>🚀</div>
                    <h5 className="card-title">Start a Project</h5>
                    <p className="card-text small">Generate custom projects based on your skill level and interests.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="card shadow border-0 h-100">
                  <div className="card-body">
                    <div className="bg-success text-white rounded-circle d-inline-flex justify-content-center align-items-center mb-3" style={{ width: '40px', height: '40px' }}>🗺</div>
                    <h5 className="card-title">Start a Journey</h5>
                    <p className="card-text small">Create visual learning roadmaps for any technology or concept.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generating Animation */}
      {isLoading && (
        <div className="flex-grow-1 d-flex justify-content-center align-items-center text-white">
          <div className="text-center">
            <div className="typing-dot dot1 mb-2"></div>
            <div className="typing-dot dot2 mb-2"></div>
            <div className="typing-dot dot3 mb-2"></div>
            <p className="mt-2">Generating your roadmap...</p>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-top p-3 bg-dark sticky-bottom">
        <div className="container">
          <div className="d-flex align-items-end gap-2 position-relative">
            <div className="flex-grow-1 position-relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="💡 Describe your project idea or ask for a roadmap..."
                className="form-control rounded-4 pe-5 shadow-sm gradient-input"
                rows={3}
                style={{
                  fontSize: '1rem',
                  resize: 'vertical',
                  minHeight: '60px',
                  maxHeight: '160px',
                  lineHeight: '1.5',
                  paddingRight: '60px'
                }}
              />
              <button className="btn position-absolute end-0 bottom-0 me-2 mb-2 p-0 text-muted" style={{ border: 'none', background: 'transparent' }}>
                <Paperclip size={16} />
              </button>
              <button
                onClick={startListening}
                className="btn position-absolute end-0 top-0 me-2 mt-2 p-0"
                style={{ border: 'none', background: 'transparent' }}
                title="Voice input"
              >
                <Mic size={18} color={isRecording ? 'red' : 'gray'} />
              </button>
            </div>

            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px' }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Buttons */}
      <button
        onClick={() => {
          const random = ideaPool[Math.floor(Math.random() * ideaPool.length)];
          setInputValue(random);
        }}
        className="btn position-fixed rounded-pill fw-bold"
        style={{
          bottom: '160px',
          right: '30px',
          zIndex: 999,
          background: 'linear-gradient(90deg, #00ffb7, #00c9ff)',
          color: '#000',
          boxShadow: '0 0 15px rgba(0, 255, 150, 0.5)',
          border: 'none',
          padding: '10px 20px'
        }}
      >
        💡 Generate Idea
      </button>

      <button
        onClick={() => setIsFeedbackOpen(true)}
        className="btn position-fixed rounded-pill fw-bold"
        style={{
          bottom: '220px',
          right: '30px',
          zIndex: 999,
          background: 'linear-gradient(90deg, #ff758c, #ff7eb3)',
          color: '#000',
          boxShadow: '0 0 15px rgba(255, 120, 180, 0.5)',
          border: 'none',
          padding: '10px 20px'
        }}
      >
        📝 Give Feedback
      </button>

      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </div>
  );
};

export default Home;
