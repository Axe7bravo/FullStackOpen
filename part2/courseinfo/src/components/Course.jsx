const Course = (props) => {

  
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

  export default Course;