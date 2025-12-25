import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import mockData from '../data/mockData.json';

export const DashboardScreen: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [stats, setStats] = useState({
    totalGroups: 0,
    totalMembers: 0,
    pendingReminders: 0
  });

  useEffect(() => {
    setStats({
      totalGroups: mockData.dashboard.totalGroups,
      totalMembers: mockData.dashboard.totalMembers,
      pendingReminders: mockData.dashboard.monthlyPendingReminders
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your chit groups and reminders</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Groups Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Chit Groups</p>
                <p className="text-4xl font-bold text-blue-600 mt-2">{stats.totalGroups}</p>
              </div>
              <div className="text-blue-500 text-4xl">📊</div>
            </div>
          </div>

          {/* Total Members Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Members</p>
                <p className="text-4xl font-bold text-green-600 mt-2">{stats.totalMembers}</p>
              </div>
              <div className="text-green-500 text-4xl">👥</div>
            </div>
          </div>

          {/* Pending Reminders Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">This Month Pending</p>
                <p className="text-4xl font-bold text-orange-600 mt-2">{stats.pendingReminders}</p>
              </div>
              <div className="text-orange-500 text-4xl">⏰</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => navigateTo('groups')}
            className="bg-white rounded-lg shadow p-8 text-left hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">Manage Groups</h2>
            <p className="text-gray-600">View and manage all chit groups</p>
            <div className="mt-4 text-blue-500 text-lg">→</div>
          </button>

          <button
            onClick={() => navigateTo('sendReminder')}
            className="bg-blue-50 rounded-lg shadow p-8 text-left hover:shadow-lg hover:bg-blue-100 transition border-2 border-blue-300"
          >
            <h2 className="text-xl font-bold text-blue-900 mb-2">🔔 Send Reminder</h2>
            <p className="text-blue-700">Send reminders to members</p>
            <div className="mt-4 text-blue-600 text-lg font-bold">Quick Action →</div>
          </button>
        </div>
      </div>
    </div>
  );
};
