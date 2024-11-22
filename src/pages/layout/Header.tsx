import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = () => {

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                    Notes Taker
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
