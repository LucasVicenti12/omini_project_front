import {Label} from "@/components/ui/label.tsx";
import {PasswordInput} from "@/components/custom/password.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.js";
import {useContext} from "react";
import {AuthContext} from "@/core/user/provider/auth_provider.tsx";
import {RefreshCw} from "lucide-react";

export const FormLogin = () => {
    const {login, loginLoading} = useContext(AuthContext);

    const {
        register,
        handleSubmit
    } = useForm();

    // @ts-ignore
    const handleSubmitForm = (data) => {
        login(data.username, data.password);
    }

    return (
        <form className="flex-col gap-2" onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="grid gap-1 justify-items-start mt-3">
                <Label>Username</Label>
                <Input
                    placeholder={"Type your username"}
                    {...register("username", {required: true})}
                    disabled={loginLoading}
                />
            </div>
            <div className="grid gap-1 justify-items-start mt-5">
                <Label>Password</Label>
                <PasswordInput
                    placeholder={"Type your password"}
                    {...register("password", {required: true})}
                    disabled={loginLoading}
                />
            </div>
            <div className="grid gap-1 justify-items-center mt-5">
                <Button
                    className="w-full relative"
                    disabled={loginLoading}
                >
                    {
                        loginLoading && <RefreshCw className="mr-2 h-4 w-4 absolute left-5 animate-spin"/>
                    }
                    Login
                </Button>
            </div>
        </form>
    )
}