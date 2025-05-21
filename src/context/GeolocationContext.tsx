// src/context/GeolocationContext.tsx
import React, { createContext, useContext } from "react";
import { useGeolocation, Coords } from "@/hooks/useGeolocation";

interface GeolocationContextValue {
  coords: Coords | null;
  loading: boolean;
  error: string | null;
}

const GeolocationContext = createContext<GeolocationContextValue | null>(null);

export const GeolocationProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { coords, loading, error } = useGeolocation();

  return (
    <GeolocationContext.Provider value={{ coords, loading, error }}>
      {children}
    </GeolocationContext.Provider>
  );
};

// 2) Hook de consumo lança se não for usado dentro do Provider
export function useGeolocationContext(): GeolocationContextValue {
  const context = useContext(GeolocationContext);
  if (context === null) {
    throw new Error("useGeolocationContext deve ser usado dentro de GeolocationProvider");
  }
  return context;
}
