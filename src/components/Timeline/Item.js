import React, { useReducer } from "react";

import { useTimeline } from "./Context.js";

const reducer = (state, action) => {
  switch (action.type) {
    case "START_EDIT":
      return {
        isEditing: true,
        value: action.payload.currentName,
      };
    case "UPDATE_VALUE":
      return {
        ...state,
        value: action.payload.value,
      };
    case "CANCEL_EDIT":
      return {
        isEditing: false,
        value: "",
      };
    case "FINISH_EDIT":
      return {
        isEditing: false,
        value: "",
      };
    default:
      return state;
  }
};

export const Item = ({ item, totalDays, timelineStart, timelineWidth }) => {
  const { updateItemName } = useTimeline();
  const [state, dispatch] = useReducer(reducer, {
    isEditing: false,
    value: "",
  });

  const handleDoubleClick = () => {
    dispatch({
      type: "START_EDIT",
      payload: { currentName: item.name },
    });
  };

  const handleSubmit = () => {
    if (state.value.trim()) {
      updateItemName(item.id, state.value.trim());
    }
    dispatch({ type: "FINISH_EDIT" });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      dispatch({ type: "CANCEL_EDIT" });
    } else if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleInputChange = (e) => {
    dispatch({
      type: "UPDATE_VALUE",
      payload: { value: e.target.value },
    });
  };

  const itemStart = new Date(item.start);
  const itemEnd = new Date(item.end);
  const itemDuration = Math.max(
    1,
    (itemEnd - itemStart) / (1000 * 60 * 60 * 24) + 1
  );

  const leftOffset =
    ((itemStart - timelineStart) / (1000 * 60 * 60 * 24) / totalDays) *
    timelineWidth;
  const width = Math.max(60, (itemDuration / totalDays) * timelineWidth);

  return (
    <div
      className="absolute h-8 bg-blue-500 rounded text-white text-xs flex items-center px-2 shadow-sm hover:bg-blue-600 transition-colors cursor-pointer"
      style={{
        left: leftOffset,
        width: width,
      }}
      title={`${item.name} (${item.start} to ${item.end}) - Double-click to edit`}
      onDoubleClick={handleDoubleClick}
    >
      {state.isEditing ? (
        <input
          type="text"
          value={state.value}
          onChange={handleInputChange}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border-none outline-none text-white placeholder-blue-200"
          autoFocus
        />
      ) : (
        <span className="truncate">{item.name}</span>
      )}
    </div>
  );
};
