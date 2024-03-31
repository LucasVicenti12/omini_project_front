import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Paperclip } from "lucide-react";

export const AttachFileMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          type={"button"}
          variant={"ghost"}
          className={"hover:bg-green-700"}
        >
          <Paperclip />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mb-4">
        <div
          style={{ width: "400px", height: "200px" }}
          className="p-2 flex flex-col"
        >
          <Button className="w-full border rounded p-2">Import image</Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
