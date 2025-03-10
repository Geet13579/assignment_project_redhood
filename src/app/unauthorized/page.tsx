"use client";

import React from "react";
import { CircleAlert } from "lucide-react";

function SuccessPopup() {
  const message = "Login another device...";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative animate-fade-in shadow-xl">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="rounded-full bg-red-100 p-3">
            <CircleAlert className="h-8 w-8 text-red-500" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Warning!</h3>
            <p className="text-gray-600">{message}</p>
          </div>

          <button
            onClick={() => (window.location.href = "/")}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPopup;
