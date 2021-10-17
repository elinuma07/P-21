// This is all of the logic for the quiz itself

import React, { Component } from 'react';
import { QuizData } from './QuizData';
import './style.css';

export class Quiz extends Component {
  // define: variable for user answer
  // varible for current index
  // variable for options
  // variable for the score
  // variable to select only one option

  constructor(props) {
    super(props);

    this.state = {
      userAnswer: null,
      currentIndex: 0,
      options: [],
      quizEnd: false,
      score: 0,
      disabled: true,
    };
  }

  loadQuiz = () => {
    const { currentIndex } = this.state;
    this.setState(() => {
      return {
        question: QuizData[currentIndex].question,
        options: QuizData[currentIndex].options,
        answer: QuizData[currentIndex].answer,
      };
    });
  };

  nextQuestionHandler = () => {
    const { userAnswer, answer, score } = this.state;

    if (userAnswer === answer) {
      this.setState({
        score: score + 1,
      });
    }

    this.setState({
      currentIndex: this.state.currentIndex + 1,
      userAnswer: null,
    });
  };

  componentDidMount() {
    this.loadQuiz();
  }

  // This checks the answer from the user side
  // disable false means they will be ableto go the next question
  checkAnswer = (answer) => {
    this.setState({
      userAnswer: answer,
      disabled: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { currentIndex } = this.state;
    if (this.state.currentIndex !== prevState.currentIndex) {
      return {
        question: QuizData[currentIndex].question,
        options: QuizData[currentIndex].options,
        answer: QuizData[currentIndex].answer,
      };
    }
  }

  finishHandler = () => {
    // this part allows the score to be updated
    const { userAnswer, answer, score } = this.state;
    if (userAnswer === answer) {
      this.setState({
        score: score + 1,
      });
    }

    if (this.state.currentIndex === QuizData.length - 1) {
      this.setState({
        quizEnd: true,
      });
    }
  };

  // render function shows what will be displayed in the html page
  render() {
    const { question, options, currentIndex, userAnswer } = this.state;
    return (
      // here is where you display the question for the user
      <div>
        <h2>{question}</h2>
        <span>{`Question ${currentIndex + 1} of ${QuizData.length}`}</span>
        {options.map((options) => (
          <p
            key={options.id}
            className={`options ${userAnswer === options ? 'selected' : null}`}
            onClick={() => this.checkAnswer(options)}
          >
            {options}
          </p>
        ))}

        {currentIndex < QuizData.length - 1 && (
          <button
            disabled={this.state.disabled}
            onClick={this.nextQuestionHandler}
          >
            Next Question
          </button>
        )}
        {currentIndex === QuizData.length - 1 && (
          <button onClick={this.finishHandler} disabled={this.state.disabled}>
            Finish
          </button>
        )}
      </div>
    );
  }
}

export default Quiz;
