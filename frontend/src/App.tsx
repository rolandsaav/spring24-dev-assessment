import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { User } from "./types/User";
import Row from "./components/Row";
import UserTable from "./components/UserTable";
import UserList from "./components/UserList";

const axio = axios.create({
  baseURL: "http://localhost:8000",
});
function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [width, setWidth] = useState<number>(0);
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
  return (
    <div className="App">
      <div className="wrapper">
        <h1>Volunteers</h1>
        {width >= 800 ? (
          <UserTable users={users} />
        ) : (
          <UserList users={users} />
        )}
      </div>
    </div>
  );
}

export default App;
