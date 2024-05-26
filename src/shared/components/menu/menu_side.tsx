import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { CircleUser, Home, LogOut, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { useTheme } from "@/shared/ThemeProvider.tsx";
import { useContext, useState } from "react";
import { AuthContext } from "@/core/user/provider/auth_provider.tsx";
import {
  MenuSideContext,
  MenuSideProvider,
} from "@/shared/components/menu/provider/menu_side_provider.tsx";
import { SearchUserList } from "@/shared/components/menu/search_user_list.tsx";
import { ModalChangeAvatar } from "@/core/user/components/modal_change_avatar";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export const MenuSide = () => {
  return (
    <MenuSideProvider>
      <MenuSideContent />
    </MenuSideProvider>
  );
};

const MenuSideContent = () => {
  const { users, loading } = useContext(MenuSideContext);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <div className={"h-full flex-col w-full"}>
      <div className={"p-3 m-2 w-90 h-fit border rounded-md flex items-center"}>
        <Avatar className={"h-8 w-8"}>
          <AvatarImage src={user.avatar} alt="@shadcn" />
          <AvatarFallback>{user.altAvatar}</AvatarFallback>
        </Avatar>
        <div className={"flex w-full h-full ml-5 justify-between items-center"}>
          <span className="bg-background text-muted-foreground text-sm">
            My user
          </span>
          <MenuConfig />
        </div>
      </div>
      <div
        className={
          "p-3 m-2 w-90 h-fit border rounded-md flex items-center gap-2 cursor-pointer hover:bg-accent hover:text-accent-foreground"
        }
        onClick={() => navigate("/chat/home")}
      >
        <Home className={"text-muted-foreground"} />
        <span className="text-muted-foreground text-sm">Home</span>
      </div>
      {loading ? (
        <div className={"mt-10"}>
          <Skeleton className="h-[40px] p-3 m-2 w-90 bg-muted" />
          <Skeleton className="h-[40px] p-3 m-2 w-90 bg-muted" />
          <Skeleton className="h-[40px] p-3 m-2 w-90 bg-muted" />
        </div>
      ) : (
        <SearchUserList users={users} />
      )}
    </div>
  );
};

const MenuConfig = () => {
  const [openChange, setOpenCange] = useState<boolean>(false);

  const { logout } = useContext(AuthContext);
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleOpenChangeAvatar = () => setOpenCange(true);
  const handleCloseChangeAvatar = () => setOpenCange(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <UserCog size={"15"} className={"text-muted-foreground"} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className={"p-2"} onClick={handleOpenChangeAvatar}>
            <div className="flex items-center justify-between w-full">
              <span className="text-muted-foreground">Change avatar</span>
              <CircleUser className="text-muted-foreground" size={"15"} />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className={"p-2"}>
            <div className="flex items-center justify-between w-full">
              <span className="text-muted-foreground">Config profile</span>
              <UserCog className="text-muted-foreground" size={"15"} />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className={"p-2"} onClick={logout}>
            <div className="flex items-center justify-between w-full">
              <span className="text-muted-foreground">Logout</span>
              <LogOut className="text-muted-foreground" size={"15"} />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className={"p-2"} onClick={handleChangeTheme}>
            <div className="flex items-center justify-between w-full">
              <span className="text-muted-foreground">Dark theme</span>
              <Switch
                className="text-muted-foreground ml-10"
                checked={theme === "dark"}
              />
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
      <ModalChangeAvatar
        open={openChange}
        closeModal={handleCloseChangeAvatar}
      />
    </DropdownMenu>
  );
};
