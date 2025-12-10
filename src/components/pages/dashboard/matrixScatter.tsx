import React, { useEffect, useState } from "react";
import { DashboardService } from "../../../services/DashboardService";
import ReactECharts from "./reactECharts";

interface MatrixScatterProps {
  num_k: number;
}

const MatrixScatterChart: React.FC<MatrixScatterProps> = ({ num_k }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMatrixScatter = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await DashboardService.matrixScatter(num_k);
        
        // Verifica se houve erro na resposta
        if (response.error) {
          setError(response.error);
          return;
        }
        
        setChartData(response);
      } catch (err) {
        console.error("Erro ao carregar dados do Matrix Scatter:", err);
        setError("Erro ao carregar dados do gráfico");
      } finally {
        setLoading(false);
      }
    };

    loadMatrixScatter();
  }, [num_k]);

  if (loading) return <p>Carregando mapa Matrix Scatter...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!chartData) return <p>Sem dados para exibir</p>;

  // Extrair dados do response
  const xData = chartData.xData?.map((item: any) => item.value) || [];
  const yData = chartData.yData?.map((item: any) => item.value) || [];
  const data = chartData.data || [];

  // Configuração do gráfico
  const option = {
    tooltip: {
      position: 'top',
      formatter: (params: any) => {
        return `${params.value[0]}<br/>${params.value[1]}<br/>Valor: ${params.value[2].toFixed(2)}`;
      }
    },
    grid: {
      left: 100,
      right: 50,
      top: 100,
      bottom: 50
    },
    xAxis: {
      type: 'category',
      data: xData,
      axisLabel: {
        rotate: 45,
        interval: 0
      }
    },
    yAxis: {
      type: 'category',
      data: yData
    },
    // visualMap: {
    //   type: 'continuous',
    //   min: -1,
    //   max: 1,
    //   dimension: 2,
    //   calculable: true,
    //   orient: 'horizontal',
    //   top: 5,
    //   left: 'center',
    //   inRange: {
    //     color: [
    //       '#313695',
    //       '#4575b4',
    //       '#74add1',
    //       '#abd9e9',
    //       '#e0f3f8',
    //       '#ffffbf',
    //       '#fee090',
    //       '#fdae61',
    //       '#f46d43',
    //       '#d73027',
    //       '#a50026'
    //     ]
    //   }
    // },
    series: [
      {
        type: 'scatter',
        symbolSize: (val: number[]) => {
          // Tamanho baseado no valor absoluto
          return Math.abs(val[2]) * 30 + 10;
        },
        data: data.map((item: any[]) => {
          // Converter nomes para índices
          const xIndex = xData.indexOf(item[0]);
          const yIndex = yData.indexOf(item[1]);
          return [xIndex, yIndex, item[2]];
        }),
        itemStyle: {
          opacity: 0.8
        },
        label: {
          show: true,
          formatter: (params: any) => params.value[2].toFixed(2),
          fontSize: 10
        }
      }
    ]
  };

  return (
    <ReactECharts 
      option={option} 
      style={{ height: "600px", width: "100%" }} 
    />
  );
};

export default MatrixScatterChart;