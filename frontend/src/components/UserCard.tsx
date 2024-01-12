import { User } from "../types/User";

function UserCard(props: { user: User }) {
  const status = props.user.status ? "Enabled" : "Disabled";
  return (
    <div className="user-card">
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
    </div>
  );
}

export default UserCard;
