# Todo Application

A modern, responsive todo application built with React, TypeScript, and Material-UI, featuring a clean design with filtering capabilities.

## Features

### 🎯 **Core Functionality**
- ✅ Create, edit, and delete todos
- ✅ Mark todos as completed/pending
- ✅ User assignment for todos
- ✅ Real-time search functionality (auto-triggers after 2+ characters)
- ✅ Advanced filtering options

### 🎨 **Design & UI**
- ✅ Modern, clean interface with consistent purple theme (#644C79)
- ✅ Responsive design (mobile and desktop)
- ✅ Pixel-perfect implementation matching design specifications
- ✅ Custom rounded toggles and buttons
- ✅ Smooth animations and hover effects

### 🔍 **Advanced Filtering**
- **Search**: Real-time text search in todo titles
- **Completion Status**: Tri-state filter (ALL/COMPLETED/PENDING)
- **User Assignment**: Multi-select user filtering
- **Reset Filters**: One-click filter reset

### 📱 **User Experience**
- Pagination with circular buttons
- Modal edit dialogs
- Loading states and error handling
- Accessible design with proper contrast

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Material-UI + SCSS
- **Build Tool**: Vite
- **Fonts**: Custom Karbon font family
- **Data**: JSONPlaceholder API for users and todos

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd todo-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── filters/        # Filter panel components
│   ├── todos/          # Todo-related components
│   └── layout/         # Layout components (Header, Footer)
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API service functions
├── styles/             # Global styles and variables
├── types/              # TypeScript type definitions
└── assets/             # Static assets (images, fonts)
```

## Key Components

- **TodoTable**: Main todo display with integrated pagination
- **FiltersPanel**: Advanced filtering sidebar
- **TodoEditDialog**: Modal for creating/editing todos
- **Header/Footer**: Application layout components

## Design System

### Colors
- **Primary Purple**: #644C79
- **Success Green**: #4CAF50
- **Error Red**: #FF6B6B
- **Info Blue**: #4A9EE7
- **Background**: #FFFFFF
- **Container**: #F5F5F5

### Typography
- **Font Family**: Karbon (custom), fallback to system fonts
- **Header Labels**: 20px
- **Filter Labels**: 20px (sections), 36px (main title)
- **Body Text**: 14px

### Spacing
- **Container Padding**: 20px
- **Row Spacing**: 15px between data rows
- **Header Spacing**: 20px between header and content

## API Integration

The application integrates with JSONPlaceholder API:
- **Users**: `https://jsonplaceholder.typicode.com/users`
- **Todos**: `https://jsonplaceholder.typicode.com/todos`

## Development Guidelines

### Code Style
- TypeScript strict mode enabled
- ESLint configuration for code quality
- Consistent component structure with props interfaces
- SCSS modules for component-specific styling

### Responsive Design
- Mobile-first approach
- Breakpoint at 768px for mobile/desktop
- Flexible layouts using CSS Grid and Flexbox

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for educational/demonstration purposes.
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
