// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignupForm.css';


function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const loginUser = (e) => { 
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential:"Demo-lition", password:"password" })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  }

  return (
      <div className="modal">
        <form onSubmit={handleSubmit} className="modal-content">
        <h2>Sign Up</h2>
        <div className="line"></div>
        <h1>Welcome to ArchiBnb</h1>
        <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label className="input1">
            {/* Email */}
            <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </label>
        <label className="input2">
            {/* Username */}
            <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </label >
        <label className="input3">
            {/* Password */}
            <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label>
        <label className="input4">
            {/* Confirm Password */}
            <input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
        </label>
        <button type="submit" className="submit">Sign Up</button>
        <button type="button" onClick ={loginUser} className="submit 2">Demo User</button>

        </form>
      </div>
  );
}

export default SignupFormPage;