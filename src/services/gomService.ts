import api from '../config/axiosConfig.ts';

interface parametrosGom {
  file: File;
  k_initial: number;
  k_final: number;
  case_id: string;
  internal_vars?: string[];
}

export class GomService {
  static async enviandoParaConfigurar(dados: parametrosGom): Promise<any> {
    try {
      const formData = new FormData();
      formData.append("file", dados.file);
      formData.append("k_initial", String(dados.k_initial));
      formData.append("k_final", String(dados.k_final));
      formData.append("case_id", dados.case_id);

      if (dados.internal_vars?.length) {
        dados.internal_vars.forEach(v => formData.append("internal_vars", v));
      }

      api.post("http://127.0.0.1:8000/upload-data/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
    } catch (err: any) {
      console.error("Erro ao enviar:", err.response?.data || err.message);
      throw err;
    }
  }

  static async convertendoTxt(k_final: number, internal_vars: string[]): Promise<any>{
    try {
      const conversao = await api.get("http://127.0.0.1:8000/conversao-txt", {
        params: {
          num_k: k_final,
          internal_vars_string: internal_vars.join(',')
        }
      });

      return conversao.data;
      
    } catch (err: any) {
      console.error("Erro ao enviar:", err.response?.data || err.message);
      throw err;
    }
  }

  
}
