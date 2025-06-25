import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import './home.css';

const colors = [
  'linear-gradient(to right, #ffecd2, #fcb69f)',
  'linear-gradient(to right, #a1c4fd, #c2e9fb)',
  'linear-gradient(to right, #d4fc79, #96e6a1)',
  'linear-gradient(to right, #84fab0, #8fd3f4)',
];

const Home = () => {
  const [concept, setConcept] = useState('');
  const [background, setBackground] = useState('');
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const token = localStorage.getItem('cookie');

  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBatches(res.data.batches || []);
    } catch {
      toast.error('Failed to fetch batches');
    }
  };

  const handleGenerate = async () => {
    if (!concept || !background) return toast.error('Please fill both fields');
    setLoading(true);
    try {
      await axios.post(
        'http://localhost:3000/api/divyansh',
        { concept, background },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Batch generated!');
      fetchBatches();
    } catch {
      toast.error('Failed to generate');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (batchId, projectId) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/batches/${batchId}/projects/${projectId}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Marked as completed');
      fetchBatches();
    } catch {
      toast.error('Update failed');
    }
  };

  return (
    <div className="container py-4">
      <Toaster />
      <h2 className="mb-4 text-center text-primary fw-bold">🧠 DIY Mission Engine – Brain Buldr</h2>

      <div className="input-group mb-4 gap-2 flex-wrap">
        <input
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          placeholder="Enter concept"
          className="form-control flex-grow-1"
        />
        <input
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          placeholder="Enter your background"
          className="form-control flex-grow-1"
        />
        <button onClick={handleGenerate} className="btn btn-primary flex-shrink-0">
          {loading ? 'Generating...' : 'Generate'}
        </button>
        <button onClick={fetchBatches} className="btn btn-secondary flex-shrink-0">
          Refresh
        </button>
      </div>

      {batches.length > 0 ? (
        batches.map((batch, bIdx) => (
          <div key={batch._id} className="mb-5" data-aos="fade-up">
            <h4 className="mb-3 text-secondary">
              Batch {bIdx + 1} — Progress: {batch.progressPercent.toFixed(0)}%
            </h4>
            <div className="row g-4">
              {batch.projects.map((project, pIdx) => {
                const isOpen = expanded === `${batch._id}_${project._id}`;
                const cardColor = colors[(bIdx + pIdx) % colors.length];
                return (
                  <div key={project._id} className="col-md-6">
                    <div
                      className="project-card rounded shadow p-4"
                      style={{ background: cardColor, cursor: 'pointer' }}
                      onClick={() =>
                        setExpanded(isOpen ? null : `${batch._id}_${project._id}`)
                      }
                    >
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0 fw-semibold">{project.title}</h5>
                        <span className="fs-5">{isOpen ? '▲' : '▼'}</span>
                      </div>
                      {isOpen && (
                        <div className="project-details mt-3">
                          <p>
                            <strong>Description:</strong>{' '}
                            <span className="text-dark">{project.description || 'No description provided.'}</span>
                          </p>

                          <p className="mb-1 fw-semibold">Roadmap:</p>
                          {project.roadmap.length > 0 ? (
                            <ul className="list-group list-group-flush mb-3">
                              {project.roadmap.map((point, i) => (
                                <li key={i} className="list-group-item py-1 px-2 bg-transparent">
                                  <i className="bi bi-check2-circle text-success me-2"></i>
                                  {point}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="fst-italic text-muted mb-3">No roadmap available.</p>
                          )}

                          <p className="mb-1 fw-semibold">Tasks:</p>
                          {project.tasks.length > 0 ? (
                            <ul className="list-group list-group-flush mb-3">
                              {project.tasks.map((task, i) => (
                                <li key={i} className="list-group-item py-1 px-2 bg-transparent">
                                  <i className="bi bi-list-task text-primary me-2"></i>
                                  {task}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="fst-italic text-muted mb-3">No tasks listed.</p>
                          )}

                          <p>
                            <strong>Status:</strong>{' '}
                            <span className={project.completed ? 'text-success' : 'text-warning'}>
                              {project.completed ? '✅ Completed' : '🕒 Incomplete'}
                            </span>
                          </p>

                          {!project.completed && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleComplete(batch._id, project._id);
                              }}
                              className="btn btn-success mt-2"
                            >
                              Mark Complete
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-muted">No batches found. Generate your first batch!</p>
      )}
    </div>
  );
};

export default Home;
