import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [userList, setUserList] = useState(api.users.fetchAll());
  const [counter, setCounter] = useState(userList.length);

  console.log(userList);
  console.log(counter);

  const handleDelete = (userId) => {
    setUserList((prevState) => prevState.filter((user) => user._id !== userId));
    handleDecrement();
  };

  const handleDecrement = () => {
    setCounter((prevState) => prevState - 1);
  };

  const renderPharse = (number) => {
    let message = "";
    message =
      number > 4 || number === 1
        ? counter + " человек тусанут с тобой сегодня"
        : number === 0
        ? "никто не тусанет с тобой сегодня"
        : counter + " человека тусанут с тобой сегодня";

    return message;
  };

  const getMessageClasses = () => {
    let classes = "badge fs-5 m-2 bg-";
    classes += counter === 0 ? "danger" : "primary";
    return classes;
  };

  const tableTheadCreate = () => {
    return (
      counter !== 0 && (
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился, раз</th>
          <th scope="col">Оценка</th>
          <th scope="col"></th>
        </tr>
      )
    );
  };

  const tableBobyCreate = () => {
    return (
      counter !== 0 &&
      userList.map((user) => {
        return (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>
              {user.qualities.map((quality) => (
                <span
                  key={quality._id}
                  className={"m-2 badge bg-" + quality.color}
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
                key={user._id}
                className="btn btn-danger"
                onClick={() => handleDelete(user._id)}
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
      <span className={getMessageClasses()}>{renderPharse(counter)}</span>
      <table className="table">
        <thead>{tableTheadCreate()}</thead>
        <tbody>{tableBobyCreate()}</tbody>
      </table>
    </>
  );
};

export default Users;
