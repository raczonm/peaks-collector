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
    white: '#ffffff',
    white80: 'rgba(255, 255, 255, 0.8)',
    white95: 'rgba(255, 255, 255, 0.95)',
    black: '#000000',
    black50: 'rgba(0, 0, 0, 0.5)',
    lightGray: '#dddddd',
    darkGray: '#999999',
    primary: '#0c91c9',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
    success: '#2f7532',
    wishlist: '#de551f',
    achievements: {
      star: '#ffd200',
      ribbon: '#ca021e',
      levels: ['#d8d8d8', '#402009', '#414141', '#9f490b', '#afaeae', '#de9700', '#03a69c']
    }
  },
};

export const ThemeProvider = ({ children }) => (
    <PaperProvider theme={theme}>
        {children}
    </PaperProvider>
);