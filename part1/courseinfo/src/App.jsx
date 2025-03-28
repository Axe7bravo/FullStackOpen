
//Part component renders the object data to the screen
const Part = (props) => {
  console.log("part props", props);

  return (
    <>
      
      {props.items.map((item) => (
        <p key={item.id}>
          {item.name}: {item.exercises}
        </p>
      ))}
    </>
  );
};

const Header = (props) => {
  console.log(props)
  return (
    <>
      <h1> {props.course} </h1>
    </>
  )
}

//Content component takes in the data from the main App component to pass to Part component
const Content = (props) => {
  console.log("Content props", props);

  // Map the parts array to the desired format for the Part component
  const partData = props.parts.map((part, index) => ({
    id: index + 1, // Give each part a unique ID
    name: part.name,
    exercises: part.exercises,
  }));

  return (
    <>
      <Part items={partData} />
    </>
  );
};

//Total component sums the number of exercises
const Total = (props) => {
  const totalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <>
      <p>Number of exercises {totalExercises}</p>
    </>
  );
};



//Main App component that brings all the components together
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
       <Header course={course.name} />
       <Content parts={course.parts}  />
      
       <Total parts={course.parts} />
    </div>
  )
}

export default App