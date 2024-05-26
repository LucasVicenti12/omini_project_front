import { createContext, ReactNode, useEffect, useState } from "react";
import { coreRepository } from "@/core/user/repository/core_repository.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AlertTriangle, ShieldX } from "lucide-react";

export type AuthRequest = {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type AuthProviderProp = {
  children: ReactNode;
};

type AuthProviderState = {
  authenticated: boolean;
  loginLoading: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  registerAccount: (data: AuthRequest) => void;
  returnUserUUID: () => string;
  user: any;
  changeAvatar: (newAvatar: string) => void;
};

const initialState: AuthProviderState = {
  authenticated: false,
  loginLoading: false,
  login: () => null,
  logout: () => null,
  registerAccount: () => null,
  returnUserUUID: () => "",
  user: {},
  changeAvatar() {},
};
export const AuthContext = createContext<AuthProviderState>(initialState);

export const AuthProvider = ({ children }: AuthProviderProp) => {
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [user, setUser] = useState<object>({});

  const navigate = useNavigate();

  const location = window.location;

  useEffect(() => {
    let userUUID = localStorage.getItem("user_uuid") ?? "";
    coreRepository.getUserByUUID(userUUID).then((response) => {
      if (response.error === null) {
        setUser(response.user);
      } else {
        localStorage.removeItem("user_uuid");
        navigate("/login");
      }
    });
  }, [location, loginLoading]);

  const value = {
    authenticated: true,
    loginLoading,
    login: (username: string, password: string) => {
      setLoginLoading(true);
      coreRepository.login(username, password).then((response) => {
        if (response.error === null) {
          localStorage.setItem("user_uuid", response.userUUID ?? "");
          navigate("/chat/home");
        } else {
          toast(response.error, {
            duration: 2000,
            icon: <ShieldX />,
          });
        }
        setLoginLoading(false);
      });
    },
    logout: () => {
      localStorage.removeItem("user_uuid");
      coreRepository.logout()
      .then(_ => {
        navigate("/login");
      })
      .catch(_ => {
        toast("Unable to log out", {
          duration: 2000,
          icon: <AlertTriangle />,
        });
      });
    },
    registerAccount: (data: AuthRequest) => {
      setLoginLoading(true);
      if (data.password !== data.confirmPassword) {
        toast("The passwords do not match", {
          duration: 2000,
          icon: <AlertTriangle />,
        });
        setLoginLoading(false);
        return;
      }
      coreRepository.register(data).then((response) => {
        if (response.error === null) {
          navigate("/login");
        } else {
          toast(response.error, {
            duration: 2000,
            icon: <ShieldX />,
          });
        }
        setLoginLoading(false);
      });
    },
    returnUserUUID: () => localStorage.getItem("user_uuid") ?? "",
    user,
    changeAvatar: (newAvatar: string) => {
      coreRepository
        .changeAvatar(
          // @ts-ignore
          user?.uuid ?? "",
          newAvatar
        )
        .then((response) => {
          if (response.error === null) {
            window.location.reload();
          }
        });
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
