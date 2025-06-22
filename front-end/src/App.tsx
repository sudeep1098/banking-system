import { ThemeProvider } from '@mui/material';
import { ToastProvider } from './context/ToastProvider';
import Layout from './Layout';
import { theme } from './config/theme';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <ToastProvider>
                <Layout />
            </ToastProvider>
        </ThemeProvider>
    );
};

export default App;
