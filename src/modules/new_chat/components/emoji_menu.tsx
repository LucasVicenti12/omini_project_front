import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SmilePlus } from "lucide-react";

export const EmojiMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          type={"button"}
          variant={"ghost"}
          className={"hover:bg-green-700"}
        >
          <SmilePlus />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mb-4">
        <div style={{width: "500px", height: "400px"}}></div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
