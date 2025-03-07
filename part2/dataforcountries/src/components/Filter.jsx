import './CountryDetails.css';
const Filter = ({ searchTerm, handleSearchChange }) => {
    return (
        <div className="search-container">
            <p className='search-label'>Filter shown with</p> <input value={searchTerm} onChange={handleSearchChange} className="search-input" />
        </div>
    );
};

export default Filter;