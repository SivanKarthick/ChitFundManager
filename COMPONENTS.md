# Component Documentation

This document provides detailed information about all components in the Chit Reminder Manager application.

## Component Hierarchy

```
App
├── NavigationProvider
    ├── LoginScreen
    ├── DashboardScreen
    ├── GroupListScreen
    ├── MemberListScreen
    ├── AddEditMemberScreen
    ├── ReminderSetupScreen
    └── SendReminderScreen
```

---

## Context Components

### NavigationContext.tsx

**Purpose**: Manages application-wide navigation and screen state using React Context API.

**Exports**:
- `NavigationProvider`: Provider component that wraps the app
- `useNavigation()`: Hook to access navigation functionality

**Type Definitions**:
```typescript
type Screen = 'login' | 'dashboard' | 'groups' | 'members' | 
              'addMember' | 'editMember' | 'reminderSetup' | 'sendReminder';

interface NavigationContextType {
  currentScreen: Screen;
  navigateTo: (screen: Screen, params?: any) => void;
  selectedGroupId?: string;
  selectedMemberId?: string;
  params?: any;
}
```

**Usage Example**:
```typescript
const { navigateTo, currentScreen } = useNavigation();
navigateTo('dashboard');
navigateTo('members', { groupId: 'group1' });
```

---

## Page Components

### LoginScreen.tsx

**Purpose**: Admin login interface

**Features**:
- Email and password input fields
- Form validation
- Gradient background design
- Demo credentials display
- Redirects to dashboard on successful login

**State**:
- `email`: string
- `password`: string

**Key Functions**:
- `handleLogin()`: Validates input and navigates to dashboard

**Responsive**: Yes (mobile-first design)

---

### DashboardScreen.tsx

**Purpose**: Main dashboard showing application overview and quick actions

**Features**:
- Displays total groups card
- Displays total members card
- Displays pending reminders card
- Quick action buttons for:
  - Managing groups
  - Sending reminders

**State**:
- `stats`: { totalGroups, totalMembers, pendingReminders }

**Key Functions**:
- `useEffect()`: Loads stats from mock data on mount

**Props Passed**: None

**Responsive**: Yes (3-column layout on desktop, single column on mobile)

---

### GroupListScreen.tsx

**Purpose**: Display all chit groups in a searchable table

**Features**:
- Back button to dashboard
- Search/filter functionality
- Responsive table with columns:
  - Group Name
  - Chit Amount (formatted currency)
  - Total Members (badge)
  - View button
- View button navigates to member list

**State**:
- `groups`: Array of Group objects
- `searchTerm`: string for filtering

**Key Functions**:
- `handleViewGroup()`: Navigates to members screen
- `formatCurrency()`: Formats amount in INR

**Data Type**:
```typescript
interface Group {
  id: string;
  name: string;
  amount: number;
  totalMembers: number;
}
```

**Responsive**: Yes (table scrolls horizontally on mobile)

---

### MemberListScreen.tsx

**Purpose**: Display members of a selected group with payment history

**Features**:
- Back button to groups
- Add member button
- Table showing:
  - Member Name
  - Primary phone number
  - Alternate phone number
  - Payments completed (clickable)
  - Last payment date (clickable)
  - Edit button
- Payment popup modal showing:
  - Total payments count
  - Last payment date
  - Last payment amount
  - Last payment UPI ID

**State**:
- `members`: Array of Member objects
- `group`: Current group object
- `paymentPopup`: { isOpen, memberId }
- `selectedPaymentMember`: Member object

**Key Functions**:
- `handleViewPayment()`: Opens payment details modal
- `handleEditMember()`: Navigates to edit member screen
- `maskPhoneNumber()`: Displays phone numbers safely

**Data Types**:
```typescript
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
}
```

**Responsive**: Yes (popup modal is responsive)

---

### AddEditMemberScreen.tsx

**Purpose**: Form for adding new members or editing existing members

**Features**:
- Back button
- Conditional title (Add vs Edit)
- Form fields:
  - Group name dropdown (required)
  - Member name (required)
  - Primary mobile (required)
  - Alternate mobile (optional)
  - Joining date (required)
  - Notes (optional)
- Form validation
- Submit and cancel buttons

**State**:
- `selectedGroup`: string (group ID)
- `formData`: Member object with form data

**Key Functions**:
- `handleChange()`: Updates form field
- `handleSubmit()`: Validates and saves member
- `handleBack()`: Navigates back to member list
- `useEffect()`: Loads member data if editing

**Props from Context**:
- `selectedMemberId`: If editing
- `params.groupId`: Group to which member belongs

**Responsive**: Yes (single column form)

---

### ReminderSetupScreen.tsx

**Purpose**: Configure reminder settings for each group

**Features**:
- Lists all groups
- For each group shows:
  - Monthly due date
  - Meeting place
  - Chit amount
  - Message template preview
- Edit button opens edit mode with:
  - Due date input (1-31)
  - Place input
  - Message template textarea
  - Placeholder guide
  - Save and cancel buttons

**State**:
- `groups`: Array of Group objects
- `editingGroupId`: string or null
- `editFormData`: Group object being edited

**Key Functions**:
- `handleEditClick()`: Opens edit mode
- `handleSave()`: Saves changes to group
- `handleCancel()`: Closes edit mode without saving
- `handleChange()`: Updates form field

