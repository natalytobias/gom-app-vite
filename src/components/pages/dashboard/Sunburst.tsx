import React, { useEffect, useState } from "react";
import { DashboardService } from "../../../services/DashboardService";
import ReactECharts from "./reactECharts";

interface SunburstChartProps {
  num_k: number;
}


const normalizeTreeValues = (nodes: any[]): any[] => {
  return nodes.map((node) => {
    if (node.children && node.children.length > 0) {
      const children = normalizeTreeValues(node.children);
      const totalValue = children.reduce(
        (sum, child) => sum + (child.value || 0),
        0
      );

      return {
        ...node,
        value: totalValue,
        children,
      };
    }
    return node;
  });
};

const SunburstChart: React.FC<SunburstChartProps> = ({ num_k }) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSunburst = async () => {
      try {
        const response = await DashboardService.sunburst(num_k);

        const fixedData = normalizeTreeValues(response);
        setChartData(fixedData);
      } catch (err) {
        console.error("Erro ao carregar dados do Sunburst:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSunburst();
  }, [num_k]);

  const option = {
    title: {
      text: `Distribuição dos Perfis (K = ${num_k})`,
      left: "center",
      top: 5,
      textStyle: { fontSize: 14 }
    },
    tooltip: {
      trigger: "item",
      formatter: (info: any) => {
        const value = info.value?.toFixed(3) ?? "0";
        return `${info.name}: <b>${value}</b>`;
      }
    },
    series: [
      {
        type: "sunburst",
        radius: ["5%", "90%"],
        data: chartData,
        highlightPolicy: "ancestor",

        label: {
          rotate: "radial",
          color: "#111",
          fontSize: 10,
        },

        levels: [
          {}, // Nivel 0
          {
            r0: "5%",
            r: "30%",
            itemStyle: { borderWidth: 2, borderColor: "#fff" },
            label: { fontSize: 12, color: "#222" }
          },
          {
            r0: "30%",
            r: "60%",
            itemStyle: { borderWidth: 1, borderColor: "#fff" }
          },
          {
            r0: "60%",
            r: "90%",
            itemStyle: { borderWidth: 1, borderColor: "#fff" }
          }
        ],

        // ✅ Paleta suave por cluster K
        color: [
          "#375398ff", // K1
          "#439079ff", // K2
          "#c7992fff", // K3
          "#e65050ff", // K4
        ],
      },
    ],
  };

  if (loading) return <p>Carregando mapa Sunburst...</p>;

  return <ReactECharts option={option} style={{ height: "460px", width: "100%" }} />;
};

export default SunburstChart;