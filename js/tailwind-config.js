/*
  DailyCalc.org Centralized Tailwind Configuration
  ...
  [2025-12-06] Centralized .result-value size (20px/24px) for consistency across all tools.
  [2025-12-07] Increased contrast for .info-card borders (slate-300 -> slate-400).
  [2025-12-07] Reduced contrast for .calc-section-divider (slate-400 -> slate-200) for better visual hierarchy.
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
                    blue: '#1e40af' 
                }
            },
            boxShadow: {
                soft: '0 12px 40px rgba(15, 23, 42, 0.08)',
                'soft-glow': '0 12px 40px -8px rgba(241, 32, 61, 0.15), 0 4px 6px -1px rgba(241, 32, 61, 0.08)',
                input: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
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

                '.calc-output-card': {
                    backgroundColor: '#ffffff',
                    borderWidth: '1px',
                    borderColor: theme('colors.slate.500'),
                    borderRadius: theme('borderRadius.md'),
                    padding: theme('spacing.3'),
                    textAlign: 'center',
                    boxShadow: theme('boxShadow.sm'),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    transition: 'all 0.2s ease',
                    'span': {
                        fontSize: '10px',
                        fontWeight: '700',
                        color: theme('colors.slate.500'),
                        textTransform: 'uppercase',
                        letterSpacing: '0.025em',
                    },
                    '.value': {
                        fontSize: theme('fontSize.lg'),
                        fontWeight: '700',
                        color: theme('colors.slate.800'),
                        marginTop: theme('spacing.1'),
                        lineHeight: '1',
                    },
                    '&:hover': {
                        borderColor: theme('colors.slate.700'),
                        boxShadow: theme('boxShadow.md'),
                    }
                },

                '.calc-seo-content': {
                    padding: theme('spacing.5'),
                    fontSize: theme('fontSize.xs'),
                    color: theme('colors.slate.700'),
                    lineHeight: theme('lineHeight.relaxed'),
                    display: 'grid',
                    gap: theme('spacing.6'), 
                },
                
                '.seo-icon': {
                    color: theme('colors.brand.red'),
                },

                '.calc-section-divider': {
                    width: '100%',
                    maxWidth: '702px', 
                    height: '0',
                    marginTop: theme('spacing.10'),    
                    marginBottom: theme('spacing.10'), 
                    borderTopWidth: '6px',
                    // MODIFIED: Reduced contrast from slate.400 to slate.200
                    borderColor: theme('colors.slate.200'),
                    borderRadius: '9999px',
                    opacity: '1',
                    marginLeft: 'auto',  
                    marginRight: 'auto', 
                    '@media print': { display: 'none' }
                },

                /* --- Components (Inputs/Headers) --- */
                '.compact-input': {
                    width: '100%',
                    padding: '2px 8px', 
                    fontSize: '13px',
                    borderWidth: '1px',
                    borderColor: '#64748b', 
                    borderRadius: '3px',
                    textAlign: 'right',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.15s ease-in-out',
                    height: '30px', 
                    color: theme('colors.slate.900'),
                    boxShadow: theme('boxShadow.input'), 
                    '&:focus': {
                        outline: 'none',
                        borderColor: '#2563eb', 
                        boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.2)', 
                        zIndex: '10',
                    },
                    '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': { '-webkit-appearance': 'none', margin: '0' },
                    '-moz-appearance': 'textfield',
                    '&::placeholder': {
                        color: theme('colors.slate.500'),
                        opacity: '1', 
                    },
                },
                '.compact-select': {
                    padding: '2px 24px 2px 8px',
                    fontSize: '13px',
                    borderWidth: '1px',
                    borderColor: '#64748b', 
                    borderRadius: '3px',
                    backgroundColor: 'white',
                    color: theme('colors.slate.900'),
                    height: '30px', 
                    boxShadow: theme('boxShadow.input'),
                    appearance: 'none', 
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.2rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.2em 1.2em',
                    '&:focus': {
                        outline: 'none',
                        borderColor: '#2563eb', 
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
                    'i': {
                        fontSize: theme('fontSize.sm'), 
                        opacity: '0.9',                 
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
                /* CENTRALIZED RESULT SIZE 
                   Ensures all calculators share the exact same size.
                   Mobile: 20px
                   Desktop (sm+): 24px
                */
                '.result-value': {
                    fontSize: '20px', 
                    fontWeight: '700',
                    lineHeight: '1',
                    marginTop: '2px',
                    color: '#ffffff',
                    '@media (min-width: 640px)': { fontSize: '24px' }, 
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
                    borderColor: theme('colors.slate.400'), 
                    borderRadius: theme('borderRadius.md'),
                    padding: theme('spacing.4'),
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
                '.calc-grid-5': {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', 
                    gap: theme('spacing.2'), 
                    '@media (min-width: 640px)': { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }, 
                    '@media (min-width: 768px)': { gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }, 
                    '@media (min-width: 1024px)': { gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' }, 
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
                    paddingBottom: theme('spacing.2.5'), 
                    
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
                        lineHeight: '1.2', 
                        color: theme('colors.slate.900'),
                        transition: 'color 0.2s ease',
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
