# Responsive Design Documentation

## Breakpoints

The site follows a mobile-first approach with the following breakpoints:

```typescript
- Mobile: 0-767px
- Tablet: 768px-1023px
- Desktop: 1024px+
```

## Development Tools

### ResponsiveTester (Ctrl/Cmd + Shift + T)
- Shows current viewport dimensions
- Provides device presets for testing
- Toggle with keyboard shortcut

### DevTools Component

#### Accessibility Overlay (Ctrl/Cmd + Shift + A)
- Green outlines: Elements with ARIA roles
- Blue outlines: Elements with aria-labels
- Red outlines: Interactive elements missing aria-labels

#### Touch Target Visualization (Ctrl/Cmd + Shift + M)
- Shows 44px touch target areas around interactive elements
- Helps identify elements that may be too close together
- Ensures proper spacing for mobile interactions

#### Performance Monitoring
- Real-time performance metrics displayed in top-left corner
- Tracks paint and measure events
- Helps identify potential performance issues

## Best Practices

### Typography
- Base font size: 16px
- Scale:
  - Mobile: 0.875rem - 2rem (14px - 32px)
  - Tablet: 0.875rem - 2.5rem (14px - 40px)
  - Desktop: 1rem - 3rem (16px - 48px)

### Spacing
- Mobile:
  - xs: 0.25rem (4px)
  - sm: 0.5rem (8px)
  - md: 1rem (16px)
  - lg: 1.5rem (24px)
  - xl: 2rem (32px)

- Tablet/Desktop:
  - xs: 0.5rem (8px)
  - sm: 0.75rem-1rem (12-16px)
  - md: 1.25rem-1.5rem (20-24px)
  - lg: 2rem-2.5rem (32-40px)
  - xl: 3rem-4rem (48-64px)

### Touch Targets
- Minimum size: 44x44px
- Clear spacing between interactive elements
- Larger hit areas for important actions

### Images
- Responsive sizing using Next.js Image component
- Proper srcset and sizes attributes
- Mobile-optimized versions for smaller screens

### Layout
- Mobile:
  - Single column layout
  - Stacked components
  - Simplified navigation
- Tablet:
  - Two column grid where appropriate
  - Extended navigation options
- Desktop:
  - Multi-column grid layout
  - Full navigation
  - Enhanced visual elements

### Performance Considerations
- Lazy loading for off-screen images
- Code splitting for route-based chunks
- Font optimization with subsetting
- Responsive image loading
- CSS containment for layout isolation

## Testing Instructions

1. Use keyboard shortcuts to toggle development tools:
   - Ctrl/Cmd + Shift + T: Responsive Tester
   - Ctrl/Cmd + Shift + A: Accessibility Overlay
   - Ctrl/Cmd + Shift + M: Touch Target Visualization

2. Test across different device presets in ResponsiveTester

3. Verify touch targets using the visualization overlay

4. Monitor performance metrics during interactions

5. Check accessibility using the overlay for:
   - ARIA roles and labels
   - Interactive element accessibility
   - Navigation and focus management
