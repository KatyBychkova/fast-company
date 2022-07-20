import React from "react";
// import Quality from "./quality";
// import Bookmark from "./bookmark";

const User = (props) => {
  //console.log("props User", props);
  const {
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmark
  } = props;
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((quality) => (
          <span className={"badge m-2 bg-" + quality.color} key={quality._id}>
            {quality.name}
          </span>
        ))}
      </td>
      <td key={profession._id}>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td>{bookmark}</td>
      <td>
        <button
          onClick={() => props.onDeleteUser(_id)}
          className="btn btn-danger"
          key={_id}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
