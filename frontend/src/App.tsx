import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { User } from "./types/User";
import UserTable from "./components/UserTable";
import UserList from "./components/UserList";
import CreateUserForm from "./components/CreateUserForm";
import EditUserForm from "./components/EditUserForm";

const axio = axios.create({
  baseURL: "http://localhost:8000",
});
function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [width, setWidth] = useState<number>(0);
  const [createFormVisible, setCreateFormVisible] = useState<boolean>(false);
  const [editFormVisible, setEditFormVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [page, setPage] = useState<number>(1);

  const nextPage = () => {
    const nextPage = page < Math.ceil(users.length / 10) ? page + 1 : page;
    setPage(nextPage);
  };

  const lastPage = () => {
    const lastPage = page > 1 ? page - 1 : 1;
    setPage(lastPage);
  };

  const visibleUsers = () => {
    const startIndex = (page - 1) * 10;
    return users.slice(startIndex, startIndex + 10);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axio.get("/api/bog/users");
      const data = response.data;
      setUsers(data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const selectUser = (user: User) => {
    setSelectedUser(user);
    setEditFormVisible(true);
  };

  const deleteUser = async (user: User) => {
    setUsers(
      users.filter((u) => {
        return u.id !== user.id;
      }),
    );
    await axio.delete(`/api/bog/users/${user.id}`);
  };

  const addUser = (user: User) => {
    let newUser = user;
    newUser.id = `${users.length + 1}`;
    setUsers([...users, newUser]);
    axio.post("/api/bog/users", { user: newUser });
  };

  const editUser = async (user: User) => {
    setUsers(
      users.map((u) => {
        if (u.id === user.id) {
          return user;
        } else {
          return u;
        }
      }),
    );
    await axio.put(`/api/bog/users/${user.id}`, {
      user: user,
    });
  };

  return (
    <div className="App">
      <div className="wrapper">
        <h1>Volunteers</h1>

        {editFormVisible && (
          <EditUserForm
            closeDialog={() => {
              setEditFormVisible(false);
              setCreateFormVisible(false);
            }}
            updateUser={editUser}
            user={selectedUser as User}
          />
        )}
        {createFormVisible && (
          <CreateUserForm
            closeDialog={() => {
              setEditFormVisible(false);
              setCreateFormVisible(false);
            }}
            addUser={addUser}
          />
        )}
        {!createFormVisible && (
          <button
            className="btn btn-add"
            onClick={() => {
              setCreateFormVisible(true);
              setEditFormVisible(false);
            }}
          >
            Add Volunteer
          </button>
        )}
        {width >= 800 ? (
          <UserTable
            users={visibleUsers()}
            deleteUser={deleteUser}
            setSelectedUser={selectUser}
          />
        ) : (
          <UserList
            users={visibleUsers()}
            deleteUser={deleteUser}
            selectUser={selectUser}
          />
        )}
        <div className="pagination-wrapper">
          <button className="btn" onClick={lastPage}>
            Previous
          </button>
          <button className="btn" onClick={nextPage}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
