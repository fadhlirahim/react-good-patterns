import React, { useState } from 'react';

/**
 * AccessibleTheming component that demonstrates accessibility best practices and theming
 */
const AccessibleTheming: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [expanded, setExpanded] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  // Dynamic styles based on theme
  const themeStyles = {
    backgroundColor: theme === 'light' ? 'var(--color-bg-light)' : 'var(--color-bg-dark)',
    color: theme === 'light' ? 'var(--color-text-light)' : 'var(--color-text-dark)',
    borderColor: theme === 'light' ? 'var(--color-border-light)' : 'var(--color-border-dark)',
  };

  return (
    <div
      className="card shadow"
      style={{
        ...themeStyles,
        transition: 'background-color 0.3s, color 0.3s, border-color 0.3s'
      }}
    >
      <div className="card-header">
        <h3 className="card-title">Accessibility & Theming</h3>
      </div>
      <hr style={{ margin: 0, borderTop: `1px solid ${themeStyles.borderColor}` }} />
      <div className="card-content flex flex-col gap-4">
        {/* Theme Toggle Button - Accessible */}
        <div className="flex justify-between items-center">
          <span>Current theme: {theme}</span>
          <button
            onClick={toggleTheme}
            className="button"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            Toggle Theme
          </button>
        </div>

        {/* Accessible Accordion */}
        <div className="border rounded" style={{ borderColor: themeStyles.borderColor }}>
          <button
            className="w-full p-3 text-left flex justify-between items-center"
            onClick={toggleAccordion}
            aria-expanded={expanded}
            aria-controls="accordion-content"
          >
            <span className="font-medium">Accessibility Features</span>
            <span aria-hidden="true">{expanded ? '▲' : '▼'}</span>
          </button>

          <div
            id="accordion-content"
            className="p-3 border-t"
            style={{
              display: expanded ? 'block' : 'none',
              borderColor: themeStyles.borderColor
            }}
          >
            <ul className="list-disc pl-5 space-y-2">
              <li>Semantic HTML elements for better screen reader support</li>
              <li>ARIA attributes for enhanced accessibility</li>
              <li>Keyboard navigation support</li>
              <li>Sufficient color contrast ratios</li>
              <li>Focus indicators for keyboard users</li>
            </ul>
          </div>
        </div>

        {/* Form Controls with Accessible Labels */}
        <div className="form-group">
          <label htmlFor="name-input" className="form-label">Your Name</label>
          <input
            type="text"
            id="name-input"
            className="input"
            placeholder="Enter your name"
            style={{
              backgroundColor: theme === 'light' ? '#fff' : '#333',
              color: theme === 'light' ? '#333' : '#fff',
              borderColor: themeStyles.borderColor
            }}
          />
        </div>

        {/* Accessible Button Group */}
        <div role="group" aria-label="Rating options" className="flex gap-2">
          {[1, 2, 3, 4, 5].map(rating => (
            <button
              key={rating}
              className="button button-secondary flex-1"
              aria-label={`Rate ${rating} stars`}
              style={{
                backgroundColor: theme === 'light' ? '#f0f0f0' : '#444',
                color: theme === 'light' ? '#333' : '#fff',
                borderColor: themeStyles.borderColor
              }}
            >
              {rating} ★
            </button>
          ))}
        </div>
      </div>

      {/* CSS Variables for theming would typically be in a global stylesheet */}
    </div>
  );
};

export default AccessibleTheming;
