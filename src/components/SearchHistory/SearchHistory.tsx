import React from 'react';
import { SearchHistoryItem } from '../../models/weather.types';
import './SearchHistory.css';
import { SearchIcon, TrashIcon } from '@/assets/icons';

interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onSelectItem: (query: string) => void;
  onDeleteItem: (query: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  history,
  onSelectItem,
  onDeleteItem
}) => {
  if (history.length === 0) {
    return <div className="no-history">No search history yet</div>;
  }

  return (
    <div className="search-history">
      <h3>Search History</h3>
      <ul className="history-list">
        {history.map((item) => (
          <li key={item.query} className="history-item">
            <span>{item.query}</span>
            <div className="history-actions">
              <button
                className="history-button research-button"
                onClick={() => onSelectItem(item.query)}
                aria-label={`Search for ${item.query}`}
              >
                <SearchIcon />
              </button>
              <button
                className="history-button delete-button"
                onClick={() => onDeleteItem(item.query)}
                aria-label={`Delete ${item.query} from history`}
              >
                <TrashIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;