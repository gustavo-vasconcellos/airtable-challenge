import React, { useMemo } from "react";

export const Grid = ({ children, startDate, endDate, totalDays, timelineWidth }) => {
  const markers = useMemo(
    function generateMonthMarkers() {
      const monthCount =
        Math.ceil(
          (endDate.getFullYear() - startDate.getFullYear()) * 12 +
            (endDate.getMonth() - startDate.getMonth())
        ) + 1;

      return Array.from({ length: monthCount }, (_, i) => {
        const year =
          startDate.getFullYear() + Math.floor((startDate.getMonth() + i) / 12);
        const month = (startDate.getMonth() + i) % 12;

        const monthStart = new Date(year, month, 1);

        if (monthStart <= endDate) {
          const daysFromStart = Math.max(
            0,
            (monthStart - startDate) / (1000 * 60 * 60 * 24)
          );
          const leftOffset = (daysFromStart / totalDays) * 100;

          return {
            date: monthStart,
            label: monthStart.toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            }),
            leftOffset,
          };
        }

        return null;
      });
    },
    [startDate, endDate, totalDays]
  );

  return (
    <div
      style={{ width: timelineWidth }}
      className="relative"
    >
      <div className="relative h-12 mb-4">
        <div className="absolute top-0 left-0 w-full h-full border-b-2 border-gray-300 bg-gray-50"></div>
        {markers.map((marker, index) => (
          <div
            key={index}
            className="absolute top-0 h-full flex items-center border-b-2 border-gray-300 bg-gray-50 pr-4"
            style={{ left: `${marker.leftOffset}%` }}
          >
            <div className="w-px h-full bg-gray-300 mr-2"></div>
            <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
              {marker.label}
            </span>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};
