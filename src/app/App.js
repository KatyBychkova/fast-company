import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll()); //users - массив объектов из fakeApi
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookmark = (id) => {
    const index = users.findIndex((user) => user._id === id);
    const newArray = [...users];
    newArray[index].bookmark = newArray[index].bookmark ? false : true;
    setUsers(newArray);
  };

  return (
    <>
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onDelete={handleDelete}
        onBookmark={handleToggleBookmark}
      />
    </>
  );
}

export default App;
