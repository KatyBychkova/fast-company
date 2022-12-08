import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";

import { toast } from "react-toastify";
import qualityService from "../services/quality.service";

const QualityContext = React.createContext();

export const useQualities = () => {
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // console.log("QualityProvider", qualities);

    useEffect(() => {
        const getQualitiesList = async () => {
            try {
                const { content } = await qualityService.get();
                setQualities(content);
                setLoading(false);
            } catch (error) {
                errorCatcher(error);
            }
        };
        getQualitiesList();
    }, []);

    function getQuality(id) {
        // console.log("getQuality(id)", id);
        return qualities.find((q) => q._id === id);
    }

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <QualityContext.Provider value={{ isLoading, qualities, getQuality }}>
            {children}
        </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
