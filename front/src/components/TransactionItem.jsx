import { useState } from 'react';
import './TransactionItem.css'; // Подключим стили
import trashCan from '../assets/trashCan.svg';

const TransactionItem = ({ id, category, amount, date, color, onRemove, style, className }) => {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div
      className={`${className} transaction-item`}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      style={style}
    >
      <div className="transaction-category">
        <span className="category-dot" style={{ backgroundColor: color }}></span>
        <span className="category-text">{category}</span>
      </div>

      <div className="transaction-amount" style={{ color: amount < 0 ? '#d32f2f' : '#2e7d32' }}>
        {amount > 0 ? `+${amount}` : amount}
      </div>

      <div className="transaction-date">
        {date}
      </div>

      <div className="delete-btn-container">
      {showDelete && (
        <button
          className="delete-btn"
          onClick={() => onRemove(id)}
        >
          <img src={trashCan} alt="Корзина" />
        </button>
      )}
      </div>
    </div>
  );
};

export default TransactionItem;