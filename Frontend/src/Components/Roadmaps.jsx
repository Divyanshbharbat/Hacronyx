import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Map, BookOpen, Clock, ListTodo } from 'lucide-react';
import MermaidDiagram from '../Components/MermaidDiagram';
import toast from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import './roadmap.css';
import { useNavigate } from 'react-router-dom';

const Roadmaps = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [tasks, setTasks] = useState({});
  const [taskStatus, setTaskStatus] = useState({});
  const token = localStorage.getItem('cookie');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error('Please login to access projects.');
      navigate('/login');
    } else {
      fetchRoadmaps();
    }
  }, [token]);

  const fetchRoadmaps = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP}/api/roadmaps`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const formatted = (res.data.roadmaps || []).map((r, index) => ({
        ...r,
        chart: r.chart.replace(/\]\s*style/g, ']\nstyle'),
        batch: index < 3 ? 'Batch 1' : 'Batch 2',
      }));

      setRoadmaps(formatted);
    } catch (error) {
      toast.error('Failed to load roadmaps.');
    }
  };

  const fetchTasks = async (roadmapId) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP}/api/roadmaps/${roadmapId}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const taskArray = res.data.tasks || [];
      const existingProgress = roadmaps.find((r) => r._id === roadmapId)?.taskProgress || [];
      const taskState = taskArray.map((_, i) => existingProgress[i] || false);

      setTasks((prev) => ({ ...prev, [roadmapId]: taskArray }));
      setTaskStatus((prev) => ({ ...prev, [roadmapId]: taskState }));
    } catch (err) {
      toast.error('Failed to load tasks.');
    }
  };

  const toggleTaskStatus = async (roadmapId, index) => {
    const updated = [...(taskStatus[roadmapId] || [])];
    updated[index] = !updated[index];

    setTaskStatus((prev) => ({ ...prev, [roadmapId]: updated }));

    try {
      await axios.patch(
        `${import.meta.env.VITE_APP}/api/roadmaps/${roadmapId}/tasks-progress`,
        { progress: updated },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      toast.error('Failed to save progress');
    }
  };

  const calculatePercent = (list = []) => {
    const completed = list.filter(Boolean).length;
    return list.length ? Math.round((completed / list.length) * 100) : 0;
  };

  const handleStartJourney = (id) => {
    const show = !expanded[id];
    setExpanded((prev) => ({ ...prev, [id]: show }));
    if (show) fetchTasks(id);
  };

  return (
    <div className="min-vh-100 py-5" style={{ background: 'linear-gradient(135deg, #0f0f0f, #1a1a1a)', color: '#fff' }}>
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
            roadmaps.map((roadmap, index) => {
              const progressPercent = calculatePercent(taskStatus[roadmap._id] || []);
              return (
                <div className="col-lg-6" key={index}>
                  <div
                    className="card border-0 shadow h-100"
                    style={{
                      background: 'linear-gradient(to right, #1e1e1e, #2a2a2a)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#e0f7fa',
                    }}
                  >
                    <div className="card-body">
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="text-white fw-bold mb-0">{roadmap.batch}</h6>
                          <span className="small text-light">{progressPercent}% completed</span>
                        </div>
                        <div className="progress" style={{ height: '10px' }}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${progressPercent}%`,
                              background: 'linear-gradient(to right, #00ffb7, #00c9ff)',
                            }}
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-between flex-wrap align-items-start mb-3">
                        <div className="pe-3">
                          <h5 className="card-title text-info">{roadmap.title}</h5>
                          <p className="text-light small">{roadmap.description}</p>
                          <div className="d-flex gap-3 small text-light">
                            <span className="d-flex align-items-center gap-1">
                              <Clock size={14} /> {roadmap.duration || '4-6 weeks'}
                            </span>
                            {roadmap.difficulty && (
                              <span className="d-flex align-items-center gap-1">
                                <BookOpen size={14} /> {roadmap.difficulty}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          className="btn btn-outline-info d-flex align-items-center gap-2 mt-2"
                          onClick={() => handleStartJourney(roadmap._id)}
                        >
                          <Map size={16} /> <span>{expanded[roadmap._id] ? 'Hide' : 'Start Journey'}</span>
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

                      {expanded[roadmap._id] && tasks[roadmap._id]?.length > 0 && (
                        <div className="mt-4">
                          <h6 className="text-light mb-3 d-flex align-items-center">
                            <ListTodo className="me-2" size={20} /> Task List
                          </h6>

                          <ul className="list-group">
                            {tasks[roadmap._id].map((task, idx) => {
                              const isHeading = /\*\*(Beginner|Intermediate|Advanced)\*\*/i.test(task);
                              return isHeading ? (
                                <li
                                  key={idx}
                                  className="list-group-item border-0 bg-transparent"
                                  style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    color: '#00e1ff',
                                    padding: '1rem 0.5rem',
                                  }}
                                >
                                  {task.replace(/\*\*/g, '')}
                                </li>
                              ) : (
                                <li
                                  key={idx}
                                  className="list-group-item d-flex justify-content-between align-items-center"
                                  style={{
                                    background: 'linear-gradient(to right, #222, #333)',
                                    color: '#fff',
                                    fontSize: '1rem',
                                    padding: '1rem',
                                    marginBottom: '0.5rem',
                                    border: '1px solid #444',
                                    borderRadius: '0.75rem',
                                    transition: 'background 0.3s',
                                  }}
                                >
                                  <span className="d-flex align-items-center">
                                    <input
                                      type="checkbox"
                                      className="form-check-input me-3"
                                      checked={taskStatus[roadmap._id]?.[idx] || false}
                                      onChange={() => toggleTaskStatus(roadmap._id, idx)}
                                    />
                                    {task}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center text-muted">No roadmaps available yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roadmaps;