**Data Type**:
```typescript
interface Group {
  id: string;
  name: string;
  dueDate: number;
  place: string;
  messageTemplate: string;
  amount: number;
}
```

**Responsive**: Yes (cards stack on mobile)

---

### SendReminderScreen.tsx

**Purpose**: Send SMS reminders to group members

**Features**:
- Group selection dropdown
- Shows list of members to be notified
- Real-time status indication (⏳ pending, ✓ sent)
- Main action button:
  - Shows current state (ready to send, sending, all sent)
  - Disabled when not applicable
- Strategy info box explaining delivery process
- Success message when all reminders sent

**State**:
- `groups`: Array of Group objects
- `members`: Array of Member objects
- `selectedGroupId`: string
- `sendingReminders`: boolean (sending state)
- `sentStatus`: { [memberId]: boolean } (delivery status)

**Key Functions**:
- `handleSendReminders()`: Simulates sending reminders
  - Updates status sequentially with 500ms delay
  - Shows real-time progress

**Responsive**: Yes (centered content, responsive button)

---

## Main App Component

### App.tsx

**Purpose**: Root component that sets up providers and renders screens

**Structure**:
```typescript
function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

function AppContent() {
  const { currentScreen } = useNavigation();
  
  return (
    <div>
      {currentScreen === 'login' && <LoginScreen />}
      {currentScreen === 'dashboard' && <DashboardScreen />}
      // ... other screens
    </div>
  );
}
```

**Features**:
- Wraps entire app with NavigationProvider
- Conditionally renders screens based on current screen
- Provides consistent layout wrapper

---

## Entry Point

### main.tsx

**Purpose**: React application entry point

**Features**:
- Renders App component into DOM
- Uses React 18 createRoot API
- Applies StrictMode for development warnings

---

## Styling

### index.css

**Global Styles**:
- Tailwind CSS directives (base, components, utilities)
- Global reset (margin, padding, box-sizing)
- Body background color
- .container utility class
- Responsive padding for container

---

## Data Files

### mockData.json

**Contains**:
- `groups`: Array of group objects
- `members`: Array of member objects
- `reminders`: Array of reminder objects
- `dashboard`: Dashboard statistics

**Structure**:
```typescript
{
  groups: [
    {
      id: string;
      name: string;
      amount: number;
      dueDate: number;
      place: string;
      totalMembers: number;
      messageTemplate: string;
    }
  ],
  members: [
    {
      id: string;
      groupId: string;
      name: string;
      primary: string;
      alternate: string | null;
      joiningDate: string;
      notes: string;
      paymentsCompleted: number;
      lastPaymentDate: string;
      lastPaymentAmount: number;
      lastPaymentUPI: string;
      eligible: string[];
    }
  ],
  reminders: [...],
  dashboard: {
    totalGroups: number;
    totalMembers: number;
    monthlyPendingReminders: number;
  }
}
```

---

## Component Size Reference

| Component | Lines | Complexity |
|-----------|-------|-----------|
| LoginScreen | ~70 | Low |
| DashboardScreen | ~120 | Low |
| GroupListScreen | ~130 | Medium |
| MemberListScreen | ~200 | High |
| AddEditMemberScreen | ~180 | Medium |
| ReminderSetupScreen | ~160 | High |
| SendReminderScreen | ~150 | Medium |
| NavigationContext | ~50 | Medium |
| App | ~30 | Low |

---

## Key Design Patterns

### 1. Context-Based Navigation
- No React Router dependency
- Simple string-based screen switching
- Parameter passing through context

### 2. Controlled Components
- All form inputs are controlled
- State updates trigger re-renders
- Easy to add validation

### 3. Modal Pattern
- Payment popup in MemberListScreen
- Conditional rendering with overlay
- Click outside to close (manual button)

### 4. Data Filtering
- GroupListScreen uses searchTerm
- MemberListScreen filters by groupId
- Real-time filtering without API

---

## Future Component Enhancements

1. **Loading Skeleton**: Add skeleton loaders during data fetch
2. **Error Boundaries**: Wrap components with error boundary
3. **Confirmation Modals**: Add confirm before delete operations
4. **Toast Notifications**: Add success/error notifications
5. **Table Sorting**: Add sortable columns
6. **Pagination**: Add pagination for large datasets
7. **Export**: Add CSV/PDF export functionality
8. **Analytics**: Add charts and graphs for payment analysis

---

## Component Communication

```
NavigationContext (Global State)
│
├─→ LoginScreen
│   └─→ navigateTo('dashboard')
│
├─→ DashboardScreen
│   ├─→ navigateTo('groups')
│   └─→ navigateTo('sendReminder')
│
├─→ GroupListScreen
│   └─→ navigateTo('members', { groupId })
│
├─→ MemberListScreen
│   ├─→ navigateTo('editMember', { groupId, memberId })
│   ├─→ navigateTo('addMember', { groupId })
│   └─→ navigateTo('groups')
│
├─→ AddEditMemberScreen
│   └─→ navigateTo('members', { groupId })
│
├─→ ReminderSetupScreen
│   └─→ navigateTo('dashboard')
│
└─→ SendReminderScreen
    └─→ navigateTo('dashboard')
```

All components use the `useNavigation()` hook for navigation, ensuring consistent flow throughout the application.
