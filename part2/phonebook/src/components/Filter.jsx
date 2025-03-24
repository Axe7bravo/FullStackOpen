const Filter = ({ searchTerm, handleSearchChange }) => {
    return (
        <div className="filter">
            filter shown with <input value={searchTerm} onChange={handleSearchChange} className="input" />
        </div>
    );
};

export default Filter;