
const Person = ({ name, number, id, removePerson }) => {
    return (
      <p>
        {name} {number} <button onClick={() => removePerson(id)}>delete</button>
      </p>
    );
  };
  
  export default Person;