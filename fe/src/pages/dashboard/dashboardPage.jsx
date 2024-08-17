import { Navigate, useLoaderData } from "react-router-dom";
import Navbar from "../../components/Navbar";

const DashboardPage = () => {
  const data = useLoaderData();
  if (data?.error) return <Navigate to="/login" />;
  return (
    <div>
      <Navbar api={data} />
      <h1>Dashboard</h1>
      <p>{data?.username || data?.error}</p>
    </div>
  );
};

export default DashboardPage;
