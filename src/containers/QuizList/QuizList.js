import React, { Component } from 'react'
import classes from './QuizList.module.css'
import { NavLink } from 'react-router-dom'
import Select from '../../components/UI/Select/Select'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizes } from '../../store/actions/quiz'

class QuizList extends Component {
    state = {
        currentClass: "",
        currentTheme: ""
    }

    renderQuizes() {
        return this.props.quizes.map(quiz => (
            ((this.state.currentClass === quiz.class) && (this.state.currentTheme === quiz.theme)) ? (
                
                <li
                    key={quiz.id}
                >
                    <NavLink to={'/quiz/' + quiz.id}>
                        <div>

                            <p>Класс: {quiz.class}</p>
                            <p>Тема: {quiz.theme}</p>
                            <p>Вариант: {quiz.variant}</p>
                            <hr />
                        </div>

                    </NavLink>
                </li>
            ) : null
        )
        )
    }

    renderClassOptions() {
        let mas = []
        Array.from(new Set(this.props.quizes.map(quiz => (quiz.hasOwnProperty('class') ? quiz.class : null)))).forEach( item => {
            mas.push( { text: item, value: item } )
        })
        return mas
    }

    renderThemeOptions() {
        let mas = []
        Array.from(new Set(this.props.quizes.map(quiz => (
           this.state.currentClass === quiz.class ?  quiz.theme : null
        )     
        ))).forEach( item => (
            item === null ? null : mas.push( { text: item, value: item } )
        ))
        return mas
    }
    
    selectChangeHandler = event => {
       this.setState({
           currentClass: event.target.value
       })
    }
    selectChangeHandler2 = event => {
        this.setState({
            currentTheme: event.target.value
        })
     }

    componentDidMount() {
        this.props.fetchQuizes()
    }
    
    render() {
        const selectClass = <Select
            label="Выберите класс"
            onChange={this.selectChangeHandler}
            options ={ this.renderClassOptions()}
        />
        const selectTheme = <Select
            label="Выберите тему"
            onChange={this.selectChangeHandler2}
            options ={ this.renderThemeOptions()}
        />
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Slovo</h1>
                    {
                        this.props.loading && this.props.quizes.length !== 0
                            ? <Loader />
                            : <ul>
                                {selectClass}
                                {selectTheme} 
                                { this.renderQuizes()}
                            </ul>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        mistakeMessages: state.quiz.mistakeMessages,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)