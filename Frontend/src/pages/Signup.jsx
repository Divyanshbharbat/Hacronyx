import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Signup.css';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const token = localStorage.getItem("cookie");
    if (token) navigate("/home");
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP}/signup`, data, { withCredentials: true });
      if (response.data === 'success') {
        toast.success("Account created successfully 🎉");
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (error) {
      toast.error("Email is already registered ❌");
      console.error(error);
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0f0f, #1a1a1a)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#fff"
      }}
    >
      <Toaster />
      <div className="row w-100 justify-content-center align-items-center px-3">
        <div className="col-lg-5 col-md-8" data-aos="fade-right">
          <div style={{
            backdropFilter: "blur(12px)",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            padding: "2.5rem",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.9)"
          }}>
            <h2 className="text-center mb-3 fw-bold text-info">Create Account</h2>
            <p className="text-center mb-4 text-light">Join the future of AI-powered learning and build your dream ideas.</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-4">
                <input
                  type="text"
                  {...register("username", { required: "Username is required" })}
                  className="form-control form-control-lg bg-transparent text-white border-light"
                  placeholder="Username"
                />
                {errors.username && <p className="text-danger mt-2">{errors.username.message}</p>}
              </div>

              <div className="form-group mb-4">
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="form-control form-control-lg bg-transparent text-white border-light"
                  placeholder="Email"
                />
                {errors.email && <p className="text-danger mt-2">{errors.email.message}</p>}
              </div>

              <div className="form-group mb-4">
                <input
                  type="password"
                  {...register("password", { required: "Password is required", minLength: 6 })}
                  className="form-control form-control-lg bg-transparent text-white border-light"
                  placeholder="Password"
                />
                {errors.password && <p className="text-danger mt-2">{errors.password.message}</p>}
              </div>

              <div className="d-flex justify-content-between">
                <NavLink to="/login" className="btn btn-outline-info px-4">Login</NavLink>
                <button type="submit" className="btn btn-success px-5">Signup</button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-6 text-center mt-4 mt-lg-0" data-aos="fade-left">
          <img
            src="https://img.freepik.com/free-vector/account-concept-illustration_114360-3766.jpg"
            alt="Signup Visual"
            className="img-fluid rounded-4 shadow"
            style={{ maxHeight: '460px' }}
          />
          <p className="text-light mt-3">Secure and stylish signup experience.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
