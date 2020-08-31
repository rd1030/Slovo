import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'
import { Link } from 'react-router-dom'

function makeGrade( success, total) {
    let errors = total - success
    let grade  = ""
    switch (errors) {
        case 0 : grade = "5"; break
        case 1 :
        case 2 : grade = "4"; break
        case 3 :
        case 4 : grade = "3"; break
        default : grade = "2"
    }
    return grade
}

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }

        return total
    }, 0)

    return (
        <div className={classes.FinishedQuiz}>
            {/* <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? ' fa-times' : ' fa-check',
                        classes[props.results[quizItem.id]]
                    ]

                    return (
                        <li
                            key={index}
                        >
                            <strong>{`${index + 1}. `}</strong>
                            { quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                })}
            </ul> */}
            <p>
                Класс: {props.quiz[0].quizClass}
            </p>
            <p>
                Тема: {props.quiz[0].quizTheme}
            </p>
            <p>
                Вариант: {props.quiz[0].quizVariant}
            </p>
            <p>
                Правильно {successCount} из {props.quiz.length}
            </p>
            <p>Ваша оценка: <span className={classes.grade}>{makeGrade(successCount, props.quiz.length)}</span></p>
            <div>
                <Button onClick={props.onRetry} type="primary">
                    Повторить
                </Button>
                <Link to="/">
                    <Button type="primary"> {/*{"success"} */}
                        Перейти в список тестов
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz