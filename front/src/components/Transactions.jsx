import { useState } from 'react';
import './Transactions.css'
import TransactionItem from './TransactionItem';

function getCurrentDateInputValue() {
    const d = new Date();
    return [
        d.getFullYear(),
        String(d.getMonth() + 1).padStart(2, '0'),
        String(d.getDate()).padStart(2, '0')
    ].join('-');
}

function Transactions({ transactions, categories, onAddTransaction, onDeleteTransaction, onAddCategory, onDeleteCategory }) {
    const [mode, setMode] = useState('display-transactions'); //display-transactions, create-transaction, edit-categories
    const [transactionAmount, setTransactionAmount] = useState('');
    const [transactionDate, setTransactionDate] = useState(getCurrentDateInputValue());
    const [transactionCategory, setTransactionCategory] = useState('Прочее');
    const [categoryName, setCategoryName] = useState('Прочее');
    const [categoryColor, setCategoryColor] = useState('#000000');

    function createTransaction(data) {
        if (/^[+-]?[1-9]\d*$/.test(data.amount)) {
            onAddTransaction({
                amount: parseInt(data.amount),
                date: data.date,
                category: data.category
            });   
        } else {
            alert('Некорректная сумма');
        }
    }

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
                <div>
                    <div className='interactive-elements-container'>
                        <input type="text" placeholder="Сумма" value={transactionAmount} onChange={(e) => setTransactionAmount(e.target.value)}/>
                        <input type="date" value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)}/>
                    </div>
                    <div className='interactive-elements-container'>
                        <select value={transactionCategory} onChange={(e) => setTransactionCategory(e.target.value)}>
                            <option key={'Прочее'}>Прочее</option>
                            {Object.values(categories).map((category) => (
                                <option key={category.id}>{category.id}</option>
                            ))}
                        </select>
                        <button type='button' onClick={() => createTransaction({amount: transactionAmount, date: transactionDate, category: transactionCategory})}>Добавить транзакцию</button>
                    </div>
                </div>
            )}

            {mode === 'edit-categories' && (
                <div>
                    <div className='interactive-elements-container'>
                        <input type="text" placeholder="название категории" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
                        <input type="color" value={categoryColor} onChange={(e) => setCategoryColor(e.target.value)}/>
                    </div>
                    <div className='interactive-elements-container'>
                        <button type='button' onClick={() => onAddCategory({name: categoryName, colorCode: categoryColor})}>Добавить категорию</button>
                        <div></div>
                    </div>
                    <div className='interactive-elements-container'>
                        <select value={transactionCategory} onChange={(e) => setTransactionCategory(e.target.value)}>
                            <option key={'Прочее'}>Прочее</option>
                            {Object.values(categories).map((category) => (
                                <option key={category.id}>{category.id}</option>
                            ))}
                        </select>
                        <button type='button' onClick={() => onDeleteCategory(transactionCategory)}>Удалить категорию</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Transactions