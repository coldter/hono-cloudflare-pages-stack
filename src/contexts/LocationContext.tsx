import React, { createContext } from 'react';
import useStorage from '../hooks/useStorage';
import { BaseProps } from '../types';

interface LocationCoords {
  lat: number;
  lng: number;
}

type LocationContextType = {
  location: LocationCoords | null;
  setLocation: (location: LocationCoords) => void;
};

export const LocationContext = createContext<LocationContextType>({
  location: null,
  setLocation: () => {},
});

export const LocationProvider: React.FC<BaseProps> = ({ children }) => {
  const [location, setLocation] = useStorage('__location');

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
