"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchQuizes = fetchQuizes;
exports.fetchQuizById = fetchQuizById;
exports.fetchQuizSuccess = fetchQuizSuccess;
exports.fetchQuizesStart = fetchQuizesStart;
exports.fetchQuizesSuccess = fetchQuizesSuccess;
exports.fetchQuizesError = fetchQuizesError;
exports.quizSetState = quizSetState;
exports.finishQuiz = finishQuiz;
exports.quizNextQuestion = quizNextQuestion;
exports.retryQuiz = retryQuiz;
exports.quizAnswerClick = quizAnswerClick;

var _axiosQuiz = _interopRequireDefault(require("../../axios/axios-quiz"));

var _actionTypes = require("./actionTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function fetchQuizes() {
  return function _callee(dispatch) {
    var response, quizes;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch(fetchQuizesStart());
            _context.prev = 1;
            _context.next = 4;
            return regeneratorRuntime.awrap(_axiosQuiz["default"].get('/quizes.json'));

          case 4:
            response = _context.sent;
            quizes = [];
            Object.entries(response.data).forEach(function (item) {
              var mas = [];
              item[1].forEach(function (item) {
                mas.push(item.mistakeMessage);
              });
              quizes.push({
                id: item[0],
                "class": item[1][0].quizClass,
                theme: item[1][0].quizTheme,
                variant: item[1][0].quizVariant,
                mistakeMessage: mas
              });
            });
            dispatch(fetchQuizesSuccess(quizes));
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            dispatch(fetchQuizesError(_context.t0));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 10]]);
  };
}

function fetchQuizById(quizId) {
  return function _callee2(dispatch) {
    var response, quiz;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dispatch(fetchQuizesStart());
            _context2.prev = 1;
            _context2.next = 4;
            return regeneratorRuntime.awrap(_axiosQuiz["default"].get("/quizes/".concat(quizId, ".json")));

          case 4:
            response = _context2.sent;
            quiz = response.data;
            dispatch(fetchQuizSuccess(quiz));
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            dispatch(fetchQuizesError(_context2.t0));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 9]]);
  };
}

function fetchQuizSuccess(quiz) {
  return {
    type: _actionTypes.FETCH_QUIZ_SUCCESS,
    quiz: quiz
  };
}

function fetchQuizesStart() {
  return {
    type: _actionTypes.FETCH_QUIZES_START
  };
}

function fetchQuizesSuccess(quizes, mistakeMessages) {
  return {
    type: _actionTypes.FETCH_QUIZES_SUCCESS,
    quizes: quizes
  };
}

function fetchQuizesError(e) {
  return {
    type: _actionTypes.FETCH_QUIZES_ERROR,
    error: e
  };
}

function quizSetState(answerState, results) {
  return {
    type: _actionTypes.QUIZ_SET_STATE,
    answerState: answerState,
    results: results
  };
}

function finishQuiz() {
  return {
    type: _actionTypes.FINISH_QUIZ
  };
}

function quizNextQuestion(number) {
  return {
    type: _actionTypes.QUIZ_NEXT_QUESTION,
    number: number
  };
}

function retryQuiz() {
  return {
    type: _actionTypes.QUIZ_RETRY
  };
}

function quizAnswerClick(answerId) {
  return function (dispatch, getState) {
    var state = getState().quiz;

    if (state.answerState) {
      var key = Object.keys(state.answerState)[0];

      if (state.answerState[key] === 'success') {
        return;
      }
    }

    var question = state.quiz[state.activeQuestion];
    var results = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }

      dispatch(quizSetState(_defineProperty({}, answerId, 'success'), results));
      var timeout = window.setTimeout(function () {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }

        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';
      dispatch(quizSetState(_defineProperty({}, answerId, 'error'), results));
    }
  };
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}