import axios from 'axios';

const HOROSCOPE_API_ENDPOINT = 'https://horoscope-api1.p.rapidapi.com/daily';

export async function fetchDailyHoroscope(sunSign, apiKey) {
  try {
    const response = await axios.get(`${HOROSCOPE_API_ENDPOINT}/${sunSign}`, {
      headers: {
        'X-RapidAPI-Host': 'horoscope-api1.p.rapidapi.com',
        'X-RapidAPI-Key': apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching daily horoscope:', error);
    throw error;
  }
}
