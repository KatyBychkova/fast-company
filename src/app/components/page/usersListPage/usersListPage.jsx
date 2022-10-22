import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import UserTable from "../../ui/usersTable";
import GroupList from "../../common/groupList";
import api from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import _ from "lodash";
import { useUser } from "../../../hooks/useUsers";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" }); // устанавливаем по какому признаку сортируем и тип сортировки
    const [searchQuery, setSearchQuery] = useState(""); // хранение значений из строки поиска
    const pageSize = 8;

    const { users } = useUser(); // users - массив объектов из useUser
    console.log(users);

    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
        console.log(userId);
    };
    const handleToggleBookmark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        // setUsers( console.log(userId););
        console.log(console.log(newArray));
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]); // каждый раз, когда selectedProf будет меняться меняем значение currentPage = 1

    const handleProfessionSelect = (item) => {
        if (searchQuery !== "") setSearchQuery(""); // очищаем строку поиска, если выбрана фильтрация по профессиям
        setSelectedProf(item);
    };

    // изменяет значения  строке поиска
    const handleSearchQuery = ({ target }) => {
        // setSelectedProf(undefined);
        setSearchQuery(target.value);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        // приводим user.profession, selectedProf к одному типу тк объект ссылочный тип данных и они не равны друг другу
        // filteredUsers  - юзеры отфильтрованные по профессии, либо через search, либо все юзеры если фильтра нет

        const filteredUsers = searchQuery
            ? users.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
              )
            : selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
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
                        <input
                            type="text"
                            name="searchQuery"
                            placeholder="Search..."
                            onChange={handleSearchQuery}
                            value={searchQuery}
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

UsersListPage.propTypes = {
    users: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default UsersListPage;
