/*
  DailyCalc.org Centralized Tailwind Configuration
  [2025-11-27] Updated .calc-section-divider to match Mortgage Calculator style (100% opacity, Slate-400)
  [2025-11-27] Added mx-auto to divider for consistent centering.
  [2025-12-03] A11y Update: Enforced high contrast placeholders (Slate-500) globally for .compact-input.
  [2025-12-04] Grid Update: Enforced 6 columns on Desktop for category cards.
  [2025-12-04] Spacing Fix: Reverted vertical expansion; added specific bottom padding to clear text from border.
  [2025-12-04] Centralized Icon Style: Added auto-styling for icons inside .calc-tool-header.
  [2025-12-04] Visual Update: High-contrast "White/Dark" input style with Blue focus to match Mortgage Calculator reference.
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
                    'green-dark': '#3e651e',
                    blue: '#1e40af' // Added for the new focus state (Blue-800 approx)
                }
            },
            boxShadow: {
                soft: '0 12px 40px rgba(15, 23, 42, 0.08)',
                'soft-glow': '0 12px 40px -8px rgba(241, 32, 61, 0.15), 0 4px 6px -1px rgba(241, 32, 61, 0.08)',
                input: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' // Subtle shadow for inputs
            }
        }
    },
    plugins: [
        function({ addComponents, addBase, theme }) {
            
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

            addComponents({
                /* --- UNIVERSAL CALCULATOR LAYOUT --- */
                '.calc-body-wrapper': {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme('spacing.4'),
                    borderLeftWidth: '1px',
                    borderRightWidth: '1px',
                    borderBottomWidth: '1px',
                    borderColor: theme('colors.slate.400'),
                    backgroundColor: '#ffffff',
                    padding: theme('spacing.3'),
                    boxShadow: theme('boxShadow.sm'),
                    borderBottomLeftRadius: theme('borderRadius.md'),
                    borderBottomRightRadius: theme('borderRadius.md'),
                    '@media (min-width: 768px)': { 
                        flexDirection: 'row',
                        alignItems: 'flex-start', 
                    }
                },

                '.calc-input-section': {
                    width: '100%',
                    flexShrink: 0,
                    backgroundColor: '#EEEEEE',
                    padding: theme('spacing.4'),
                    borderRadius: theme('borderRadius.DEFAULT'),
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.400'),
                    height: 'fit-content', 
                    '@media (min-width: 768px)': { 
                        width: '280px',
                    }
                },

                '.calc-output-section': {
                    flex: '1 1 0%',
                    minWidth: '0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme('spacing.3'),
                },

                /* --- NEW: Universal SEO Content Wrapper --- */
                '.calc-seo-content': {
                    padding: theme('spacing.5'),
                    fontSize: theme('fontSize.xs'),
                    color: theme('colors.slate.700'),
                    lineHeight: theme('lineHeight.relaxed'),
                    display: 'grid',
                    gap: theme('spacing.6'), /* Consistent vertical spacing between cards */
                },

                /* --- NEW: Universal Section Divider (Centralized from Mortgage Calc) --- */
                '.calc-section-divider': {
                    width: '100%',
                    maxWidth: '702px', /* Matches Mortgage Calc Constraint */
                    height: '0',
                    marginTop: theme('spacing.10'),    /* Matches my-10 */
                    marginBottom: theme('spacing.10'), /* Matches my-10 */
                    borderTopWidth: '6px',
                    borderColor: theme('colors.slate.400'), /* Solid Slate 400 */
                    borderRadius: '9999px',
                    opacity: '1', /* Removed opacity-20 to make it "dark slate" */
                    marginLeft: 'auto',  /* Ensure Centering */
                    marginRight: 'auto', /* Ensure Centering */
                    '@media print': { display: 'none' }
                },

                /* --- Components (UPDATED FOR IMAGE MATCH) --- */
                '.compact-input': {
                    width: '100%',
                    padding: '2px 8px', /* Increased horizontal padding */
                    fontSize: '13px',
                    borderWidth: '1px',
                    borderColor: '#64748b', /* Slate-500: Much darker border for contrast */
                    borderRadius: '3px',
                    textAlign: 'right',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.15s ease-in-out',
                    height: '30px', /* Increased height slightly for better presence */
                    color: theme('colors.slate.900'),
                    boxShadow: theme('boxShadow.input'), /* Added shadow for "extra white" feel */
                    '&:focus': {
                        outline: 'none',
                        borderColor: '#2563eb', /* Blue-600: Distinct Blue focus from image */
                        boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.2)', /* Blue ring */
                        zIndex: '10',
                    },
                    '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': { '-webkit-appearance': 'none', margin: '0' },
                    '-moz-appearance': 'textfield',
                    /* A11Y GLOBAL FIX: High contrast placeholders */
                    '&::placeholder': {
                        color: theme('colors.slate.500'),
                        opacity: '1', /* Required for Firefox */
                    },
                },
                '.compact-select': {
                    padding: '2px 20px 2px 6px',
                    fontSize: '13px',
                    borderWidth: '1px',
                    borderColor: '#64748b', /* Slate-500: Matching Dark Border */
                    borderRadius: '3px',
                    backgroundColor: 'white',
                    color: theme('colors.slate.900'),
                    height: '30px', /* Matching Height */
                    boxShadow: theme('boxShadow.input'),
                    '&:focus': {
                        outline: 'none',
                        borderColor: '#2563eb', /* Blue focus */
                        boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.2)',
                    },
                },
                '.input-row': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '6px',
                    marginBottom: '5px',
                },
                '.input-label': {
                    fontSize: '12px',
                    fontWeight: '600',
                    color: theme('colors.slate.800'),
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                },
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
                    /* Centralized Icon Style */
                    'i': {
                        fontSize: theme('fontSize.sm'), /* text-sm */
                        opacity: '0.9',                 /* opacity-90 */
                    }
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
                '.result-label': {
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'rgba(255, 255, 255, 0.9)',
                },
                '.result-value': {
                    fontSize: '24px', 
                    fontWeight: '700',
                    lineHeight: '1',
                    marginTop: '2px',
                    color: '#ffffff',
                    '@media (min-width: 640px)': { fontSize: '30px' }, 
                },
                '.calc-action-group': {
                    display: 'flex',
                    gap: theme('spacing.1'),
                    alignItems: 'center',
                },
                '.calc-action-btn': {
                    height: theme('spacing.7'),
                    width: theme('spacing.7'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: theme('borderRadius.DEFAULT'),
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    fontSize: theme('fontSize.xs'),
                    backgroundColor: '#ffffff',
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.200'),
                    color: theme('colors.slate.400'),
                    '&:hover': {
                        borderColor: theme('colors.brand.red'),
                        color: theme('colors.brand.red'),
                        backgroundColor: '#ffffff',
                    },
                    '&.dark': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: '0',
                        color: '#ffffff',
                        backdropFilter: 'blur(4px)',
                        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
                    }
                },
                '.content-section': {
                    backgroundColor: '#ffffff',
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.400'),
                    borderRadius: theme('borderRadius.lg'),
                    boxShadow: theme('boxShadow.sm'),
                    overflow: 'hidden',
                    color: theme('colors.slate.700'),
                },
                '.info-card': {
                    backgroundColor: theme('colors.slate.50'),
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.300'), // Slightly darker for visibility
                    borderRadius: theme('borderRadius.md'),
                    padding: theme('spacing.4'),
                    /* Removed height: 100% to allow natural flow in grid */
                    color: theme('colors.slate.700'),
                },
                '.feature-card': {
                    display: 'flex',
                    gap: theme('spacing.2'),
                    alignItems: 'flex-start',
                    padding: theme('spacing.2'),
                    borderRadius: theme('borderRadius.DEFAULT'),
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.300'),
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
                    color: theme('colors.slate.600'),
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
                        backgroundColor: '#f0fdf4',
                        color: theme('colors.brand.green'),
                    }
                },
                '.sidebar-nav-link': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme('spacing.2'),
                    fontSize: '13px', 
                    color: theme('colors.slate.700'),
                    padding: '0.1rem 0',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        color: theme('colors.brand.red'),
                        textDecoration: 'underline',
                    },
                    'i': {
                        fontSize: '10px',
                        color: theme('colors.slate.500'),
                        width: '14px', 
                        textAlign: 'center',
                        transition: 'color 0.2s ease',
                    },
                    '&:hover i': { color: theme('colors.brand.red') }
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
                    '&.highlight': { backgroundColor: theme('colors.slate.100'), fontWeight: '600' }
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
                /* UPDATED GRID CONFIGURATION */
                '.calc-grid-5': {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', /* Default Mobile: 2 cols */
                    gap: theme('spacing.2'), 
                    '@media (min-width: 640px)': { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }, /* SM: 3 cols */
                    '@media (min-width: 768px)': { gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }, /* MD: 4 cols */
                    '@media (min-width: 1024px)': { gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' }, /* Desktop: 6 cols */
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
                    
                    /* FIXED: Reverted standard padding to 1.5, added bottom-specific padding */
                    padding: theme('spacing.1.5'),
                    paddingBottom: theme('spacing.2.5'), /* Extra bottom space for text */
                    
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                    '> div': {
                        marginBottom: theme('spacing.1'), /* Reverted to tighter icon spacing */
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
                        lineHeight: '1.2', /* Slightly looser line-height */
                        color: theme('colors.slate.900'),
                        transition: 'color 0.2s ease',
                        /* Prevent overflow for longer titles */
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        '-webkit-line-clamp': '2',
                        '-webkit-box-orient': 'vertical',
                    },
                    'p': {
                        marginTop: '0',
                        fontSize: '9px', 
                        lineHeight: '1.1',
                        color: theme('colors.slate.600'),
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
                    color: theme('colors.slate.700'),
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
                '#category-page .calc-card-compact h3': { fontSize: '11px' }
            })
        }
    ]
}
