let data = [
    ['', 'Any Difficulty'],
    ['easy', 'Easy'],
    ['medium', 'Medium'],
    ['hard', 'Hard'],
]

const difficulty = data.map(i => ({
    name: i[1],
    value: i[0]
}))

export default difficulty