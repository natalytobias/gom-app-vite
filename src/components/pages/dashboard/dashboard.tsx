import React from "react";
import SunburstChart from "./Sunburst";
import TabelaResultados from '../../tableLmfr';
import MatrixScatterChart from "./matrixScatter";

interface DashboardProps {
  perfil_k: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ perfil_k }) => {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f4f7f9",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        maxWidth: "100%",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <header
        style={{
          borderBottom: "2px solid #ddd",
          marginBottom: "40px",
          paddingBottom: "20px",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#004d99" }}>
          Painel de Análise GOM
        </h1>
        <p style={{ textAlign: "center", color: "#666" }}>
          Visualização da distribuição de fatores K por Variável e Nível.
        </p>
      </header>

      {/* Tabela LMFR */}
      <section style={{ marginBottom: "40px", width: "100%" }}>
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <h2 style={{ color: "#333", marginBottom: "10px" }}>
            Tabela LMFR
          </h2>
          <p style={{ color: "#666", marginBottom: "20px" }}>
            A tabela mostra o LMFR
          </p>
          <TabelaResultados />
        </div>
      </section>

      {/* Sunburst Chart */}
      <section style={{ marginBottom: "40px", width: "100%" }}>
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <h2 style={{ color: "#333", marginBottom: "20px" }}>
            Mapa Sunburst dos Perfis GOM
          </h2>
          <p style={{ color: "#666", marginBottom: "20px" }}>
            Distribuição dos Perfis (K = {perfil_k})
          </p>
          <div style={{ height: "500px", width: "100%" }}>
            <SunburstChart num_k={perfil_k} />
          </div>
        </div>
      </section>

      {/* Matrix Scatter Chart */}
      <section style={{ marginBottom: "40px", width: "100%" }}>
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <h2 style={{ color: "#333", marginBottom: "20px" }}>
            Gráfico Matrix Scatter dos Perfis GOM
          </h2>
          <p style={{ color: "#666", marginBottom: "20px" }}>
            Matriz de correlação (K = {perfil_k})
          </p>
          <div style={{ height: "700px", width: "100%" }}>
            <MatrixScatterChart num_k={perfil_k} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;