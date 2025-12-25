# Commands & Quick Reference

## NPM Commands

### Development
```bash
# Start development server
npm run dev

# Run dev server and open in browser
npm run dev -- --open
```

**Output**: Application available at `http://localhost:5173/`

### Building
```bash
# Build for production
npm run build

# Build and check TypeScript
npm run build

# Serve production build locally
npm run preview
```

**Output**: Optimized build in `dist/` folder

### Dependencies
```bash
# Install all dependencies
npm install

# Install with legacy peer deps (if needed)
npm install --legacy-peer-deps

# Update all packages
npm update

# Check outdated packages
npm outdated

# Security audit
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## Git Commands

```bash
# Initialize repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Push to remote
git push origin main
```

---

## TypeScript Commands

```bash
# Check TypeScript without building
npx tsc --noEmit

# Build TypeScript only
npm run tsc

# Watch TypeScript
npx tsc --watch
```

---

## Development Server Tips

### Hot Module Replacement (HMR)
- Changes save automatically
- Styles update without reload
- Component state preserved (usually)

### Debugging
```bash
# Chrome DevTools
# Press F12 in browser

# React DevTools
# Install React DevTools browser extension

# Inspect element
# Right-click → Inspect
```

### Vite Features
```bash
# In development terminal, press:
h       # Show help menu
r       # Restart server
u       # Update
q       # Quit
```

---

## File Watching & Auto-Reload

Vite automatically watches these files:
- `src/**/*.tsx` - React components
- `src/**/*.ts` - TypeScript files
- `src/**/*.css` - Stylesheets
- `src/data/*.json` - Mock data
- `public/**/*` - Static assets
- `index.html` - HTML template

Changes trigger hot reload automatically.

---

## Project Structure Commands

```bash
# List all files
ls -la

# Show tree structure (on Unix/Mac)
tree src

# Count lines of code
find src -name "*.tsx" -o -name "*.ts" | xargs wc -l

# Find all components
find src/pages -name "*.tsx"

# Find all context
find src/context -name "*.tsx"
```

---

## Environment Setup

### Environment Variables

Create `.env.local` for local development:

```bash
# .env.local
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Chit Reminder Manager
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

### Node Version Check

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Required: Node 16.4+, npm 7+
```

---

## Testing Commands (When Tests Added)

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test LoginScreen
```

---

## Code Quality Commands

### Linting (When ESLint Added)
```bash
# Check code
npm run lint

# Fix code automatically
npm run lint -- --fix
```

### Formatting (When Prettier Added)
```bash
# Check formatting
npm run format -- --check

# Format all files
npm run format
```

---

## Docker Commands (If Containerized)

```bash
# Build Docker image
docker build -t chit-reminder:latest .

# Run container
docker run -p 5173:5173 chit-reminder:latest

# Build for production
docker build -t chit-reminder:prod --target production .
```

---

## Deployment Commands

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy production
vercel --prod
```

### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Deploy production
netlify deploy --prod
```

### Manual Deployment
```bash
# Build
npm run build

# Upload dist/ folder to hosting service
# Set environment variables on hosting
# Configure domain/SSL
```

---

## Troubleshooting Commands

### Clear Cache & Reinstall
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules

# Delete package lock
rm package-lock.json

# Reinstall
npm install
```

### Port Already in Use
```bash
# Check what's using port 5173
lsof -i :5173

# Kill process (macOS/Linux)
kill -9 <PID>

# Use different port
npm run dev -- --port 3000
```

### TypeScript Errors

```bash
# Generate missing type definitions
npm install --save-dev @types/node

# Check TypeScript version
npm list typescript

# Update TypeScript
npm update typescript
```

---

## Documentation

### View README
```bash
# In terminal
cat README.md

# In VS Code
Open README.md tab
```

### View Other Docs
- `SETUP.md` - Quick start guide
- `COMPONENTS.md` - Component documentation
- `API_INTEGRATION.md` - API integration guide
- `PROJECT_SUMMARY.md` - Project overview
- `TESTING_CHECKLIST.md` - Testing guide

---

## Quick Links

### Files to Edit
- Colors: `tailwind.config.js`
- Styles: `src/index.css`, component files
- Data: `src/data/mockData.json`
- Components: `src/pages/*.tsx`
- Navigation: `src/context/NavigationContext.tsx`

### Key Directories
- Pages: `src/pages/`
- Context: `src/context/`
- Data: `src/data/`
- Config: `tailwind.config.js`, `vite.config.ts`

---

## VS Code Useful Extensions

```json
{
  "extensions": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-python.python",
    "eamodio.gitlens",
    "github.github-vscode-theme",
    "usernamehw.errorlens"
  ]
}
```

Install with:
```bash
code --install-extension <extension-id>
```

---

## Common Development Workflow

```bash
# 1. Start dev server
npm run dev

# 2. Open in browser
# http://localhost:5173

# 3. Edit files (auto-reload on save)
# Modify src/pages/DashboardScreen.tsx

# 4. Test changes
# App reloads automatically

# 5. Build when ready
npm run build

# 6. Preview production
npm run preview

# 7. Deploy
# Upload dist/ folder or use Vercel/Netlify
```

---

## Emergency Fixes

### App Won't Start
```bash
npm install --legacy-peer-deps
npm run dev
```

### Port Conflict
```bash
npm run dev -- --port 3000
```

### Build Fails
```bash
npm cache clean --force
rm package-lock.json
npm install
npm run build
```

### TypeScript Errors
```bash
npx tsc --noEmit
# Fix errors in source files
npm run build
```

---

## Performance Monitoring

### Bundle Analysis
```bash
# Install bundle analyzer
npm install -D rollup-plugin-visualizer

# Build and analyze
npm run build
open dist/stats.html
```

### Dev Server Performance
```bash
# Check build time
npm run build

# Check bundle size
ls -lh dist/assets/
```

---

## Git Workflow

```bash
# Check status
git status

# See changes
git diff

# Stage files
git add .

# Commit
git commit -m "Feature description"

# View history
git log

# Create branch
git checkout -b feature/new-feature

# Switch branch
git checkout main

# Merge
git merge feature/new-feature

# Push
git push origin main
```

---

## Final Checklist

Before deploying:
- [ ] Run `npm run build` - no errors
- [ ] Run `npm run preview` - test production build
- [ ] Check console - no errors
- [ ] Test all screens - all working
- [ ] Test responsive - mobile view works
- [ ] Test navigation - all links work
- [ ] Commit changes - git commit
- [ ] Push to remote - git push
- [ ] Deploy - Vercel/Netlify/manual

---

## Need Help?

1. Check documentation files
2. Review component documentation in `COMPONENTS.md`
3. Check TypeScript errors: `npx tsc --noEmit`
4. Check browser console: F12 → Console tab
5. Check network tab: F12 → Network tab
6. Read Vite documentation: https://vitejs.dev
7. Read React documentation: https://react.dev
8. Read Tailwind documentation: https://tailwindcss.com

---

**Last Updated**: December 25, 2025
**Project**: Chit Reminder Manager
