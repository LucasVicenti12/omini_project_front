import {createContext, ReactNode, useEffect, useState} from "react";
import {coreRepository} from "@/core/user/repository/core_repository.ts";

type MenuSideContextState = {
    users: any
}

const initialState: MenuSideContextState = {
    users: []
}

type MenuSideProviderProps = {
    children: ReactNode
}

export const MenuSideContext = createContext<MenuSideContextState>(initialState);

export const MenuSideProvider = ({children}: MenuSideProviderProps) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        coreRepository.getAllUsers().then((response) => {
            if(response.error === null){
                setUsers(response.users);
            }else{
                setUsers([]);
            }
        })
    }, []);

    const value = {
        users,
    }

    return (
        <MenuSideContext.Provider value={value}>
            {children}
        </MenuSideContext.Provider>
    )
}
