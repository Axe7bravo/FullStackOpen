const Course = (props) => {
  
  return(
    <>
      <Header course={props.course.name}/>
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts}/>
    </>
  );

};

const Header = (props) => {
  //console.log(props)
  return (
    <>
      <h1> {props.course} </h1>
    </>
  );
};

const Content = (props) => {

  
  const partData = props.parts.map((part) => ({
    id: part.id ,
    name: part.name,
    exercises: part.exercises,
  }));

  return (
    <>
      <Part items={partData} />
    </>
  );
};

const Part = (props) => {

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

const Total = (props) => {
  
  const totalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <>
      <p><strong>Total of {totalExercises} exercises</strong></p>
    </>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
      
    ]
  };

  return <Course course={course} />
};

export default App