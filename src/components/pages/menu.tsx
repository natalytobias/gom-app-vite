import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Menu: React.FC = () => {
  return (
    <AppBar position="fixed">
      <Toolbar className="flex justify-around">
        <div>
          {/* nome grande */}
          <Typography
            variant="h6"
            sx={{
              color: "inherit",
              fontFamily: "inherit", // Mantém a fonte padrão
            }}
            component={Link}
            to={"/"}
          >
            GOMON
          </Typography>
        </div>

        <div>
          {/* linnks navegacao */}

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{ fontFamily: "inherit" }}
            >
              início
            </Button>
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
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
