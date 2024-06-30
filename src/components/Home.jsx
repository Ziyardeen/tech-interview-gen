import React, { useState } from 'react';
import styled from 'styled-components';
import { run } from '../../apiRequests';
import { Puff } from 'react-loader-spinner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  font-family: 'Arial', sans-serif;
`;

const HeaderForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  border: 2px solid lightseagreen;
  border-radius: 10px;
  background-color: #f0f8ff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  width: 100%;
  text-align: center;
  background-color: lightcyan;
  font-family: 'Arial', sans-serif;
  border-radius: 8px;
  padding: 10px 0;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-right: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin: 5px 0;
  width: 100%;
`;

const GenerateButton = styled.button`
  margin: 20px 0;
  padding: 10px 20px;
  width: 150px;
  background-color: lightseagreen;
  border: 2px solid black;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: seagreen;
  }
`;

const SectionContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 20px 0;
  padding: 20px;
  border: 2px solid lightseagreen;
  border-radius: 10px;
  background-color: #f0f8ff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ToggleButton = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  background-color: ${props => (props.show ? '#ff6347' : 'lightseagreen')};
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => (props.show ? '#ff4500' : 'seagreen')};
  }
`;

const Home = () => {
  const [loading, setLoading] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showAlternativeAnswer, setShowAlternativeAnswer] = useState(false);
  const [showSideQuestion, setShowSideQuestion] = useState(false);
  const [showSideQuestionAnswers, setShowSideQuestionAnswers] = useState(false);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [alternativeAnswer, setAlternativeAnswer] = useState('');
  const [sideQuestion, setSideQuestion] = useState('');
  const [sideQuestionAnswers, setSideQuestionAnswers] = useState('');

  const [language, setLanguage] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const results = await run(role, language);
    setLoading(false);
    setQuestion(results.question);
    setAnswer(results.answer);
    setAlternativeAnswer(results.altAnswer);
    setSideQuestion(results.sideQuestions);
    setSideQuestionAnswers(results.sideQuestionsAnswers);
  };

  return (
    <Container>
      <HeaderForm onSubmit={handleSubmit}>
        <Heading>Technical Interview Questions Generator</Heading>
        <Label htmlFor="role">Job Role</Label>
        <Input
          id="role"
          type="text"
          onChange={(e) => setRole(e.target.value)}
          required
        />
        <Label htmlFor="language">Programming Language</Label>
        <Input
          id="language"
          type="text"
          onChange={(e) => setLanguage(e.target.value)}
          required
        />
        <GenerateButton type="submit">Generate</GenerateButton>
      </HeaderForm>

      <SectionContainer>
        <Heading>Question</Heading>
        {loading && (
          <Puff
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: question }} />
      </SectionContainer>

      <SectionContainer>
        <Heading>Answer</Heading>
        {showAnswer ? (
          <div dangerouslySetInnerHTML={{ __html: answer }} />
        ) : (
          <p>Answer Hidden</p>
        )}
        <ToggleButton
          onClick={() => setShowAnswer(!showAnswer)}
          show={showAnswer}
        >
          {showAnswer ? 'Click to Hide Answer' : 'Click to Show Answer'}
        </ToggleButton>
      </SectionContainer>

      <SectionContainer>
        <Heading>Alternative Answer</Heading>
        {showAlternativeAnswer ? (
          <div dangerouslySetInnerHTML={{ __html: alternativeAnswer }} />
        ) : (
          <p>Alternative Answer Hidden</p>
        )}
        <ToggleButton
          onClick={() => setShowAlternativeAnswer(!showAlternativeAnswer)}
          show={showAlternativeAnswer}
        >
          {showAlternativeAnswer
            ? 'Click to Hide Alternative Answer'
            : 'Click to Show Alternative Answer'}
        </ToggleButton>
      </SectionContainer>

      <SectionContainer>
        <Heading>Side Questions</Heading>
        {showSideQuestion ? (
          <div dangerouslySetInnerHTML={{ __html: sideQuestion }} />
        ) : (
          <p>Side Questions Hidden</p>
        )}
        <ToggleButton
          onClick={() => setShowSideQuestion(!showSideQuestion)}
          show={showSideQuestion}
        >
          {showSideQuestion ? 'Click to Hide' : 'Click to Show Side Questions'}
        </ToggleButton>
      </SectionContainer>

      <SectionContainer>
        <Heading>Answers to Side Questions</Heading>
        {showSideQuestionAnswers ? (
          <div dangerouslySetInnerHTML={{ __html: sideQuestionAnswers }} />
        ) : (
          <p>Side Questions Answers Hidden</p>
        )}
        <ToggleButton
          onClick={() => setShowSideQuestionAnswers(!showSideQuestionAnswers)}
          show={showSideQuestionAnswers}
        >
          {showSideQuestionAnswers
            ? 'Click to Hide'
            : 'Click to Show Side Answers'}
        </ToggleButton>
      </SectionContainer>
    </Container>
  );
};

export default Home;
