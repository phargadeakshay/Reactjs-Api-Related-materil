import React, { useState, useEffect } from "react";
import axios from "axios";
export const Dropdown = () => {
  const [users, setUser] = useState([]);
  const [singleUser, setSingleUser] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUser(response.data))
      .then((error) => console.log(error));
  }, []);

  const onddlChange = (e) => {
    // alert(e.target.value);
    axios
      .get("https://jsonplaceholder.typicode.com/users/" + e.target.value)
      .then((response) => setSingleUser(response.data))
      .then((error) => console.log(error));
  };
  return (
    <div>
      <h1>API Example</h1>
      <select onChange={onddlChange}>
        <option value="0" selected>
          --Select User--
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <table>
        <tr>
          <td>Id</td>
          <td>Name</td>
          <td>UserName</td>
          <td>Email</td>
        </tr>
        <tr>
          <td>{singleUser.id}</td>
          <td>{singleUser.name}</td>
          <td>{singleUser.username}</td>
          <td>{singleUser.email}</td>
        </tr>
      </table>
    </div>
  );
};

export default Dropdown;
