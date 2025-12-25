import React, { createContext, useContext, useState } from 'react';

type Screen = 'login' | 'dashboard' | 'groups' | 'members' | 'addMember' | 'editMember' | 'reminderSetup' | 'sendReminder';

interface NavigationContextType {
  currentScreen: Screen;
  navigateTo: (screen: Screen, params?: any) => void;
  selectedGroupId?: string;
  selectedMemberId?: string;
  params?: any;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [selectedGroupId, setSelectedGroupId] = useState<string>();
  const [selectedMemberId, setSelectedMemberId] = useState<string>();
  const [params, setParams] = useState<any>();

  const navigateTo = (screen: Screen, navigationParams?: any) => {
    setCurrentScreen(screen);
    if (navigationParams) {
      if (navigationParams.groupId) setSelectedGroupId(navigationParams.groupId);
      if (navigationParams.memberId) setSelectedMemberId(navigationParams.memberId);
      setParams(navigationParams);
    }
  };

  return (
    <NavigationContext.Provider value={{ currentScreen, navigateTo, selectedGroupId, selectedMemberId, params }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};
