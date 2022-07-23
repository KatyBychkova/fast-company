import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";

const User = (props) => {
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
        {qualities.map((quality) => {
          return (
            <Quality
              key={quality._id}
              {...quality}
              // color={quality.color}
              // name={quality.name}
              // _id={quality._id}
            />
          );
        })}
      </td>
      <td key={profession._id}>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td className="text-center">
        <button key={_id} onClick={() => props.onBookmarkUser(_id)}>
          <Bookmark status={bookmark} />
        </button>
      </td>
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
