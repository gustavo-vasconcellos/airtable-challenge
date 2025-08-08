import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";

import { assignLanes } from "./assignLanes.js";
import { Grid } from "./components/Grid.js";
import { Lane } from "./components/Lane.js";
import { ViewSelector } from "./components/ViewSelector.js";
import timelineItems from "./timelineItems.js";
import { getTimelineScale } from "./utils/getTimelineScale.js";
import { parseDate } from "./utils/parseDate.js";

function App() {
  const [viewType, setViewType] = useState("year");

  const [startDate, endDate, totalDays, timelineWidth, lanes] = useMemo(
    function calculateBoundsAndLanes() {
      const lanes = assignLanes(timelineItems);

      const allDates = timelineItems.flatMap((item) => [
        parseDate(item.start),
        parseDate(item.end),
      ]);

      const start = new Date(Math.min(...allDates));
      const end = new Date(Math.max(...allDates));
      const total = Math.max(1, (end - start) / (1000 * 60 * 60 * 24) + 1);
      const width = Math.max(800, total * getTimelineScale(viewType) + 80);

      return [start, end, total, width, lanes];
    },
    [timelineItems, viewType]
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
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
