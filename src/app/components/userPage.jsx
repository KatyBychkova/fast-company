import React, { useState, useEffect } from "react";
import api from "../api";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();
    useEffect(() => {
        api.users.getById(userId).then((user) => setUser(user));
    }, []);
    const handleShowUsers = () => {
        history.replace("/users");
    };

    console.log("useEffect user", user);
    // console.log("id user", userId);
    if (user) {
        // <h2>KOT</h2>
        return (
            <>
                <h1>{user.name}</h1>
                <h2 key={user.profession._id}>
                    Профессия: {user.profession.name}
                </h2>
                <h6>
                    {user.qualities.map((qualitie) => (
                        <span
                            className={"badge m-1 bg-" + qualitie.color}
                            key={qualitie._id}
                        >
                            {qualitie.name}
                        </span>
                    ))}
                </h6>

                <h6 className="mb-3">
                    сompletedMeetings: {user.completedMeetings}
                </h6>
                <h1>Rate: {user.rate}</h1>
                <button
                    onClick={() => {
                        handleShowUsers();
                    }}
                    className="btn btn-outline-secondary"
                >
                    Все пользователи
                </button>
            </>
        );
    } else {
        return <h2>Loading</h2>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
