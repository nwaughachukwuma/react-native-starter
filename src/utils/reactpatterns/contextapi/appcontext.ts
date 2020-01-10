import * as React from 'react';

export const PreferencesContext = React.createContext({
    toggleTheme: () => {},
    toggleRTL: () => {},
    isRTL: false,
    isDarkMode: false,
    isOnBackground: false
});

export default PreferencesContext;