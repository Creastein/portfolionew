# Project Rules & Guidelines

> **Aturan Pengembangan Portfolio Project**  
> Semua pekerjaan development harus mengikuti aturan ini untuk menjaga konsistensi dan kualitas code.

---

## 📋 Table of Contents

1. [Code Style & Formatting](#code-style--formatting)
2. [Component Guidelines](#component-guidelines)
3. [TypeScript Rules](#typescript-rules)
4. [Styling Guidelines](#styling-guidelines)
5. [File Organization](#file-organization)
6. [Git Workflow](#git-workflow)
7. [Testing Requirements](#testing-requirements)
8. [Performance Standards](#performance-standards)

---

## 🎨 Code Style & Formatting

### General Rules
- **Indentation**: 2 spaces (no tabs)
- **Line Length**: Maximum 100 characters
- **Quotes**: Single quotes untuk strings (`'hello'`)
- **Semicolons**: Tidak wajib, tapi konsisten (gunakan atau tidak gunakan di seluruh project)
- **Trailing Commas**: Gunakan untuk multi-line objects/arrays

### Naming Conventions
```typescript
// Components: PascalCase
const MyComponent: React.FC = () => { ... }

// Functions: camelCase
const handleClick = () => { ... }

// Constants: UPPER_SNAKE_CASE
const MAX_ITEMS = 10;

// Types/Interfaces: PascalCase
interface UserProfile { ... }
type ButtonVariant = 'primary' | 'secondary';

// Files: 
// - Components: PascalCase (MyComponent.tsx)
// - Utilities: camelCase (formatDate.ts)
// - Types: camelCase (types.ts)
```

---

## 🧩 Component Guidelines

### Component Structure
Setiap component harus mengikuti struktur ini:

```typescript
// 1. Imports
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from 'lucide-react';

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

// 3. Constants
const ANIMATION_DURATION = 0.3;

// 4. Component
const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
  // 4a. Hooks
  const [state, setState] = useState(false);
  
  // 4b. Effects
  useEffect(() => {
    // ...
  }, []);
  
  // 4c. Handlers
  const handleClick = () => {
    // ...
  };
  
  // 4d. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

// 5. Export
export default MyComponent;
```

### Component Rules
- ✅ **Functional Components Only** - Tidak menggunakan class components
- ✅ **TypeScript Props** - Semua props harus memiliki type definition
- ✅ **Single Responsibility** - Satu component = satu tanggung jawab
- ✅ **Max 300 Lines** - Jika lebih, split menjadi sub-components
- ✅ **Named Exports untuk Utils** - Default export hanya untuk components

---

## 📘 TypeScript Rules

### Type Safety
```typescript
// ✅ GOOD: Explicit types
interface User {
  id: string;
  name: string;
  email: string;
}

const user: User = { id: '1', name: 'John', email: 'john@example.com' };

// ❌ BAD: Any types
const user: any = { ... };

// ✅ GOOD: Union types
type Status = 'idle' | 'loading' | 'success' | 'error';

// ✅ GOOD: Optional properties
interface Config {
  required: string;
  optional?: number;
}
```

### Type Rules
- ❌ **Tidak boleh menggunakan `any`** - Gunakan `unknown` jika perlu
- ✅ **Gunakan Interfaces untuk Objects** - Type untuk unions/primitives
- ✅ **Export Types** - Jika digunakan di multiple files
- ✅ **Strict Mode** - `tsconfig.json` harus strict

---

## 🎨 Styling Guidelines

### Tailwind CSS Rules
```tsx
// ✅ GOOD: Organized classes (layout → spacing → colors → effects)
<div className="flex items-center gap-4 px-6 py-4 bg-surface rounded-lg hover:bg-surface-light transition-colors">

// ❌ BAD: Random order
<div className="bg-surface hover:bg-surface-light flex px-6 gap-4 items-center py-4 rounded-lg transition-colors">

// ✅ GOOD: Conditional classes
<div className={`base-class ${isActive ? 'active-class' : 'inactive-class'}`}>

// ✅ GOOD: Responsive design
<div className="text-sm md:text-base lg:text-lg">
```

### Color Palette (Tailwind Config)
```javascript
colors: {
  primary: '#135bec',      // Electric Blue
  secondary: '#92a4c9',    // Muted Blue-Grey
  background: '#050505',   // Deep Black
  surface: '#101622',      // Dark Blue-Black
  'surface-light': '#1c2536',
}
```

### Animation Rules
- ✅ **Framer Motion** untuk complex animations
- ✅ **Tailwind Transitions** untuk simple hover effects
- ✅ **Duration**: 200-300ms untuk micro-interactions, 500-800ms untuk page transitions
- ✅ **Easing**: `ease-out` untuk entrances, `ease-in` untuk exits

---

## 📁 File Organization

### Folder Structure
```
portfolionew/
├── components/          # Reusable UI components
│   ├── Navbar.tsx
│   └── FloatingDock.tsx
├── pages/              # Page components (routes)
│   ├── Home.tsx
│   ├── About.tsx
│   └── CaseStudy.tsx
├── types.ts            # Shared TypeScript types
├── App.tsx             # Main app component
├── index.tsx           # Entry point
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
└── tsconfig.json       # TypeScript configuration
```

### File Naming Rules
- **Components**: `PascalCase.tsx` (e.g., `Navbar.tsx`)
- **Pages**: `PascalCase.tsx` (e.g., `Home.tsx`)
- **Utils**: `camelCase.ts` (e.g., `formatDate.ts`)
- **Types**: `types.ts` atau `ComponentName.types.ts`
- **Constants**: `constants.ts` atau `CONSTANTS.ts`

---

## 🔄 Git Workflow

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Build process, dependencies

**Examples:**
```bash
feat(navbar): add scroll-based opacity animation
fix(home): resolve parallax performance issue
docs(readme): update installation instructions
refactor(components): extract reusable ServiceCard
```

### Branch Naming
```
feature/navbar-animation
fix/black-screen-issue
refactor/component-structure
docs/update-readme
```

---

## 🧪 Testing Requirements

### What to Test
- ✅ **Component Rendering** - Apakah component render tanpa error
- ✅ **User Interactions** - Click, hover, form submissions
- ✅ **Edge Cases** - Empty states, loading states, error states
- ✅ **Accessibility** - Keyboard navigation, screen readers

### Testing Tools (Future)
- **Vitest** - Unit testing
- **React Testing Library** - Component testing
- **Playwright** - E2E testing

---

## ⚡ Performance Standards

### Build Requirements
- ✅ **Build Time**: < 5 seconds
- ✅ **Bundle Size**: < 500KB (gzipped)
- ✅ **No TypeScript Errors**: Build harus sukses tanpa error
- ✅ **No Console Warnings**: Production build harus clean

### Runtime Performance
- ✅ **First Contentful Paint**: < 1.5s
- ✅ **Time to Interactive**: < 3s
- ✅ **Smooth Animations**: 60fps minimum
- ✅ **Image Optimization**: Lazy loading, proper formats

### Code Splitting
```typescript
// ✅ GOOD: Lazy load pages
const CaseStudy = lazy(() => import('./pages/CaseStudy'));

// ✅ GOOD: Dynamic imports for heavy libraries
const HeavyComponent = lazy(() => import('./components/HeavyComponent'));
```

---

## 🚫 Common Mistakes to Avoid

### ❌ DON'T
```typescript
// ❌ Inline styles (gunakan Tailwind)
<div style={{ color: 'red' }}>

// ❌ Any types
const data: any = fetchData();

// ❌ Nested ternaries (sulit dibaca)
{isLoading ? <Spinner /> : isError ? <Error /> : <Content />}

// ❌ Magic numbers
setTimeout(() => {}, 300);

// ❌ Unused imports
import { useState } from 'react'; // tapi tidak digunakan
```

### ✅ DO
```typescript
// ✅ Tailwind classes
<div className="text-red-500">

// ✅ Proper types
const data: ApiResponse = fetchData();

// ✅ Early returns
if (isLoading) return <Spinner />;
if (isError) return <Error />;
return <Content />;

// ✅ Named constants
const ANIMATION_DELAY = 300;
setTimeout(() => {}, ANIMATION_DELAY);

// ✅ Clean imports
import { useState, useEffect } from 'react';
```

---

## 📝 Documentation Requirements

### Component Documentation
Setiap component harus memiliki comment header:

```typescript
/**
 * Navbar Component
 * 
 * Displays the main navigation bar with scroll-based animations.
 * Features:
 * - Transparent on hero, solid on scroll
 * - Side menu panel with social links
 * - Jakarta timezone display
 * 
 * @example
 * <Navbar />
 */
const Navbar: React.FC = () => {
  // ...
};
```

### Complex Logic Documentation
```typescript
// ✅ GOOD: Explain WHY, not WHAT
// Using transform instead of top/left for better performance (GPU acceleration)
const y = useTransform(scrollY, [0, 400], [0, 100]);

// ❌ BAD: Obvious comments
// Set state to true
setState(true);
```

---

## 🔧 Development Workflow

### Before Starting Work
1. ✅ Pull latest changes: `git pull origin main`
2. ✅ Install dependencies: `npm install`
3. ✅ Create feature branch: `git checkout -b feature/your-feature`
4. ✅ Start dev server: `npm run dev`

### During Development
1. ✅ Follow code style guidelines
2. ✅ Write TypeScript types
3. ✅ Test in browser frequently
4. ✅ Commit small, logical changes

### Before Committing
1. ✅ Run build: `npm run build`
2. ✅ Check for TypeScript errors
3. ✅ Review changes: `git diff`
4. ✅ Write descriptive commit message
5. ✅ Push to remote: `git push origin feature/your-feature`

---

## 🎯 Quality Checklist

Sebelum menganggap pekerjaan selesai, pastikan:

- [ ] Code follows style guidelines
- [ ] All TypeScript types defined
- [ ] No console errors or warnings
- [ ] Build succeeds without errors
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] Animations are smooth (60fps)
- [ ] Accessibility considerations met
- [ ] Code is documented
- [ ] Git commit messages are descriptive
- [ ] No unused imports or variables

---

## 📚 Resources

### Official Documentation
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Vite Guide](https://vitejs.dev/guide/)

### Code Examples
Lihat existing components sebagai referensi:
- `components/Navbar.tsx` - Complex component with animations
- `components/FloatingDock.tsx` - Simple reusable component
- `pages/Home.tsx` - Page structure and layout

---

## 🔄 Updates

**Last Updated**: 2026-02-06  
**Version**: 1.0.0

Aturan ini akan di-update seiring berkembangnya project. Jika ada saran atau perubahan, silakan diskusikan dengan tim.

---

**Remember**: Aturan ini dibuat untuk membantu, bukan membatasi. Jika ada kasus khusus yang memerlukan pengecualian, diskusikan terlebih dahulu.
