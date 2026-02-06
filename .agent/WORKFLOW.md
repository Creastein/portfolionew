# AI Agent Workflow

> **Panduan untuk AI Agent dalam mengerjakan task di project ini**  
> Setiap pekerjaan harus mengikuti workflow ini untuk konsistensi dan kualitas. bertindaklah sebagai progamer profesional, bukan sebagai AI


---

## 🎯 General Principles

1. **Always Read RULES.md First** - Sebelum memulai pekerjaan apapun
2. **Follow Existing Patterns** - Lihat code yang sudah ada sebagai referensi
3. **Test Before Committing** - Selalu test build dan dev server
4. **Document Changes** - Update walkthrough.md dengan perubahan yang dibuat
5. **Ask When Unclear** - Jika ada ambiguitas, tanyakan ke user

---

## 📋 Standard Workflow

### 1️⃣ Understanding the Request

**Actions:**
- [ ] Baca request user dengan teliti
- [ ] Identifikasi scope pekerjaan
- [ ] Cek apakah ada file terkait yang perlu direview
- [ ] Tanyakan jika ada yang tidak jelas

**Questions to Ask:**
- Apa tujuan utama dari perubahan ini?
- Apakah ada constraint atau requirement khusus?
- Apakah perubahan ini mempengaruhi component lain?

---

### 2️⃣ Planning Phase

**Actions:**
- [ ] Create/update `task.md` dengan checklist
- [ ] Set task boundary dengan mode `PLANNING`
- [ ] Review existing code yang akan diubah
- [ ] Identifikasi dependencies dan potential issues
- [ ] Create implementation plan jika perubahan kompleks

**Example Task.md:**
```markdown
# Feature: Add Dark Mode Toggle

## Planning
- [x] Review existing theme system
- [x] Identify components that need updates
- [ ] Design toggle UI

## Implementation
- [ ] Create theme context
- [ ] Update Navbar with toggle
- [ ] Update all components to use theme
- [ ] Add localStorage persistence

## Testing
- [ ] Test toggle functionality
- [ ] Test theme persistence
- [ ] Test all pages in both modes
```

---

### 3️⃣ Implementation Phase

**Actions:**
- [ ] Set task boundary dengan mode `EXECUTION`
- [ ] Follow code style dari RULES.md
- [ ] Make changes incrementally
- [ ] Update task.md progress
- [ ] Test after each significant change

**Code Guidelines:**
```typescript
// ✅ GOOD: Small, focused changes
// Step 1: Add type definition
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Step 2: Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Step 3: Create provider
const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // Implementation
};
```

**Testing Checklist:**
- [ ] Run `npm run build` - harus sukses
- [ ] Run `npm run dev` - harus jalan tanpa error
- [ ] Test di browser - visual check
- [ ] Test responsive - mobile, tablet, desktop
- [ ] Check console - tidak ada error/warning

---

### 4️⃣ Verification Phase

**Actions:**
- [ ] Set task boundary dengan mode `VERIFICATION`
- [ ] Run full build test
- [ ] Test all affected features
- [ ] Check for TypeScript errors
- [ ] Verify no console warnings
- [ ] Update walkthrough.md dengan hasil

**Verification Checklist:**
```bash
# 1. Build test
npm run build
# Expected: ✓ built in <time>ms, no errors

# 2. Dev server test
npm run dev
# Expected: Server running, no errors

# 3. Browser test
# - Navigate to all affected pages
# - Test all interactions
# - Check responsive design
# - Verify animations are smooth
```

---

### 5️⃣ Documentation Phase

**Actions:**
- [ ] Update walkthrough.md
- [ ] Add comments untuk complex logic
- [ ] Update RULES.md jika ada pattern baru
- [ ] Create screenshots jika ada perubahan UI

**Walkthrough Template:**
```markdown
# Feature: [Feature Name]

## Changes Made
- Modified `Component.tsx` - Added X functionality
- Created `NewComponent.tsx` - Handles Y
- Updated `types.ts` - Added Z interface

## Testing Results
- ✅ Build: Success (234ms)
- ✅ Dev Server: Running on port 3001
- ✅ Browser: All features working
- ✅ Responsive: Mobile, tablet, desktop tested

## Screenshots
![Feature Demo](path/to/screenshot.png)
```

---

## 🔧 Common Tasks & Workflows

### Adding a New Component

```markdown
1. Planning
   - [ ] Review RULES.md component guidelines
   - [ ] Check if similar component exists
   - [ ] Design component API (props)

2. Implementation
   - [ ] Create file: `components/ComponentName.tsx`
   - [ ] Add TypeScript interface for props
   - [ ] Implement component following structure in RULES.md
   - [ ] Add Tailwind styling
   - [ ] Add Framer Motion animations if needed

3. Integration
   - [ ] Import in parent component
   - [ ] Pass required props
   - [ ] Test rendering

4. Verification
   - [ ] Build test
   - [ ] Visual test in browser
   - [ ] Responsive test
```

### Fixing a Bug

```markdown
1. Investigation
   - [ ] Reproduce the bug
   - [ ] Check console for errors
   - [ ] Identify root cause
   - [ ] Check if bug affects other areas

2. Fix
   - [ ] Make minimal change to fix issue
   - [ ] Add comments explaining the fix
   - [ ] Test the fix

3. Verification
   - [ ] Verify bug is fixed
   - [ ] Test related functionality
   - [ ] Check for regressions
   - [ ] Document in walkthrough.md
```

### Refactoring Code

