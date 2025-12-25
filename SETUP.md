# Quick Start Guide - Chit Reminder Manager

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The application will open at `http://localhost:5173/`

### 3. Login
Use the demo credentials to login:
- **Email**: admin@chit.com
- **Password**: admin123

## Application Flow

### 📋 Login Screen
- Admin-only login interface
- Demo credentials provided
- Redirects to Dashboard on successful login

### 📊 Dashboard
- **Total Chit Groups**: Shows count of all groups
- **Total Members**: Shows count of all members across groups
- **This Month Pending Reminders**: Shows pending reminders
- Quick action buttons to:
  - Manage Groups
  - Send Reminder (highlighted action)

### 👥 Groups Screen
- Lists all chit groups with:
  - Group Name
  - Chit Amount (formatted in INR)
  - Total Members count
  - View button to see members
- Search functionality to filter groups

### 👤 Member List Screen
- Shows all members in a selected group
- Displays:
  - Member Name
  - Primary Phone Number
  - Alternate Phone Number
  - Total Payments Done (clickable to view details)
  - Last Payment Date (clickable to view details with amount & UPI)
  - Edit button

### ➕ Add/Edit Member Screen
- Form to add new members or edit existing ones
- Fields:
  - Group Name (dropdown)
  - Name
  - Primary Mobile Number
  - Alternate Mobile Number (optional)
  - Joining Date
  - Notes (optional)

### 🔔 Send Reminders Screen
- Select a group from dropdown
- View all members to be notified
- Send reminders to all members with:
  - Primary number delivery
  - Fallback to alternate number
  - Real-time status tracking
  - Success confirmation

### ⚙️ Reminder Setup Screen
- Configure reminder settings per group
- Edit:
  - Monthly Due Date
  - Meeting Place
  - Message Template
- Template placeholders: `{{name}}`, `{{group}}`, `{{date}}`, `{{place}}`

## Project Structure

```
src/
├── pages/                    # Screen components
│   ├── LoginScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── GroupListScreen.tsx
│   ├── MemberListScreen.tsx
│   ├── AddEditMemberScreen.tsx
│   ├── ReminderSetupScreen.tsx
│   └── SendReminderScreen.tsx
├── context/                  # Navigation context
│   └── NavigationContext.tsx
├── data/                     # Mock data
│   └── mockData.json
├── App.tsx                   # Main app component
├── main.tsx                  # React entry point
└── index.css                 # Global styles
```

## Mock Data

The application uses mock JSON data in `src/data/mockData.json`:

### Groups
- 2 Lakh Chit (₹2,00,000)
- 5 Lakh Chit (₹5,00,000)

### Sample Members
- Kumar, Ravi (Group 1)
- Priya, Arjun (Group 2)

### Dashboard Stats
- Total Groups: 2
- Total Members: 50
- Pending Reminders This Month: 12

## Available Scripts

### Development
```bash
npm run dev
```
Starts development server with hot module replacement.

### Build
```bash
npm run build
```
Builds the project for production. Output goes to `dist/` folder.

### Preview
```bash
npm run preview
```
Preview the production build locally.

## Key Features

✅ **Responsive Design** - Works on mobile, tablet, and desktop
✅ **React Context Navigation** - Clean navigation between screens
✅ **Mock Data Ready** - Easy to replace with real API calls
✅ **Tailwind CSS** - Modern, utility-first CSS framework
✅ **TypeScript** - Type-safe development
✅ **Modular Components** - Easy to extend and maintain

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Next Steps for Development

1. **Replace Mock Data**: Connect to backend API
   - Update mockData imports to API calls
   - Handle loading and error states

2. **Add Authentication**: Implement real login
   - JWT token management
   - Session persistence
   - Protected routes

3. **SMS Integration**: Implement actual SMS sending
   - Twilio or similar SMS service
   - Delivery status tracking
   - Retry logic

4. **Form Validation**: Add comprehensive validation
   - Phone number validation
   - Email validation
   - Custom error messages

5. **State Management**: Consider adding Redux/Zustand
   - Complex state handling
   - Time-travel debugging

6. **Testing**: Add unit and E2E tests
   - Jest for unit tests
   - Cypress/Playwright for E2E

7. **Deployment**: Prepare for production
   - Environment variables
   - CI/CD pipeline
   - Docker containerization

## Responsive Design Notes

The application is built mobile-first with the following breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All screens are fully responsive using Tailwind CSS utilities.

## Color Scheme

- **Primary**: Blue (#3b82f6)
- **Success**: Green (#10b981)
- **Danger**: Red (#ef4444)
- **Warning**: Orange (#f59e0b)

## Need Help?

Refer to the main README.md for detailed documentation and setup instructions.
