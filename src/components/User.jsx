import React from "react";

const User = ({ name, qualities, profession, completedMeetings }) => {
  return (
    <tr>
      <th>{name} </th>
      <td>{qualities}</td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      {/* //<td>{rate}</td> */}
      {/* {"  "} */}
    </tr>
  );
};

export default User;
