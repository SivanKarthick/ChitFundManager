import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import mockData from '../data/mockData.json';

interface Member {
  id: string;
  groupId: string;
  name: string;
  primary: string;
  alternate: string | null;
  paymentsCompleted: number;
  lastPaymentDate: string;
  lastPaymentAmount: number;
  lastPaymentUPI: string;
  paymentHistory: Array<{
    date: string;
    amount: number;
  }>;
}

interface PaymentPopupState {
  isOpen: boolean;
  memberId?: string;
}

interface Group {
  id: string;
  name: string;
}

export const MemberListScreen: React.FC = () => {
  const { navigateTo, selectedGroupId, params } = useNavigation();
  const [members, setMembers] = useState<Member[]>([]);
  const [group, setGroup] = useState<Group | null>(null);
  const [paymentPopup, setPaymentPopup] = useState<PaymentPopupState>({ isOpen: false });
  const [selectedPaymentMember, setSelectedPaymentMember] = useState<Member | null>(null);

  useEffect(() => {
    const groupId = selectedGroupId || params?.groupId;
    if (groupId) {
      const foundGroup = mockData.groups.find(g => g.id === groupId);
      if (foundGroup) {
        setGroup(foundGroup as Group);
        const groupMembers = mockData.members.filter(m => m.groupId === groupId) as Member[];
        setMembers(groupMembers);
      }
    }
  }, [selectedGroupId, params]);

  const handleViewPayment = (member: Member) => {
    setSelectedPaymentMember(member);
    setPaymentPopup({ isOpen: true, memberId: member.id });
  };

  const handleEditMember = (memberId: string) => {
    navigateTo('editMember', { groupId: group?.id, memberId });
  };

  const maskPhoneNumber = (phone: string | null) => {
    if (!phone) return '—';
    return phone;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => navigateTo('groups')}
            className="text-blue-500 hover:text-blue-700 mb-3 text-sm"
          >
            ← Back to Groups
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{group?.name || 'Members'}</h1>
          <p className="text-gray-600 mt-1">Manage group members and payment history</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigateTo('addMember', { groupId: group?.id })}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            + Add Member
          </button>
        </div>

        {/* Members Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Primary No</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Alternate No</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Payments Done</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Last Payment</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-gray-900 font-medium">{member.name}</td>
                    <td className="px-6 py-4 text-gray-700">{maskPhoneNumber(member.primary)}</td>
                    <td className="px-6 py-4 text-gray-700">{maskPhoneNumber(member.alternate)}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewPayment(member)}
                        className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                      >
                        {member.paymentsCompleted} (view)
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewPayment(member)}
                        className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                      >
                        {new Date(member.lastPaymentDate).toLocaleDateString()}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEditMember(member.id)}
                        className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {members.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No members found in this group</p>
            </div>
          )}
        </div>
      </div>

      {/* Payment Popup Modal */}
      {paymentPopup.isOpen && selectedPaymentMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Details</h2>
            
            <div className="space-y-3 mb-6">
              <div>
                <p className="text-gray-600 text-sm">Member Name</p>
                <p className="font-medium text-gray-900">{selectedPaymentMember.name}</p>
              </div>
              
              <div>
                <p className="text-gray-600 text-sm">Total Payments Done</p>
                <p className="font-medium text-gray-900">{selectedPaymentMember.paymentsCompleted}</p>
              </div>

              <div>
                <p className="text-gray-600 text-sm">UPI ID</p>
                <p className="font-medium text-gray-900 break-all">{selectedPaymentMember.lastPaymentUPI}</p>
              </div>
            </div>

            {/* Payment History Table */}
            <div className="border-t pt-4">
              <h3 className="font-bold text-gray-900 mb-3">Payment History (Last 5)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-gray-900">Date</th>
                      <th className="px-4 py-2 text-right font-semibold text-gray-900">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPaymentMember.paymentHistory && selectedPaymentMember.paymentHistory.length > 0 ? (
                      selectedPaymentMember.paymentHistory.map((payment, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2 text-gray-900">
                            {new Date(payment.date).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })}
                          </td>
                          <td className="px-4 py-2 text-right text-gray-900 font-medium">
                            ₹{payment.amount.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="px-4 py-3 text-center text-gray-500 text-sm">
                          No payment history available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <button
              onClick={() => setPaymentPopup({ isOpen: false })}
              className="w-full mt-6 bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-2 px-4 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
