import {createContext, ReactNode, useEffect, useState} from "react";
import {coreRepository} from "@/core/user/repository/core_repository.ts";

type MenuSideContextState = {
    users: any,
    loading: boolean,
}

const initialState: MenuSideContextState = {
    users: [],
    loading: true,
}

type MenuSideProviderProps = {
    children: ReactNode
}

export const MenuSideContext = createContext<MenuSideContextState>(initialState);

export const MenuSideProvider = ({children}: MenuSideProviderProps) => {
    const [params, setParams] = useState(initialState);

    useEffect(() => {
        coreRepository.getAllUsers().then((response) => {
            if(response.error === null){
                setParams({
                    users: response.users,
                    loading: false
                });
            }else{
                setParams({
                    users: [],
                    loading: false
                });
            }
        })
    }, []);

    return (
        <MenuSideContext.Provider value={params}>
            {children}
        </MenuSideContext.Provider>
    )
}
