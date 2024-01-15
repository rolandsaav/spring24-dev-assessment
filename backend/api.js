import express from "express";
import { database } from "./database.js";
import cors from "cors";

const app = express();
const port = 8000;
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/bog/users", (req, res) => {
  res.json(database).status(200);
});

app.get("/api/bog/users/:id", (req, res) => {
  const user = database.filter((user) => user.id === req.params.id)[0];
  res.json(user).status(200);
});

app.put("/api/bog/users/:id", (req, res) => {
  const updatedUser = req.body.user;
  database.forEach((user, index, array) => {
    if (user.id === updatedUser.id) {
      array[index] = updatedUser;
    }
  });
  res.json(updatedUser).status(200);
});

app.post("/api/bog/users", (req, res) => {
  const newUser = req.body.user;
  database.push(newUser);
  res.json(newUser).status(200);
});

app.delete("/api/bog/users/:id", (req, res) => {
  let indexToRemove = -1;
  let removedUser = null;
  database.forEach((user, index) => {
    if (user.id === req.params.id) {
      indexToRemove = index;
      removedUser = user;
    }
  });
  database.splice(indexToRemove, 1);
  res.json(removedUser).status(200);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
