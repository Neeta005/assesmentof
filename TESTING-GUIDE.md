# Premier Schools Exhibition - Testing & QA Guide

## Overview
This guide provides comprehensive testing procedures for the Premier Schools Exhibition landing page to ensure WCAG 2.2 AA compliance, cross-browser functionality, and optimal user experience.

## Quick Start
1. Open `accessibility-checklist.html` in your browser to track progress
2. Run `validation-test.js` in the browser console (automatic on page load)
3. Use the tools listed below for comprehensive validation

## Accessibility Testing (WCAG 2.2 AA)

### Keyboard Navigation
- [ ] Tab through all interactive elements (buttons, links, form fields)
- [ ] Focus indicators are clearly visible
- [ ] Tab order is logical (top to bottom, left to right)
- [ ] No keyboard traps where focus gets stuck

**Test:** Press `Tab` to navigate the entire page without using mouse

### Screen Reader Testing
#### NVDA (Windows - Free)
```
1. Install: https://www.nvaccess.org/download/
2. Start NVDA (Ctrl + Alt + N)
3. Navigate page with arrow keys
4. Test headings with H key
5. Test form labels with Tab
```

#### JAWS (Windows - Premium)
```
1. Use keyboard: Insert + H for headings
2. Insert + F for form labels
3. Insert + G for graphics with alt text
```

#### VoiceOver (macOS/iOS - Built-in)
```
Mac: Cmd + F5 to enable
iOS: Settings > Accessibility > VoiceOver
Test: Use VO + arrow keys to navigate
```

### Color Contrast
- Use Axe DevTools to check contrast ratios
- Minimum 4.5:1 for normal text
- Minimum 3:1 for large text (18pt+)

**Test Online:** https://webaim.org/resources/contrastchecker/

### Form Accessibility
- [ ] All inputs have associated labels
- [ ] Required fields are marked
- [ ] Error messages are clear
- [ ] Success feedback is provided

## Responsive Design Testing

### Mobile (320px - 480px)
- [ ] Text is readable without zooming
- [ ] Touch targets are 44px minimum
- [ ] Horizontal scroll is not required
- [ ] Carousels work with swipe

```
Device: iPhone SE, iPhone 12 Mini
Browsers: Chrome, Safari
```

### Tablet (481px - 1024px)
- [ ] Layout uses available space well
- [ ] Touch interaction works smoothly
- [ ] Images scale properly

```
Device: iPad Air, iPad Pro
Browsers: Chrome, Safari
```

### Desktop (1025px+)
- [ ] Multi-column layouts work
- [ ] Hover states function properly
- [ ] Large images display crisply

```
Resolution: 1366x768, 1920x1080, 2560x1440
```

## Cross-Browser Testing

### Chrome
- [ ] Latest 2 versions
- [ ] Run Lighthouse audit (Cmd+Shift+I → Lighthouse)
- [ ] Test responsive mode (Cmd+Shift+M)

### Firefox
- [ ] Latest 2 versions
- [ ] Check Inspector for HTML validity
- [ ] Test accessibility inspector

### Safari
- [ ] Latest 2 versions
- [ ] Test on macOS
- [ ] Test on iOS if possible

### Edge
- [ ] Latest 2 versions
- [ ] Similar functionality as Chrome

## Interactive Components Testing

### Hero Slider
- [ ] Auto-play starts on page load
- [ ] Pause button works
- [ ] Previous/Next buttons function
- [ ] Keyboard arrow keys work
- [ ] Mouse hover pauses animation
- [ ] Swipe works on touch devices

### School Carousel
- [ ] Animation is smooth
- [ ] Pauses on hover
- [ ] No continuous scroll issues
- [ ] Mobile version converts to slider

### School Cards
- [ ] Desktop: 4 columns displayed
- [ ] Tablet: 2 columns displayed
- [ ] Mobile: 1 column or slider with swipe
- [ ] Hover effects work

