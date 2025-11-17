import { Button } from "@mui/material";
import Menu from "./menu";
import {
  Github,
  ArrowRightCircleIcon,
  Notebook,
  StickyNote,
  NotebookPenIcon,
} from "lucide-react";
import Separator from "../separator";
import estatiticas from "../imgs/estatisticas.jpg";
import { Card } from "../card";

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
            <div className="text-start font-medium text-[24px] pb-2">
              Benefícios do GOMON
            </div>
            {/* cards */}
            <div className=" text-justify pb-4">
              Diferente de métodos tradicionais que forçam categorizações rígidas, o GoM reconhece que na saúde, ciências sociais e comportamento humano, as pessoas frequentemente exibem características de vários perfis ao mesmo tempo. Esta flexibilidade captura melhor a heterogeneidade natural dos dados, fornece medidas de incerteza mais informativas e identifica perfis latentes que emergem organicamente da estrutura dos dados, resultando em análises mais precisas e intervenções mais direcionadas.
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Card
                title="Perfis Latentes"
                subtitle="Descobre padrões não óbvios nos dados. Não depende de categorizações pré-definidas pelo pesquisador. Perfis emergem organicamente da estrutura dos dados"
              />
              <Card
                title="Complexidade Humana"
                subtitle="Card 02 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              elementum aliquam orci, ac interdum lectus consequat sed."
              />
              <Card
                title="Card 03"
                subtitle="Card 02 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              elementum aliquam orci, ac interdum lectus consequat sed."
              />
              <Card
                title="Card 03"
                subtitle=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              elementum aliquam orci, ac interdum lectus consequat sed."
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
