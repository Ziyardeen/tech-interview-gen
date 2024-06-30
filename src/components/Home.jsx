import React, { useState } from 'react'
import styled from 'styled-components'
import { run } from '../../apiRequests'
import { Puff } from 'react-loader-spinner'

const HeaderForm = styled.form`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-between;
`

const Heading = styled.h1`
width:100%;
    background-color:lightcyan;
    font-family: 'Arial', sans-serif; 
    border-radius:8px;
 
`
const GenerateButton = styled.button`
margin:10px 0;
    width:150px;  
    background-color:lightseagreen;
    border:2px black solid;
`
const RoleDivContainer = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
`
const LanguageDivContainer = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
`

const QuestionContainer = styled.div`
  min-height:250px;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  align-items:center;
 
`
const AnswerContainer = styled.div`
  
`
const AlternativeAnswerContainer = styled.div`
  
`
const SideQuestionsContainer = styled.div`
  
`
const SideQuestionsAnswersContainer = styled.div`
  
`
const Home = () => {
  const [loading, setLoading] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showAlternativeAnswer, setShowAlternativeAnswer] = useState(false)
  const [showSideQuestion, setShowSideQuestion] = useState(false)
  const [showSideQuestionAnswers, setShowSideQuestionAnswers] = useState(false)
  

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [alternativeAnswer, setAlternativeAnswer] = useState('')
  const [sideQuestion, setSideQuestion] = useState('')
  const [sideQuestionAnswers, setSideQuestionAnswers] = useState('')

  const [language, setLanguage] = useState()
  const [role, setRole] = useState()

  const handleSubmit = (async (event) => {
    event.preventDefault()
    console.log("Hi");
    setLoading(true)
    const results = await run(role,language)
    setLoading(false)
    console.log(results.question);
    setQuestion(results.question)
    setAnswer(results.answer)
    setAlternativeAnswer(results.altAnswer)
    setSideQuestion(results.sideQuestions)
    setSideQuestionAnswers(results.sideQuestionsAnswers)
  })


  return (
   
    <div>
      
      <HeaderForm onSubmit={handleSubmit}>
      
      <RoleDivContainer>
        <label htmlFor="role">Job Role</label>
        <input id="role" type="text" onChange={(e) => {
          setRole(e.target.value)
        }} required/>
      </RoleDivContainer>
      <LanguageDivContainer>
        <label htmlFor="language">Programming Language</label>
        <input id="language"type="text" onChange={(e) => {
          setLanguage(e.target.value)
        }} required/>

      </LanguageDivContainer>
       <GenerateButton type='submit'>Generate</GenerateButton>

</HeaderForm>



       <QuestionContainer>
     <Heading>Question</Heading>
     {loading && <Puff visible={true} height="80" width="80" color="#4fa94d" ariaLabel="puff-loading" wrapperStyle={{}} wrapperClass=""/>}
        <div dangerouslySetInnerHTML={{__html: question}}/>
       </QuestionContainer>

       <AnswerContainer>
       <Heading>Answer</Heading>
       {showAnswer?<div dangerouslySetInnerHTML={{__html:answer}}/>: <p>Answer Hidden</p>}
        <button onClick={() => {
          setShowAnswer(!showAnswer)
        }}  className = {showAnswer? "btn-hide":"btn-show"}>{showAnswer?"Click to Hide Answer" : "Click to Show Answer"}</button>
       </AnswerContainer>

       <AlternativeAnswerContainer>
       <Heading>Alternative Answer</Heading>
       {showAlternativeAnswer?<div dangerouslySetInnerHTML={{__html:alternativeAnswer}}/>: <p>Alternative Answer Hidden</p>}
        <button onClick={() => {
          setShowAlternativeAnswer(!showAlternativeAnswer)
        }} className = {showAlternativeAnswer? "btn-hide":"btn-show"}>{showAlternativeAnswer?"Click to Hide" : "Click to Show Alternative Answer"}</button>
       </AlternativeAnswerContainer>

       <SideQuestionsContainer>
       <Heading>Side Questions </Heading>
       {showSideQuestion?<div dangerouslySetInnerHTML={{__html:sideQuestion}}/>: <p>Side Questions Hidden</p>}
      
        <button onClick={() => {
          setShowSideQuestion(!showSideQuestion)
        }} className = {showSideQuestion? "btn-hide":"btn-show"}>{showSideQuestion?"Click to Hide" : " Click to Show Side Questions"} </button>
       </SideQuestionsContainer>

       <SideQuestionsAnswersContainer>
       <Heading>Answers to Side Questions</Heading>
       {showSideQuestionAnswers?<div dangerouslySetInnerHTML={{__html:sideQuestionAnswers}}/>: <p>Side Questions Answers Hidden</p>}
      
        <button onClick={() => {
          setShowSideQuestionAnswers(!showSideQuestionAnswers)
        }} className = {showSideQuestionAnswers? "btn-hide":"btn-show"}>{showSideQuestionAnswers?"Click to Hide" : "Click to Show Side Answers"}</button>
       </SideQuestionsAnswersContainer>
    </div>
  )
}

export default Home