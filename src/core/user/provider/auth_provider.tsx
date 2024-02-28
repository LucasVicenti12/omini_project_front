import {createContext, ReactNode, useState} from "react";
import {coreRepository} from "@/core/user/repository/core_repository.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";
import {AlertTriangle, ShieldX} from "lucide-react";

type AuthProviderProp = {
    children: ReactNode,
    authKey: string
}

type AuthProviderState = {
    authenticated: boolean,
    loginLoading: boolean,
    login: (username: string, password: string) => void,
    logout: () => void,
    registerAccount: (username: string, password: string, confirmPassword: string) => void
}

const initialState: AuthProviderState = {
    authenticated: false,
    loginLoading: false,
    login: () => null,
    logout: () => null,
    registerAccount: () => null
}
export const AuthContext = createContext<AuthProviderState>(initialState);

export const AuthProvider = ({children, authKey}: AuthProviderProp) => {
    const [loginLoading, setLoginLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const value = {
        authenticated: true,
        loginLoading,
        login: (username: string, password: string) => {
            setLoginLoading(true);
            coreRepository.login(username, password).then((response) => {
                if(response.error === null){
                    localStorage.setItem(authKey, response.token ?? '')
                    navigate("/chat/home")
                }else{
                    toast(response.error, {
                        duration: 2000,
                        icon: <ShieldX/>
                    });
                }
                setLoginLoading(false)
            })
        },
        logout: () => {
            navigate("/login");
        },
        registerAccount: (username: string, password: string, confirmPassword: string) => {
            setLoginLoading(true);
            if(password !== confirmPassword){
                toast("The passwords do not match", {
                    duration: 2000,
                    icon: <AlertTriangle/>
                });
                setLoginLoading(false);
                return;
            }
            coreRepository.register(username, password).then((response) => {
                if(response.error === null){
                    navigate("/chat/login")
                }else{
                    toast(response.error, {
                        duration: 2000,
                        icon: <ShieldX/>
                    });
                }
                setLoginLoading(false);
            })
        }
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}