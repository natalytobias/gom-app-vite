import React, { useState, useEffect } from 'react';
import type { EChartsOption } from 'echarts';
import ReactECharts from './reactECharts';
import { DashboardService } from '../../../services/DashboardService';


interface HeatmapApiResponse {
    xAxisLabels: string[];
    yAxisLabels: string[];
    data: [number, number, number][]; 
    valueKey: string;
}

const HeatmapChart: React.FC = () => {
    const [apiData, setApiData] = useState<HeatmapApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                //const response = await GomService.DadosHeatmap();
                const response = await DashboardService.DadosHeatmap();
                
                setApiData(response.data as HeatmapApiResponse); 
                setIsLoading(false);
            } catch (err) {
                setError("Falha ao carregar dados do heatmap.");
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    if (isLoading) {
        return <div style={{ height: '400px', textAlign: 'center' }}>Carregando dados do Heatmap...</div>;
    }

    if (error || !apiData) {
        return <div style={{ height: '400px', color: 'red', textAlign: 'center' }}>{error || "Nenhum dado encontrado."}</div>;
    }
    
    
    const heatmapOption: EChartsOption = {
        title: { 
            text: `Análise GOM - Associação aos Perfis Extremos`, 
            left: 'center' 
        },
        tooltip: {
            position: 'top',
            formatter: function(params: any) {
                // CORREÇÃO AQUI: params.value[0] = índice x, params.value[1] = índice y
                const perfil = apiData.xAxisLabels[params.value[0]]; // 'k1' ou 'k2'
                const variavelNivel = apiData.yAxisLabels[params.value[1]]; // 'Var1 - l1'
                const value = params.value[2];
                
                return `
                    <strong>${variavelNivel}</strong><br/>
                    Perfil ${perfil}: <b>${value.toFixed(4)}</b><br/>
                    ${apiData.valueKey}
                `;
            }
        },
        grid: { 
            height: '70%', 
            top: '15%', 
            left: '20%', 
            right: '5%', 
            bottom: '15%' 
        },
        xAxis: {
            type: 'category',
            data: apiData.xAxisLabels, // ['k1', 'k2']
            splitArea: { show: true },
            name: 'Perfis GOM'
        },
        yAxis: {
            type: 'category',
            data: apiData.yAxisLabels, // ['Var1 - l1', 'Var1 - l2', ...]
            splitArea: { show: true },
            axisLabel: {
                fontSize: 11,
                margin: 10
            }
        },
        visualMap: {
            min: 0,
            max: 0.7, 
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '5%',
            text: ['Alta Associação', 'Baixa Associação'],
            inRange: {
                color: ['#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#fee090', '#fdae61', '#f46d43', '#d73027']
            }
        },
        series: [{
            name: apiData.valueKey,
            type: 'heatmap',
            data: apiData.data,
            label: { 
                show: true, 
                fontSize: 10, 
                color: '#000',
                formatter: function(params: any) {
                    return params.value[2] === 0 ? '0' : params.value[2].toFixed(3);
                }
            },
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    return (
        <div style={{ width: '100%', height: '500px' }}>
            <ReactECharts option={heatmapOption} style={{ height: '100%' }} />
        </div>
    );
};

export default HeatmapChart;