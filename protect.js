/**
 * SAHAPHAN Security & Shortcut Protection
 * Blocks Ctrl+S, F12, DevTools shortcuts, and View Source
 */
(function() {
  'use strict';

  // Block Keyboard Shortcuts in Capture Phase
  window.addEventListener('keydown', function(e) {
    const key = e.key ? e.key.toLowerCase() : '';
    const code = e.keyCode || e.which;

    // 1. Block F12 (Developer Tools)
    if (key === 'f12' || code === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // 2. Block Ctrl+S / Cmd+S (Save Page)
    if ((e.ctrlKey || e.metaKey) && (key === 's' || code === 83)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // 3. Block Ctrl+Shift+I / Cmd+Option+I (DevTools Inspect)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (key === 'i' || code === 73)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // 4. Block Ctrl+Shift+J / Cmd+Option+J (DevTools Console)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (key === 'j' || code === 74)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // 5. Block Ctrl+Shift+C / Cmd+Option+C (Inspect Element)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (key === 'c' || code === 67)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // 6. Block Ctrl+U / Cmd+U (View Page Source)
    if ((e.ctrlKey || e.metaKey) && (key === 'u' || code === 85)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);

  // Block Right Click (Context Menu) - Allow inside text inputs & textarea so users can paste
  window.addEventListener('contextmenu', function(e) {
    const targetTag = e.target && e.target.tagName ? e.target.tagName.toUpperCase() : '';
    if (targetTag === 'INPUT' || targetTag === 'TEXTAREA') {
      return true;
    }
    e.preventDefault();
    return false;
  }, false);
})();
