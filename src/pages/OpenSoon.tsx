import React from "react";

const OpeningSoon: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
                <img src="/logo_2.png" alt="Ceyplanta Logo" className="mx-auto mb-4 w-48" />
                <h1 className="text-2xl font-bold">We Are Opening Soon!</h1>
                <p className="text-lg mt-2">Our fresh and organic microgreens are coming your way. Stay tuned for updates!</p>
                <div className="mt-4">
                    <p className="font-semibold">Contact us:</p>
                    <p>Email: <a href="mailto:info@ceyplanta.com" className="text-blue-500 hover:underline">info@ceyplanta.com</a></p>
                    <p>Phone: <a href="tel:+947XXXXXXXX" className="text-blue-500 hover:underline">+94 7X XXX XXXX</a></p>
                </div>
            </div>
        </div>
    );
};

export default OpeningSoon;
