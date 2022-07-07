import React, { useState } from "react";
import axios from "axios";

const FirebaseData = () => {
  const [newRegistration, setnewRegistration] = useState({
    fullname: "",
    email: "",
    phone: "",
    passwd: "",
  });

  const [records, setRecords] = useState([]);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    setnewRegistration({ ...newRegistration, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const StoreId = { ...newRegistration, id: new Date().getTime().toString() };
    setRecords([...records, StoreId]);
    console.log(records, "before");
    // postDataToServer(records);
    postDataOnFirebase(records);
    setnewRegistration({ fullname: "", email: "", phone: "", passwd: "" });
  };

  // const postDataToServer = (data) => {
  //   axios.post("https://jsonplaceholder.typicode.com/posts", data).then(
  //     (response) => {
  //       // setUser(response.data);
  //       console.log(response);
  //       console.log("sucess");
  //     },
  //     (error) => {
  //       console.log(error);
  //       console.log("error");
  //     }
  //   );
  // };
  // https://expressdatabase-f110a-default-rtdb.firebaseio.com/

  // const postDataOnFirebase = async (data) => {
  //   await axios
  //     .post(
  //       "https://expressdatabase-f110a-default-rtdb.firebaseio.com/formdata.json",
  //       data
  //     )
  //     .then(
  //       (response) => {
  //         // setUser(response.data);
  //         console.log(response);
  //         console.log("sucess firebase");
  //       },
  //       (error) => {
  //         console.log(error);
  //         console.log("error firebase");
  //       }
  //     );
  // };
  const postDataOnFirebase = async (data) => {
    const { fullname, email, phone, passwd } = data;
    const res = await fetch(
      "https://expressdatabase-f110a-default-rtdb.firebaseio.com/formdata.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          phone,
          passwd,
        }),
      }
    );
  };

  return (
    <div className="flex justify-center items-center bg-blue-700 h-screen text-white text-lg fontse">
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="fname">Full Name</label>
        <input
          type="text"
          onChange={handleInput}
          // autoComplete="off"
          value={newRegistration.fullname}
          name="fullname"
          id="fullname"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          // autoComplete="off"
          value={newRegistration.email}
          onChange={handleInput}
          name="email"
          id="email"
        />

        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          value={newRegistration.phone}
          onChange={handleInput}
          name="phone"
          id="phone"
        />

        <label htmlFor="password">Password</label>
        <input
          type="text"
          value={newRegistration.passwd}
          onChange={handleInput}
          name="passwd"
          id="passwd"
        />
        <button type="submit" onClick={postDataOnFirebase}>
          Submit
        </button>
      </form>

      <div>
        {records.map((curElement) => {
          const { id, fullname, email, phone, passwd } = curElement;
          return (
            <div key={id}>
              <p>{fullname}</p>
              <p>{email}</p>
              <p>{phone}</p>
              <p>{passwd}</p>
              {/* <p>{curElement.fullname}</p>
              <p>{curElement.email}</p>
              <p>{curElement.phone}</p>
              <p>{curElement.passwd}</p> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FirebaseData;
