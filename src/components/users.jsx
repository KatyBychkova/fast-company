import React, { useState } from "react";
import api from "../api";
//import User from "./User";

const Users = () => {
  const [userList, setUserList] = useState(api.users.fetchAll());
  console.log(userList);
  // const handleDelete = (userId) => {};

  // const renderPharse = (number) => {};
  //return <h1>Users</h1>;
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">" "</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => {
            console.log(user);
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((qualitie) => (
                    <span
                      className={"badge m-1 bg-" + qualitie.color}
                      key={qualitie._id}
                    >
                      {qualitie.name}
                    </span>
                  ))}
                </td>
                <td key={user.profession._id}>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                {/* <td><button className='btn btn-danger' onClick={() => deleteuser(user)}>delete</button></td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Users;
