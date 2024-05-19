import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LoginPage} from "@/core/user/page/login_page.tsx";
import {AuthProvider} from "@/core/user/provider/auth_provider.tsx";
import {HomePage} from "@/modules/home/page/home_page.tsx";
import {DefaultPage} from "@/shared/router/pages/default_page.tsx";
import { NewChatPage } from "@/modules/new_chat/page/new_chat_page.tsx";

export const Root = () => {
    return (
        <BrowserRouter basename={"/web"}>
            <Routes>
                <Route
                    path={""}
                    element={
                        <div>AAAA</div>
                    }
                />
                <Route
                    path={"/login"}
                    element={
                        <AuthProvider authKey={"my_chat_token"}>
                            <LoginPage isLogin={true}/>
                        </AuthProvider>
                    }
                />
                <Route
                    path={"/register"}
                    element={
                        <AuthProvider authKey={"my_chat_token"}>
                            <LoginPage isLogin={false}/>
                        </AuthProvider>
                    }
                />
                <Route
                    path={"/chat"}
                    element={
                        <AuthProvider authKey={"my_chat_token"}>
                            <DefaultPage/>
                        </AuthProvider>
                    }
                >
                    <Route path={"home"} element={<HomePage/>}/>
                    <Route path={"channel/:receiptUserUUID"} element={<NewChatPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}