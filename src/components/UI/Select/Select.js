import React from 'react'
import classes from './Select.module.css'

const Select = props => {
    const htmlFor = `${props.label}-${Math.random()}`

    let classesForDiv 

    if ((props.label === 'Выберите класс') || (props.label === 'Выберите тему')) {
       classesForDiv = classes.orangeTheme
    } else {
        classesForDiv = classes.default
    }

    return (
        <div className={classesForDiv}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <select
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
                defaultValue={'DEFAULT'} // quizCreator warning controlled value
            >
               <option value="DEFAULT" hidden disabled>Выберите...</option> 
                { props.options.map((option, index) =>{
                    return (
                        <option 
                            value={option.value}
                            key={option.value + index}
                        >
                            {option.text}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default Select