import { useContext } from "react";
import { DatabaseConnectionContext } from "../context/DatabaseConnectionContext";

export function useDatabase() {
  const context = useContext(DatabaseConnectionContext);

  return context;
}