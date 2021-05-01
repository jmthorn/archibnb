import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

function LoginForm() {
  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  const [username, setUsername] = useState(sessionUser.username);
  const [email, setEmail] = useState(sessionUser.email);
  const [image_url, setImageUrl] = useState(sessionUser.image_url);
  const [first_name, setFirstName] = useState(sessionUser.first_name);
  const [last_name, setLastName] = useState(sessionUser.last_name);
  const [errors, setErrors] = useState([]);

  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.updateUser({ id:sessionUser.id, username, email, image_url, first_name, last_name })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Profile</h2>
      <div className="line"></div>
      <h1>Update You Information</h1>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label className="input1">
        {/* Username */}
        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label className="input3">
        {/* Email */}
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="input3">
        {/* Email */}
        <input
          placeholder="Image"
          type="text"
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </label>
      <label className="input3">
        {/* First Name */}
        <input
          placeholder="First Name"
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label className="input2">
        {/* Last Name */}
        <input
          placeholder="Last Name"
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <button className="login" type="submit">Update</button>
    </form>
  );
}

export default LoginForm;