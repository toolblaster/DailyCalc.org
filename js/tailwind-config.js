/*
  DailyCalc.org Centralized Tailwind Configuration
  
  This file contains the configuration for Tailwind CSS used across the entire site.
  It includes CUSTOM COMPONENTS for the universal calculator style (inputs, charts, print).
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
        function({ addComponents, addBase, theme }) {
            
            /* 1. UNIVERSAL CALCULATOR UI COMPONENTS */
            addComponents({
                /* --- Compact Inputs --- */
                '.compact-input': {
                    width: '100%',
                    padding: '2px 6px',
                    fontSize: '13px',
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.300'), // #cbd5e1
                    borderRadius: '3px',
                    textAlign: 'right',
                    transition: 'border-color 0.15s ease-in-out',
                    height: '28px',
                    '&:focus': {
                        outline: 'none',
                        borderColor: '#166534', // Green-800
                        boxShadow: '0 0 0 1px #166534',
                    },
                    /* Remove spinners */
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
                    color: theme('colors.slate.900'),
                    height: '28px',
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
                    fontWeight: '500',
                    color: theme('colors.slate.700'), // #334155
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                },

                /* --- Charts & Visuals --- */
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
                        backgroundColor: theme('colors.slate.100'), // #f1f5f9
                        fontWeight: '600',
                    }
                },

                /* --- Utilities --- */
                '.slim-scroll': {
                    '&::-webkit-scrollbar': {
                        height: '6px',
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: theme('colors.slate.300'),
                        borderRadius: '3px',
                    }
                },
                
                /* --- Calculator Header Bar --- */
                '.calc-tool-header': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: theme('spacing.2'),
                    borderTopLeftRadius: theme('borderRadius.md'),
                    borderTopRightRadius: theme('borderRadius.md'),
                    backgroundImage: `linear-gradient(to right, ${theme('colors.brand.dark')}, ${theme('colors.brand.red')})`,
                    paddingLeft: theme('spacing.4'),
                    paddingRight: theme('spacing.4'),
                    paddingTop: theme('spacing.2'),
                    paddingBottom: theme('spacing.2'),
                    color: 'white',
                    boxShadow: theme('boxShadow.sm'),
                }
            });

            /* 2. PRINT STYLES (Global Overrides) */
            addBase({
                '@media print': {
                    'body': { 
                        backgroundColor: 'white', 
                        color: 'black' 
                    },
                    '#header-placeholder, #footer-placeholder, .no-print, nav[aria-label="Breadcrumb"]': { 
                        display: 'none !important' 
                    },
                    '.main-container': { 
                        padding: '0', 
                        maxWidth: '100%', 
                        margin: '0' 
                    },
                    '.print-full-width': { 
                        width: '100% !important', 
                        maxWidth: 'none !important', 
                        flex: 'none !important' 
                    },
                    '.print-break-inside-avoid': { 
                        breakInside: 'avoid' 
                    },
                    /* Force 2-column layout for inputs on print */
                    '.lg\\:flex-row': { 
                        flexDirection: 'row !important', 
                        display: 'flex !important' 
                    },
                    '.lg\\:w-\\[280px\\]': { 
                        width: '40% !important' 
                    },
                    /* Hide Sidebar on print */
                    '.lg\\:w-\\[300px\\]': { 
                        display: 'none !important' 
                    },
                    /* Always show amortization table on print */
                    '#amortizationContainer': { 
                        display: 'block !important' 
                    },
                    '.overflow-x-auto': { 
                        overflow: 'visible !important', 
                        maxHeight: 'none !important' 
                    }
                }
            });

            /* 3. EXISTING COMPONENTS (Grids, Cards, etc.) */
            addComponents({
                '.calc-grid-5': {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gap: theme('spacing.3'),
                    '@media (min-width: 640px)': { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
                    '@media (min-width: 768px)': { gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' },
                    '@media (min-width: 1024px)': { gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' },
                },
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
                    '&:hover > div': { transform: 'scale(1.1)' },
                    '&:hover h3': { color: theme('colors.brand.red') }
                },
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
