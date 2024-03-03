import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {CircleUser, Grip, LogOut, UserCog} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {useTheme} from "@/shared/ThemeProvider.tsx";
import {useContext} from "react";
import {AuthContext} from "@/core/user/provider/auth_provider.tsx";
import {MenuSideContext, MenuSideProvider} from "@/shared/components/menu/provider/menu_side_provider.tsx";
import {useNavigate} from "react-router-dom";

export const MenuSide = () => {
    return (
        <MenuSideProvider>
            <MenuSideContent/>
        </MenuSideProvider>
    );
}

const MenuSideContent = () => {
    const {logout, returnUserUUID} = useContext(AuthContext);
    const {theme, setTheme} = useTheme();

    const {users} = useContext(MenuSideContext);

    const navigate = useNavigate();

    const userUUID = returnUserUUID();

    const handleChangeTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    const handleChangeChat = (receiptUserUUID: string) => {
        navigate(`/chat/channel/${userUUID}/${receiptUserUUID}`);
    }

    return (
        <div className={"h-full flex-col w-full"}>
            <div className={"p-3 m-2 w-90 h-fit border rounded-md flex items-center"}>
                <Avatar className={"h-8 w-8"}>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className={"flex w-full h-full ml-5 justify-between items-center"}>
                    <span className="bg-background text-muted-foreground text-sm">My user</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"} size={"icon"}>
                                <Grip size={"15"} className={"text-muted-foreground"}/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                Profile
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuGroup>
                                <DropdownMenuItem className={"p-2"}>
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-muted-foreground">Change avatar</span>
                                        <CircleUser className="text-muted-foreground" size={"15"}/>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className={"p-2"}>
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-muted-foreground">Config profile</span>
                                        <UserCog className="text-muted-foreground" size={"15"}/>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className={"p-2"} onClick={logout}>
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-muted-foreground">Logout</span>
                                        <LogOut className="text-muted-foreground" size={"15"}/>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className={"p-2"} onClick={handleChangeTheme}>
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-muted-foreground">Dark theme</span>
                                        <Switch
                                            className="text-muted-foreground ml-10"
                                            checked={theme === 'dark'}
                                        />
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className={"mt-10"}>
                {
                    users?.map((user: any, index: number) => (
                        <div
                            className={"p-3 m-2 w-90 h-fit border rounded-md flex items-center cursor-pointer hover:bg-accent hover:text-accent-foreground"}
                            key={index}
                            onClick={() => handleChangeChat(user?.uuid ?? '')}
                        >
                            <Avatar className={"h-8 w-8"}>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className={"flex w-full h-full ml-5 justify-between items-center"}>
                                <span className="text-muted-foreground text-sm">{user?.login ?? ''}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}