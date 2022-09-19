import React, { useState, useEffect } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Qualities from "../../ui/qualities";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    const history = useHistory();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);

    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };

    // console.log("useEffect user on UsaePage", user);
    // console.log("id user", userId);
    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2 key={user.profession._id}>
                    Профессия: {user.profession.name}
                </h2>
                <Qualities qualities={user.qualities} />
                <h6 className="mb-3">
                    сompletedMeetings: {user.completedMeetings}
                </h6>
                <h1>Rate: {user.rate}</h1>
                <button
                    className="btn btn-outline-secondary"
                    onClick={handleClick}
                >
                    Изменить
                </button>
                {/* <Link
                    to={`/users/${id}/edit`}
                    // onClick={handleClick}
                    className="btn btn-outline-secondary"
                    id={id}
                >
                    Изменить
                </Link> */}
            </>
        );
    } else {
        return <h2>Loading</h2>;
    }
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
