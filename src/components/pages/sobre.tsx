import { Button } from "@mui/material";
import Menu from "./menu";
import { Github } from "lucide-react";

export default function Sobre() {
  return (
    <>
      <Menu />
      <div className=" max-w-200 pt-15">
        <div className="text-start font-medium text-2xl pb-2">Objetivo</div>
        <div className="text-start">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survive
        </div>

        <div className="h-[0.5px] bg-gray-200 w-full my-4" />

        <div className="text-start font-medium text-2xl pb-2">Repositório</div>
        <div className="text-start ">
          Fique a vontade para explorar o repositório no github e contribuir com
          o projeto ❤️
        </div>
        <div className="text-start flex items-center gap-2 mt-2">
          <Button variant="contained">
            <Github size={15} className="mr-2" />
            Github
          </Button>
        </div>
      </div>
    </>
  );
}
