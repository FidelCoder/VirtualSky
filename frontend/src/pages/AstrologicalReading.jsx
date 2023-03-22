import React, { useState } from 'react';
import axios from 'axios';
import './AstrologicalReading.css';

const AstrologicalReading = () => {
  const [birthdate, setBirthdate] = useState('');
  const [birthtime, setBirthtime] = useState('');
  const [report, setReport] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_KEY = 'your_astroseek_api_key';
    const API_URL = `https://api.astro-seek.com/natal/transits?authorization=${API_KEY}`;

    try {
      const response = await axios.post(API_URL, {
        birth_date: birthdate,
        birth_time: birthtime,
        lat: 0,
        lng: 0,
      });

      if (response.data) {
        setReport(response.data);
      }
    } catch (error) {
      console.error('Error fetching astrological data:', error);
    }
  };

  return (
    <div className="astrological-reading">
      <h2>Personalized Astrological Readings</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="birthdate">Birthdate:</label>
        <input
          type="date"
          id="birthdate"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
        />

        <label htmlFor="birthtime">Birthtime:</label>
        <input
          type="time"
          id="birthtime"
          value={birthtime}
          onChange={(e) => setBirthtime(e.target.value)}
          required
        />

        <button type="submit">Get Your Astrological Reading</button>
      </form>
      {report && (
        <div className="astrological-report">
          <h3>Your Astrological Report:</h3>
          <p>
            Sun Sign: {report.signs.sun.name} <br />
            Moon Sign: {report.signs.moon.name} <br />
            Ascendant Sign: {report.signs.asc.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default AstrologicalReading;

// the AstrologicalReading.jsx component fetches astrological data from the AstroSeek API and displays the user's sun sign, moon sign, and ascendant sign. Note that the AstroSeek API provides much more data, and you can customize the displayed information according to your needs.

// Make sure to replace 'your_astroseek_api_key' with your actual AstroSeek API key.
