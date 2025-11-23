/*
  DailyCalc.org Centralized Tailwind Configuration
  
  This file contains the configuration for Tailwind CSS used across the entire site.
  It now includes CUSTOM COMPONENTS (.calc-grid-5, .calc-card-compact, .calc-header, .calc-subcat-title) 
  so you don't have to repeat code on every page.
*/

tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
                heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif']
            },
            colors: {
                brand: {
                    red: '#F1203D',
                    dark: '#050505'
                }
            },
            boxShadow: {
                soft: '0 12px 40px rgba(15, 23, 42, 0.08)',
                'soft-glow': '0 12px 40px -8px rgba(241, 32, 61, 0.15), 0 4px 6px -1px rgba(241, 32, 61, 0.08)'
            }
        }
    },
    plugins: [
        function({ addComponents, theme }) {
            addComponents({
                /* 1. CENTRALIZED GRID LAYOUT */
                '.calc-grid-5': {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gap: theme('spacing.3'), // gap-3
                    // marginTop removed here so it can be controlled by the section
                    '@media (min-width: 640px)': { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
                    '@media (min-width: 768px)': { gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' },
                    '@media (min-width: 1024px)': { gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' },
                },

                /* 2. CENTRALIZED CARD STYLE */
                '.calc-card-compact': {
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: theme('borderRadius.lg'),
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.100'),
                    backgroundColor: theme('colors.slate.50'),
                    padding: theme('spacing.3'),
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                    
                    '> div': {
                        marginBottom: theme('spacing.2'),
                        display: 'flex',
                        height: theme('spacing.10'),
                        width: theme('spacing.10'),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '9999px',
                        backgroundColor: '#ffffff',
                        fontSize: theme('fontSize.xl'),
                        color: theme('colors.brand.red'),
                        boxShadow: theme('boxShadow.sm'),
                        transition: 'transform 0.2s ease',
                    },

                    'h3': {
                        fontFamily: theme('fontFamily.heading'),
                        fontSize: theme('fontSize.xs'),
                        fontWeight: '600',
                        color: theme('colors.slate.900'),
                        transition: 'color 0.2s ease',
                    },

                    'p': {
                        marginTop: '0.125rem',
                        fontSize: '10px',
                        lineHeight: '1.25',
                        color: theme('colors.slate.500'),
                    },

                    '&:hover': {
                        borderColor: 'rgba(241, 32, 61, 0.3)',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 10px 15px -3px rgba(241, 32, 61, 0.05), 0 4px 6px -2px rgba(241, 32, 61, 0.05)',
                    },
                    '&:hover > div': {
                        transform: 'scale(1.1)',
                    },
                    '&:hover h3': {
                        color: theme('colors.brand.red'),
                    }
                },

                /* 3. CENTRALIZED PAGE HEADER STYLE */
                '.calc-header': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme('spacing.4'),
                    marginBottom: theme('spacing.8'),
                },

                '.calc-icon': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: theme('spacing.12'), 
                    width: theme('spacing.12'),
                    borderRadius: '9999px',
                    backgroundImage: `linear-gradient(135deg, #f97316, ${theme('colors.brand.red')})`, 
                    color: '#ffffff',
                    fontSize: theme('fontSize.2xl'),
                    flexShrink: 0,
                },

                '.calc-title': {
                    fontFamily: theme('fontFamily.heading'),
                    fontSize: theme('fontSize.2xl'),
                    fontWeight: '600',
                    color: theme('colors.brand.dark'),
                    lineHeight: '1.2',
                    
                    'span': {
                        backgroundImage: `linear-gradient(to right, ${theme('colors.brand.red')}, ${theme('colors.brand.dark')})`,
                        backgroundClip: 'text',
                        '-webkit-background-clip': 'text',
                        color: 'transparent',
                    }
                },

                '.calc-desc': {
                    marginTop: theme('spacing.1'),
                    fontSize: theme('fontSize.sm'),
                    color: theme('colors.slate.600'),
                },

                /* 4. SUBCATEGORY TITLE STYLE */
                '.calc-subcat-title': {
                    fontFamily: theme('fontFamily.heading'),
                    fontSize: theme('fontSize.lg'),
                    fontWeight: '600',
                    color: theme('colors.brand.dark'),
                    marginBottom: theme('spacing.4'),
                    marginTop: theme('spacing.8'),
                    paddingBottom: theme('spacing.2'),
                    borderBottomWidth: '1px',
                    borderBottomColor: theme('colors.slate.200'),
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme('spacing.2'),
                    
                    'i': {
                        color: theme('colors.brand.red'),
                        fontSize: theme('fontSize.base'),
                    }
                }
            })
        }
    ]
}
