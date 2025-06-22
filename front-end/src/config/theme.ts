import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
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
