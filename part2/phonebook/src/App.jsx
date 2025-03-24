import { useState, useEffect } from 'react';
import Person from './components/person';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import numberService from './services/numbers';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);


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

    const existingPerson = persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            const updatedPerson = { ...existingPerson, number: newNumber };
            numberService
                .update(existingPerson.id, updatedPerson)
                .then((returnedPerson) => {
                    setPersons(
                        persons.map((person) =>
                            person.id !== existingPerson.id ? person : returnedPerson
                        )
                    );
                    setNewName('');
                    setNewNumber('');
                    setErrorMessage(
                      `${returnedPerson.name} information updated successfullly`
                    )
                    setIsError(false);
                    setTimeout(() => {
                      setErrorMessage(null)
                    }, 5000)

                })
                .catch(() => {
                  setErrorMessage(
                    `Note: '${existingPerson.name}' could not be updated in server`
                  )
                  setIsError(true);
                  setTimeout(() => {
                    setErrorMessage(null)
                  }, 5000)
                });
        }
    } else {
        const personObject = {
            name: newName,
            number: newNumber,
        };

        numberService
            .create(personObject)
            .then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson));
                setNewName('');
                setNewNumber('');
                
                setErrorMessage(
                  `Added ${returnedPerson.name}`
                )
                setIsError(false);
                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000)

            })
            .catch((error) => {
              setErrorMessage(
                `${error.response.data.error}`
              )
              setIsError(true);
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000);
            });
    }
};

  const removePerson = (id) => {
    if (window.confirm("Do you really want to delete this person?")) {
        numberService
            .remove(id)
            .then(() => {
                setPersons(persons.filter((person) => person.id !== id));
                setErrorMessage(
                  `${persons.find(p => p.id === id).name} deleted`
                )
                setIsError(false);
                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000)
            })
            .catch(() => {
              setErrorMessage(
                `Information of ${persons.find(p => p.id === id).name} already deleted from server`
              )
              setIsError(true);
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              setPersons(persons.filter(p => p.id !== id))
            });
    }
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
      <Notification message={errorMessage} isError={isError} />
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
                <Person 
                  key={person.id} 
                  name={person.name} 
                  number={person.number} 
                  id={person.id} 
                  removePerson={removePerson} />              
                ))}
      </div>
        
      
      
      
    </div>
  )
}

export default App;