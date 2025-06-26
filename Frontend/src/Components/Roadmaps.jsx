import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Map, BookOpen, Clock } from 'lucide-react';
import MermaidDiagram from '../Components/MermaidDiagram';
import toast from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import './roadmap.css'; // optional for additional styles

const Roadmaps = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const token = localStorage.getItem('cookie');
useEffect(() => {
  if (!token) {
    toast.error('Please login to access projects.');
    navigate('/login');
  }
}, [token]);
  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP}/api/roadmaps`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const formatted = (res.data.roadmaps || []).map((r) => ({
          ...r,
          chart: r.chart.replace(/\]\s*style/g, ']\nstyle'),
        }));

        if (formatted.length > 0) {
          setRoadmaps(formatted);
        } else {
          toast.error('No roadmaps found.');
        }
      } catch (error) {
        console.error('Error fetching roadmaps:', error);
        toast.error('Failed to load roadmaps.');
      }
    };

    fetchRoadmaps();
  }, [token]);

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: 'linear-gradient(135deg, #0f0f0f, #1a1a1a)',
        color: '#fff',
      }}
    >
      <div className="container">
        <div className="mb-5 text-center">
          <h1
            className="fw-bold"
            style={{
              background: 'linear-gradient(90deg, #00ffb7, #00c9ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            🚀 Learning Roadmaps
          </h1>
          <p className="text-secondary">Visual step-by-step journeys generated from your projects</p>
        </div>

        <div className="row g-4">
          {roadmaps.length > 0 ? (
            roadmaps.map((roadmap, index) => (
              <div className="col-lg-6" key={index}>
                <div
                  className="card border-0 shadow h-100"
                  style={{
                    background: 'linear-gradient(to right, #1e1e1e, #2a2a2a)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(6px)',
                    color: '#e0f7fa',
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between flex-wrap align-items-start mb-3">
                      <div className="pe-3">
                        <h5 className="card-title text-info">{roadmap.title}</h5>
                        <p className="text-light small">{roadmap.description}</p>
                        <div className="d-flex gap-3 small text-light">
                          <span className="d-flex align-items-center gap-1">
                            <Clock size={14} /> {roadmap.duration}
                          </span>
                          {roadmap.difficulty && (
                            <span className="d-flex align-items-center gap-1">
                              <BookOpen size={14} /> {roadmap.difficulty}
                            </span>
                          )}
                        </div>
                      </div>
                      <button className="btn btn-outline-info d-flex align-items-center gap-2 mt-2">
                        <Map size={16} />
                        <span>Start Journey</span>
                      </button>
                    </div>

                    <div
                      className="rounded p-3 mt-3"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <MermaidDiagram chart={roadmap.chart} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center text-muted">No roadmaps available yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roadmaps;
