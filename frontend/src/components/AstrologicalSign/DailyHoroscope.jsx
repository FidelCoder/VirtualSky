import React, { useState, useEffect } from 'react';
import { fetchDailyHoroscope } from '../AstrologicalSign/horoscopeAPI';

function DailyHoroscope({ sunSign, apiKey }) {
  const [horoscopeData, setHoroscopeData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchDailyHoroscope(sunSign, apiKey);
        setHoroscopeData(data);
      } catch (error) {
        console.error('Error fetching daily horoscope:', error);
      }
    }

    fetchData();
  }, [sunSign, apiKey]);

  if (!horoscopeData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Daily Horoscope for {sunSign}</h3>
      <p>{horoscopeData.description}</p>
    </div>
  );
}

export default DailyHoroscope;
