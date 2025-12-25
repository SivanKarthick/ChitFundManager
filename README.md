# Chit Reminder Manager

A responsive web application for managing chit groups and sending SMS reminders to members. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Admin Login Screen**: Secure authentication for administrators
- **Dashboard**: Overview of total groups, members, and pending reminders
- **Group Management**: View and manage all chit groups with their details
- **Member Management**: 
  - View all members in a group
  - Add/Edit member information
  - Track payment history with last payment details and UPI ID
  - View payment count with popup details
- **Reminder Setup**: Configure monthly reminder settings for each group
  - Set due dates
  - Set meeting places
  - Customize message templates with placeholders
- **Send Reminders**: Send SMS reminders to all group members
  - Primary number delivery with fallback to alternate number
  - Real-time status tracking

## Project Structure

```
src/
├── pages/               # Screen components
│   ├── LoginScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── GroupListScreen.tsx
│   ├── MemberListScreen.tsx
│   ├── AddEditMemberScreen.tsx
│   ├── ReminderSetupScreen.tsx
│   └── SendReminderScreen.tsx
├── context/             # Context for navigation
│   └── NavigationContext.tsx
├── data/                # Mock data
│   └── mockData.json
├── App.tsx              # Main app component
├── main.tsx             # React entry point
└── index.css            # Global styles

public/                  # Static assets
```

## Mock Data Structure

### Groups
```json
{
  "id": "group1",
  "name": "2 Lakh Chit",
  "amount": 200000,
  "dueDate": 10,
  "place": "Main Office",
  "totalMembers": 20,
  "messageTemplate": "Dear {{name}}, your chit due for {{group}} is payable on {{date}} at {{place}}. Please be on time"
}
```

### Members
```json
{
  "id": "mem1",
  "groupId": "group1",
  "name": "Kumar",
  "primary": "98765xxxx",
  "alternate": "81234xxxx",
  "joiningDate": "2023-01-15",
  "notes": "Senior member",
  "paymentsCompleted": 5,
  "lastPaymentDate": "2024-12-10",
  "lastPaymentAmount": 5000,
  "lastPaymentUPI": "kumar@upi",
  "eligible": ["group1", "group2"]
}
```

## Getting Started

### Installation

1. Clone the repository
```bash
cd ChitFundManager
```

2. Install dependencies
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Login Credentials (Demo)

- **Email**: admin@chit.com
- **Password**: admin123

## Key Features Explained

### Responsive Design
- Mobile-first approach
- Works seamlessly on phones, tablets, and desktops
- Responsive tables with proper mobile view handling

### Navigation
- Context-based navigation system
- State management for current screen and parameters
- Easy to extend with new screens

### Mock Data
- Complete mock data structure in `src/data/mockData.json`
- Ready to be replaced with API calls
- Includes all required fields for each entity

### Message Templates
- Customizable reminder message templates
- Placeholder support: `{{name}}`, `{{group}}`, `{{date}}`, `{{place}}`
- Configuration per group

### Payment Tracking
- View total payments completed
- Access last payment details (date, amount, UPI ID)
- Popup modals for detailed payment information

## Future Enhancements

1. **API Integration**: Replace mock data with real API calls
2. **Authentication**: Implement real authentication with JWT
3. **SMS Service**: Integrate Twilio or similar for actual SMS sending
4. **Database**: Connect to backend database for persistent storage
5. **Analytics**: Add charts and graphs for payment analytics
6. **Export**: CSV/PDF export functionality for reports
7. **Notifications**: Real-time notifications for sent reminders
8. **Multi-user**: Support for multiple admin users

## Technologies Used

- **React 19**: UI framework
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server
- **React Context API**: State management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

Chit Fund Manager Team
