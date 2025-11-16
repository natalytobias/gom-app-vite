import React from 'react';
import HeatmapChart from './heatmapChart';
import SunburstChart from './Sunburst';
import Menu from '../menu';
import TabelaResultados from '../../tabelaResultados';


const Dashboard: React.FC = () => {
  
  return (
    <>
    <Menu/>
    <div style={{ 
        padding: '20px', 
        backgroundColor: '#f4f7f9', 
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif' 
    }}>
      
      <header style={{ borderBottom: '2px solid #ddd', marginBottom: '40px', paddingBottom: '20px' }}>
        <h1 style={{ textAlign: 'center', color: '#004d99' }}>
          Painel de Análise GOM
        </h1>
        <p style={{ textAlign: 'center', color: '#666' }}>
          Visualização da distribuição de fatores K por Variável e Nível.
        </p>
      </header>

      
      <section style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px' 
      }}>
        
        <div style={{ 
            backgroundColor: '#fff', 
            padding: '20px', 
            borderRadius: '8px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)', 
            width: '100%',
            height: '500px'
        }}>
          <h2>Mapa Sunburst dos Perfis GOM</h2>
            <SunburstChart num_k={2} />
          
        </div>

        <div style={{ 
            backgroundColor: '#fff', 
            padding: '20px', 
            borderRadius: '8px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)' 
        }}>
          <h2 style={{ color: '#333' }}>Tabela de LFMR</h2>
          <TabelaResultados/>
          
        </div>
      </section>
      
    </div>
    </>
    
  );
};

export default Dashboard;