export default function CityCard({ city, onSave }) {
    return (
      <div className="border rounded p-4 shadow-md">
        <h2 className="text-xl font-bold">{city.name}</h2>
        <p>Weather: {city.weather}°C</p>
        <button
          onClick={() => onSave(city)}
          className="bg-green-500 text-white py-1 px-3 mt-3 rounded hover:bg-green-700"
        >
          Save
        </button>
      </div>
    );
  }
  