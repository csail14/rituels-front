import React from "react";

import { NavigationContainer, useIsFocused } from "@react-navigation/native";

export function FetchUserData({ onUpdate }) {
  const isFocused = useIsFocused();
  onUpdate(isFocused);
  return null;
}
