import React from "react";
import { useNavigate } from "react-router-dom";

const ContactUsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg px-8 py-12 sm:px-12 sm:py-16 mt-16">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
            Get in Touch
            <span className="block w-16 h-2 bg-blue-500 mt-4 mx-auto rounded-full"></span>
          </h1>

          <div className="space-y-8">
            <div className="text-center">
              <p className="text-lg text-gray-600 mb-6">
                Have questions or need assistance? We're here to help!
              </p>
              <div className="flex items-center justify-center space-x-2">
                <i className="fas fa-envelope text-blue-500 text-xl"></i>
                <a
                  href="mailto:saikata62@gmail.com"
                  className="text-xl text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                >
                  saikata62@gmail.com
                </a>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-center text-xl font-semibold text-gray-900 mb-6">
                Connect with Us
              </h3>
              <div className="flex justify-center space-x-8">
                <a
                  href="https://www.facebook.com/saikat.adhikary.9022/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-[#1877F2] hover:scale-125 transition-transform duration-200"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  href="https://twitter.com/SaikatAdhikary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-[#1DA1F2] hover:scale-125 transition-transform duration-200"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/saikat-adhikary-9022/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-[#0A66C2] hover:scale-125 transition-transform duration-200"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;