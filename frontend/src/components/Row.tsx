import { User } from "../types/User";
import "../App.css";

const Row = (props: { user: User }) => {
  const status = props.user.status === false ? "dot failure" : "dot success";
  const tooltip = props.user.status === false ? "disabled" : "enabled";
  return (
    <tr className="row">
      <td>
        <img style={{ height: "64px" }} src={props.user.avatar} alt="" />
      </td>
      <td>{props.user.name}</td>
      <td>{props.user.hero_project}</td>
      <td>{props.user.email}</td>
      <td>{props.user.phone}</td>
      <td className="number">{props.user.rating}</td>
      <td>{tooltip}</td>
    </tr>
  );
};

export default Row;
