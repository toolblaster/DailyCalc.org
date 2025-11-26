/*
  DailyCalc.org Centralized Tailwind Configuration
  [2025-11-07] Updated .calc-card-compact border to slate-400
  [2025-11-27] Increased global text contrast for accessibility (Slate-500 -> Slate-600/700)
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
                    dark: '#050505',
                    green: '#518428',      
                    'green-dark': '#3e651e' 
                }
            },
            boxShadow: {
                soft: '0 12px 40px rgba(15, 23, 42, 0.08)',
                'soft-glow': '0 12px 40px -8px rgba(241, 32, 61, 0.15), 0 4px 6px -1px rgba(241, 32, 61, 0.08)'
            }
        }
    },
    plugins: [
        function({ addComponents, addBase, theme }) {
            
            /* 0. GLOBAL TYPOGRAPHY */
            addBase({
                'h2': { 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    lineHeight: '1.3',
                    fontFamily: theme('fontFamily.heading'),
                    color: theme('colors.brand.dark')
                },
                'h3': { 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    lineHeight: '1.4',
                    fontFamily: theme('fontFamily.heading'),
                    color: theme('colors.slate.800')
                },
            });

            /* 1. UNIVERSAL CALCULATOR UI COMPONENTS */
            addComponents({
                /* --- Compact Inputs --- */
                '.compact-input': {
                    width: '100%',
                    padding: '2px 6px',
                    fontSize: '13px',
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.300'),
                    borderRadius: '3px',
                    textAlign: 'right',
                    backgroundColor: '#ffffff',
                    transition: 'border-color 0.15s ease-in-out',
                    height: '28px',
                    color: theme('colors.slate.900'), /* Forced High Contrast Input Text */
                    '&:focus': {
                        outline: 'none',
                        borderColor: theme('colors.brand.green'),
                        boxShadow: `0 0 0 1px ${theme('colors.brand.green')}`,
                    },
                    '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                        '-webkit-appearance': 'none',
                        margin: '0',
                    },
                    '-moz-appearance': 'textfield',
                },

                '.compact-select': {
                    padding: '2px 20px 2px 6px',
                    fontSize: '13px',
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.300'),
                    borderRadius: '3px',
                    backgroundColor: 'white',
                    color: theme('colors.slate.900'), /* Forced High Contrast */
                    height: '28px',
                    '&:focus': {
                        outline: 'none',
                        borderColor: theme('colors.brand.green'),
                        boxShadow: `0 0 0 1px ${theme('colors.brand.green')}`,
                    },
                },

                /* --- Input Layout Rows --- */
                '.input-row': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '6px',
                    marginBottom: '5px',
                },

                '.input-label': {
                    fontSize: '12px',
                    fontWeight: '600', /* Bolder */
                    color: theme('colors.slate.800'), /* Darker (was 700) */
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                },

                /* --- Headers --- */
                '.calc-tool-header': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: theme('spacing.2'),
                    borderTopLeftRadius: theme('borderRadius.md'),
                    borderTopRightRadius: theme('borderRadius.md'),
                    backgroundImage: `linear-gradient(to right, ${theme('colors.brand.dark')}, ${theme('colors.brand.red')})`,
                    padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
                    color: 'white',
                    boxShadow: theme('boxShadow.sm'),
                },

                '.result-header': {
                    backgroundImage: `linear-gradient(to right, ${theme('colors.brand.green')}, ${theme('colors.brand.green-dark')})`,
                    padding: `${theme('spacing.3')} ${theme('spacing.4')}`,
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: '10',
                },

                /* --- Containers --- */
                '.content-section': {
                    backgroundColor: '#ffffff',
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.400'),
                    borderRadius: theme('borderRadius.lg'),
                    boxShadow: theme('boxShadow.sm'),
                    overflow: 'hidden',
                    color: theme('colors.slate.700'), /* Base text color for content */
                },
                
                '.info-card': {
                    backgroundColor: theme('colors.slate.50'),
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.400'),
                    borderRadius: theme('borderRadius.md'),
                    padding: theme('spacing.4'),
                    marginBottom: theme('spacing.4'),
                    height: '100%',
                    color: theme('colors.slate.700'), /* Darker text for info cards */
                },

                /* --- Feature & Stat Cards --- */
                '.feature-card': {
                    display: 'flex',
                    gap: theme('spacing.2'),
                    alignItems: 'flex-start',
                    padding: theme('spacing.2'),
                    borderRadius: theme('borderRadius.DEFAULT'),
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.300'), /* Slightly darker border */
                    backgroundColor: '#ffffff',
                    transition: 'all 0.2s ease',
                    boxShadow: theme('boxShadow.sm'),
                    '&:hover': {
                        borderColor: theme('colors.slate.400'),
                        transform: 'translateY(-1px)',
                        boxShadow: theme('boxShadow.md'),
                    }
                },

                '.stat-card': {
                    backgroundColor: '#ffffff',
                    padding: theme('spacing.3'),
                    borderRadius: theme('borderRadius.DEFAULT'),
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.200'),
                    borderLeftWidth: '4px', 
                    boxShadow: theme('boxShadow.sm'),
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: '100%',
                },

                /* --- NEW: Widget Buttons (Sidebar Actions) --- */
                '.widget-btn': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '32px',
                    width: '100%',
                    borderRadius: '6px',
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.200'),
                    backgroundColor: '#ffffff',
                    color: theme('colors.slate.600'), /* Darker (was 500) */
                    fontSize: '13px',
                    transition: 'all 0.15s ease',
                    cursor: 'pointer',
                    '&:hover': {
                        borderColor: theme('colors.slate.300'),
                        backgroundColor: theme('colors.slate.50'),
                        color: theme('colors.brand.dark'),
                    },
                    '&.active': {
                        borderColor: theme('colors.brand.green'),
                        backgroundColor: '#f0fdf4', // green-50
                        color: theme('colors.brand.green'),
                    }
                },

                /* --- Legacy & Other --- */
                '.sidebar-nav-link': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme('spacing.2'),
                    fontSize: '13px', 
                    color: theme('colors.slate.700'), /* Darker link color (was blue-600/slate) */
                    padding: '0.1rem 0',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        color: theme('colors.brand.red'),
                        textDecoration: 'underline',
                    },
                    'i': {
                        fontSize: '10px',
                        color: theme('colors.slate.500'), /* Darker Icon (was 400) */
                        width: '14px', 
                        textAlign: 'center',
                        transition: 'color 0.2s ease',
                    },
                    '&:hover i': {
                        color: theme('colors.brand.red'),
                    }
                },
                '.chart-segment': {
                    transition: 'stroke-dasharray 0.6s ease-out, opacity 0.2s ease, stroke-width 0.2s ease, filter 0.2s ease',
                    cursor: 'pointer',
                    transformOrigin: 'center',
                    '&:hover': {
                        opacity: '1 !important',
                        strokeWidth: '12 !important',
                        filter: 'drop-shadow(0px 0px 2px rgba(0,0,0,0.2))',
                    }
                },
                '.legend-row': {
                    transition: 'background-color 0.2s ease',
                    borderRadius: '2px',
                    '&.highlight': {
                        backgroundColor: theme('colors.slate.100'),
                        fontWeight: '600',
                    }
                },
                '.slim-scroll': {
                    '&::-webkit-scrollbar': { height: '6px', width: '6px' },
                    '&::-webkit-scrollbar-thumb': { backgroundColor: theme('colors.slate.300'), borderRadius: '3px' }
                },
                '.ad-box': {
                    display: 'flex',
                    height: '250px',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: theme('borderRadius.md'),
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.200'),
                    backgroundColor: theme('colors.slate.50'),
                },
                '.calc-option-group': {
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.200'),
                    padding: theme('spacing.2'),
                    borderRadius: theme('borderRadius.DEFAULT'),
                    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
                },
                '.calc-results-summary': {
                    marginTop: theme('spacing.3'),
                    borderRadius: theme('borderRadius.DEFAULT'),
                    backgroundColor: theme('colors.slate.100'),
                    padding: theme('spacing.2'),
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.200'),
                },
                '.calc-grid-5': {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    gap: theme('spacing.2'), 
                    '@media (min-width: 640px)': { gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' },
                    '@media (min-width: 768px)': { gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' },
                    '@media (min-width: 1024px)': { gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }, 
                },
                '.calc-card-compact': {
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: theme('borderRadius.md'), 
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.400'), 
                    backgroundColor: theme('colors.slate.50'),
                    padding: theme('spacing.1.5'), 
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                    '> div': {
                        marginBottom: theme('spacing.1'), 
                        display: 'flex',
                        height: theme('spacing.7'), 
                        width: theme('spacing.7'),  
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '9999px',
                        backgroundColor: '#ffffff',
                        fontSize: theme('fontSize.sm'), 
                        color: theme('colors.brand.red'),
                        boxShadow: theme('boxShadow.sm'),
                        transition: 'transform 0.2s ease',
                    },
                    'h3': {
                        fontFamily: theme('fontFamily.heading'),
                        fontSize: '14px', 
                        fontWeight: '600',
                        lineHeight: '1.1',
                        color: theme('colors.slate.900'),
                        transition: 'color 0.2s ease',
                    },
                    'p': {
                        marginTop: '0',
                        fontSize: '9px', 
                        lineHeight: '1.1',
                        color: theme('colors.slate.600'), /* Darker description text (was 500) */
                        display: 'block', 
                    },
                    '&:hover': {
                        borderColor: theme('colors.brand.red'),
                        backgroundColor: '#ffffff',
                        boxShadow: '0 4px 6px -1px rgba(241, 32, 61, 0.05)',
                        zIndex: '10',
                    },
                    '&:hover > div': { transform: 'scale(1.1)' },
                    '&:hover h3': { color: theme('colors.brand.red') }
                },
                '.calc-header': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme('spacing.4'),
                    marginBottom: theme('spacing.6'),
                    backgroundColor: theme('colors.slate.100'),
                    padding: theme('spacing.4'),
                    borderRadius: theme('borderRadius.lg'),
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.200'),
                },
                '.calc-icon': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: theme('spacing.10'), 
                    width: theme('spacing.10'),  
                    borderRadius: '9999px',
                    backgroundImage: `linear-gradient(135deg, #f97316, ${theme('colors.brand.red')})`, 
                    color: '#ffffff',
                    fontSize: theme('fontSize.xl'),
                    flexShrink: 0,
                },
                '.calc-title': {
                    fontFamily: theme('fontFamily.heading'),
                    fontSize: '24px', 
                    fontWeight: '600',
                    color: theme('colors.brand.dark'),
                    lineHeight: '1.2',
                    marginBottom: theme('spacing.1'),
                    
                    'span': {
                        backgroundImage: `linear-gradient(to right, ${theme('colors.brand.red')}, ${theme('colors.brand.dark')})`,
                        backgroundClip: 'text',
                        '-webkit-background-clip': 'text',
                        color: 'transparent',
                    }
                },
                '.calc-desc': {
                    marginTop: '0',
                    fontSize: theme('fontSize.xs'),
                    color: theme('colors.slate.700'), /* Darker Header Description (was 600) */
                },
                '.calc-subcat-title': {
                    fontFamily: theme('fontFamily.heading'),
                    fontSize: '18px', 
                    fontWeight: '600',
                    color: theme('colors.brand.dark'),
                    marginBottom: theme('spacing.2'), 
                    marginTop: theme('spacing.6'),    
                    paddingBottom: theme('spacing.1'),
                    borderBottomWidth: '1px',
                    borderBottomColor: theme('colors.slate.200'),
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme('spacing.2'),
                    'i': {
                        color: theme('colors.brand.red'),
                        fontSize: theme('fontSize.xs'),
                    }
                },
                '#category-page .calc-card-compact h3': {
                    fontSize: '11px',
                }
            })
        }
    ]
}
