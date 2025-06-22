import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Login.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
useEffect(()=>{
 let y= localStorage.getItem("cookie")
  if(y){
    navigate("/home")
  }
},[])
  const onSubmit = async (data) => {
    try {
     
      const res = await axios.post(`${import.meta.env.VITE_APP}/login`, data,{withCredentials:true,});
      if (res.data.message === "success") {
        localStorage.setItem("cookie", res.data.token);
        toast.success("Login Successful 🎉");
        setTimeout(() => navigate("/home"), 2000);
      } else {
        toast.error(res.data.message || "Invalid credentials ❌");
      }
    } catch (err) {
      toast.error("Something went wrong! ❌");
      console.error("Login error:", err);
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #d7e1ec, #f4f9ff)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}
    >
      <Toaster />
      <div className="row w-100 justify-content-center align-items-center px-3">
        {/* Left Side - Login Form */}
        <div className="col-lg-5 col-md-8" data-aos="fade-right">
          <div className="p-5 bg-white rounded-4 shadow-lg">
            <h2 className="text-center mb-3 fw-semibold text-primary">Login to Continue</h2>
            <p className="text-center text-muted mb-4" style={{ fontSize: "0.95rem" }}>
              Access your dashboard, manage donations, and explore new features.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-4">
                <input
                  type="text"
                  {...register("username", { required: "Username is required" })}
                  className="form-control form-control-lg"
                  placeholder="Username"
                  style={{ backgroundColor: "#f2f6fc" }}
                />
                {errors.username && <p className="text-danger mt-2">{errors.username.message}</p>}
              </div>

              <div className="form-group mb-4">
                <input
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  className="form-control form-control-lg"
                  placeholder="Password"
                  style={{ backgroundColor: "#f2f6fc" }}
                />
                {errors.password && <p className="text-danger mt-2">{errors.password.message}</p>}
              </div>

              <div className="mb-3 text-end">
                <NavLink to="/contact" className="text-decoration-none text-secondary">
                  Forgot password?
                </NavLink>
              </div>

              <div className="d-flex justify-content-between flex-wrap gap-2">
  <NavLink to="/signup" className="btn btn-outline-primary px-4">Signup</NavLink>
  <button type="submit" className="btn btn-primary px-5">Login</button>
  <NavLink to="/adminlogin" className="btn btn-dark px-4">Admin Login</NavLink>
</div>


            </form>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="col-lg-6 mt-5 mt-lg-0 text-center" data-aos="fade-left">
          <img
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?t=st=1712745650~exp=1712749250~hmac=bc770839e63b47b91bc894cd7a32f0fc41636a1f42f7e1864f3c18d35c4eebd3&w=740"
            alt="Login Visual"
            className="img-fluid rounded-4 shadow-sm"
            style={{ maxHeight: '480px' }}
          />
          <p className="text-muted mt-3">
            Empowering communities through smart food donation systems.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
