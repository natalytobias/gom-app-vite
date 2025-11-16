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
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddIcon from "@mui/icons-material/Add";
import Menu from "./menu";
import Dashboard from "./dashboard/dashboard";

export default function GomForm() {
  const [file, setFile] = useState<File | null>(null);
  const [kFinal, setKFinal] = useState<number>(2); // Valor padrão 2
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Previne múltiplos envios
    
    console.log("Formulário submetido"); // Debug

    if (!file) {
      alert("Selecione um arquivo!");
      return;
    }

    if (kFinal === 0) {
      alert("Selecione a quantidade de perfis extremos!");
      return;
    }

    const filteredVars = internalVars.filter((v) => v.trim() !== "");

    try {
      setIsSubmitting(true);
      console.log("Enviando dados...", { // Debug
        file: file.name,
        kFinal,
        caseId,
        filteredVars
      });

      // Chama o serviço
      await GomService.enviandoParaConfigurar({
        file,
        k_initial: 2,
        k_final: kFinal,
        case_id: caseId,
        internal_vars: filteredVars,
      });

      

      // Converte o arquivo
      //await GomService.convertendoTxt(kFinal, filteredVars);

      alert("Dados enviados com sucesso!");
      setShowDashboard(true);
    } catch (err) {
      console.error("Erro detalhado ao enviar:", err);
      alert(`Erro ao enviar dados: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Menu />

      <div className="pt-15 max-w-200">
        <Box
          sx={{
            maxWidth: "400px",
            p: 3,
            border: "1px solid #ccc",
            borderRadius: 4,
            boxShadow: 10,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {/* Campo Arquivo (CSV/TXT) - CORRIGIDO */}
              <FormControl fullWidth>
                <FormLabel htmlFor="file-upload" sx={{ mb: 1 }}>
                  Arquivo (.CSV):
                </FormLabel>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<FileUploadIcon />}
                  >
                    Selecionar Arquivo
                    <input
                      type="file"
                      id="file-upload"
                      accept=".csv,.txt"
                      onChange={handleFileChange}
                      required
                      style={{ display: "none" }}
                    />
                  </Button>
                  <span style={{ fontSize: '0.875rem', color: '#666' }}>
                    {file ? file.name : "Nenhum arquivo selecionado"}
                  </span>
                </Box>
              </FormControl>

              <FormLabel id="k-final-radio-group">
                Escolha a quantidade de perfis extremos (k final)
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="k-final-radio-group"
                name="k-final-radio-group"
                value={kFinal}
                onChange={(e) => setKFinal(Number(e.target.value))}
              >
                <FormControlLabel value={2} control={<Radio />} label="2" />
                <FormControlLabel value={3} control={<Radio />} label="3" />
                <FormControlLabel value={4} control={<Radio />} label="4" />
              </RadioGroup>

              {/* Campo case_id */}
              <TextField
                label="Coluna ID"
                type="text"
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                required
                fullWidth
                variant="outlined"
              />

              {/* Campos internal_vars */}
              <FormControl fullWidth>
                <FormLabel sx={{ mb: 1 }}>Variáveis internas</FormLabel>
                <Stack spacing={1}>
                  {internalVars.map((val, index) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <TextField
                        type="text"
                        value={val}
                        onChange={(e) => handleChangeVar(index, e.target.value)}
                        fullWidth
                        size="small"
                        placeholder={`Variável ${index + 1}`}
                      />
                      {index === internalVars.length - 1 && (
                        <Button
                          type="button"
                          onClick={addField}
                          variant="contained"
                          size="small"
                          startIcon={<AddIcon />}
                          sx={{ minWidth: "auto", p: 1 }}
                        >
                          Adicionar
                        </Button>
                      )}
                    </Box>
                  ))}
                </Stack>
              </FormControl>

              {/* Botão Enviar */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
            </Stack>
          </form>
        </Box>
        
        {/* Dashboard */}
        {showDashboard && <Dashboard />}
      </div>
    </>
  );
}