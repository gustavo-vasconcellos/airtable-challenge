import React from "react";
import ReactDOM from "react-dom/client";

import { TimelineProvider } from "./components/Timeline/Context.js";
import { Timeline } from "./components/Timeline/Timeline.js";

function App() {
  return (
    <TimelineProvider>
      <Timeline />
    </TimelineProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
