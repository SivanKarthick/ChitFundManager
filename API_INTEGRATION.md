# API Integration Guide

This document describes how to integrate the Chit Reminder Manager with backend APIs.

## Current State

The application currently uses mock JSON data from `src/data/mockData.json`. All data is loaded statically and changes are not persisted.

## Migration Path

### Phase 1: Basic API Integration

Replace mock data with API calls while maintaining the same component structure.

#### 1. Create API Service Layer

Create `src/utils/api.ts`:

```typescript
// src/utils/api.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Groups API
export const groupsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/groups`);
    if (!response.ok) throw new Error('Failed to fetch groups');
    return response.json();
  },
  
  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/groups/${id}`);
    if (!response.ok) throw new Error('Failed to fetch group');
    return response.json();
  },
  
  update: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/groups/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update group');
    return response.json();
  }
};

// Members API
export const membersAPI = {
  getByGroupId: async (groupId: string) => {
    const response = await fetch(`${API_BASE_URL}/members?groupId=${groupId}`);
    if (!response.ok) throw new Error('Failed to fetch members');
    return response.json();
  },
  
  create: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create member');
    return response.json();
  },
  
  update: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/members/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update member');
    return response.json();
  },
  
  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/members/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete member');
    return response.json();
  }
};

// Reminders API
export const remindersAPI = {
  sendToGroup: async (groupId: string) => {
    const response = await fetch(`${API_BASE_URL}/reminders/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupId })
    });
    if (!response.ok) throw new Error('Failed to send reminders');
    return response.json();
  },
  
  getByGroupId: async (groupId: string) => {
    const response = await fetch(`${API_BASE_URL}/reminders?groupId=${groupId}`);
    if (!response.ok) throw new Error('Failed to fetch reminders');
    return response.json();
  }
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },
  
  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Logout failed');
    return response.json();
  }
};
```

#### 2. Update Components to Use API

Example: Update `DashboardScreen.tsx`:

```typescript
useEffect(() => {
  const loadStats = async () => {
    try {
      const [groupsRes, membersRes, remindersRes] = await Promise.all([
        groupsAPI.getAll(),
        fetch(`${API_BASE_URL}/members`).then(r => r.json()),
        fetch(`${API_BASE_URL}/reminders/pending`).then(r => r.json())
      ]);
      
      setStats({
        totalGroups: groupsRes.length,
        totalMembers: membersRes.length,
        pendingReminders: remindersRes.length
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };
  
  loadStats();
}, []);
```

### Phase 2: Add Error Handling and Loading States

#### Create a Custom Hook

```typescript
// src/hooks/useAsync.ts
import { useState, useEffect } from 'react';

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true
) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = async () => {
    setStatus('pending');
    setValue(null);
    setError(null);
    try {
      const response = await asyncFunction();
      setValue(response);
      setStatus('success');
      return response;
    } catch (error) {
      setError(error as Error);
      setStatus('error');
      throw error;
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate]);

  return { execute, status, value, error };
}
```

Usage:
```typescript
const { status, value: groups, error } = useAsync(() => groupsAPI.getAll());

if (status === 'pending') return <div>Loading...</div>;
if (status === 'error') return <div>Error: {error?.message}</div>;
if (status === 'success') return <div>{/* render groups */}</div>;
```

### Phase 3: Add Authentication

#### Update NavigationContext

```typescript
interface AuthContextType {
  isLoggedIn: boolean;
  user: { email: string; name: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (email: string, password: string) => {
    const response = await authAPI.login(email, password);
    localStorage.setItem('token', response.token);
    setIsLoggedIn(true);
    setUser(response.user);
  };

  const logout = async () => {
    await authAPI.logout();
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

## Backend API Endpoints (Expected)

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/verify` - Verify token

### Groups
- `GET /api/groups` - Get all groups
- `GET /api/groups/:id` - Get single group
- `POST /api/groups` - Create group
- `PUT /api/groups/:id` - Update group
- `DELETE /api/groups/:id` - Delete group

### Members
- `GET /api/members` - Get all members (with optional groupId filter)
- `GET /api/members/:id` - Get single member
- `POST /api/members` - Create member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Reminders
- `GET /api/reminders` - Get all reminders
- `GET /api/reminders/pending` - Get pending reminders
- `POST /api/reminders/send` - Send reminders to group
- `GET /api/reminders/:id` - Get reminder details

### Payments
- `GET /api/payments` - Get all payments
- `GET /api/payments/member/:memberId` - Get member payments
- `POST /api/payments` - Record payment
- `GET /api/payments/:id` - Get payment details

## Environment Variables

Create `.env` file:

```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Chit Reminder Manager
```

Access in code:
```typescript
const API_URL = import.meta.env.VITE_API_URL;
```

## Error Handling Strategy

### API Error Types

```typescript
// src/utils/errors.ts
export class APIError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string
  ) {
    super(message);
  }
}

export const handleAPIError = (error: any): APIError => {
  if (error instanceof APIError) {
    return error;
  }
  
  if (error.response?.status === 401) {
    // Redirect to login
    window.location.href = '/login';
  }
  
  return new APIError(
    error.response?.status || 500,
    error.response?.data?.code || 'UNKNOWN_ERROR',
    error.response?.data?.message || error.message
  );
};
```

## Testing with Mock Data (Optional)

Keep the ability to run with mock data for testing:

```typescript
// src/utils/useData.ts
const USE_MOCK_DATA = import.meta.env.MODE === 'development' && 
                      import.meta.env.VITE_USE_MOCK_DATA === 'true';

export async function getGroups() {
  if (USE_MOCK_DATA) {
    return mockData.groups;
  }
  return groupsAPI.getAll();
}
```

Run with mock data:
```bash
VITE_USE_MOCK_DATA=true npm run dev
```

## Performance Optimization

### Caching

```typescript
// src/utils/cache.ts
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const cachedFetch = async <T>(
  key: string,
  fn: () => Promise<T>
): Promise<T> => {
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const data = await fn();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
};
```

## Summary

1. **Start**: Create API service layer (`api.ts`)
2. **Integrate**: Update components to use API
3. **Handle Errors**: Add error handling and loading states
4. **Authenticate**: Implement authentication
5. **Optimize**: Add caching and request handling
6. **Test**: Use mock data alongside API during development

This approach ensures smooth migration from mock data to real APIs without breaking the UI.
