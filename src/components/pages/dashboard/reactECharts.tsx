import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import type { EChartsOption, SetOptionOpts } from 'echarts'; 
import type { CSSProperties } from 'react';

import { CanvasRenderer } from 'echarts/renderers';

import { 
  HeatmapChart, 
  SunburstChart,
  ScatterChart  
} from 'echarts/charts';


import { LabelLayout, UniversalTransition } from 'echarts/features';

import { 
  GridComponent, 
  VisualMapComponent, 
  TooltipComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components';


echarts.use([
  CanvasRenderer,
  HeatmapChart,
  SunburstChart,
  ScatterChart,      
  GridComponent,
  VisualMapComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  LabelLayout,
  UniversalTransition
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