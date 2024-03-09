import LoginForm from "@/components/loginPage/LoginForm";
import RegisterForm from "@/components/loginPage/RegisterForm";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-row">
        <LoginForm />
        <Separator orientation="vertical" />
        <RegisterForm />
      </div>
    </div>
  );
}
