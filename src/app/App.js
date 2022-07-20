import React, { useState } from "react";
import Users from "./components/users";
//import SearchStatus from "./components/searchStatus";
import api from "./api";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll()); //users - массив объектов из fakeApi
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  return <Users users={users} onDelete={handleDelete} />;
}

//   const handleToggleBookmark = (id) => {};

export default App;
