"use client";

import { useState } from "react";

interface MenuState {
  expanded: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

export default function useMenu(): MenuState {
  const [expanded, setExpanded] = useState(false);

  const openMenu = () => {
    setExpanded(true);
  };

  const closeMenu = () => {
    setExpanded(false);
  };

  return {
    expanded,
    openMenu,
    closeMenu,
  };
}
