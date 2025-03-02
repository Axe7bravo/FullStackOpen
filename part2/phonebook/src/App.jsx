import { useState, useEffect } from 'react';
import Person from './components/person';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import numberService from './services/numbers';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const hook = () => {
    numberService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  };
  
  useEffect(hook, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return; 
    }

    const personObject = {
      name: newName,
      number: newNumber,
      
    }
  
    numberService
    .create(personObject)
    .then(returnedNote => {
      setPersons(persons.concat(returnedNote));
      setNewName('');
      setNewNumber('');
    })
  };

  const handleNameChange = (event) => {
    
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    
    setSearchTerm(event.target.value);
  };

  const searchPerson = persons.filter((person) => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>
      <PersonForm
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                addPerson={addPerson}
            />
      <h3>Numbers</h3>
      <div>
          {searchPerson.map((person) => (
                <Person key={person.id} name={person.name} number={person.number} />
                ))}
      </div>
        
      
      
      
    </div>
  )
}

export default App;