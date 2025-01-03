import { Form, useActionData } from "react-router-dom";
import LayoutAuth from "../../components/LayoutAuth";

const LoginPage = () => {
  const action = useActionData();
  return (
    <LayoutAuth>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <Form className="card-body" method="post" action="/login">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input input-bordered"
              autoComplete="current-email"
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
              autoComplete="current-password"
              required
            />
            <label className="label">
              <a href="/register" className="label-text-alt link link-hover">
                dont have an account?
              </a>
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div>
            {action?.errorMessage && (
              <div className="mb-4 text-red-600 text-sm">
                {action.errorMessage}
              </div>
            )}
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </Form>
      </div>
    </LayoutAuth>
  );
};

export default LoginPage;
