import React from "react";

const Timer = () => {
  return (
    <div className="relative flex items-center justify-center w-32 h-12 bg-white border-2 border-solid border-[#ef4444] rounded-[9999px] text-[#ef4444] font-mono font-semibold text-sm ">
      // recording pulse
      <div className=" absolute -inset-1 border-2 border-solid border-[#ef4444] rounded-[9999px] opacity-[0.3] ">
        .
      </div>
      <span>00:00/05:00</span>
    </div>
  );
};

export default Timer;
