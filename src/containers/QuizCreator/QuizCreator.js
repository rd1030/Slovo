import React, { Component } from 'react'
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/input'
import Select from '../../components/UI/Select/Select'
import { createControl, validate, validateForm } from '../../form/formFramework'
import { connect } from 'react-redux'
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'


function createOptionControl(number) {
  return createControl({
    label: `Вариант ${number}`,
    errorMessage: 'Значение не может быть пустым',
    id: number
  }, { required: true })
}


function createFormControls(numOfQuestion) {
  return {
    question: createControl({
      label: `Введите вопрос №${numOfQuestion} `,
      errorMessage: 'Вопрос не может быть пустым'
    }, { required: true }),
    option1: createOptionControl(1),
    option2: createOptionControl(2)
  }
}

class QuizCreator extends Component {
  state = {
    isFormValid: false,
    rightAnswerId: 1,
    mistakeMessages: [],
    mistakeMessage: "",
    commonInputs: {
      quizClass: {
        label: 'Введите класс',
        errorMessage: 'Класс не может быть пустым',
        validation: {
          required: true
        }
      },
      quizTheme: {
        label: 'Введите тему',
        errorMessage: 'Тема не может быть пустой',
        validation: {
          required: true
        }
      },
      quizVariant: {
        label: 'Введите название варианта',
        errorMessage: 'Тема не может быть пустой',
        validation: {
          required: true
        }
      }
    },
    formControls: createFormControls(1)
  }

  sibmitHandler = event => {
    event.preventDefault()
  }

  addQuestionHandler = event => {
    event.preventDefault()
    const { question, option1, option2 } = this.state.formControls
    const questionItem = {
      quizClass: this.state.commonInputs.quizClass.value,
      quizTheme: this.state.commonInputs.quizTheme.value,
      quizVariant: this.state.commonInputs.quizVariant.value,
      question: question.value,
      mistakeMessage: this.state.mistakeMessage,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
      ]
    }
    this.props.createQuizQuestion(questionItem)
    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(this.props.quiz.length + 2)
    })
  }

  createQuizHandler = event => {
    event.preventDefault()
    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(1),
    })
    this.props.finishCreateQuiz()

  }

  changeHandler = (value, controlName, thisState) => {
    const formControls = { ...thisState }
    const control = { ...formControls[controlName] }

    control.touched = true
    control.value = value || ""
    control.valid = validate(control.value, control.validation)
    formControls[controlName] = control

    if (thisState === this.state.formControls) {
      this.setState({
        formControls: formControls,
        isFormValid: validateForm(formControls)
      })
    }

    if (thisState === this.state.commonInputs) {
      this.setState({
        commonInputs: formControls
      })
    }
  }

  renderControls(thisState) {
    return Object.keys(thisState).map((controlName, index) => {
      const control = thisState[controlName]
      return (
        <Auxiliary key={controlName + index}>
          <Input
            label={control.label}
            value={control.value || ""}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => this.changeHandler(event.target.value, controlName, thisState)}
          />
          {index === 0 ? <hr /> : null}

        </Auxiliary>
      )
    })
  }

  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: +event.target.value
    })
  }

  inputChangeHandler = event => {
    if (this.state.flagForMessage) {
      event.target.value = ""
      this.setState({
        flagForMessage: false
    })
    this.setState({
      mistakeMessage: event.target.value
    })
    
  }
}

  addMistakeMessage = event => {
    const mistakeMessages = [...this.state.mistakeMessages]
    mistakeMessages.push({ text: this.state.mistakeMessage, value: `${this.state.mistakeMessage}` })
    this.setState({
      mistakeMessages,
      mistakeMessage: "",
      flagForMessage: true
    })
    
  }
  selectMistakeHandler = event => {
    this.setState({
      mistakeMessage: event.target.value
    })
  }

  render() {
    const formControls = this.state.formControls
    const commonInputs = this.state.commonInputs
    const select = <Select
      label="Выберите правильный ответ"
      value={this.state.rightAnswerId }
      onChange={this.selectChangeHandler}
      options={[
        { text: 1, value: 1 },
        { text: 2, value: 2 }
      ]}
    />
    const selectMistake = <Select
      label="Выберите сообщение об ошибке"
      value={this.value}
      onChange={this.selectMistakeHandler}
      options={this.state.mistakeMessages}
    />

    const addMistakeField =
      <div className={classes.addDiv}>
        <Input
          value={this.mistakeMessage}
          label="Введите все сообщения об ошибке в данном варианте"
          onChange={this.inputChangeHandler}
        />
        <Button
          type="primary"
          onClick={this.addMistakeMessage}
        >
          Добавить ошибку
        </Button>
      </div>

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>

          <form onSubmit={this.submitHandler}>
            {this.props.quiz.length === 0 ? this.renderControls(commonInputs) : null}
            {this.renderControls(formControls)}

            {select}
            {selectMistake}
            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.props.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
          {this.props.quiz.length === 0 ? addMistakeField : null}
        </div>

      </div>
      
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)