import React from "react";

export const Item = React.memo(
  ({ item, totalDays, timelineStart, timelineWidth }) => {
    const itemStart = new Date(item.start);
    const itemEnd = new Date(item.end);
    const itemDuration = Math.max(
      1,
      (itemEnd - itemStart) / (1000 * 60 * 60 * 24) + 1
    );

    const leftOffset =
      ((itemStart - timelineStart) / (1000 * 60 * 60 * 24) / totalDays) *
      timelineWidth;
    const width = Math.max(60, (itemDuration / totalDays) * timelineWidth); // Minimum 60px width

    return (
      <div
        className="absolute h-8 bg-blue-500 rounded text-white text-xs flex items-center px-2 shadow-sm hover:bg-blue-600 transition-colors"
        style={{
          left: leftOffset,
          width: width,
        }}
        title={`${item.name} (${item.start} to ${item.end})`}
      >
        <span className="truncate">{item.name}</span>
      </div>
    );
  }
);
