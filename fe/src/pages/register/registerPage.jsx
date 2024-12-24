import { useState } from "react";
import { Form } from "react-router-dom";
import LayoutAuth from "../../components/LayoutAuth";

const RegisterPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validateForm(newPassword, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    validateForm(password, newConfirmPassword);
  };

  const validateForm = (password, confirmPassword) => {
    let valid = true;

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    setIsDisabled(!valid);
  };

  return (
    <LayoutAuth>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <Form className="card-body" method="post" action="/register">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="username"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className={`input ${
                passwordError ? "input-error" : "input-bordered"
              }`}
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {passwordError && (
              <span className="text-sm text-red-500 mt-1">{passwordError}</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              className={`input ${
                confirmPasswordError ? "input-error" : "input-bordered"
              }`}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {confirmPasswordError && (
              <span className="text-sm text-red-500 mt-1">
                {confirmPasswordError}
              </span>
            )}
          </div>
          <label className="label">
            <a href="/login" className="label-text-alt link link-hover">
              Already have an account?
            </a>
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
          <div className="form-control mt-6">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isDisabled}
            >
              Register
            </button>
          </div>
        </Form>
      </div>
    </LayoutAuth>
  );
};

export default RegisterPage;
