import React, { useState } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import User from "./user";

const Users = ({ users, ...rest }) => {
  const count = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageIndex) => {
    //console.log({ pageIndex });
    setCurrentPage(pageIndex);
  };

  // const paginate = (items, pageNumber, pageSize) => {
  //   const startIndex = (pageNumber - 1) * pageSize;
  //   return [...items].splice(startIndex, pageSize);
  // };

  const userCrop = paginate(users, currentPage, pageSize);
  //console.log({ userCrop });

  return (
    <>
      {count > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {userCrop.map((user) => {
              return <User key={user._id} {...user} {...rest} />;
            })}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Users;
