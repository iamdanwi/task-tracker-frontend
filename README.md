# Task Tracker - Frontend

A modern task management application built with Next.js 14, featuring a clean UI and robust functionality.

## Features

- 🔐 User Authentication (Login/Register)
- 📝 Task Management (Create, Read, Update, Delete)
- 🌓 Dark/Light Theme
- 🎯 Task Status Tracking
- 📅 Due Date Management
- 🔄 Real-time Updates
- 📱 Responsive Design

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Hooks
- **HTTP Client:** Axios
- **Form Handling:** Native Forms
- **Authentication:** JWT
- **Toast Notifications:** Sonner
- **Icons:** Lucide Icons
- **Date Handling:** date-fns
- **Theme:** next-themes

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd task-tracker/frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file with the following variables:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000 # Your backend API URL
```

## Project Structure

```
src/
├── app/                  # App router pages
│   ├── (auth)/          # Authentication routes
│   ├── (user)/          # Protected user routes
│   └── api/             # API routes
├── components/          # Reusable components
│   ├── ui/             # UI components
│   └── ...             # Feature components
├── lib/                # Utility functions
└── hooks/              # Custom React hooks
```

## API Routes

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/task/get` - Get all tasks
- `POST /api/task/create` - Create new task
- `PUT /api/task/update` - Update task
- `DELETE /api/task/delete` - Delete task

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Run Prettier check
- `npm run format:fix` - Fix Prettier issues

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
