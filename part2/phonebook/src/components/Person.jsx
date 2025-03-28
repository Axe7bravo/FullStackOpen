
const Person = ({ name, number, id, removePerson }) => {
    return (
      <p className="person">
        {name} {number} <button onClick={() => removePerson(id)}>delete</button>
      </p>
    );
  };
  
  export default Person;