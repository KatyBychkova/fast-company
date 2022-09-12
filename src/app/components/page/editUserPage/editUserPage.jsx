import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import api from "../../../api";

const EditUserPage = ({ id }) => {
    const [user, setUser] = useState({});
    const [qualities, setQualities] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    // console.log("useEffect user on EditUserPAge", user);
    // console.log(user.qualities);

    const handleChange = (current) => {
        // console.log("current", current);
        // console.log("ИЗМЕНЕНО");
        // setData((prevState) => ({
        //     ...prevState,
        //     [current.name]: current.value
        // }));
        setUser((prevState) => ({
            ...prevState,
            [current.name]: current.value
        }));
        // setData(user);
    };

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isName: {
                message: "Имя некорректно"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [user]);

    const validate = () => {
        const errors = validator(user, validatorConfig);
        setErrors(errors); // передает ошибки в [errors]
        return Object.keys(errors).length === 0; // возвращает true если ошибок валидации нет
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        setUser(api.users.update(id, user));
        console.log("Отправлено!");
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4 shadow">
                    <h3 className="mb-4">Редактирование данных</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <SelectField
                            label="Выбери свою профессию"
                            defaultOption="Choose..."
                            name="profession"
                            options={professions}
                            value={professions.value}
                            onChange={handleChange}
                            // error={errors.profession}
                        />
                        <RadioField
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" }
                            ]}
                            value={user.sex}
                            name="sex"
                            onChange={handleChange}
                            label="Ваш пол"
                        />
                        <MultiSelectField
                            options={qualities}
                            onChange={handleChange}
                            defaultValue={user.qualities}
                            name="qualities"
                            label="Выберите ваши качества"
                        />

                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Обновить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

EditUserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default EditUserPage;
