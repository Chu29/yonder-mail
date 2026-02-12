import { memo } from "react";
import { Lock } from "lucide-react";

const PrivacyNotice = () => {
  return (
    <div className="flex items-start justify-center gap-3 pt-6 text-center">
      <Lock size={18} className="text-blue-600 shrink-0" />
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Speak freely.</span> Your video is
        encrypted and stays private
        <br />
        until your delivery date.
      </p>
    </div>
  );
};

export default memo(PrivacyNotice);
