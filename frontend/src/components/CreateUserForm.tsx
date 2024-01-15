import { useState } from "react";
import { User } from "../types/User";

function CreateUserForm(props: { closeDialog: any; addUser: any }) {
  const [name, setName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [project, setProject] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  const [rating, setRating] = useState<string>("1");

  const trySubmit = () => {
    if (
      name.trim().length > 0 &&
      project.trim().length > 0 &&
      email.length > 0 &&
      phone.trim().length > 0 &&
      avatar.length > 0
    ) {
      const user: User = {
        hero_project: project,
        name: name,
        email: email,
        phone: phone,
        rating: rating,
        status: status,
        notes: "",
        avatar: avatar,
        id: "none",
      };

      props.addUser(user);
      props.closeDialog();
    }
  };
  return (
    <form className="create-user-container">
      <div className="create-user-row">
        <div className="create-user-row-label">Avatar Url</div>
        <input
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value.trim())}
          required
          className="create-user-row-input"
        />
      </div>
      <div className="create-user-row">
        <div className="create-user-row-label">Name</div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="create-user-row-input"
        />
      </div>
      <div className="create-user-row">
        <div className="create-user-row-label">Hero Project</div>
        <input
          type="text"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          required
          className="create-user-row-input"
        />
      </div>
      <div className="create-user-row">
        <div className="create-user-row-label">Email</div>
        <input
          type="email"
          required
          className="create-user-row-input"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
      </div>
      <div className="create-user-row">
        <div className="create-user-row-label">Phone Number</div>
        <input
          type="text"
          required
          className="create-user-row-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="create-user-row-inline">
        <div className="create-user-row-wrapper">
          <div className="create-user-row-label">Status</div>
          <input
            type="checkbox"
            checked={!!status}
            onChange={(e) => {
              console.log(status);
              setStatus(!status);
            }}
          />
        </div>
        <div className="create-user-row-wrapper">
          <div className="create-user-row-label">Rating</div>
        </div>
        <input
          type="number"
          max={9}
          min={1}
          required
          onChange={(e) => setRating(e.target.value)}
        />
      </div>

      <div className="create-user-footer">
        <button className="btn" onClick={() => props.closeDialog()}>
          Cancel
        </button>
        <button type="submit" className="btn" onClick={trySubmit}>
          Confirm
        </button>
      </div>
    </form>
  );
}

export default CreateUserForm;
