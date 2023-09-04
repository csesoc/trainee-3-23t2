"use client";

import { useState } from "react";
import { Switch } from "@headlessui/react";

export default function BinarySwitch({
  enabled,
  setEnabled,
}: {
  enabled?: boolean;
  setEnabled?: (e: boolean) => void;
}) {
  const [currentlyEnabled, setCurrentlyEnabled] = useState(enabled ?? false);

  return (
    <div>
      <Switch
        checked={currentlyEnabled}
        onChange={() => {
          if (setEnabled) setEnabled(!currentlyEnabled);
          setCurrentlyEnabled(!currentlyEnabled);
        }}
        className={`${currentlyEnabled ? "bg-ll-dark-pink" : "bg-gray-500"}
          relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Display as Anonymous?</span>
        <span
          aria-hidden="true"
          className={`${currentlyEnabled ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}
