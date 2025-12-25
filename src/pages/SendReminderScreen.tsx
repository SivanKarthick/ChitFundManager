import React, { useState } from 'react';
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
  groupId: string;
}

export const SendReminderScreen: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [groups] = useState<Group[]>(mockData.groups as Group[]);
  const [members] = useState<Member[]>(mockData.members as Member[]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [sendingReminders, setSendingReminders] = useState(false);
  const [sentStatus, setSentStatus] = useState<{ [key: string]: boolean }>({});
  const groupMembers = selectedGroupId ? members.filter(m => m.groupId === selectedGroupId) : [];

  const handleSendReminders = async () => {
    if (!selectedGroupId) {
      alert('Please select a group');
      return;
    }

    setSendingReminders(true);
    
    // Simulate sending reminders
    const newStatus: { [key: string]: boolean } = {};
    for (const member of groupMembers) {
      await new Promise(resolve => setTimeout(resolve, 500));
      newStatus[member.id] = true;
    }
    
    setSentStatus(newStatus);
    setSendingReminders(false);
  };

  const allRemindersSent = groupMembers.length > 0 && groupMembers.every(m => sentStatus[m.id]);

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
          <h1 className="text-3xl font-bold text-gray-900">Send Reminders</h1>
          <p className="text-gray-600 mt-1">Send SMS reminders to group members</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-8 max-w-2xl mx-auto">
          {/* Group Selection */}
          <div className="mb-8">
            <label className="block text-gray-700 font-bold mb-2 text-lg">Select Group</label>
            <select
              value={selectedGroupId}
              onChange={(e) => {
                setSelectedGroupId(e.target.value);
                setSentStatus({});
              }}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            >
              <option value="">Choose a group...</option>
              {groups.map(group => (
                <option key={group.id} value={group.id}>{group.name}</option>
              ))}
            </select>
          </div>

          {/* Members List */}
          {selectedGroupId && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Members to be notified ({groupMembers.length})</h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 max-h-64 overflow-y-auto">
                {groupMembers.map(member => (
                  <div
                    key={member.id}
                    className={`flex items-center justify-between p-3 rounded border ${
                      sentStatus[member.id]
                        ? 'bg-green-50 border-green-300'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">Primary: {member.primary}</p>
                    </div>
                    {sentStatus[member.id] ? (
                      <div className="text-green-600 font-bold text-lg">✓ Sent</div>
                    ) : (
                      <div className="text-gray-500 text-lg">⏳</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Action Button */}
          <div className="mb-8">
            <button
              onClick={handleSendReminders}
              disabled={!selectedGroupId || sendingReminders || allRemindersSent}
              className={`w-full py-4 px-6 rounded-lg font-bold text-white text-lg transition ${
                !selectedGroupId || sendingReminders || allRemindersSent
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {sendingReminders ? (
                'Sending Reminders... ⏳'
              ) : allRemindersSent ? (
                'All Reminders Sent ✓'
              ) : (
                '🔔 Send Reminder To All Members'
              )}
            </button>
          </div>

          {/* Info Box */}
          {selectedGroupId && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-blue-900 font-medium mb-2">Reminder Strategy:</p>
              <ul className="text-blue-800 text-sm space-y-1 ml-4">
                <li>✓ SMS sent to Primary number first</li>
                <li>✓ If delivery fails → SMS sent to Alternate number</li>
                <li>✓ Member marked as notified when message is delivered</li>
              </ul>
            </div>
          )}

          {allRemindersSent && (
            <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="text-green-900 font-bold">All reminders sent successfully!</p>
              <p className="text-green-800 text-sm mt-2">{groupMembers.length} members have been notified</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
