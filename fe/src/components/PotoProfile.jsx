import getUserHooks from "../hooks/getUserHooks";

const PotoProfile = () => {
  const getPotoProfile = getUserHooks();
  return (
    <div>
      <h1>PotoProfile</h1>
    </div>
  );
};

export default PotoProfile;
