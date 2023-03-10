import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  fonts: {
    ...DefaultTheme.fonts,
    medium: 20
  },
  colors: {
    ...DefaultTheme.colors,
    primary: '#0c91c9',
    primary80: 'rgba(12, 144, 201,0.8)',
    white: '#ffffff',
    white10: 'rgba(255, 255, 255, 0.1)',
    white50: 'rgba(255, 255, 255, 0.5)',
    white70: 'rgba(255, 255, 255, 0.7)',
    white80: 'rgba(255, 255, 255, 0.8)',
    white90: 'rgba(255, 255, 255, 0.90)',
    white95: 'rgba(255, 255, 255, 0.95)',
    black: '#000000',
    black50: 'rgba(0, 0, 0, 0.5)',
    black80: 'rgba(0, 0, 0, 0.8)',
    lightGray: '#dddddd',
    darkGray: '#999999',
    success: '#2f7532',
    wishlist: '#de551f',
    achievements: {
      levels: ['#d8d8d8', '#402009', '#414141', '#9f490b', '#afaeae', '#de9700', '#03a69c']
    }
  },
};

export const ThemeProvider = ({ children }) => (
    <PaperProvider theme={theme}>
        {children}
    </PaperProvider>
);