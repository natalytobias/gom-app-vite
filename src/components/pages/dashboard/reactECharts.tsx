import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import type { EChartsOption, SetOptionOpts } from 'echarts'; 
import type { CSSProperties } from 'react';

import { CanvasRenderer } from 'echarts/renderers';

// ✅ Agora importamos o Sunburst
import { HeatmapChart, SunburstChart } from 'echarts/charts';

// ✅ Label handling + animações do Sunburst
import { LabelLayout, UniversalTransition } from 'echarts/features';

import { 
  GridComponent, 
  VisualMapComponent, 
  TooltipComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components';

// ✅ Registrar todos os componentes
echarts.use([
  CanvasRenderer,
  HeatmapChart,
  SunburstChart, // <--- AQUI!
  GridComponent,
  VisualMapComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  LabelLayout, // <--- AQUI!
  UniversalTransition // <--- AQUI!
]);

interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
}

const ReactECharts: React.FC<ReactEChartsProps> = ({ option, style, settings }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current!);

    const handleResize = () => {
      chartInstance.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      chartInstance.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const chartInstance = echarts.getInstanceByDom(chartRef.current!);
    chartInstance?.setOption(option, settings);
  }, [option, settings]);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '300px', ...style }}
    />
  );
};

export default ReactECharts;
