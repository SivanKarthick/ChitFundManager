import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import mockData from '../data/mockData.json';

interface Group {
  id: string;
  name: string;
  amount: number;
  totalMembers: number;
}

export const GroupListScreen: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [groups] = useState<Group[]>(mockData.groups as Group[]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewGroup = (groupId: string) => {
    navigateTo('members', { groupId });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => navigateTo('dashboard')}
            className="text-blue-500 hover:text-blue-700 mb-3 text-sm"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Chit Groups</h1>
          <p className="text-gray-600 mt-1">Manage all your chit groups</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Groups Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Group Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Chit Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Total Members</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredGroups.map((group) => (
                  <tr key={group.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-gray-900 font-medium">{group.name}</td>
                    <td className="px-6 py-4 text-gray-700">{formatCurrency(group.amount)}</td>
                    <td className="px-6 py-4 text-gray-700">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {group.totalMembers}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewGroup(group.id)}
                        className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredGroups.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No groups found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
