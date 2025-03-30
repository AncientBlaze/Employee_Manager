import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';

function SettingsPage() {
    return (
        <div className="min-h-screen flex bg-gray-900 text-white flex-row">
            <Sidebar />
            <main className="flex-1 p-6 ml-64">
                <h1 className="text-3xl font-bold mb-6">Settings</h1>
                <p className="text-lg">This is the Settings page.</p>
            </main>
        </div>
    );
}

export default SettingsPage;