import UpdateProfile from "./UpdateProfile";

const PopUpModal = () => {
  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        Edit Profile
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <p className="text-xl">Update Profile</p>
            <div className="mt-4">
              <UpdateProfile />
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PopUpModal;
