import React, { useState } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import './Onboarding.css';

const steps = [
  {
    target: '.step-1',
    content: 'Welcome to our app! Let us show you around.',
  },
  {
    target: '.step-2',
    content: 'Here is the virtual sky you can explore.',
  },
  {
    target: '.step-3',
    content: 'Discover more about the objects in the sky by clicking on them.',
  },
  {
    target: '.step-4',
    content: 'Find personalized astrological readings based on your birthdate and time.',
  },
  {
    target: '.step-5',
    content: 'Connect with others and discuss astrology and space in our social features.',
  },
];

const Onboarding = ({ children }) => {
  const [run, setRun] = useState(true);

  const handleJoyrideCallback = (data) => {
    const { status } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
    }
  };

  return (
    <div className="onboarding-container">
      <Joyride
        callback={handleJoyrideCallback}
        steps={steps}
        continuous
        showProgress
        showSkipButton
        run={run}
      />
      {children}
    </div>
  );
};

export default Onboarding;

//when a user opens the application, they will be guided through an interactive onboarding experience showcasing the app's features. The tour will highlight different elements of the app and provide explanations for each feature.


//This component display the user's achievements and badges, as well as their in-app currency balance.