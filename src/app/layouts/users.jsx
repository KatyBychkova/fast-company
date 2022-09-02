import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";

const UserLayout = () => {
    const params = useParams();
    const { userId } = params;

    return <>{userId ? <UserPage id={userId} /> : <UsersListPage />}</>;
};

export default UserLayout;
