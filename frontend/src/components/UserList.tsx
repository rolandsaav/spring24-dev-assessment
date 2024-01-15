import { User } from "../types/User";
import UserCard from "./UserCard";

function UserList(props: { users: User[]; selectUser: any; deleteUser: any }) {
  return (
    <div className="user-wrapper">
      {props.users.map((user) => {
        return (
          <UserCard
            key={user.id}
            user={user}
            selectUser={props.selectUser}
            deleteUser={props.deleteUser}
          />
        );
      })}
    </div>
  );
}

export default UserList;
