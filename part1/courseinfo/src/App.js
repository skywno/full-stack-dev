const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  const rows = []
  props.sections.forEach((section) => {
    rows.push(
      <p>
        {section.part} {section.exercises}
      </p>
    )
  })
  return rows;
}

const Total = (props) => {
  const sum = props.exercises.reduce((accumulator, currentValue) => accumulator + currentValue)
  return (
    <p>
      Number of exercises {sum}
    </p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10

  const part2 = 'Using props to pass data'
  const exercises2 = 7

  const part3 = 'State of a component'
  const exercises3 = 14

  const section1 = new Section(part1, exercises1)
  const section2 = new Section(part2, exercises2)
  const section3 = new Section(part3, exercises3)

  return (
    <div>
      <Header course={course} />
      <Content sections={[section1, section2, section3]} />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

class Section {
  constructor(part, exercises) {
    this.part = part
    this.exercises = exercises
  }
}


export default App