import React, { useMemo } from "react";

import { getTimelineScale } from "../../utils/getTimelineScale.js";

export const Grid = ({
  children,
  startDate,
  endDate,
  totalDays,
  timelineWidth,
  viewType,
}) => {
  const monthMarkers = useMemo(
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
          const leftOffset = daysFromStart * getTimelineScale(viewType);

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
    [startDate, endDate, totalDays, viewType]
  );

  const weekDividers = useMemo(() => {
    if (viewType === "year") return [];

    const totalDays =
      Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    return Array.from({ length: totalDays }, (_, i) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      return currentDate;
    })
      .filter((date) => date.getDay() === 1 && date <= endDate)
      .map((mondayDate) => {
        const daysFromStart = (mondayDate - startDate) / (1000 * 60 * 60 * 24);

        return daysFromStart * getTimelineScale(viewType);
      });
  }, [startDate, endDate, viewType]);

  return (
    <div style={{ width: timelineWidth + 100 }} className="relative">
      <div className="absolute inset-0 pointer-events-none">
        {weekDividers.map((offset, index) => (
          <div
            key={`week-${index}`}
            className="absolute top-0 bottom-0 bg-gray-200"
            style={{
              left: offset,
              width: "1px",
            }}
          />
        ))}
        {monthMarkers.map((marker, index) => (
          <div
            key={`month-${index}`}
            className="absolute top-0 bottom-0 bg-gray-400"
            style={{
              left: marker.leftOffset,
              width: "2px",
            }}
          />
        ))}
      </div>
      <div className="relative h-12 border-b-2 border-gray-300 mb-4 bg-gray-50">
        {monthMarkers.map((marker, index) => (
          <div
            key={index}
            className="absolute top-0 h-full flex items-center"
            style={{ left: marker.leftOffset }}
          >
            <div className="w-px h-full bg-gray-300 mr-2"></div>
            <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
              {marker.label}
            </span>
          </div>
        ))}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};
