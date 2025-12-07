import React, { useState } from "react";
import { GomService } from "../../services/gomService";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "./menu";
import Dashboard from "./dashboard/dashboard";

export default function GomForm() {
  const [file, setFile] = useState<File | null>(null);
  const [kFinal, setKFinal] = useState<number>(2);
  const [caseId, setCaseId] = useState<string>("");
  const [internalVars, setInternalVars] = useState<string[]>([""]);
  const [showDashboard, setShowDashboard] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeVar = (index: number, value: string) => {
    const newVars = [...internalVars];
    newVars[index] = value;
    setInternalVars(newVars);
  };

  const addField = () => {
    setInternalVars([...internalVars, ""]);
  };

  const removeField = (index: number) => {
    if (internalVars.length > 1) {
      const newVars = internalVars.filter((_, i) => i !== index);
      setInternalVars(newVars);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    if (!file) {
      alert("Selecione um arquivo!");
      return;
    }

    const filteredVars = internalVars.filter((v) => v.trim() !== "");

    try {
      setIsSubmitting(true);

      await GomService.enviandoParaConfigurar({
        file,
        k_initial: 2,
        k_final: kFinal,
        case_id: caseId,
        internal_vars: filteredVars,
      });

      await GomService.convertendoTxt(kFinal, filteredVars);
      setShowDashboard(true);
    } catch (err) {
      console.error("Erro ao enviar:", err);
      alert(`Erro ao enviar dados: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Menu />

      <Box
        sx={{
          padding: 3,
          paddingTop: "80px",
          minHeight: "100vh",
          backgroundColor: "#fafafa",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ maxWidth: "600px", width: "100%" }}>
          {/* Card do Formulário */}
          <Card elevation={1} sx={{ borderRadius: 2, mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" component="h1" gutterBottom align="center">
                Análise GOM
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                Configure os parâmetros para análise
              </Typography>

              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  {/* Upload de Arquivo */}
                  <FormControl fullWidth>
                    <FormLabel sx={{ mb: 1, fontWeight: "medium" }}>
                      Arquivo CSV
                    </FormLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<FileUploadIcon />}
                        fullWidth
                      >
                        Selecionar Arquivo
                        <input
                          type="file"
                          accept=".csv,.txt"
                          onChange={handleFileChange}
                          required
                          style={{ display: "none" }}
                        />
                      </Button>
                    </Box>
                    {file && (
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                        Arquivo selecionado: {file.name}
                      </Typography>
                    )}
                  </FormControl>

                  {/* Perfis Extremos */}
                  <FormControl>
                    <FormLabel sx={{ mb: 1, fontWeight: "medium" }}>
                      Número de Perfis (K)
                    </FormLabel>
                    <RadioGroup
                      row
                      value={kFinal}
                      onChange={(e) => setKFinal(Number(e.target.value))}
                      sx={{ gap: 1 }}
                    >
                      <FormControlLabel value={2} control={<Radio />} label="K = 2" />
                      <FormControlLabel value={3} control={<Radio />} label="K = 3" />
                      <FormControlLabel value={4} control={<Radio />} label="K = 4" />
                    </RadioGroup>
                  </FormControl>

                  {/* Campo ID */}
                  <TextField
                    label="Coluna ID"
                    value={caseId}
                    onChange={(e) => setCaseId(e.target.value)}
                    required
                    fullWidth
                    helperText="Nome da coluna que identifica cada caso no CSV"
                  />

                  {/* Variáveis */}
                  <FormControl fullWidth>
                    <FormLabel sx={{ mb: 1, fontWeight: "medium" }}>
                      Variáveis de Análise
                    </FormLabel>
                    <Stack spacing={1}>
                      {internalVars.map((val, index) => (
                        <Box key={index} sx={{ display: "flex", gap: 1 }}>
                          <TextField
                            value={val}
                            onChange={(e) => handleChangeVar(index, e.target.value)}
                            fullWidth
                            size="small"
                            placeholder={`Variável ${index + 1}`}
                          />
                          {internalVars.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeField(index)}
                              variant="outlined"
                              color="error"
                              size="small"
                              sx={{ minWidth: "auto", px: 1 }}
                            >
                              <DeleteIcon fontSize="small" />
                            </Button>
                          )}
                        </Box>
                      ))}
                      
                      <Button
                        type="button"
                        onClick={addField}
                        variant="outlined"
                        size="small"
                        startIcon={<AddIcon />}
                        sx={{ alignSelf: "flex-start" }}
                      >
                        Adicionar Variável
                      </Button>
                    </Stack>
                  </FormControl>

                  {/* Botão Enviar */}
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isSubmitting}
                    sx={{ mt: 2 }}
                  >
                    {isSubmitting ? "Processando..." : "Executar Análise"}
                  </Button>
                </Stack>
              </form>
            </CardContent>
          </Card>

          {/* Dashboard */}
          {showDashboard && (
            <Box sx={{ marginTop: 3 }}>
              <Dashboard perfil_k={kFinal} />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}