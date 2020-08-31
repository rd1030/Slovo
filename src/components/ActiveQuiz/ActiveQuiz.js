import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                {props.question}
            </span>

            <small>{props.answerNumber} из {props.quizLength}</small>
        </p>
        
        <AnswersList
            state={props.state}
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
        />
        {(props.state != null) && ((props.state[1]) ==="error" || (props.state[2] === "error")) ? <div className={classes.mistake}>ОШИБКА ! <br/>{props.mistakeMessage.mistakeMessage}</div> : null}
    </div>
)

export default ActiveQuiz