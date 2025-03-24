const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => {
    return (
        <form onSubmit={addPerson} >
            <div className="people">
            <div >
                name: <input value={newName} onChange={handleNameChange} className="input"  />
            </div>
            <div  >
                number: <input value={newNumber} onChange={handleNumberChange} className="input" />
            </div>
            <div >
                <button type="submit">add</button>
            </div>
            </div>
        </form>
    );
};

export default PersonForm;