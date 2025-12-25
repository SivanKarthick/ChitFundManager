import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import mockData from '../data/mockData.json';

interface Group {
  id: string;
  name: string;
}

interface Member {
  id: string;
  name: string;
  primary: string;
  alternate: string | null;
  joiningDate: string;
  notes: string;
}

export const AddEditMemberScreen: React.FC = () => {
  const { navigateTo, selectedGroupId, selectedMemberId, params } = useNavigation();
  const [groups] = useState<Group[]>(mockData.groups as Group[]);
  const [selectedGroup, setSelectedGroup] = useState<string>(selectedGroupId || params?.groupId || '');
  const [formData, setFormData] = useState<Member>({
    id: selectedMemberId || '',
    name: '',
    primary: '',
    alternate: null,
    joiningDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  useEffect(() => {
    if (selectedMemberId && params?.groupId) {
      // Load member data if editing
      const member = mockData.members.find(m => m.id === selectedMemberId) as any;
      if (member) {
        setFormData(member);
        setSelectedGroup(member.groupId);
      }
    }
  }, [selectedMemberId, params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value || null
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to an API
    console.log('Submitting member:', formData);
    navigateTo('members', { groupId: selectedGroup });
  };

  const handleBack = () => {
    navigateTo('members', { groupId: selectedGroup });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={handleBack}
            className="text-blue-500 hover:text-blue-700 mb-3 text-sm"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {selectedMemberId ? 'Edit Member' : 'Add New Member'}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Group Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Group Name <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a group</option>
                {groups.map(group => (
                  <option key={group.id} value={group.id}>{group.name}</option>
                ))}
              </select>
            </div>

            {/* Member Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter member name"
                required
              />
            </div>

            {/* Primary Mobile */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Primary Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="primary"
                value={formData.primary}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter primary mobile number"
                required
              />
            </div>

            {/* Alternate Mobile */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Alternate Mobile Number <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="tel"
                name="alternate"
                value={formData.alternate || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter alternate mobile number"
              />
            </div>

            {/* Joining Date */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Joining Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Notes <span className="text-gray-500">(Optional)</span>
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add any notes about this member"
                rows={4}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                {selectedMemberId ? 'Update Member' : 'Add Member'}
              </button>
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-2 px-4 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
