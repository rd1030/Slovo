import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-10f5d.firebaseio.com/'
})