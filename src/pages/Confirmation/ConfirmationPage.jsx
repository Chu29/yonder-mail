import React from "react";
import ConfirmationContent from "./components/ConfirmationContent";
import AppHeader from "../../components/AppHeader";
import Footer from "../../components/Footer";

const ConfirmationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AppHeader />

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <ConfirmationContent />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ConfirmationPage;
