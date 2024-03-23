import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { PasswordInput } from "@/components/custom/password.tsx";
import { Button } from "@/components/ui/button.tsx";
import { RefreshCw } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/core/user/provider/auth_provider.tsx";
import { useForm } from "react-hook-form";

export const RegisterForm = () => {
    const { loginLoading, registerAccount } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState
    } = useForm();

    // @ts-ignore
    const handleSubmitForm = (data) => {
        registerAccount(data);
    }

    const {errors} = formState;

    console.log(errors)

    return (
        <form className="flex-col gap-2" onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="grid gap-1 justify-items-start mt-3">
                <Label>Username</Label>
                <Input
                    placeholder={"Type your username"}
                    {...register("username", { required: "Inform the username", })}
                    disabled={loginLoading}
                />
            </div>
            <div className="grid gap-1 justify-items-start mt-3">
                <div className="flex gap-3">
                    <div className="grid gap-1 justify-items-start">
                        <Label>Name</Label>
                        <Input
                            placeholder={"Type your name"}
                            {...register("name", { required: true })}
                            disabled={loginLoading}
                        />
                    </div>
                    <div className="grid gap-1 justify-items-start">
                        <Label>Surname</Label>
                        <Input
                            placeholder={"Type your surname"}
                            {...register("surname", { required: true })}
                            disabled={loginLoading}
                        />
                    </div>
                </div>
            </div>
            <div className="grid gap-1 justify-items-start mt-3">
                <Label>E-mail</Label>
                <Input
                    placeholder={"Type your email"}
                    {...register("email", { required: true })}
                    disabled={loginLoading}
                />
            </div>
            <div className="grid gap-1 justify-items-start mt-5">
                <Label>Password</Label>
                <PasswordInput
                    placeholder={"Type your password"}
                    {...register("password", { required: true })}
                    disabled={loginLoading}
                />
            </div>
            <div className="grid gap-1 justify-items-start mt-5">
                <Label>Confirm password</Label>
                <PasswordInput
                    placeholder={"Confirm your password"}
                    {...register("confirmPassword", { required: true })}
                    disabled={loginLoading}
                />
            </div>
            <div className="grid gap-1 justify-items-center mt-5">
                <Button
                    className="w-full relative"
                    disabled={loginLoading}
                >
                    {
                        loginLoading && <RefreshCw className="mr-2 h-4 w-4 absolute left-5 animate-spin" />
                    }
                    Register
                </Button>
            </div>
        </form>
    )
}