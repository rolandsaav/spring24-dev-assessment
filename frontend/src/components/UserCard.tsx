import { useState } from "react";
import { User } from "../types/User";

function UserCard(props: { user: User; selectUser: any; deleteUser: any }) {
  const status = props.user.status ? "Enabled" : "Disabled";
  const [active, setActive] = useState<boolean>(false);
  const cardStyle = active ? "user-card user-card-active" : "user-card";
  return (
    <div className={cardStyle} onClick={() => setActive(!active)}>
      <img src={props.user.avatar} alt="" className="user-card-img" />
      <div className="user-contents">
        <div className="user-card-name-container">
          <div className="user-card-name">{props.user.name}</div>
          <div className="user-card-details-small">
            {status} {props.user.rating}/9
          </div>
        </div>
        <div className="user-card-project-name">{props.user.hero_project}</div>
        <div className="user-card-details">{props.user.email}</div>
        <div className="user-card-details">{props.user.phone}</div>
      </div>

      {active && (
        <div className="card-buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActive(false);
              props.selectUser(props.user);
            }}
            className="btn"
          >
            Edit
          </button>
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActive(false);
              props.deleteUser(props.user);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default UserCard;
