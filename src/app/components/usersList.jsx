import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import UserTable from "./usersTable";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import _ from "lodash";
import SearchUserForm from "./searchUserForm";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" }); // устанавливаем по какому признаку сортируем и тип сортировки
    const [searchValue, setSearchValue] = useState(""); // хранение значений из строки поиска
    const [users, setUsers] = useState(); // users - массив объектов из fakeApi
    const pageSize = 8;

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    // console.log("users useEffect", users);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookmark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });

        setUsers(newArray);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]); // каждый раз, когда selectedProf будет меняться меняем значение currentPage = 1

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    // изменяет значения  строке поиска
    const handleSearchValue = (e) => {
        console.log(e.target.value);
        setSearchValue(e.target.value);
    };

    // выводит найденные значения на странице
    // что сортируем -
    // по какому признаку сортируем
    // отсортированные значения

    if (users) {
        // приводим user.profession, selectedProf к одному типу тк объект ссылочный тип данных и они не равны друг другу
        // filteredUsers  - юзеры отфильтрованные по профессии, либо через search, либо все юзеры если фильтра нет

        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : searchValue
            ? users.filter((user) =>
                  user.name.toLowerCase().includes(searchValue.toLowerCase())
              )
            : users;

        /* Сортировка */
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const userCrop = paginate(sortedUsers, currentPage, pageSize); // userCrop - часть списка юзеров,  отражаемая на выбранной странице при пагинации
        const clearFilter = () => setSelectedProf(); // метод сброса фильтра устанавливает selectedProf-undefined, тк ничего не предаем в setSelectedProf()

        return (
            <>
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
                        <SearchUserForm
                            name="Search"
                            value={searchValue}
                            onChange={handleSearchValue}
                        />
                        {count > 0 && (
                            <UserTable
                                users={userCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                onDelete={handleDelete}
                                onToggleBookmark={handleToggleBookmark}
                            />
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
            </>
        );
    }
    return "loading...";
};

UsersList.propTypes = {
    users: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default UsersList;
