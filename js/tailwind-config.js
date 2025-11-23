/*
  DailyCalc.org Centralized Tailwind Configuration
  
  This file contains the configuration for Tailwind CSS used across the entire site.
  Load this file AFTER loading the Tailwind CDN in your HTML <head>.
  
  Example:
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="js/tailwind-config.js"></script>
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
                // The standard soft shadow used on most pages
                soft: '0 12px 40px rgba(15, 23, 42, 0.08)',
                
                // The reddish/gradient glow shadow used on the Dashboard
                'soft-glow': '0 12px 40px -8px rgba(241, 32, 61, 0.15), 0 4px 6px -1px rgba(241, 32, 61, 0.08)'
            }
        }
    }
}
