import { User } from "../types/User";
import UserCard from "./UserCard";

function UserList(props: { users: User[] }) {
  return (
    <div className="user-wrapper">
      {props.users.map((user) => {
        return <UserCard user={user} />;
      })}
    </div>
  );
}

export default UserList;
