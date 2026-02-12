/**
 * Centralized ARIA labels and accessibility constants.
 * Used across components for consistent accessible naming.
 */
export const ariaLabels = {
  navigation: {
    main: 'Main navigation',
    mobileMenu: 'Toggle mobile menu',
    skipToContent: 'Skip to main content',
  },
  search: {
    input: 'Search the preservation directory',
    clearSearch: 'Clear search',
    clearLocation: 'Clear location filter',
  },
  map: {
    region: 'Interactive map of preservation stakeholders',
  },
  footer: {
    region: 'Site footer',
  },
} as const;
