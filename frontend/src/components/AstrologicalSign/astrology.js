function getSunSign(day, month) {
    const zodiacDates = [
      { month: 1, day: 20, sign: "Capricorn" },
      { month: 2, day: 19, sign: "Aquarius" },
      { month: 3, day: 21, sign: "Pisces" },
      { month: 4, day: 20, sign: "Aries" },
      { month: 5, day: 21, sign: "Taurus" },
      { month: 6, day: 21, sign: "Gemini" },
      { month: 7, day: 23, sign: "Cancer" },
      { month: 8, day: 23, sign: "Leo" },
      { month: 9, day: 23, sign: "Virgo" },
      { month: 10, day: 23, sign: "Libra" },
      { month: 11, day: 22, sign: "Scorpio" },
      { month: 12, day: 22, sign: "Sagittarius" },
      { month: 12, day: 32, sign: "Capricorn" },
    ];
  
    for (const { month: m, day: d, sign } of zodiacDates) {
      if (month === m && day <= d) {
        return sign;
      }
    }
  
    return null;
  }
  
  function getChineseZodiac(year) {
    const zodiacAnimals = [
      "Rat",
      "Ox",
      "Tiger",
      "Rabbit",
      "Dragon",
      "Snake",
      "Horse",
      "Goat",
      "Monkey",
      "Rooster",
      "Dog",
      "Pig",
    ];
  
    return zodiacAnimals[(year - 4) % 12];
  }
  
  module.exports = {
    getSunSign,
    getChineseZodiac,
  };
  