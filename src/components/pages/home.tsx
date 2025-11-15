import { Box, Typography } from "@mui/material";
import Menu from "./menu";

export default function Home() {
  return (
    <>
      <Menu />
      <div className="pt-15">
        <Box
          sx={{
            maxWidth: "800px",
            p: 3,
            border: "1px solid #ccc",
            borderRadius: 2,
            boxShadow: 3,
            margin: "24px auto 24px auto",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            alignItems: "center",
          }}
        >
          {/* Container do texto */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">O QUE É O GOM?</Typography>
          </Box>

          {/* Container da imagem */}
          <Box sx={{ flex: 1 }}>
            <Box
              component="img"
              src="src/components/imgs/estatisticas.jpg"
              alt="Descrição da imagem"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 1,
                boxShadow: 2,
              }}
            />
          </Box>
        </Box>
      </div>
    </>
  );
}
