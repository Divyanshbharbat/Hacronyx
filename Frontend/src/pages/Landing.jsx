import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Target, Map, TrendingUp, Lightbulb } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="text-primary me-2" size={20} />,
      title: "Smart Project Generation",
      description: "Generate projects tailored to your skill level and learning goals with our advanced AI algorithm.",
    },
    {
      icon: <TrendingUp className="text-success me-2" size={20} />,
      title: "Progress Tracking",
      description: "Track your learning journey with detailed progress analytics and milestone achievements.",
    },
    {
      icon: <Lightbulb className="text-warning me-2" size={20} />,
      title: "Business Niche Integration",
      description: "Every project comes with real-world business applications and market insights.",
    },
    {
      icon: <Map className="text-info me-2" size={20} />,
      title: "Personalized Roadmaps",
      description: "Get step-by-step learning paths with estimated timelines and recommended tech stacks.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Full Stack Developer",
      content:
        "ProjectPilot helped me transition from frontend to full-stack development with perfectly tailored projects.",
    },
    {
      name: "Marcus Johnson",
      role: "CS Student",
      content: "The progress tracking feature is incredible. I can see exactly how much I've learned and what's next.",
    },
    {
      name: "Elena Rodriguez",
      role: "Product Manager",
      content:
        "Finally, an AI tool that understands business context. Every project has real market applications.",
    },
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="min-vh-100 d-flex flex-column justify-content-center align-items-center text-center p-5">
        <motion.div className="mb-4" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
          <Sparkles size={40} className="text-light mb-2" />
          <h1 className="display-4 fw-bold">
            Generate Projects with <span className="text-info">AI Precision</span>
          </h1>
          <p className="lead text-light">
            ProjectPilot creates personalized projects based on your skill level, provides detailed roadmaps, and
            tracks your progress like no other AI tool.
          </p>
        </motion.div>

        <motion.div
          className="d-flex gap-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            className="btn btn-info btn-lg d-flex align-items-center"
            onClick={() => navigate("/home")}
          >
            Start Building Projects <ArrowRight className="ms-2" size={20} />
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container py-5">
        <h2 className="text-center mb-4">Everything you need to master any skill</h2>
        <p className="text-center text-secondary mb-5">
          ProjectPilot combines AI-powered project generation with comprehensive progress tracking, giving you the
          complete learning experience other tools can't match.
        </p>
        <div className="row g-4">
          {features.map((feature, idx) => (
            <div className="col-md-6 col-lg-3" key={idx}>
              <div className="bg-secondary bg-opacity-10 rounded p-4 h-100 border border-secondary">
                <h5 className="d-flex align-items-center">{feature.icon} {feature.title}</h5>
                <p className="text-light small mt-2">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-5 bg-dark">
        <div className="container">
          <h2 className="text-center mb-4">Loved by developers worldwide</h2>
          <p className="text-center text-secondary mb-5">
            Join thousands of developers who've accelerated their learning with ProjectPilot
          </p>
          <div className="row justify-content-center">
            {testimonials.map((testimonial, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <div className="bg-dark border border-secondary rounded p-4 h-100">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-secondary rounded-circle me-3" style={{ width: 40, height: 40 }}></div>
                    <div>
                      <h6 className="mb-0 text-white">{testimonial.name}</h6>
                      <small className="text-muted">{testimonial.role}</small>
                    </div>
                  </div>
                  <p className="fst-italic text-light">"{testimonial.content}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
