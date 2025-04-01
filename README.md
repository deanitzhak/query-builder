# Event Management System

A modern React TypeScript application for event management with an advanced search interface, RTL support, and a component-based architecture.

## 🚀 Features

- **Event Listing & Management**: View, search, and manage events with detailed information
- **Advanced Search Interface**: Complex query builder with support for multiple conditions and operators
- **Responsive UI Components**: Consistent, accessible component library with RTL support
- **Modern Design System**: Theme-based styling with a purple color palette

## 🛠️ Technology Stack

- **React**: Frontend UI library
- **TypeScript**: Type-safe code
- **TailwindCSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **Next.js**: React framework for server-side rendering

## 🏗️ Architecture

The application is built using several design patterns to ensure maintainability, scalability, and reusability:

### Component-Based Architecture
The UI is composed of reusable components with well-defined interfaces and props.

### Design Patterns
- **Factory Pattern**: Used for button creation (`ButtonFactory`)
- **Registry Pattern**: For component registration and discovery
- **Decorator Pattern**: For extending component functionality
- **Variant Pattern**: For styling components consistently

### Directory Structure

```
src/
├── app/                  # Next.js app router
│   ├── components/       # UI components
│   │   ├── button/       # Button components
│   │   ├── edit/         # Edit form components
│   │   ├── headers/      # Header components
│   │   ├── list/         # List and table components
│   │   └── query/        # Query builder components
│   ├── factory/          # Factory pattern implementations
│   ├── patterns/         # Design pattern implementations
│   │   ├── decorator/    # Component decorators
│   │   └── registration/ # Component registry
│   ├── services/         # Data fetching and business logic
│   ├── style/            # Global styles
│   └── variants/         # Component style variants
├── types/                # TypeScript type definitions
│   ├── interfaces/       # Interface definitions
│   ├── queries/          # Query-related types
│   └── utils/            # Utility types
```

## 🎨 Theme System

The application uses a centralized theme system with a purple color palette:

- Primary: `#4e165a` (deep purple)
- Light: `#7a3b88` (medium purple)
- Lighter: `#ad7eba` (light purple)
- Ultra Light: `#f2e8f5` (barely purple)

Component variants are defined using `class-variance-authority` to ensure consistent styling across the application.

## 📝 Key Components

### Headers
- `Header`: Main application header with title
- `MainHeaderSection`: Header content with action buttons

### Lists
- `List`: Reusable list component with sorting, pagination, and filtering
- `ListItem`: Individual row in the list
- `ListHeader`: Header row for the list

### Query Builder
- `QueryBuilder`: Advanced query builder for complex searches
- `FilterGroup`: Group of filter conditions
- `FilterCondition`: Individual filter condition

### Forms
- `EditForm`: Form for editing entities
- `EditSection`: Section that contains forms or other editable content

### Buttons
- `AddButton`: Standard button component
- `InputButton`: Button with input field
- `DateSelector`: Date selection button with dropdown

## 🔄 State Management

The application uses React's built-in state management capabilities:
- `useState` for component-level state
- `useEffect` for side effects and data fetching
- Props for parent-child communication

## 🌐 RTL Support

The application fully supports right-to-left (RTL) layout for Hebrew language:
- RTL text direction in CSS
- RTL-aware component design
- RTL-optimized spacing and alignment

## 📊 Data Flow

1. Mock data is provided by the `EventDataFetcher` service
2. Components request data through defined interfaces
3. UI updates based on user interactions and search criteria

## 🧩 Component Registration

Components such as buttons are registered at runtime using a registry pattern:
- `ButtonRegistry`: Central registry for button components
- `ButtonScanner`: Auto-discovers button components
- `withButtonRegistration`: HOC for registering buttons

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📄 License

[MIT](LICENSE)