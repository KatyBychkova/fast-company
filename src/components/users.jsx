import React from "react";
import api from "../api";

// const Users = () => {
//   console.log(api.users.fetchAll());

//   return <h1>Users</h1>;
// };
const Users = () => {
  const [userList, setUserList] = useState(api.users.fetchAll());

// const handleDelete = (userId) => {};

// const renderPharse = (number) => {};

  //return <h1>userList</h1>;
  // return (
  //   <>
  //     <table className="table">
  //       <thead>
  //         <tr>
  //           <th scope="col">Имя</th>
  //           <th scope="col">Качества</th>
  //           <th scope="col">Профессия</th>
  //           <th scope="col">Встретился, раз</th>
  //           <th scope="col">Оценка</th>
  //           <th scope="col">" "</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {userList.map((item) => {
  //           return (
  //             <>
  //               <tr key={item.user._id}>
  //                 <th scope="row">{item.user.name}</th>
  //                 <td>{item.user.qualities}</td>
  //                 <td>{item.user.profession}</td>
  //                 <td>{item.user.completedMeetings}</td>
  //                 <td>{item.user.rate}</td>
  //               </tr>
  //             </>
  //           );
  //         })}
  //       </tbody>
  //     </table>
  //   </>
  // );
};

export default ListOfUsers;
// export default Users;
