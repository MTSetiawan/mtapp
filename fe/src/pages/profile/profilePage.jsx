const ProfilePage = () => {
  const userId = localStorage.getItem("token");
  return (
    <div>
      <h1>ProfilePage</h1>
      <form method="post" encType="multipart/form-data" action="/profile">
        <input type="file" name="profile_picture" required />
        <input type="hidden" name="userId" value={userId} />
        <button type="submit">Update Profile Picture</button>
      </form>
    </div>
  );
};

export default ProfilePage;
