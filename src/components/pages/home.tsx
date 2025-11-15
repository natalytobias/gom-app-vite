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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            elementum aliquam orci, ac interdum lectus consequat sed.
          </div>

          <div className="text-start flex items-center gap-2 mt-2">
            <Button variant="contained">
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              elementum aliquam orci, ac interdum lectus consequat sed. Aliquam
              vulputate, lectus vitae posuere hendrerit, arcu mauris efficitur
              nulla, at sodales mi ante blandit dolor. Quisque egestas egestas
              massa et faucibus. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Integer elementum aliquam orci, ac interdum
              lectus consequat sed. Aliquam vulputate, lectus vitae posuere
              hendrerit,
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              elementum aliquam orci, ac interdum lectus consequat sed. Aliquam
              vulputate, lectus vitae posuere hendrerit, arcu mauris efficitur
              nulla, at sodales mi ante blandit dolor. Quisque egestas egestas
              massa et faucibus. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Integer elementum aliquam orci, ac interdum
              lectus consequat sed. Aliquam vulputate, lectus vitae posuere
              hendrerit,
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Card
                title="Card 01"
                subtitle="Card 01 -  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              elementum aliquam orci, ac interdum lectus consequat sed."
              />
              <Card
                title="Card 02"
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
              LOREM IPSUM
            </div>
            <div className="text-start">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              elementum aliquam orci, ac interdum lectus consequat sed.
            </div>
          </div>

          <div className="text-start flex  items-center gap-2 mt-2">
            <Button variant="contained" className="items-center">
              Leia a documentação
              <NotebookPenIcon size={15} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
