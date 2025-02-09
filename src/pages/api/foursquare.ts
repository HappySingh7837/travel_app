import axios from "axios";

const FOURSQUARE_API_KEY = "fsq34NMHGi9AZdJJOijkbYGiwHlkg4DcOwZAsqXpAZMEfes="; // Replace with your actual API key
const FOURSQUARE_BASE_URL = "https://api.foursquare.com/v3/places/search";

export async function getPlaces(city: string) {
  try {
    const response = await axios.get(FOURSQUARE_BASE_URL, {
      headers: {
        Authorization: FOURSQUARE_API_KEY,
        Accept: "application/json",
      },
      params: {
        query: "tourist attractions",
        near: city,
        limit: 5, // Fetch top 5 places
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
}
