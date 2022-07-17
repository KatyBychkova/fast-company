import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1));
    if (number > 4 && number < 15) return " человек тусанут";
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
    if (lastOne === 1) return "человек тусанет";
    return "человек тусанет";
  };

  const tableTheadCreate = () => {
    return (
      users.length > 0 && (
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился, раз</th>
          <th scope="col">Оценка</th>
          <th />
        </tr>
      )
    );
  };

  const tableBobyCreate = () => {
    return (
      users.length > 0 &&
      users.map((user) => {
        return (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>
              {user.qualities.map((quality) => (
                <span
                  className={"badge m-2 bg-" + quality.color}
                  key={quality._id}
                >
                  {quality.name}
                </span>
              ))}
            </td>
            <td key={user.profession._id}>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td>
              <button
                onClick={() => handleDelete(user._id)}
                className="btn btn-danger"
                key={user._id}
              >
                delete
              </button>
            </td>
          </tr>
        );
      })
    );
  };

  return (
    <>
      <h2>
        <span
          className={"badge " + (users.length > 0 ? "bg-primary" : "bg-danger")}
        >
          {users.length > 0
            ? `${
                users.length + " " + renderPhrase(users.length)
              } с тобой сегодня`
            : "Никто с тобой не тусанет"}
        </span>
      </h2>
      <table className="table">
        <thead>{tableTheadCreate()}</thead>
        <tbody>{tableBobyCreate()}</tbody>
      </table>
    </>
  );
};

export default Users;
