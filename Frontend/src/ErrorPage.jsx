import React from "react";
import { useRouteError } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
            <h1 className="text-4xl font-bold mb-4">Oops!</h1>
            <p className="text-xl mb-4">Sorry, an unexpected error has occurred.</p>
            <p className="mb-4 italic text-red-500">
                <i>{error}</i>
            </p>
            <p className="text-lg">
                <FontAwesomeIcon icon={faHouse} className="mr-2" />
                <a href="/" className="text-blue-500 hover:underline">Home</a>
            </p>
        </div>
    );
};

export default ErrorPage;

