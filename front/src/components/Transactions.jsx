import { useState } from 'react';
import './Transactions.css'
import TransactionItem from './TransactionItem';
import CreateTransaction from './CreateTransaction';
import EditCategories from './EditCategories';

function Transactions({ transactions, categories, onAddTransaction, onDeleteTransaction, onAddCategory, onDeleteCategory }) {
    const [mode, setMode] = useState('display-transactions'); //display-transactions, create-transaction, edit-categories

    return (
        <div className="transaction-list">

            <div className="transaction-list-header">
                <button type='button' onClick={() => setMode('display-transactions')}>Показать транзакции</button>
                <button type='button' onClick={() => setMode('create-transaction')}>Новая транзакция</button>
                <button type='button' onClick={() => setMode('edit-categories')}>Редактировать категории</button>
            </div>

            {mode === 'display-transactions' && Object.values(transactions).map((tx) => (
                <TransactionItem
                key={tx.id}
                id={tx.id}
                category={categories[tx.category] ? categories[tx.category].id : 'Прочее'}
                amount={tx.amount}
                date={tx.date}
                color={categories[tx.category] ? categories[tx.category].color_code : categories['Прочее'].color_code}
                onRemove={() => onDeleteTransaction(tx.id)}
                />
            ))}

            {mode === 'create-transaction' && (
                <CreateTransaction onAddTransaction={onAddTransaction} categories={categories} />
            )}

            {mode === 'edit-categories' && (
                <EditCategories categories={categories} onAddCategory={onAddCategory} onDeleteCategory={onDeleteCategory} />
            )}
        </div>
    );
}

export default Transactions