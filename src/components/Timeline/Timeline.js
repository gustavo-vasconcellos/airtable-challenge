import React, { useMemo, useState } from "react";

import { useTimeline } from "./Context.js";
import { Grid } from "./Grid.js";
import { Lane } from "./Lane.js";
import { ViewSelector } from "./ViewSelector.js";

import { assignLanes } from "../../utils/assignLanes.js";
import { getTimelineScale } from "../../utils/getTimelineScale.js";
import { parseDate } from "../../utils/parseDate.js";

export const Timeline = () => {
  const [viewType, setViewType] = useState("year");
  const { items } = useTimeline();

  const [startDate, endDate, totalDays, timelineWidth, lanes] = useMemo(
    function calculateBoundsAndLanes() {
      const lanes = assignLanes(items);

      const allDates = items.flatMap((item) => [
        parseDate(item.start),
        parseDate(item.end),
      ]);

      const start = new Date(Math.min(...allDates));
      const end = new Date(Math.max(...allDates));
      const total = Math.max(1, (end - start) / (1000 * 60 * 60 * 24) + 1);
      const width = Math.max(800, total * getTimelineScale(viewType));

      return [start, end, total, width, lanes];
    },
    [items, viewType]
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Project Timeline</h2>
        <ViewSelector currentView={viewType} onViewChange={setViewType} />
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="overflow-x-auto">
          <Grid
            startDate={startDate}
            endDate={endDate}
            totalDays={totalDays}
            timelineWidth={timelineWidth}
            viewType={viewType}
          >
            <div className="space-y-1">
              {lanes.map((lane, index) => (
                <Lane
                  key={index}
                  lane={lane}
                  totalDays={totalDays}
                  timelineStart={startDate}
                  timelineWidth={timelineWidth}
                />
              ))}
            </div>
          </Grid>
        </div>
      </div>
      <ul className="mt-4 text-sm">
        <li>Double-click on items to edit them.</li>
        <li>Enter to submit. ESC to Cancel.</li>
      </ul>
    </div>
  );
};
