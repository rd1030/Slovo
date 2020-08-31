"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = quizReducer;

var _actionTypes = require("../actions/actionTypes");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  quizes: [],
  loading: false,
  error: null,
  results: {},
  // {[id]: success error}
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  // { [id]: 'success' 'error' }
  quiz: null
};

function quizReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionTypes.FETCH_QUIZES_START:
      return _objectSpread({}, state, {
        loading: true
      });

    case _actionTypes.FETCH_QUIZES_SUCCESS:
      return _objectSpread({}, state, {
        loading: false,
        quizes: action.quizes
      });

    case _actionTypes.FETCH_QUIZES_ERROR:
      return _objectSpread({}, state, {
        loading: false,
        error: action.error
      });

    case _actionTypes.FETCH_QUIZ_SUCCESS:
      return _objectSpread({}, state, {
        loading: false,
        quiz: action.quiz
      });

    case _actionTypes.QUIZ_SET_STATE:
      return _objectSpread({}, state, {
        answerState: action.answerState,
        results: action.results
      });

    case _actionTypes.FINISH_QUIZ:
      return _objectSpread({}, state, {
        isFinished: true
      });

    case _actionTypes.QUIZ_NEXT_QUESTION:
      return _objectSpread({}, state, {
        answerState: null,
        activeQuestion: action.number
      });

    case _actionTypes.QUIZ_RETRY:
      return _objectSpread({}, state, {
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {}
      });

    default:
      return state;
  }
}