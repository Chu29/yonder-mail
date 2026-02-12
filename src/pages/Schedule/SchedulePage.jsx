import AppHeader from "../../components/AppHeader";
import ScheduleForm from "./components/ScheduleForm";
import Footer from "../Home/components/Footer";

const SchedulePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AppHeader />

      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center sm:text-left">
          Schedule delivery
        </h1>

        {/* Form */}
        <ScheduleForm />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SchedulePage;
