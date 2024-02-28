import loginImage from "../../../shared/assets/images/sign_in_image.svg";
import {FormLogin} from "@/core/user/components/login_form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {RegisterForm} from "@/core/user/components/register_form.tsx";
import {useNavigate} from "react-router-dom";

type LoginPageProps = {
    isLogin: boolean
}

export const LoginPage = ({isLogin}: LoginPageProps) => {
    const changeForm = isLogin;

    const navigate = useNavigate()

    return (
        <div className="w-full h-full flex">
            <div className="w-1/2 h-full hidden lg:flex items-center justify-center">
                <img src={loginImage} alt="Image" className="rounded-md w-2/3"/>
            </div>
            <div className="w-full lg:w-1/2 h-full flex justify-center items-center">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {
                            changeForm ? "Login account" : "Register account"
                        }
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {
                            changeForm
                                ? "Enter your credentials below to login in your account"
                                : "Enter your credentials below to create account"
                        }
                    </p>
                    {
                        changeForm ? <FormLogin/> : <RegisterForm/>
                    }
                    <div className="relative p-3">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"/>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-background px-2 text-muted-foreground text-sm">
                                {
                                    changeForm
                                        ? "But, if you don't have a account"
                                        : "But, if you already have a account"
                                }
                            </span>
                        </div>
                    </div>
                    <div className="grid gap-1 justify-items-center mt-5">
                        {
                            changeForm
                                ? <Button
                                    className="w-full"
                                    variant={"outline"}
                                    onClick={() => navigate("/register")}
                                >
                                    Create account
                                </Button>
                                : <Button
                                    className="w-full"
                                    variant={"outline"}
                                    onClick={() => navigate("/login")}
                                >
                                    Login in your account
                                </Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}