import SigninForm from "./components/SigninForm";
import Logo from "../../components/Logo";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-4">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-8 py-16">
        <Logo />
        <SigninForm />
      </div>
    </div>
  );
};

export default LoginPage;
