import LoginForm from "@/components/loginPage/LoginForm";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-row">
        <LoginForm />
        <Separator orientation="vertical" />
        <div className="p-4">Register</div>
      </div>
    </div>
  );
}
