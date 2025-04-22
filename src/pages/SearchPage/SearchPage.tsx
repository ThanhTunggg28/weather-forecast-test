import React, { useState } from 'react';
import { useWeather } from '../../contexts/WeatherContext';
import SearchHistory from '../../components/SearchHistory/SearchHistory';
import { useNavigate } from 'react-router-dom';
import './SearchPage.css';
import { HomeIcon, LocaionIcon } from '@/assets/icons';

const SearchPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const { searchCity, searchHistory, deleteHistoryItem, error } = useWeather();
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    const res = await searchCity(searchValue);
    if (res) {
      navigate('/');
    }
  };

  const handleHistoryItemClick = async (query: string) => {
    const res = await searchCity(query);
    if (res) {
      navigate('/');
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className='search-page'>
      <header className='header'>
        <div className='location'>
          <LocaionIcon />
          <span>Search</span>
        </div>
        <button className='search-icon' onClick={handleHomeClick}>
          <HomeIcon />
        </button>
      </header>

      <main className='content'>
        <form onSubmit={handleSearch} className='search-form'>
          <div className='search-input-container'>
            <input
              type='text'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder='Search country or city here...'
              className='search-input'
            />
            {error && <div className='search-error'>{error}</div>}
          </div>
          <button type='submit' className='search-button'>
            Search
          </button>
        </form>

        <SearchHistory
          history={searchHistory}
          onSelectItem={handleHistoryItemClick}
          onDeleteItem={deleteHistoryItem}
        />
      </main>
    </div>
  );
};

export default SearchPage;
