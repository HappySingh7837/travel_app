import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Place {
  id: string;
  name: string;
  category: string;
}

interface City {
  name: string;
  temperature: string;
  description: string;
  icon: string;
  country: string;
  flag: string;
  places: Place[];
}

interface CityState {
  savedCities: City[];
  cityData: Record<string, City | null>; // Store API data for each city
}

const loadSavedCities = (): City[] => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("savedCities") || "[]");
  }
  return [];
};

const initialState: CityState = {
  savedCities: loadSavedCities(),
  cityData: {},
};

const citySlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    saveCity: (state, action: PayloadAction<City>) => {
      if (!state.savedCities.find((city) => city.name === action.payload.name)) {
        state.savedCities.push(action.payload);
        localStorage.setItem("savedCities", JSON.stringify(state.savedCities));
      }
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.savedCities = state.savedCities.filter((city) => city.name !== action.payload);
      localStorage.setItem("savedCities", JSON.stringify(state.savedCities));
    },
    setCityData: (state, action: PayloadAction<{ name: string; data: City }>) => {
      state.cityData[action.payload.name] = action.payload.data;
    },
  },
});

export const { saveCity, removeCity, setCityData } = citySlice.actions;
export default citySlice.reducer;
