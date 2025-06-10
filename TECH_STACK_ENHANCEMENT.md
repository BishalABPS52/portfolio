# Enhanced Tech Stack Component

## Overview
The `ExperienceCard.tsx` component has been completely redesigned to showcase your technical skills in a modern, interactive, and visually appealing way.

## Key Features

### 🎨 Modern Design
- **Gradient backgrounds** with smooth color transitions
- **Glass morphism effects** for a contemporary look
- **Consistent design system** following your portfolio's color scheme
- **Responsive design** that works perfectly on all devices

### ⚡ Interactive Elements
- **Expandable sections** - Click to expand/collapse tech categories
- **Hover effects** with smooth animations and tooltips
- **Skill level indicators** with color-coded progress bars
- **Badge hover effects** with scaling and smooth transitions

### 📊 Skill Proficiency Display
- **Visual skill levels**: Advanced (green), Intermediate (orange), Beginner (red)
- **Progress bars** showing proficiency percentage
- **Quick stats** displaying total technologies, categories, and advanced skills
- **Tooltips** with detailed proficiency information

### 🏗️ Technical Implementation
- **TypeScript** with proper type definitions
- **Framer Motion** for smooth animations
- **Lucide React** icons for consistent iconography
- **Performance optimized** with lazy loading and efficient re-renders

## Tech Categories

### 1. **Programming Languages** 💻
- C (Advanced)
- C++ (Advanced)
- JavaScript (Advanced)
- TypeScript (Intermediate)
- Python (Intermediate)
- PHP (Beginner)

### 2. **Frontend Development** 🎨
- React (Advanced)
- Next.js (Advanced)
- TailwindCSS (Advanced)
- HTML5 (Advanced)
- CSS3 (Advanced)
- Framer Motion (Intermediate)

### 3. **Backend & Database** 🗄️
- Node.js (Beginner)
- MongoDB (Beginner)
- MySQL (Beginner)
- SQL (Intermediate)
- MongoDB (Intermediate)
- MySQL (Intermediate)
- SQL (Intermediate)
- XAMPP (Beginner)

### 4. **Data Science** 🧠
- NumPy (Intermediate)
- Pandas (Intermediate)
- Matplotlib (Intermediate)
- Seaborn (Beginner)
- Jupyter (Intermediate)

### 5. **Tools & Design** 🛠️
- Git (Advanced)
- GitHub (Advanced)
- VS Code (Advanced)
- Adobe CC (Intermediate)
- Figma (Intermediate)
- Canva (Intermediate)
- Blender (Beginner)

### 6. **Game Development** 🎮
- Pygame (Intermediate)
- SFML (Beginner)
- Game Testing (Intermediate)

## Usage

The component automatically displays in the "Skills" section of your portfolio. Users can:

1. **View all categories** at a glance with color-coded icons
2. **Expand sections** to see detailed technology lists
3. **Hover over technologies** to see proficiency levels and tooltips
4. **See quick stats** at the top showing your technical breadth

## Customization

To add new technologies or update skill levels:

1. Edit the `TECH_STACK` constant in `ExperienceCard.tsx`
2. Add new categories by creating new objects with:
   - `icon`: Lucide React icon component
   - `color`: Hex color for the category
   - `techs`: Array of technologies with name, badge URL, and skill level

## Performance Benefits

- **Efficient rendering** with proper React keys and memoization
- **Smooth animations** with hardware acceleration
- **Lazy loading** of technology badge images
- **Optimized bundle size** with tree-shaking

## Accessibility

- **Keyboard navigation** support
- **Screen reader friendly** with proper ARIA labels
- **Color contrast** meeting WCAG guidelines
- **Focus indicators** for interactive elements

This enhanced tech stack component effectively showcases your technical expertise while providing an engaging user experience that reflects your attention to detail and modern development practices.
