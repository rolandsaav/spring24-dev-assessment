import { User } from "../types/User";
import Row from "./Row";

const UserTable = (props: {
  users: User[];
  deleteUser: any;
  setSelectedUser: any;
}) => {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Project</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Rating</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => {
            return (
              <Row
                key={user.id}
                user={user}
                setSelectedUser={props.setSelectedUser}
                deleteUser={props.deleteUser}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
