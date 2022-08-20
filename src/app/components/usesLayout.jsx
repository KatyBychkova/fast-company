import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "./userPage";
import Users from "./users";

const UserLayout = () => {
    const params = useParams();
    const { userId } = params;
    console.log(userId);

    return <>{userId ? <UserPage userId={userId} /> : <Users />}</>;
};

export default UserLayout;
