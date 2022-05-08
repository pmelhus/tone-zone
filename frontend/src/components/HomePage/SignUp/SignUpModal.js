import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import "./SignUpModal.css";

function SignupFormPage({ visible, setVisible }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [image, setImage] = useState(null)

  // if (sessionUser) return <Redirect to="/discover" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
    return dispatch(
        sessionActions.signup({ email, username, password, image })
      ).then(()=> {
        setUsername('');
        setEmail('');
        setPassword('')
        setImage(null);
      }).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const backgroundClick = () => {
    setVisible(!visible);
  };
  if (!visible) return null;

  const updateImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <div
      className="background-modal"
      onClick={(e) => {
        backgroundClick();
      }}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            Email
          </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          <label>
            Username
          </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          <label>
            Password
          </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          <label>
            Confirm Password
          </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
      <label for="song-upload">Upload song cover</label>

<input
  placeholder="Upload your image"
  type="file"
  accept="image/*"
  name="image-upload"
  onChange={updateImage}
></input>
        {/* <label>
            Multiple Upload
            <input
              type="file"
              multiple
              onChange={updateFiles} />
          </label> */}
          <button type="submit">Sign Up</button>
        </form>
      </div>


      </div>
    </div>
  );
}

export default SignupFormPage;
