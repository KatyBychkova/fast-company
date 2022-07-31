// import users from "./fake.api/user.api";
// import professions from "./fake.api/professions.api";
// const API = {
//     users,
//     professions
// };
// export default API;

import users from "./fake.api/user.api"; // импортируем ф-ю fetchAll, которая уже возвращает нам массив юзеров с задержкой
import professions from "./fake.api/professions.api"; // импортируем ф-ю fetchAll, которая уже возвращает нам массив профессий с задержкой
const API = {
    users, // fetchAll()
    professions // fetchAll()
};

// console.log("professions api", professions, users);
export default API;
