import React from 'react'
import classes from './AnswerItem.module.css'



const AnswerItem = props => {
    const cls = [classes.AnswerItem]

    if (props.state) {
        cls.push(classes[props.state])
    } 
    return (
        <li
            className={cls.join(' ')}
            onClick={() => props.onAnswerClick(props.answer.id)}
        > 
        <p>{props.answer.text}</p>
        </li>
    )
}

export default AnswerItem