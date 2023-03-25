import { FeedBack } from './FeedBack';
import { Section } from './Section';
import { Statistics } from './Statistics';
import { Notification } from './Notification';
import { Container } from './Container.styled';
import { useState, useEffect } from 'react';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [totalFeedback, setTotalFeedback] = useState(0);
  const [procents, setProcent] = useState(0);

  useEffect(() => {
    setTotalFeedback(good + neutral + bad);
  }, [good, neutral, bad]);

  const changeStatistic = evt => {
    switch (evt) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    setProcent(((good / totalFeedback) * 100).toFixed());
  }, [good, totalFeedback]);

  return (
    <Container>
      <Section title="Pleace leave feedback">
        <FeedBack
          onClick={changeStatistic}
          options={['good', 'neutral', 'bad']}
        />
      </Section>

      <Section title="Statistics">
        {totalFeedback > 0 && (
          <Statistics
            state={[good, neutral, bad]}
            total={totalFeedback}
            procents={procents}
          />
        )}
      </Section>
      {totalFeedback === 0 && <Notification message={'There is no feedback'} />}
    </Container>
  );
};
