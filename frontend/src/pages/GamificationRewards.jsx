import React, { useState } from 'react';
import './GamificationRewards.css';

const initialAchievements = [
  { id: 1, title: 'Beginner Explorer', description: 'Explore the virtual sky for the first time.', earned: false },
  { id: 2, title: 'Social Butterfly', description: 'Join a group or forum.', earned: false },
  { id: 3, title: 'Astrology Enthusiast', description: 'View 10 personalized astrological readings.', earned: false },
];

const GamificationRewards = () => {
  const [currency, setCurrency] = useState(100);
  const [achievements, setAchievements] = useState(initialAchievements);

  const earnCurrency = (amount) => {
    setCurrency((prevCurrency) => prevCurrency + amount);
  };

  const earnAchievement = (id) => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement) =>
        achievement.id === id ? { ...achievement, earned: true } : achievement,
      ),
    );
  };

  const handleButtonClick = (id, reward) => {
    earnCurrency(reward);
    earnAchievement(id);
  };

  return (
    <div className="gamification-rewards">
      <h2>Gamification and Rewards</h2>
      <div className="currency">
        <h3>In-app currency: {currency} coins</h3>
      </div>
      <div className="achievements">
        <h3>Achievements:</h3>
        <ul>
          {achievements.map((achievement) => (
            <li key={achievement.id}>
              <h4>{achievement.title}</h4>
              <p>{achievement.description}</p>
              {!achievement.earned && (
                <button onClick={() => handleButtonClick(achievement.id, 50)}>Complete Challenge</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GamificationRewards;
