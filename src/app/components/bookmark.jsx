import React from "react";

const Bookmark = ({ status, ...rest }) => {
  console.log("status", status);
  if (status) {
    return <i className="bi bi-bookmark-heart-fill"></i>;
  } else if (!status) {
    return <i className="bi bi-bookmark-heart"></i>;
  }
};
export default Bookmark;
