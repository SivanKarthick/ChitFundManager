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
  const [selectionMode, setSelectionMode] = useState<'all' | 'single' | 'multi'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());

  const groupMembers = selectedGroupId ? members.filter(m => m.groupId === selectedGroupId) : [];
  
  const filteredMembers = groupMembers.filter(member => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(query) ||
      member.primary.toLowerCase().includes(query) ||
      (member.alternate && member.alternate.toLowerCase().includes(query))
    );
  });

  const membersToNotify = selectionMode === 'all' 
    ? groupMembers 
    : Array.from(selectedMembers).map(id => groupMembers.find(m => m.id === id)!).filter(Boolean);

  const handleMemberToggle = (memberId: string) => {
    const newSelected = new Set(selectedMembers);
    if (newSelected.has(memberId)) {
      newSelected.delete(memberId);
    } else {
      newSelected.add(memberId);
    }
    setSelectedMembers(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedMembers.size === filteredMembers.length) {
      setSelectedMembers(new Set());
    } else {
      setSelectedMembers(new Set(filteredMembers.map(m => m.id)));
    }
  };

  const handleSendReminders = async () => {
    if (!selectedGroupId) {
      alert('Please select a group');
      return;
    }

    if (membersToNotify.length === 0) {
      alert('Please select at least one member to send reminders');
      return;
    }

    setSendingReminders(true);
    
    // Simulate sending reminders
    const newStatus: { [key: string]: boolean } = {};
    for (const member of membersToNotify) {
      await new Promise(resolve => setTimeout(resolve, 500));
      newStatus[member.id] = true;
    }
    
    setSentStatus(newStatus);
    setSendingReminders(false);
  };

  const allRemindersSent = membersToNotify.length > 0 && membersToNotify.every(m => sentStatus[m.id]);

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
        <div className="bg-white rounded-lg shadow p-8 max-w-4xl mx-auto">
          {/* Group Selection */}
          <div className="mb-8">
            <label className="block text-gray-700 font-bold mb-2 text-lg">Select Group</label>
            <select
              value={selectedGroupId}
              onChange={(e) => {
                setSelectedGroupId(e.target.value);
                setSentStatus({});
                setSelectedMembers(new Set());
                setSearchQuery('');
              }}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            >
              <option value="">Choose a group...</option>
              {groups.map(group => (
                <option key={group.id} value={group.id}>{group.name}</option>
              ))}
            </select>
          </div>

          {/* Selection Mode */}
          {selectedGroupId && (
            <div className="mb-8">
              <label className="block text-gray-700 font-bold mb-3 text-lg">Selection Mode</label>
              <div className="flex gap-4 flex-wrap">
                {(['all', 'single', 'multi'] as const).map(mode => (
                  <label key={mode} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="selectionMode"
                      value={mode}
                      checked={selectionMode === mode}
                      onChange={(e) => {
                        setSelectionMode(e.target.value as 'all' | 'single' | 'multi');
                        setSelectedMembers(new Set());
                        setSentStatus({});
                      }}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700 font-medium capitalize">
                      {mode === 'all' ? 'Send to All Members' : mode === 'single' ? 'Select Single Member' : 'Select Multiple Members'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Search Bar */}
          {selectedGroupId && (selectionMode === 'single' || selectionMode === 'multi') && (
            <div className="mb-8">
              <label className="block text-gray-700 font-bold mb-2 text-lg">Search Members</label>
              <input
                type="text"
                placeholder="Search by member name or mobile number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
              {searchQuery && (
                <p className="mt-2 text-sm text-gray-600">
                  Found {filteredMembers.length} of {groupMembers.length} members
                </p>
              )}
            </div>
          )}

          {/* Members List */}
          {selectedGroupId && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectionMode === 'all' 
                    ? `All Members (${groupMembers.length})` 
                    : `Select Members (${selectedMembers.size} selected)`}
                </h2>
                {(selectionMode === 'single' || selectionMode === 'multi') && (
                  <button
                    onClick={handleSelectAll}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    {selectedMembers.size === filteredMembers.length && filteredMembers.length > 0 ? 'Deselect All' : 'Select All'}
                  </button>
                )}
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 max-h-64 overflow-y-auto border border-gray-200">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map(member => (
                    <div
                      key={member.id}
                      onClick={() => {
                        if (selectionMode !== 'all') {
                          if (selectionMode === 'single') {
                            setSelectedMembers(new Set([member.id]));
                          } else {
                            handleMemberToggle(member.id);
                          }
                        }
                      }}
                      className={`flex items-center justify-between p-3 rounded border cursor-pointer transition ${
                        sentStatus[member.id]
                          ? 'bg-green-50 border-green-300'
                          : selectionMode === 'all' || selectedMembers.has(member.id)
                          ? 'bg-blue-50 border-blue-300'
                          : 'bg-white border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center flex-1">
                        {(selectionMode === 'single' || selectionMode === 'multi') && (
                          <input
                            type="checkbox"
                            checked={selectedMembers.has(member.id)}
                            onChange={() => {}}
                            onClick={(e) => e.stopPropagation()}
                            className="w-4 h-4 text-blue-600 mr-3"
                          />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-600">
                            {member.primary}
                            {member.alternate && ` • ${member.alternate}`}
                          </p>
                        </div>
                      </div>
                      {sentStatus[member.id] ? (
                        <div className="text-green-600 font-bold text-lg">✓ Sent</div>
                      ) : (
                        selectionMode === 'all' && <div className="text-gray-500 text-lg">⏳</div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No members found matching your search</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main Action Button */}
          <div className="mb-8">
            <button
              onClick={handleSendReminders}
              disabled={!selectedGroupId || sendingReminders || allRemindersSent || membersToNotify.length === 0}
              className={`w-full py-4 px-6 rounded-lg font-bold text-white text-lg transition ${
                !selectedGroupId || sendingReminders || allRemindersSent || membersToNotify.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {sendingReminders ? (
                'Sending Reminders... ⏳'
              ) : allRemindersSent ? (
                'All Reminders Sent ✓'
              ) : (
                `🔔 Send Reminder to ${membersToNotify.length > 0 ? membersToNotify.length : 'Selected'} Member${membersToNotify.length !== 1 ? 's' : ''}`
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
                <li>✓ Use search to quickly find members by name or phone number</li>
              </ul>
            </div>
          )}

          {allRemindersSent && (
            <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="text-green-900 font-bold">All reminders sent successfully!</p>
              <p className="text-green-800 text-sm mt-2">{membersToNotify.length} member{membersToNotify.length !== 1 ? 's have' : ' has'} been notified</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