```markdown
1. Analysis
   - [ ] Identify code smell or improvement opportunity
   - [ ] Plan refactoring approach
   - [ ] Ensure tests exist (or create them)

2. Refactor
   - [ ] Make changes incrementally
   - [ ] Test after each step
   - [ ] Keep functionality identical

3. Verification
   - [ ] All tests pass
   - [ ] No visual changes (unless intended)
   - [ ] Performance is same or better
   - [ ] Code is more readable/maintainable
```

---

## 🚨 Error Handling

### When Build Fails

```markdown
1. Read error message carefully
2. Identify the file and line number
3. Common issues:
   - TypeScript type errors → Add proper types
   - Import errors → Check file paths
   - Syntax errors → Review code syntax
4. Fix and rebuild
5. Document the issue in walkthrough.md
```

### When Dev Server Shows Black Screen

```markdown
1. Check browser console for errors
2. Common causes:
   - Missing script tag in index.html
   - Import path errors
   - Component render errors
3. Fix the issue
4. Refresh browser
5. Document the fix
```

### When Animations Don't Work

```markdown
1. Check Framer Motion is imported
2. Verify animation props are correct
3. Check if element is in viewport
4. Test in different browsers
5. Check console for errors
```

---

## 📊 Quality Gates

Sebelum menganggap task selesai, pastikan semua ini ✅:

### Code Quality
- [ ] Follows RULES.md guidelines
- [ ] TypeScript types defined
- [ ] No `any` types used
- [ ] No unused imports/variables
- [ ] Consistent naming conventions

### Functionality
- [ ] Feature works as expected
- [ ] No console errors
- [ ] No console warnings
- [ ] Edge cases handled

### Performance
- [ ] Build succeeds
- [ ] Build time < 5s
- [ ] Bundle size reasonable
- [ ] Animations smooth (60fps)

### Documentation
- [ ] task.md updated
- [ ] walkthrough.md updated
- [ ] Complex logic commented
- [ ] Screenshots added if UI changes

---

## 🎨 UI/UX Guidelines

### When Adding UI Elements

```markdown
1. Design Consistency
   - [ ] Use existing color palette
   - [ ] Follow spacing system (4px, 8px, 16px, 24px, 32px)
   - [ ] Use existing font sizes
   - [ ] Match existing border radius

2. Responsive Design
   - [ ] Mobile first approach
   - [ ] Test on: 375px, 768px, 1024px, 1440px
   - [ ] Use Tailwind responsive classes (sm:, md:, lg:, xl:)

3. Animations
   - [ ] Subtle and purposeful
   - [ ] Duration: 200-300ms for micro, 500-800ms for transitions
   - [ ] Use ease-out for entrances
   - [ ] Use ease-in for exits

4. Accessibility
   - [ ] Proper semantic HTML
   - [ ] Keyboard navigation works
   - [ ] Focus states visible
   - [ ] Color contrast sufficient
```

---

## 🔄 Iteration Process

### When User Requests Changes

```markdown
1. Understand Feedback
   - [ ] Read feedback carefully
   - [ ] Identify what needs to change
   - [ ] Ask clarifying questions if needed

2. Update Plan
   - [ ] Update task.md with new requirements
   - [ ] Adjust implementation approach

3. Implement Changes
   - [ ] Make requested changes
   - [ ] Test thoroughly
   - [ ] Update documentation

4. Verify
   - [ ] Confirm changes meet requirements
   - [ ] Test all affected areas
   - [ ] Update walkthrough.md
```

---

## 📝 Communication Guidelines

### When Reporting Progress

```markdown
✅ GOOD:
"Completed navbar animation. Build successful (245ms). 
Tested on mobile and desktop. Updated walkthrough.md."

❌ BAD:
"Done."
```

### When Asking Questions

```markdown
✅ GOOD:
"Should the dark mode toggle be in the navbar or settings page? 
Current navbar has limited space."

❌ BAD:
"Where should I put this?"
```

### When Reporting Issues

```markdown
✅ GOOD:
"Found TypeScript error in Home.tsx line 45: 
Type 'string' is not assignable to type 'number'. 
Fixing by updating the type definition."

❌ BAD:
"There's an error."
```

---

## 🎯 Success Criteria

Sebuah task dianggap **SUKSES** jika:

1. ✅ **Functional**: Feature works as expected
2. ✅ **Quality**: Code follows RULES.md
3. ✅ **Tested**: Build passes, browser works
4. ✅ **Documented**: walkthrough.md updated
5. ✅ **Clean**: No errors or warnings
6. ✅ **Responsive**: Works on all screen sizes
7. ✅ **Performant**: Smooth and fast
8. ✅ **Accessible**: Keyboard and screen reader friendly

---

## 📚 Reference Files

Selalu check files ini sebelum mulai:

1. **RULES.md** - Code guidelines dan standards
2. **task.md** - Current task checklist
3. **walkthrough.md** - Documentation of changes
4. **Existing Components** - Pattern reference

---

## 🔄 Continuous Improvement

Setelah setiap task:

1. **Reflect**: Apa yang berjalan baik? Apa yang bisa lebih baik?
2. **Update**: Update RULES.md atau WORKFLOW.md jika ada pattern baru
3. **Learn**: Catat lessons learned di walkthrough.md

---

**Remember**: Workflow ini adalah panduan, bukan aturan kaku. Gunakan judgment yang baik dan prioritaskan kualitas hasil akhir.

---

**Last Updated**: 2026-02-06  
**Version**: 1.0.0
