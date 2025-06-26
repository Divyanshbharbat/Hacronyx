import React, { useState } from 'react';
import { X } from 'lucide-react';
import './feed.css'
import {toast,Toaster} from 'react-hot-toast'
export default function FeedbackModal({ isOpen, onClose }) {
  const [feedback, setFeedback] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log('Feedback submitted:', feedback);
    toast.success(" Feedback Submitted")
    setFeedback('');
    onClose();
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.9), rgba(20,20,20,0.95))',
        backdropFilter: 'blur(4px)',
        zIndex: 1055,
      }}
    >
      <div
        className="w-100 p-4 rounded-4 shadow-lg"
        style={{
          maxWidth: '500px',
          background: 'linear-gradient(135deg, #000000, #0a0a0a)',
          color: '#f1f1f1',
          border: '1px solid #333',
        }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0 fw-bold text-info">💬 Give Feedback</h5>
          <button
            onClick={onClose}
            className="btn btn-sm text-light border-0"
            style={{ background: 'transparent' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Description */}
        <p className="small text-secondary mb-3">
          We'd love to hear what went well or how we can improve your experience.
        </p>

        {/* Feedback Input */}
        <textarea
          className="form-control text-white bg-dark border-secondary mb-4"
          placeholder="Write your feedback here..."
          rows="5"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          style={{
            resize: 'none',
            boxShadow: '0 0 5px rgba(0,255,180,0.3)',
          }}
        />

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <button
            onClick={onClose}
            className="btn btn-outline-light"
            style={{
              borderColor: '#555',
              color: '#ccc',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn"
            style={{
              background: 'linear-gradient(90deg, #00ffb7, #00c9ff)',
              color: '#000',
              fontWeight: 'bold',
              boxShadow: '0 0 10px rgba(0,255,180,0.6)',
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
