import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { DashboardService } from "../services/DashboardService";

const tabelaLMFR: React.FC = () => {
  const [dadosTabela, setDadosTabela] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const titulo = "Lambda-Marginal Frequency Ratio (LMFR):";


  useEffect (() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        const dados = await DashboardService.DadosLMFR();
        setDadosTabela(dados || []);      
      } catch (err){
        console.log("Erro ao carregar dados da tabela: ", err);
        setError("Erro ao carregar dados da tabela");
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  // if (!dadosTabela || dadosTabela.length === 0) {
  //   return (
  //     <Typography variant="body1" color="textSecondary">
  //       Nenhum dado disponível
  //     </Typography>
  //   );
  // }

  const primeiroItem =dadosTabela[0];
  const colunas = Object.keys(primeiroItem);

  const formatarNomeColuna = (nome: string) => {
    return nome
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str: string) => str.toUpperCase())
      .trim();
  };
 

  return (
    <>
      <Box sx={{ width: '100%' }}>
        {titulo && (
          <Typography variant="h6" component="h2" gutterBottom>
            {titulo}
          </Typography>
        )}
        
        <TableContainer component={Paper} elevation={2}>
          <Table 
            sx={{ minWidth: 650 }} 
            size="small" 
            aria-label="tabela dinâmica"
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                {colunas.map((coluna) => (
                  <TableCell 
                    key={coluna}
                    sx={{ 
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.875rem'
                    }}
                  >
                    {formatarNomeColuna(coluna)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dadosTabela.map((linha, index) => (
                <TableRow 
                  key={index}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: 'action.hover' }
                  }}
                >
                  {colunas.map((coluna) => (
                    <TableCell 
                      key={coluna}
                      component={coluna === 'id' ? 'th' : 'td'}
                      scope={coluna === 'id' ? 'row' : ''}
                      sx={{ 
                        fontSize: '0.8125rem',
                        py: 1,
                      }}
                    >
                      {linha[coluna] !== null && linha[coluna] !== undefined ? String(linha[coluna]) : '-' }
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
    
  );
};

export default tabelaLMFR;