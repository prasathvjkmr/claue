import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getUsers() {
      await axios
        .get("https://reqres.in/api/users", {
          headers: {
            "x-api-key": "reqres-free-v1",
          },
        })
        .then((res) => setUsers(res.data.data))
        .catch((err) => console.error(err));
    }
    getUsers();
  }, []);
  return (
    <>
      <h1>Claue</h1>
      {users && users.map((user) => <p key={user.id}>{user.first_name}</p>)}
    </>
  );
}

export default App;
