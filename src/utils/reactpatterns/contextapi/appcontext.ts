import React from 'react';

export const PreferencesContext = React.createContext({
    toggleTheme: () => {},
    isRTL: false,
    isDarkMode: false,
    isOnBackground: false
});

export default PreferencesContext;