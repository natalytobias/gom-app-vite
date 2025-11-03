import React, { useState } from "react";
import { GomService } from "../../services/gomService";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Box,
  Input,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddIcon from '@mui/icons-material/Add';
import Menu from './menu';

export default function GomForm(){
  const [file, setFile] = useState<File | null>(null);
  const [kFinal, setKFinal] = useState<number>(0);
  const [caseId, setCaseId] = useState<string>("");
  const [internalVars, setInternalVars] = useState<string[]>([""]);

  const handleChangeVar = (index: number, value: string) => {
    const newVars = [...internalVars];
    newVars[index] = value;
    setInternalVars(newVars);
  };

  const addField = () => {
    setInternalVars([...internalVars, ""]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Selecione um arquivo!");
      return;
    }

    const filteredVars = internalVars.filter(v => v.trim() !== "");
    
    try {
      const resp = await GomService.enviandoParaConfigurar({
        file,
        k_initial: 2,
        k_final: kFinal,
        case_id: caseId,
        internal_vars: filteredVars,
      });
      
      await GomService.convertendoTxt(
        kFinal,filteredVars,
      );
      
      

      alert("Dados enviados com sucesso!");

    } catch (err) {
      console.error("Erro ao enviar:", err);
      alert("Erro ao enviar dados!");
    }
  };

  return (
    <>
      <Menu/>
       <Box
      sx={{
        maxWidth: '400px',
        p: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* Campo Arquivo (CSV/TXT) */}
          <FormControl fullWidth>
            <FormLabel htmlFor="file-upload">
              Arquivo (.CSV): 
                {file ? file.name : 'Nenhum arquivo selecionado'}
            </FormLabel>
            <Button
              variant="outlined"
              component="label"
              startIcon={<FileUploadIcon />}
            >
              Selecionar Arquivo
              <Input
                type="file"
                id="file-upload"
                inputProps={{ accept: '.csv,.txt' }}
                // CORREÇÃO DE TIPAGEM: Adicionamos (e: React.ChangeEvent<HTMLInputElement>)
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFile(e.target.files ? e.target.files[0] : null)
                }}
                required
                sx={{ display: 'none' }} // Esconde o input de arquivo nativo
              />
            </Button>
          </FormControl>


           <FormLabel id="demo-row-radio-buttons-group-label">Escolha a quantidade de perfis extremos (k final)</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={kFinal} 
                onChange={(e) => setKFinal(Number(e.target.value))} 
              >
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4" control={<Radio />} label="4" />
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
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    type="text"
                    value={val}
                    onChange={(e) => handleChangeVar(index, e.target.value)}
                    fullWidth
                    size="small"
                  />
                  {index === internalVars.length - 1 && (
                    <Button
                      type="button"
                      onClick={addField}
                      variant="contained"
                      size="small"
                      startIcon={<AddIcon />}
                      sx={{ minWidth: 'auto', p: 1 }}
                    >
                      Adicionar
                    </Button>
                  )}
                </Box>
              ))}
            </Stack>
          </FormControl>

          {/* Botão Enviar */}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Enviar
          </Button>
        </Stack>
      </form>
      </Box>

    </>
   
    
  );
};