import { User } from "../types/User";
import "../App.css";
import { useState } from "react";

const Row = (props: { user: User; setSelectedUser: any; deleteUser: any }) => {
  const tooltip = props.user.status === false ? "disabled" : "enabled";
  const [btnVisible, setBtnVisible] = useState<boolean>(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const editUser = () => {
    props.setSelectedUser(props.user);
    scrollToTop();
  };
  return (
    <tr
      onMouseOver={() => {
        setBtnVisible(true);
      }}
      onMouseLeave={() => {
        setBtnVisible(false);
      }}
    >
      <td>
        <img style={{ height: "64px" }} src={props.user.avatar} alt="" />
      </td>
      <td>{props.user.name}</td>
      <td>{props.user.hero_project}</td>
      <td>{props.user.email}</td>
      <td>{props.user.phone}</td>
      <td className="number">{props.user.rating}</td>
      <td>{tooltip}</td>
      {btnVisible && (
        <td className="action-container">
          <div className="btn" onClick={editUser}>
            Edit
          </div>
          <div className="btn" onClick={() => props.deleteUser(props.user)}>
            Delete
          </div>
        </td>
      )}
    </tr>
  );
};

export default Row;
