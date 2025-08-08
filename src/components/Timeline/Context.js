import React, { createContext, useContext, useEffect, useState } from "react";

import timelineItems from "../../timelineItems.js";

const TimelineContext = createContext();
const STORAGE_TIMELINE_KEY = "timelineItems";

export const useTimeline = () => {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error("useTimeline must be used within TimelineProvider");
  }
  return context;
};

export const TimelineProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(STORAGE_TIMELINE_KEY);
    return saved ? JSON.parse(saved) : timelineItems;
  });

  const updateItemName = (itemId, newName) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, name: newName } : item
    );
    setItems(updatedItems);
    localStorage.setItem(STORAGE_TIMELINE_KEY, JSON.stringify(updatedItems));
  };

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_TIMELINE_KEY)) return;

    localStorage.setItem(STORAGE_TIMELINE_KEY, JSON.stringify(timelineItems));
  }, []);

  return (
    <TimelineContext.Provider value={{ items, updateItemName }}>
      {children}
    </TimelineContext.Provider>
  );
};
