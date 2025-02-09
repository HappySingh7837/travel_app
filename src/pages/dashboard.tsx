import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeCity } from "../redux/citySlice";
import { useRouter } from "next/router";

export default function Dashboard() {
    const router= useRouter()
  const savedCities = useSelector((state: RootState) => state.cities.savedCities);
  const dispatch = useDispatch();

  const handleRout=()=>{
    router.push('/');
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
        <button
        onClick={handleRout}
        className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-all mb-4 "
      >
         Add New City
      </button>
      <h1 className="text-3xl font-bold text-center md:text-left">Saved Cities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {savedCities.map((city) => (
          <div key={city.name} className="border p-4 rounded-lg shadow-lg bg-white">
            <h2 className="text-xl font-bold">{city.name}</h2>
            <p className="text-gray-600">Weather: {city.temperature}°C</p>
            <p className="text-gray-600">Country: {city.country}</p>
            <button
              onClick={() => dispatch(removeCity(city.name))}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-all"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
