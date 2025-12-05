# NebulaX - Full Stack Web Application

A modern, scalable full-stack web application built with Next.js 14+ and Firebase, following FAANG-level best practices and industry standards.

## 🚀 Tech Stack

### Frontend

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Zustand** - Lightweight state management
- **React Hook Form + Zod** - Form handling and validation

### Backend (Firebase BaaS)

- **Firebase Authentication** - User authentication
- **Cloud Firestore** - NoSQL database
- **Cloud Storage** - File storage
- **Cloud Functions** - Serverless backend functions
- **Firebase Hosting** - Static hosting
- **Firebase Analytics** - User analytics

### Development Tools

- **ESLint + Prettier** - Code quality and formatting
- **Husky + lint-staged** - Git hooks for code quality
- **Vitest** - Unit and integration testing
- **TypeScript Strict Mode** - Enhanced type safety
- **GitHub Actions** - CI/CD pipeline

## 📁 Project Structure

```
nebulax/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── sections/       # Page sections
│   │   ├── layout/         # Layout components
│   │   └── providers/      # Context providers
│   ├── config/             # Configuration files
│   │   └── firebase.ts     # Firebase initialization
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── store/              # State management (Zustand)
│   ├── types/              # TypeScript type definitions
│   └── test/               # Test setup and utilities
├── functions/              # Firebase Cloud Functions
│   ├── src/
│   │   └── index.ts        # Function definitions
│   └── package.json
├── .github/
│   └── workflows/
│       └── ci.yml          # CI/CD pipeline
├── public/                 # Static assets
├── firebase.json           # Firebase configuration
├── firestore.rules         # Firestore security rules
├── storage.rules           # Storage security rules
└── package.json            # Dependencies

```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Firebase CLI (`npm install -g firebase-tools`)
- Firebase project (create at [Firebase Console](https://console.firebase.google.com))

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd NebulaX
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your Firebase configuration in `.env.local`:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Initialize Firebase**

   ```bash
   firebase login
   firebase use --add
   ```

5. **Set up Husky (Git hooks)**

   ```bash
   npm run prepare
   ```

6. **Start development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage

## 🔥 Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable the following services:
   - Authentication (Email/Password, Google, etc.)
   - Firestore Database
   - Storage
   - Functions
   - Hosting
   - Analytics

### 2. Configure Firebase

1. Get your Firebase config from Project Settings
2. Add the config to `.env.local`
3. Update `.firebaserc` with your project IDs

### 3. Deploy Firebase Rules

```bash
firebase deploy --only firestore:rules,storage:rules
```

### 4. Deploy Cloud Functions

```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

## 🏗️ Architecture & Best Practices

### Code Organization

- **Feature-based structure** - Components organized by feature
- **Separation of concerns** - Clear boundaries between UI, logic, and data
- **Type safety** - Strict TypeScript configuration
- **Reusable components** - DRY principle with shared UI components

### Security

- **Firestore Security Rules** - Server-side data validation
- **Storage Rules** - File upload restrictions
- **Environment variables** - Sensitive data protection
- **Security headers** - Next.js security headers configured

### Performance

- **Next.js App Router** - Server components and streaming
- **Image optimization** - Next.js Image component
- **Code splitting** - Automatic route-based splitting
- **Caching strategies** - Static and dynamic caching

### Scalability

- **Firebase scalability** - Auto-scaling backend services
- **Modular architecture** - Easy to extend and maintain
- **Type-safe APIs** - Reduced runtime errors
- **Testing infrastructure** - Vitest setup for unit tests

## 🧪 Testing

Tests are located alongside components using the `.test.tsx` or `.spec.tsx` naming convention.

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test:coverage
```

## 🚢 Deployment

### Firebase Hosting

1. Build the application:

   ```bash
   npm run build
   ```

2. Export static files:

   ```bash
   npm run build
   # Next.js will output to 'out' directory
   ```

3. Deploy to Firebase:
   ```bash
   firebase deploy --only hosting
   ```

### Environment Setup

- **Development**: `nebulax-dev`
- **Staging**: `nebulax-staging`
- **Production**: `nebulax-production`

Switch between environments:

```bash
firebase use development
firebase use staging
firebase use production
```

## 📝 Code Quality

### Pre-commit Hooks

Husky automatically runs:

- ESLint checks
- Prettier formatting
- Type checking

### CI/CD Pipeline

GitHub Actions automatically:

- Lints code
- Type checks
- Runs tests
- Builds application

## 🔐 Security Rules

### Firestore Rules

Located in `firestore.rules` - Update based on your requirements.

### Storage Rules

Located in `storage.rules` - Configure file upload permissions.

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure tests pass
4. Submit a pull request

## 📄 License

This project is proprietary software for NebulaX.

## 👥 Team

Built with ❤️ by the NebulaX team.

---

**Note**: This is a production-ready starter template following industry best practices. Customize it according to your specific needs.
