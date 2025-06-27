import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Login.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const token = localStorage.getItem("cookie");
    if (token) navigate("/home");
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP}/login`, data, { withCredentials: true });
      if (res.data.message === "success") {
        localStorage.setItem("cookie", res.data.token);
    toast.success("Login Successfully")
        setTimeout(() => navigate("/home"), 1500);
      } else {
        toast.error(res.data.message || "Invalid credentials ❌");
      }
    } catch (err) {
      toast.error("Something went wrong ❌");
      console.error("Login error:", err);
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000000, #1f1f1f)",
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
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.85)"
          }}>
            <h2 className="text-center mb-3 fw-bold text-info">Login to Continue</h2>
            <p className="text-center text-light mb-4">Access your dashboard and manage your AI-powered learning projects.</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-4">
                <input
                  type="text"
                  {...register("username", { required: "Username is required" })}
                  className="form-control form-control-lg  text-dark border-light"
                  placeholder="Username"
                />
                {errors.username && <p className="text-danger mt-2">{errors.username.message}</p>}
              </div>

              <div className="form-group mb-4">
                <input
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  className="form-control form-control-lg text-dark border-light"
                  placeholder="Password"
                />
                {errors.password && <p className="text-danger mt-2">{errors.password.message}</p>}
              </div>


              <div className="d-flex justify-content-between">
                <NavLink to="/signup" className="btn btn-outline-info px-4">Signup</NavLink>
                <button type="submit" className="btn btn-success px-5">Login</button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-6 text-center mt-4 mt-lg-0" data-aos="fade-left">
          <img
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"
            alt="Login Visual"
            className="img-fluid rounded-4 shadow"
            style={{ maxHeight: '460px' }}
          />
          <p className="text-light mt-3">Log in to unlock your potential.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
