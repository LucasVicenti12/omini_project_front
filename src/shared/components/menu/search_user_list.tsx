import { Input } from "@/components/ui/input.tsx";
import { Search } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/core/user/provider/auth_provider.tsx";

type SearchUserListProps = {
  users: [];
};
export const SearchUserList = ({ users }: SearchUserListProps) => {
  const { returnUserUUID } = useContext(AuthContext);

  const navigate = useNavigate();

  const userUUID = returnUserUUID();

  const handleChangeChat = (receiptUserUUID: string) => {
    navigate(`/chat/channel/${userUUID}/${receiptUserUUID}`);
  };

  const [searchUser, setSearchUser] = useState<string>("");

  return (
    <div className={"mt-10"}>
      <div className={"p-2 w-90 h-fit rounded-md flex items-center relative"}>
        <Input
          placeholder={"Search a user"}
          onChange={(evt) => setSearchUser(evt.target.value)}
        />
        <Search className={"absolute right-5"} color={"gray"} size={"16"} />
      </div>
      {users
        // @ts-ignore
        ?.filter((user) => user.login.toLowerCase().includes(searchUser))
        ?.map((user: any, index: number) => {
          if (user.uuid != userUUID) {
            return (
              <div
                className={
                  "p-3 m-2 w-90 h-fit border rounded-md flex items-center cursor-pointer hover:bg-accent hover:text-accent-foreground"
                }
                key={index}
                onClick={() => handleChangeChat(user?.uuid ?? "")}
              >
                <Avatar className={"h-8 w-8"}>
                  <AvatarImage src={user?.avatar} alt="@shadcn" />
                  <AvatarFallback>{user?.altAvatar ?? "DF"}</AvatarFallback>
                </Avatar>
                <div
                  className={
                    "flex w-full h-full ml-5 justify-between items-center"
                  }
                >
                  <span className="text-muted-foreground text-sm">
                    {user?.login ?? ""}
                  </span>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};
