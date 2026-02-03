import { useNavigate } from "react-router";
import googleLogo from "../../../assets/google_logo.svg";
import iosLogo from "../../../assets/ios_logo.svg";

const SigninForm = () => {
  const navigate = useNavigate();
  return (
    <form className="w-full max-w-md rounded-2xl bg-white px-8 py-10 text-center shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
      <h3 className="text-2xl font-semibold text-slate-900">
        Welcome to Yonder
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        Sign in to start your journey of self-reflection.
      </p>

      <div className="mt-7 space-y-4">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 cursor-pointer "
          onClick={() => {
            navigate("/recording");
          }}
        >
          <img src={googleLogo} alt="Google" className="h-5 w-5" />
          Continue with Google
        </button>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 cursor-pointer"
          onClick={() => {
            navigate("/recording");
          }}
        >
          <img src={iosLogo} alt="Apple" className="h-5 w-5" />
          Continue with Apple
        </button>
      </div>

      <footer className="mt-8 text-xs text-slate-500">
        By continuing, you agree to our
        <a
          href="#"
          className="mx-1 font-medium text-slate-600 underline underline-offset-4 hover:text-slate-900"
        >
          Terms of Service
        </a>
        and
        <a
          href="#"
          className="ml-1 font-medium text-slate-600 underline underline-offset-4 hover:text-slate-900"
        >
          Privacy Policy
        </a>
        .
      </footer>
    </form>
  );
};

export default SigninForm;
