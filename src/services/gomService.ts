import api from '../config/axiosConfig.ts';

interface parametrosGom {
  file: File;
  k_initial: number;
  k_final: number;
  case_id: string;
  internal_vars?: string[];
}

export class GomService {
  static async enviandoParaConfigurar(dados: parametrosGom): Promise<void> {
    try {
      const formData = new FormData();
      formData.append("file", dados.file);
      formData.append("k_initial", String(dados.k_initial));
      formData.append("k_final", String(dados.k_final));
      formData.append("case_id", dados.case_id);

      if (dados.internal_vars?.length) {
        dados.internal_vars.forEach(v => formData.append("internal_vars", v));
      }

      // debug: mostra o que está indo
      for (const [key, value] of formData.entries()) {
        console.log("Enviando:", key, value);
      }

      const res = await api.post("http://127.0.0.1:8000/upload-data/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Resposta do backend:", res.data);

    } catch (err: any) {
      console.error("Erro ao enviar:", err.response?.data || err.message);
      throw err;
    }
  }
}
