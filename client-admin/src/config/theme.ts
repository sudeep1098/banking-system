import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        background: {
            paper: '#fff',
        },
        text: {
            primary: '#173A5E',
            secondary: '#46505A',
        },
        action: {
            active: '#001E3C',
        },
    },
    components: {
        MuiPopover: {
            defaultProps: {
                container: document.getElementById('root')
            }
        },
        MuiPopper: {
            defaultProps: {
                container: document.getElementById('root')
            }
        },
        MuiModal: {
            defaultProps: {
                container: document.getElementById('root')
            }
        }
    }
});
