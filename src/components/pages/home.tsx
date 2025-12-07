import { Button } from "@mui/material";
import Menu from "./menu";
import {
  Github,
  ArrowRightCircleIcon,
  Notebook,
  StickyNote,
  NotebookPenIcon,
} from "lucide-react";
import Separator from "../componentes/separator";
import estatiticas from "../imgs/estatisticas.jpg";
import { Card } from "../componentes/card";

export default function Home() {
  return (
    <>
      <Menu />
      <div className=" max-w-200 pt-15">
        <div>
          <div className="text-start font-medium text-2xl pb-2">GOMON WEB</div>
          <div className="text-start">
            O GoMON é uma ferramenta online que permite a utilização do método Grade of Membership
          </div>

          <div className="text-start flex items-center gap-2 mt-2">
            <Button variant="contained" href="/formulario">
              Comece a usar
              <ArrowRightCircleIcon size={15} className="ml-2" />
            </Button>
          </div>
        </div>

        <Separator />

        <div className="flex flex-row justify-between w-full gap-8 ">
          <div className=" flex-1">
            <div className="text-start font-medium text-[24px] pb-2">
              Por que usar o GOMON?
            </div>
            <div className=" text-justify">
              Ele oferece uma abordagem mais realista e nuanceada para análise de populações complexas, 
              permitindo que indivíduos pertençam a múltiplos grupos simultaneamente através de graus de pertinência. 
              
            </div>
          </div>
          <div className="  flex-1">
            <img src={estatiticas} alt="estatísticas" className="rounded-2xl" />
          </div>
        </div>

        <Separator />

         <div className="flex flex-row justify-between w-full gap-8 ">
          <div className="  flex-1">
            <img src={estatiticas} alt="estatísticas" className="rounded-2xl" />
          </div>
          <div className=" flex-1">
            
            <div className=" text-justify">
              Diferente de métodos tradicionais que forçam categorizações rígidas, o GoM reconhece que na saúde, ciências sociais e comportamento humano, as pessoas frequentemente exibem características de vários perfis ao mesmo tempo. Esta flexibilidade captura melhor a heterogeneidade natural dos dados, fornece medidas de incerteza mais informativas e identifica perfis latentes que emergem organicamente da estrutura dos dados, resultando em análises mais precisas e intervenções mais direcionadas.
              
            </div>
          </div>
          
        </div>

        <Separator />

        <div className="flex flex-row justify-between w-full gap-8 ">
          <div className="  flex-1">
            <div className="text-start font-medium text-[24px] pb-2">
              Em quais areas é recomendado utilizar?
            </div>
            {/* cards */}
            <div className=" text-justify pb-4">
              O GoM é ideal quando a realidade que você estuda não cabe em categorias fixas e mutuamente exclusivas. 
              Diferente de métodos tradicionais que forçam pessoas ou entidades em uma única classificação, o GoM reconhece que na vida real, temos características múltiplas e sobrepostas. 
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Card
                title="Saúde e Epidemiologia"
                subtitle="Ideal para análise de pacientes com múltiplas condições simultâneas, 
                permitindo diagnósticos mais precisos e tratamentos personalizados que consideram 
                a complexidade humana."
              />
              <Card
                title="Ciências Sociais"
                subtitle="Perfeito para estudar trajetórias de vida complexas e segmentação populacional,
                 capturando sobreposições em comportamentos, classes sociais e estilos de vida."
              />
              <Card
                title="Marketing e Segmentação"
                subtitle="Excelente para identificar perfis híbridos de consumidores, reconhecendo 
                que pessoas podem ter múltiplos comportamentos de consumo e preferências sobrepostas."
              />
              <Card
                title="Políticas Públicas:"
                subtitle="Crucial para direcionar programas sociais a populações vulneráveis com 
                necessidades multidimensionais, evitando categorizações simplistas"
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-row justify-between w-full gap-8 ">
          <div className="max-w-100">
            <div className="text-start font-medium text-2xl pb-2">
              PADRONIZAÇÃO
            </div>
            <div className="text-start">
              É importante que os dados da sua amostragem estejam dentro dos padrões do GoM. Caso não saiba ou não tenha certeza leia nossa documentação.
            </div>
          </div>

          <div className="text-start flex  items-center gap-2 mt-2">
            <Button
              variant="contained"
              className="items-center"
              href="/documentacao"
            >
              Leia a documentação
              <NotebookPenIcon size={15} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
