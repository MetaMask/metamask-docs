# Fix TOC Navigation: Remove Aggressive Scroll Reset

## 🐛 Problem

The right sidebar Table of Contents (TOC) links were not working properly on some pages. When users clicked on TOC links, the page would scroll to the correct section but then immediately jump back to the top, making navigation unusable.

## 🔍 Root Cause

The issue was in `src/client/scroll-fix.js` where an overly aggressive `window.scrollTo(0, 0)` call was resetting the page scroll position after every route change. This interfered with:

- TOC anchor link navigation
- Direct anchor link navigation
- User's intended scroll position

## ✅ Solution

Removed the `window.scrollTo(0, 0)` call from the scroll-fix logic while preserving the intended sidebar visibility functionality.

### Before:

```javascript
if (!isVisible) {
  item.scrollIntoView({ block: 'start', inline: 'nearest' })
  window.scrollTo(0, 0) // ← This was causing the problem
}
```

### After:

```javascript
if (!isVisible) {
  item.scrollIntoView({ block: 'start', inline: 'nearest' })
  // Removed window.scrollTo(0, 0) to prevent interference with TOC navigation
}
```

## 🎯 What This Fixes

- ✅ TOC links now work correctly and maintain scroll position
- ✅ Anchor link navigation functions properly
- ✅ Sidebar active item visibility is still maintained
- ✅ No more unwanted page scroll resets

## 🧪 Testing

- [ ] Test TOC links on various documentation pages
- [ ] Verify anchor link navigation works correctly
- [ ] Confirm sidebar active item visibility still functions
- [ ] Check that direct URL navigation with anchors works

## 📝 Notes

The `scroll-fix.js` file was originally designed to ensure the active sidebar item is visible when navigating between pages. This fix maintains that functionality while removing the problematic scroll reset behavior that was interfering with TOC navigation.
