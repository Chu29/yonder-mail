import SigninForm from "../components/SigninForm";
import yonderLogo from "../assets/nav-logo.svg";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-4">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-8 py-16">
        <div className="flex flex-col items-center">
          <img src={yonderLogo} alt="Yonder" className=" w-48" />
        </div>
        <SigninForm />
      </div>
    </div>
  );
};

export default LoginPage;
