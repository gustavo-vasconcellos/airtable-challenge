import React from "react";
import { Item } from "./Item.js";

export const Lane = React.memo(({ lane, timelineStart, totalDays, timelineWidth }) => {
  return (
    <div className="relative h-12 border-b border-gray-200 mb-2">
      {lane.map((item) => (
        <Item
          key={item.id}
          item={item}
          timelineStart={timelineStart}
          timelineWidth={timelineWidth}
          totalDays={totalDays}
        />
      ))}
    </div>
  );
});
