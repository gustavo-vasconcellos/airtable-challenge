import React, { useState } from "react";

import { CalendarIcon, ChevronDown } from "../../Icons.js";

export const VIEWS = [
  { id: "week", label: "Week View", days: 7 },
  { id: "month", label: "Month View", days: 30 },
  { id: "year", label: "Year View", days: 365 },
];

export const ViewSelector = ({ currentView, onViewChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentViewData = VIEWS.find((v) => v.id === currentView);

  return (
    <div className="relative inline-block text-left mb-4">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-between items-center w-48 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <div className="flex items-center">
            <span className="mr-2">
              <CalendarIcon width={20} height={20} />
            </span>
            {currentViewData.label}
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            width={20}
            height={20}
          />
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-lg">
          <div className="py-1">
            {VIEWS.map((view) => (
              <button
                key={view.id}
                onClick={() => {
                  onViewChange(view.id);
                  setIsOpen(false);
                }}
                className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                  currentView === view.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700"
                }`}
              >
                {view.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
