import { useState } from 'react';
import TransactionItem from './TransactionItem';
import CreateTransaction from './CreateTransaction';
import EditCategories from './EditCategories';
import Filter from './Filter';
import './Transactions.css'

function Transactions({ transactions, categories, onAddTransaction, onDeleteTransaction, onAddCategory, onDeleteCategory, filters, setFilters }) {
    const [mode, setMode] = useState('display-transactions'); //display-transactions, create-transaction, edit-categories, filter

    return (
        <div className="transaction-list">
            <div className="transaction-list-header">
                <button type='button' onClick={() => setMode('display-transactions')}>Показать транзакции</button>
                <button type='button' onClick={() => setMode('create-transaction')}>Новая транзакция</button>
                <button type='button' onClick={() => setMode('edit-categories')}>Редактировать категории</button>
                <button type='button' onClick={() => setMode('filter')}>Настроить фильтр</button>
            </div>

            {mode === 'display-transactions' && transactions.map((tx) => (
                <TransactionItem
                key={tx.id}
                id={tx.id}
                category={tx.category}
                amount={tx.amount}
                date={tx.date}
                color={categories[tx.category].color_code}
                onRemove={() => onDeleteTransaction(tx.id)}
                />
            ))}

            {mode === 'create-transaction' && (
                <CreateTransaction onAddTransaction={onAddTransaction} categories={categories} />
            )}

            {mode === 'edit-categories' && (
                <EditCategories categories={categories} onAddCategory={onAddCategory} onDeleteCategory={onDeleteCategory} />
            )}

            {mode === 'filter' && (
                <Filter filters={filters} setFilters={setFilters} />
            )}
        </div>
    );
}

export default Transactions