import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveCity, removeCity, setCityData } from "../../redux/citySlice";
import { RootState } from "../../redux/store";
import { getPlaces } from "../api/foursquare";

export default function CityPage() {
  const router = useRouter();
  const { query } = router;
  const cityName = query.cityName as string;
  const dispatch = useDispatch();
  const cityData = useSelector((state: RootState) => state.cities.cityData[cityName]);
  const savedCities = useSelector((state: RootState) => state.cities.savedCities);

  useEffect(() => {
    if (!cityName || cityData) return;

    (async () => {
      try {
        // Fetch weather data
        const weatherRes = await axios.get(
          `http://api.weatherstack.com/current?access_key=ede3296c40248b19bb4dfe850ffa4507&query=${cityName}, India`
        );

        if (!weatherRes.data || !weatherRes.data.location) {
          throw new Error("Invalid weather data");
        }

        const countryName = weatherRes.data.location.country;

        // Fetch country data
        const countryRes = await axios.get(
          `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
        );

        // Fetch places to visit
        const placesRes = await getPlaces(cityName);

        const cityInfo = {
          name: weatherRes.data.location.name,
          temperature: weatherRes.data.current.temperature,
          description: weatherRes.data.current.weather_descriptions[0],
          icon: weatherRes.data.current.weather_icons[0],
          country: countryRes.data[0].name.common,
          flag: countryRes.data[0].flags.svg,
          places: placesRes.map((place) => ({
            id: place.fsq_id,
            name: place.name,
            category: place.categories.length > 0 ? place.categories[0].name : "Unknown",
          })),
        };

        dispatch(setCityData({ name: cityName, data: cityInfo }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [cityName, cityData, dispatch]);

  const isCitySaved = savedCities.some((city) => city.name === cityName);

  const handleSave = () => {
    if (!isCitySaved && cityData) {
      dispatch(saveCity(cityData));
    }
  };

  const handleRemove = () => {
    dispatch(removeCity(cityName));
  };

  const handleBack = () => {
    router.push("/");
  };

  if (!cityData) return <p>Loading...</p>;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <button
        onClick={handleBack}
        className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-all mb-4"
      >
        ← Back to Home
      </button>
      <h1 className="text-2xl md:text-3xl font-bold text-center">{cityData.name}</h1>

      {/* Weather & Country Section */}
      <div className="flex flex-col md:flex-row items-center md:justify-between mt-4 gap-6">
        <div className="text-center md:text-left">
          <p className="text-lg md:text-xl">
            Weather: <span className="font-semibold">{cityData.temperature}°C</span>, {cityData.description}
          </p>
          <img src={cityData.icon} alt="Weather Icon" className="w-12 md:w-16 h-12 md:h-16 mt-2 mx-auto md:mx-0" />
        </div>
        <div className="text-center md:text-left">
          <p className="text-lg md:text-xl">Country: {cityData.country}</p>
          {/* <img src={cityData.flag} alt={`${cityData.country} Flag`} className="w-12 md:w-16 h-12 md:h-16 mt-2 mx-auto md:mx-0" /> */}
        </div>
      </div>

      {/* Save/Remove Buttons */}
      <div className="flex justify-center md:justify-start mt-4">
        {isCitySaved ? (
          <button
            onClick={handleRemove}
            className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-700 transition-all"
          >
            Remove from Dashboard
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-all"
          >
            Save to Dashboard
          </button>
        )}
      </div>

      {/* Places to Visit Section */}
      <div className="mt-6">
        <h2 className="text-xl md:text-2xl font-semibold">Places to Visit</h2>
        {cityData.places.length === 0 ? (
          <p className="text-gray-600">No places found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {cityData.places.map((place) => (
              <div key={place.id} className="border p-4 rounded-lg shadow-md bg-white">
                <p className="font-semibold">{place.name}</p>
                <p className="text-gray-600 text-sm">{place.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
