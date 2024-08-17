import { Form } from "react-router-dom";
import LayoutAuth from "../../components/LayoutAuth";

const RegisterPage = () => {
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
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>
        </Form>
      </div>
    </LayoutAuth>
  );
};

export default RegisterPage;
