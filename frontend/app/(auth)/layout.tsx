import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 ">
      <div className="w-full max-w-5xl flex flex-col sm:flex-row overflow-hidden rounded-xl border-2">
        {/* left / hero */}
        <div className="w-full sm:w-1/2 flex flex-col items-center justify-center gap-4 bg-neutral-900/50 sm:bg-neutral-800 px-6 py-8 sm:px-8 sm:py-12 text-center text-neutral-100">
          <h1 className="text-center text-lg sm:text-xl md:text-2xl leading-relaxed">
            Thanks for choosing
            <span className="mx-2 text-2xl tracking-wide font-medium text-neutral-50">
              Kira
              <span className="text-base tracking-tighter font-normal text-rose-600">
                inv
              </span>
            </span>
            as your inventory manager application
          </h1>
          <h3 className="text-xl text-neutral-300">Welcome to the family </h3>
        </div>

        {/* right / auth */}
        <div className="w-full sm:w-1/2 flex justify-center bg-neutral-900 px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
