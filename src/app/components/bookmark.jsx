import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, ...rest }) => {
    return (
        <button {...rest}>
            <i className={"bi bi-bookmark-heart" + (status ? "-fill" : "")}></i>
        </button>
    );
};

Bookmark.propTypes = {
    status: PropTypes.string.isRequired
};
export default Bookmark;
