import React, { useEffect } from 'react';
import { getSunSign, getChineseZodiac } from '../AstrologicalSign/astrology';

function AstrologyDataDisplay({ dateOfBirth, onSunSignFetched }) {
  const birthDate = new Date(dateOfBirth);
  const sunSign = getSunSign(birthDate.getDate(), birthDate.getMonth() + 1);
  const chineseZodiac = getChineseZodiac(birthDate.getFullYear());

  useEffect(() => {
    if (onSunSignFetched && sunSign) {
      onSunSignFetched(sunSign);
    }
  }, [onSunSignFetched, sunSign]);

  return (
    <div>
      <h3>Astrology Data</h3>
      <p>Sun Sign: {sunSign}</p>
      <p>Chinese Zodiac: {chineseZodiac}</p>
    </div>
  );
}

export default AstrologyDataDisplay;
