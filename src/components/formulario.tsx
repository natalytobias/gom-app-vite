import React, { useState } from "react";
import { GomService } from "../services/gomService";

export default function GomForm(){
  const [file, setFile] = useState<File | null>(null);
  const [kInicial, setKInicial] = useState<number>(0);
  const [kFinal, setKFinal] = useState<number>(0);
  const [caseId, setCaseId] = useState<string>("");
  //const [internalVars, setInternalVars] = useState<string>("");
  const [internalVars, setInternalVars] = useState<string[]>([""]);

  const handleChangeVar = (index: number, value: string) => {
    const newVars = [...internalVars];
    newVars[index] = value;
    setInternalVars(newVars);
  };

   const addField = () => {
    setInternalVars([...internalVars, ""]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Selecione um arquivo!");
      return;
    }

    const filteredVars = internalVars.filter(v => v.trim() !== "");
    

    try {
      await GomService.enviandoParaConfigurar({
        file,
        k_initial: kInicial,
        k_final: kFinal,
        case_id: caseId,
        //internal_vars: internalVars,
        internal_vars: filteredVars,
      });
      alert("Dados enviados com sucesso!");
    } catch (err) {
      console.error("Erro ao enviar:", err);
      alert("Erro ao enviar dados!");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
      <label>
        Arquivo (CSV/TXT):
        <input
          type="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          required
        />
      </label>

      <label>
        k_inicial:
        <input
          type="number"
          value={kInicial}
          onChange={(e) => setKInicial(Number(e.target.value))}
          required
        />
      </label>

      <label>
        k_final:
        <input
          type="number"
          value={kFinal}
          onChange={(e) => setKFinal(Number(e.target.value))}
          required
        />
      </label>

      <label>
        case_id:
        <input
          type="text"
          value={caseId}
          onChange={(e) => setCaseId(e.target.value)}
          required
        />
      </label>

      <label>internal_vars: </label>
      {internalVars.map((val, index) => (
        <div key={index} style={{display: "flex", marginBottom: "8px"}}>
          <input
            type="text"
            value={val}
            onChange={(e) => handleChangeVar(index, e.target.value)}
            style={{ flex: 1}}
          />
          {index === internalVars.length - 1 &&(
            <button
              type="button"
              onClick={addField}
              style={{marginLeft: "8px"}}
            >
              +
            </button>
          )}

        </div>
      ))}

      {/* <label>
        internal_vars (separadas por vírgula):
        <input
          type="text"
          value={internalVars}
          onChange={(e) => setInternalVars(e.target.value)}
        />
      </label> */}

      <button type="submit">Enviar</button>
    </form>
  );
};

