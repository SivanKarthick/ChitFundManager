import React from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { LoginScreen } from './pages/LoginScreen';
import { DashboardScreen } from './pages/DashboardScreen';
import { GroupListScreen } from './pages/GroupListScreen';
import { MemberListScreen } from './pages/MemberListScreen';
import { AddEditMemberScreen } from './pages/AddEditMemberScreen';
import { ReminderSetupScreen } from './pages/ReminderSetupScreen';
import { SendReminderScreen } from './pages/SendReminderScreen';
import './index.css';

const AppContent: React.FC = () => {
  const { currentScreen } = useNavigation();

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === 'login' && <LoginScreen />}
      {currentScreen === 'dashboard' && <DashboardScreen />}
      {currentScreen === 'groups' && <GroupListScreen />}
      {currentScreen === 'members' && <MemberListScreen />}
      {currentScreen === 'addMember' && <AddEditMemberScreen />}
      {currentScreen === 'editMember' && <AddEditMemberScreen />}
      {currentScreen === 'reminderSetup' && <ReminderSetupScreen />}
      {currentScreen === 'sendReminder' && <SendReminderScreen />}
    </div>
  );
};

function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

export default App;
