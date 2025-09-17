import { useState } from 'react';
import parseDate from '../tools/parseDate';
import './Transactions.css'

function CreateTransaction({ onAddTransaction, categories }) {
    const [transactionAmount, setTransactionAmount] = useState('');
    const [transactionDate, setTransactionDate] = useState(parseDate(new Date()));
    const [transactionCategory, setTransactionCategory] = useState('Прочее');

    function newTransaction(data) {
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
        <div>
            <div className='interactive-elements-container'>
                <input type="text" placeholder="Сумма" value={transactionAmount} onChange={(e) => setTransactionAmount(e.target.value)}/>
                <input type="date" value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)}/>
            </div>
            <div className='interactive-elements-container'>
                <select value={transactionCategory} onChange={(e) => setTransactionCategory(e.target.value)}>
                    {Object.values(categories).map((category) => (
                        <option key={category.id}>{category.id}</option>
                    ))}
                </select>
                <button type='button' onClick={() => newTransaction({amount: transactionAmount, date: transactionDate, category: transactionCategory})}>Добавить транзакцию</button>
            </div>
        </div>
    )
}

export default CreateTransaction