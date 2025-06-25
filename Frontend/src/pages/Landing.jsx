import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button, Container, Row, Col } from "react-bootstrap";

const Landing = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div style={{ backgroundColor: "rgb(14, 33, 72)", color: "white" }}>
      {/* Hero Section */}
      <section
        className="d-flex align-items-center"
        style={{ minHeight: "100vh", background: "linear-gradient(to right, rgb(72, 58, 160), rgb(121, 101, 193))" }}
      >
        <Container className="text-center" data-aos="fade-up">
          <h1 className="display-3 fw-bold text-warning">R2-05 DIY Mission Engine</h1>
          <p className="lead text-light mt-3 mb-4">
            Turn your learning into action. Generate personalized hands-on project ideas based on what you study.
          </p>
          <Button variant="light" size="lg">Get Started</Button>
          <div className="mt-5">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/ai-assistant-4484382-3724323.png"
              alt="AI Assistant"
              className="img-fluid w-50 rounded shadow"
            />
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center text-warning fw-bold mb-5" data-aos="fade-down">Key Features</h2>
          <Row>
            {[
              {
                title: "Smart Input Processing",
                desc: "Submit a concept or a full transcript. Our AI parses and understands it instantly.",
                img: "https://img.icons8.com/color/452/artificial-intelligence.png"
              },
              {
                title: "Tailored Project Ideas",
                desc: "Receive multiple project suggestions suitable for your background and interests.",
                img: "https://img.icons8.com/external-wanicon-flat-wanicon/452/external-project-education-wanicon-flat-wanicon.png"
              },
              {
                title: "Built-in Guidance",
                desc: "Get starter code, hardware diagrams, and research templates with each task.",
                img: "https://img.icons8.com/external-flat-juicy-fish/452/external-guide-ui-flat-juicy-fish.png"
              },
            ].map((item, index) => (
              <Col md={4} className="mb-4" key={index} data-aos="fade-up" data-aos-delay={index * 200}>
                <div className="card h-100 text-center p-4 shadow-lg border-0" style={{ backgroundColor: "rgb(72, 58, 160)", color: "white" }}>
                  <img src={item.img} alt={item.title} className="mb-3" style={{ width: "80px", height: "80px" }} />
                  <h5 className="fw-bold">{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Why Use Section */}
      <section className="py-5" style={{ backgroundColor: "rgb(121, 101, 193)" }}>
        <Container>
          <h2 className="text-center fw-bold text-white mb-5" data-aos="fade-down">Why R2-05?</h2>
          <Row>
            <Col md={6} data-aos="fade-right">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/education-technology-3948492-3280574.png"
                alt="Why R2-05"
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col md={6} className="d-flex align-items-center" data-aos="fade-left">
              <div>
                <ul className="fs-5">
                  <li>✓ Converts theory into practice instantly</li>
                  <li>✓ AI-powered content relevance and creativity</li>
                  <li>✓ Supports coding, design, research, and electronics</li>
                  <li>✓ Empowers students with real-world experience</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <Container>
          <h2 className="text-center text-warning mb-5" data-aos="fade-down">What Learners Say</h2>
          <Row>
            {["I created my first Arduino bot in 3 hours!", "Helped me build a portfolio project from scratch.", "Brilliant for hackathon prep and real-world application."].map((quote, index) => (
              <Col md={4} key={index} data-aos="fade-up" data-aos-delay={index * 200}>
                <div className="p-4 rounded shadow-sm" style={{ backgroundColor: "rgb(227, 208, 149)", color: "rgb(14, 33, 72)" }}>
                  <p className="mb-0">❝ {quote} ❞</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-5 text-center" style={{ backgroundColor: "rgb(14, 33, 72)" }}>
        <Container data-aos="zoom-in">
          <h2 className="text-warning fw-bold mb-3">Ready to Transform Your Learning?</h2>
          <p className="text-light fs-5">Join thousands of students turning theory into hands-on reality with R2-05.</p>
          <Button variant="warning" size="lg">Start Building Now</Button>
        </Container>
      </section>
    </div>
  );
};

export default Landing;