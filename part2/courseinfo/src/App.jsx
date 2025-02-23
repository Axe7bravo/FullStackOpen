const Course = (props) => {
  console.log('courses', props);

  if (!props.course || !Array.isArray(props.course)) {
    return <p>No courses data available.</p>; 
  }

  const courseList = props.course.map((course) => (
    <div key={course.id}> 
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  ));

  return (
    <>
      <h1>Web development curriculum</h1>
      {courseList} 
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return <Course course={courses} />
};

export default App