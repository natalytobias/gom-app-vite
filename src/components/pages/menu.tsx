import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Menu: React.FC = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            fontFamily: "inherit", // Mantém a fonte padrão
          }}
          component={Link}
          to={"/"}
        >
          GRADE OF MEMBERSHIP
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            color="inherit"
            component={Link}
            to="/formulario"
            sx={{ fontFamily: "inherit" }}
          >
            Formulário Gom
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/documentacao"
            sx={{ fontFamily: "inherit" }}
          >
            Documentação
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/Sobre"
            sx={{ fontFamily: "inherit" }}
          >
            Sobre
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
