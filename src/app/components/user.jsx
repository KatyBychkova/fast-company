import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
    bookmark,
    onToggleBookmark,
}) => {
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
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate} /5</td>
            <td className="text-center">
                <Bookmark
                    status={bookmark}
                    onClick={() => onToggleBookmark(_id)}
                />
            </td>
            <td>
                <button
                    onClick={() => onDelete(_id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

export default User;