### Features Carousel
- [ ] Next/Previous buttons work
- [ ] Carousel scrolls smoothly
- [ ] Cards maintain consistent height
- [ ] Keyboard navigation works

### Enquiry Form
- [ ] Validation works in real-time
- [ ] Required fields are marked
- [ ] Error messages appear
- [ ] Submit button is clickable
- [ ] Form resets after submission

## Automated Testing Tools

### Axe DevTools
```
1. Install: https://www.deque.com/axe/devtools/
2. Run scan: Open DevTools > Axe DevTools > Scan
3. Review issues (Critical, Serious, Moderate, Minor)
4. All Critical should be fixed
```

### Google Lighthouse
```
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Click "Analyze Page Load"
4. Check: Performance, Accessibility, Best Practices, SEO
5. Target: >90 on each metric
```

### W3C Validators
```
HTML: https://validator.w3.org/
CSS: https://jigsaw.w3.org/css-validator/

Copy-paste code or upload files
Fix all errors, warnings reviewed
```

### WAVE by WebAIM
```
1. Visit: https://wave.webaim.org/
2. Enter page URL or paste code
3. Review errors and contrast issues
4. Check structure and ARIA
```

## Performance Testing

### Load Time
- [ ] Page loads in < 3 seconds on 4G
- [ ] Images are optimized
- [ ] CSS/JS are minified (production)

### Browser DevTools
```
1. Open DevTools (F12)
2. Network tab: Check file sizes
3. Performance tab: Record page load
4. Analyze: Scripts, Rendering, Layout shifts
```

### Lighthouse Performance Score
- [ ] Target: > 90 for Performance
- [ ] Check: First Contentful Paint (FCP)
- [ ] Check: Largest Contentful Paint (LCP)
- [ ] Check: Cumulative Layout Shift (CLS)

## Mobile Testing Checklist

### Touch Interactions
- [ ] Buttons are 44px minimum (11mm)
- [ ] Double-tap zoom works
- [ ] Pinch zoom works
- [ ] Touch doesn't trigger unwanted hover states

### Orientation
- [ ] Portrait mode works
- [ ] Landscape mode works
- [ ] No content is cut off
- [ ] Rotating doesn't break layout

### Common Issues
- [ ] No hover-only content
- [ ] Tap targets don't overlap
- [ ] Animations aren't too fast
- [ ] Mobile keyboard doesn't cover form

## Testing Reports

### Generate Accessibility Report
```
Use Axe DevTools Export Feature:
1. Run scan
2. Click "Export"
3. Choose format (CSV, JSON)
4. Share with team
```

### Generate Performance Report
```
Using Lighthouse:
1. Generate report
2. Click "Copy JSON"
3. Save for tracking
4. Track improvements over time
```

## CI/CD Integration

### Automated Testing (Future)
```bash
# Install pa11y CLI
npm install -g pa11y-ci

# Configure pa11y-ci.json
# Run: pa11y-ci

# Install axe-core
npm install axe-core

# Run tests in pipeline
```

## Checklist Summary

- [ ] All automated tests passing (Axe, W3C, Lighthouse)
- [ ] Manual keyboard navigation complete
- [ ] Screen reader testing done (NVDA, JAWS, VoiceOver)
- [ ] Mobile responsive testing complete
- [ ] Cross-browser testing complete
- [ ] Form validation tested
- [ ] Interactive components tested
- [ ] Performance acceptable (>90 Lighthouse)
- [ ] No console errors
- [ ] Accessibility score AA or higher

## Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM Resources](https://webaim.org/)
- [Axe Documentation](https://www.deque.com/axe/devtools/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)

## Support

For accessibility questions:
- [ARIA Best Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Color Contrast](https://webaim.org/articles/contrast/)
- [Accessible Forms](https://www.smashingmagazine.com/2022/09/inline-validation-web-forms-ux/)
