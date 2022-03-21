import { AppBar, Toolbar } from '@mui/material';
import Logo from './Logo';

export default function MainNavbar() {
    return (
        <AppBar>
            <Toolbar sx={{ height: 64, padding: '0 42px !important' }}>
                <Logo  />
            </Toolbar>
        </AppBar>
    )
}