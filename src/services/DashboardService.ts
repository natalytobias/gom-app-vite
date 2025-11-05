import api from '../config/axiosConfig.ts';



export class DashboardService{
    static async sunburst(num_k: number){

        try{
            const response = await api.get(`http://127.0.0.1:8000/sunburst-map`, {
                params: { num_k }
            });
            return response.data;
        }
         catch(err: any){
            console.error("Erro ao carregar dados", err.response?.data || err.message);
            throw err;
         }
    }

    static async  DadosHeatmap() {
    try{
      const heatmapData = await api.get("http://127.0.0.1:8000/dados-heatmap");
      console.log(heatmapData);
      return heatmapData;
    } catch (err: any){
      console.error("Erro ao carregar dados", err.response?.data || err.message);
      throw err;
    }
  }
}