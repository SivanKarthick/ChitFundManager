import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import mockData from '../data/mockData.json';

interface Group {
  id: string;
  name: string;
  dueDate: number;
  place: string;
  messageTemplate: string;
}

export const ReminderSetupScreen: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [groups, setGroups] = useState<Group[]>(mockData.groups as Group[]);
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Group | null>(null);

  const handleEditClick = (group: Group) => {
    setEditingGroupId(group.id);
    setEditFormData({ ...group });
  };

  const handleSave = () => {
    if (editFormData) {
      setGroups(groups.map(g => g.id === editFormData.id ? editFormData : g));
      setEditingGroupId(null);
    }
  };

  const handleCancel = () => {
    setEditingGroupId(null);
    setEditFormData(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        [name]: name === 'dueDate' ? parseInt(value) : value
      });
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Monthly Reminder Setup</h1>
          <p className="text-gray-600 mt-1">Configure reminder settings for each group</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {groups.map((group) => (
            <div key={group.id} className="bg-white rounded-lg shadow p-6">
              {editingGroupId === group.id && editFormData ? (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Edit: {group.name}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Monthly Due Date</label>
                      <input
                        type="number"
                        name="dueDate"
                        value={editFormData.dueDate}
                        onChange={handleChange}
                        min="1"
                        max="31"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Meeting Place</label>
                      <input
                        type="text"
                        name="place"
                        value={editFormData.place}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Default Message Template</label>
                    <textarea
                      name="messageTemplate"
                      value={editFormData.messageTemplate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="Use {{name}}, {{group}}, {{date}}, {{place}} as placeholders"
                    />
                    <p className="text-gray-600 text-sm mt-2">Available placeholders: {'{'}name{'}'}, {'{'}group{'}'}, {'{'}date{'}'}, {'{'}place{'}'}</p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-2 px-4 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{group.name}</h2>
                    <button
                      onClick={() => handleEditClick(group)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Monthly Due Date</p>
                      <p className="text-lg font-semibold text-gray-900 mt-1">{group.dueDate}th of month</p>
                    </div>

                    <div>
                      <p className="text-gray-600 text-sm font-medium">Meeting Place</p>
                      <p className="text-lg font-semibold text-gray-900 mt-1">{group.place}</p>
                    </div>

                    <div>
                      <p className="text-gray-600 text-sm font-medium">Chit Amount</p>
                      <p className="text-lg font-semibold text-gray-900 mt-1">₹{(group as any).amount.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <p className="text-gray-600 text-sm font-medium mb-2">Message Template</p>
                    <div className="bg-gray-100 p-3 rounded text-gray-800 text-sm">{group.messageTemplate}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
