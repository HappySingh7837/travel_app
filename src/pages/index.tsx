import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {
  const [city, setCity] = useState('');
  const router = useRouter();

  const handleSearch = async () => {
    if (!city) return alert('Enter a city name');
    router.push(`/city/${city}`);
  };
  const handleRout=()=>{
    router.push('/dashboard');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Travel Planner</h1>
      <div className="w-full max-w-md">
        <input
          type="text"
          className="border w-full p-2 rounded"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white w-full py-2 rounded mt-3 hover:bg-blue-700"
        >
          Search
        </button>
      </div>
      <div className='mt-20'>
      <button
        onClick={handleRout}
        className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-all mb-4 "
      >
         Go to Dashboard
      </button>
      </div>
    </div>
  );
}
