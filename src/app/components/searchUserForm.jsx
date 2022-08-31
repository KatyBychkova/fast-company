import React from "react";
import PropTypes from "prop-types";

const SearchUserForm = ({ name, value, onChange }) => {
    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search..."
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

SearchUserForm.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default SearchUserForm;
