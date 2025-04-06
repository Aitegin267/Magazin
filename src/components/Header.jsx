import { AppBar,Toolbar, Typography } from "@mui/material";
import { TiThMenu } from "react-icons/ti";

const Header = ({ user }) => {
  return (
    <AppBar sx={{ backgroundColor: "#ff6600" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            gap: "15px",
            cursor: "pointer",
          }}
        >
          <TiThMenu style={{ cursor: "pointer", fontFamily:"unset" }} />
          Строительный магазин
        </Typography>
        

        <Typography>{user}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
