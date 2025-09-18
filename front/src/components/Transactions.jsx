import { useState, useEffect } from 'react';
import TransactionItem from './TransactionItem';
import CreateTransaction from './CreateTransaction';
import EditCategories from './EditCategories';
import Filter from './Filter';
import './Transactions.css'

function Transactions({ transactions, categories, onAddTransaction, onDeleteTransaction, onAddCategory, onDeleteCategory, filters, setFilters }) {
    const [mode, setMode] = useState('display-transactions'); //display-transactions, create-transaction, edit-categories, filter
    const [animateTransactions, setAnimateTransactions] = useState(false);

    useEffect(() => {
        setAnimateTransactions(true);
    }, []);

    console.log(animateTransactions);

    return (
        <div className="transaction-list">
            <div className="transaction-list-header">
                <button type='button' onClick={() => {setMode('display-transactions'); setAnimateTransactions(false)}}>Показать транзакции</button>
                <button type='button' onClick={() => {setMode('create-transaction'); setAnimateTransactions(false)}}>Новая транзакция</button>
                <button type='button' onClick={() => {setMode('edit-categories'); setAnimateTransactions(false)}}>Редактировать категории</button>
                <button type='button' onClick={() => {setMode('filter'); setAnimateTransactions(false)}}>Настроить фильтр</button>
            </div>

            {mode === 'display-transactions' && transactions.map((tx, index) => (
                <TransactionItem
                key={tx.id}
                id={tx.id}
                category={tx.category}
                amount={tx.amount}
                date={tx.date}
                color={categories[tx.category].color_code}
                onRemove={() => onDeleteTransaction(tx.id)}
                style={{
                    animationDelay: `${index * 0.13 + 0.2}s`,
                }}
                className={animateTransactions ? 'animate' : ''}
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