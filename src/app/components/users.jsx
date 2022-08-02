import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import User from "./user";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";

// деструктуризируем users как allUsers
const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 4;
    // console.log("allUsers", allUsers);

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    // console.log("professions", professions);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]); // каждый раз, когда selectedProf будет меняться меняем значение currentPage = 1

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    // приводим user.profession, selectedProf к одному типу тк объект ссылочный тип данных и они не равны друг другу
    const filteredUsers = selectedProf
        ? allUsers.filter(
              (user) =>
                  JSON.stringify(user.profession) ===
                  JSON.stringify(selectedProf)
          )
        : allUsers;

    const count = filteredUsers.length;

    const userCrop = paginate(filteredUsers, currentPage, pageSize); // userCrop - часть спсика юзеров,  отражаемая на выбранной странице при пагинации
    // console.log({ userCrop });

    const clearFilter = () => setSelectedProf(); // метод сброса фильтра устанавливает selectedProf-undefined, тк ничего не предаем в setSelectedProf()

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2" // создали кнопку Очистить
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                {count > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {userCrop.map((user) => {
                                return (
                                    <User key={user._id} {...user} {...rest} />
                                );
                            })}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default Users;
