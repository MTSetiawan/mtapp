import getUserHooks from "../hooks/getUserHooks";

const PotoProfile = () => {
  const getPotoProfile = getUserHooks();
  console.log(getPotoProfile);
  return (
    <div>
      <h1>PotoProfile</h1>
    </div>
  );
};

export default PotoProfile;
