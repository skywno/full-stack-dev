const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <h4> total of {sum} exercises</h4>

const Part = ({ part }) => <p> {part.name} {part.exercises} </p>

const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part} />)

const Course = ({ course }) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total sum={course.parts.map(part => part.exercises).reduce((acc, cur) => acc + cur)} />
        </>

    )
}

export default Course