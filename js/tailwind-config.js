/*
  DailyCalc.org Centralized Tailwind Configuration
  
  This file contains the configuration for Tailwind CSS used across the entire site.
  It defines the UNIVERSAL DESIGN SYSTEM for all calculators (Finance, Health, Life, Converters).
  
  Key Components:
  - Colors: Brand Red (#F1203D), Dark (#050505), Success Green (#518428)
  - .compact-input: Standardized input fields
  - .calc-tool-header: Input section header (Red/Dark Gradient)
  - .result-header: Output section header (Green Gradient)
  - .stat-card: Summary result boxes with colored accents
  - .feature-card: Dense info cards for tips/costs
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
                    green: '#518428',      // Universal Success/Result Color
                    'green-dark': '#3e651e' // Darker shade for gradients
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
                /* --- Compact Inputs (Standard for ALL tools) --- */
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
                    color: theme('colors.slate.900'),
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
                    fontWeight: '500',
                    color: theme('colors.slate.700'),
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                },

                /* --- Calculator Header (Input Side - Red/Dark) --- */
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

                /* --- Result Header (Output Side - Green Gradient) --- */
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

                /* --- Universal Section Containers --- */
                '.content-section': {
                    backgroundColor: '#ffffff',
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.400'), // Sharper contrast
                    borderRadius: theme('borderRadius.lg'),
                    boxShadow: theme('boxShadow.sm'),
                    overflow: 'hidden',
                },
                
                /* --- Inner Info Cards (Standard Text) --- */
                '.info-card': {
                    backgroundColor: theme('colors.slate.50'),
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.400'), // Sharper contrast
                    borderRadius: theme('borderRadius.md'),
                    padding: theme('spacing.4'),
                    marginBottom: theme('spacing.4'),
                    height: '100%',
                },

                /* --- Feature Card (Dense Info Grid - e.g. Costs/Tips) --- */
                '.feature-card': {
                    display: 'flex',
                    gap: theme('spacing.2'),
                    alignItems: 'flex-start',
                    padding: theme('spacing.2'),
                    borderRadius: theme('borderRadius.DEFAULT'),
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.100'),
                    backgroundColor: '#ffffff',
                    transition: 'all 0.2s ease',
                    boxShadow: theme('boxShadow.sm'),
                    '&:hover': {
                        borderColor: theme('colors.slate.300'),
                        transform: 'translateY(-1px)',
                        boxShadow: theme('boxShadow.md'),
                    }
                },

                /* --- Stat Card (Summary Result Grid) --- */
                '.stat-card': {
                    backgroundColor: '#ffffff',
                    padding: theme('spacing.3'),
                    borderRadius: theme('borderRadius.DEFAULT'),
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.200'),
                    borderLeftWidth: '4px', // Distinct accent color
                    boxShadow: theme('boxShadow.sm'),
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: '100%',
                },

                /* --- Sidebar Widget Link --- */
                '.sidebar-nav-link': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme('spacing.2'),
                    fontSize: '13px', 
                    color: theme('colors.blue.600'),
                    padding: '0.1rem 0',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        color: theme('colors.brand.red'),
                        textDecoration: 'underline',
                    },
                    'i': {
                        fontSize: '10px',
                        color: theme('colors.slate.400'),
                        width: '14px', 
                        textAlign: 'center',
                        transition: 'color 0.2s ease',
                    },
                    '&:hover i': {
                        color: theme('colors.brand.red'),
                    }
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
                        backgroundColor: theme('colors.slate.100'),
                        fontWeight: '600',
                    }
                },

                /* --- Utilities --- */
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

                /* --- Category Cards (Homepage) --- */
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
                    borderColor: theme('colors.slate.100'),
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
                        color: theme('colors.slate.500'),
                        display: 'block', 
                    },
                    '&:hover': {
                        borderColor: 'rgba(241, 32, 61, 0.3)',
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
                    fontSize: theme('fontSize.xl'), 
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
                    marginTop: '0',
                    fontSize: theme('fontSize.xs'),
                    color: theme('colors.slate.600'),
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
