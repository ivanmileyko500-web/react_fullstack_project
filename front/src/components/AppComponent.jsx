import { useState, useEffect } from 'react';
import Transactions from './Transactions'
import RoundDiagram from './RoundDiagram';
import BarDiagram from './BarDiagram';
import { useFilteredTransactions } from '../tools/useFilteredTransactions';
import arrayToObject from '../tools/arrayToObject';
import './AppComponent.css'

function AppComponent({username}) {
    const [transactions, setTransactions] = useState({});
    const [filters, setFilters] = useState({sortBy: 'date', dateFrom: 'newest', amountFrom: 'biggest', show: 'all'});
    const [categories, setCategories] = useState({});  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // === Загрузка данных ===

    const fetchData = async () => {
        try {
            setLoading(true);
            const [transRes, catsRes] = await Promise.all([
                fetch(`http://localhost:5000/api/transactions?username=${username}`),
                fetch(`http://localhost:5000/api/categories?username=${username}`)
            ]);

            if (!transRes.ok) throw new Error('Ошибка загрузки транзакций');
            if (!catsRes.ok) throw new Error('Ошибка загрузки категорий');

            const transArray = await transRes.json();
            const catsArray = await catsRes.json();
            catsArray.push({ id: 'Прочее', color_code: '#b8b8b8ff'}); 

            setTransactions(arrayToObject(transArray));
            setCategories(arrayToObject(catsArray));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [username]);

    // === Управление транзакциями ===

    const addTransaction = async (newTransData) => {
        const payload = {
            ...newTransData,
            user_login: username
        };

        const response = await fetch('http://localhost:5000/api/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const result = await response.json();
            const newTransaction = {
                id: result.id.toString(),
                category: newTransData.category,
                amount: newTransData.amount,
                date: newTransData.date
            };

            setTransactions(prev => ({
                ...prev,
                [newTransaction.id]: newTransaction
            }));
        } else {
            const error = await response.json();
            console.error('Ошибка:', error);
            alert('Не удалось добавить транзакцию');
        }
    };

    const deleteTransaction = async (id) => {
        const response = await fetch(`http://localhost:5000/api/transactions/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            setTransactions(({ [id]: _, ...rest }) => rest);
        } else {
            const error = await response.json();
            console.error('Ошибка:', error);
            alert('Не удалось удалить транзакцию');
        }
    };

    // === Управление категориями ===

    const addCategory = async (newCatData) => {
        if (newCatData.name === 'Прочее') return
        const payload = {
            id: newCatData.name,
            user_login: username,
            color_code: newCatData.colorCode || '#cccccc'
        };

        const response = await fetch('http://localhost:5000/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const result = await response.json();
            const newCategory = {
                id: payload.id,
                category: payload.category,
                color_code: payload.color_code
            };

            setCategories(prev => ({
                ...prev,
                [newCategory.id]: newCategory
            }));
        } else {
            const error = await response.json();
            console.error('Ошибка:', error);
            alert('Не удалось добавить категорию');
        }
    };

    const deleteCategory = async (id) => {
        if (id === 'Прочее') return
        const response = await fetch(`http://localhost:5000/api/categories/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            setCategories(({ [id]: _, ...rest }) => rest);
        } else {
            const error = await response.json();
            console.error('Ошибка:', error);
            alert('Не удалось удалить категорию');
        }
    };

    // === Подготовка транзакций для отображения ===

    const filteredTransactions = useFilteredTransactions(transactions, filters);
    const transactionsToRender = filteredTransactions.map((tx) => {
        return {
            id: tx.id,
            category: categories[tx.category] ? categories[tx.category].id : 'Прочее',
            amount: tx.amount,
            date: tx.date
        }
    })
    const incomeTransactions = transactionsToRender.filter(tx => tx.amount > 0);
    const expenseTransactions = transactionsToRender.filter(tx => tx.amount < 0);

    // === Рендер ===

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <main className="main">
            <div className="container transactons">
                <Transactions 
                    transactions={transactionsToRender}
                    categories={categories}
                    onAddTransaction={addTransaction}
                    onDeleteTransaction={deleteTransaction}
                    onAddCategory={addCategory}
                    onDeleteCategory={deleteCategory}
                    filters={filters}
                    setFilters={setFilters}
                />
            </div>
            <div className="diagrams">
                <div className='container round-diagrams'>
                    <div>
                        <RoundDiagram 
                            transactions={incomeTransactions}
                            categories={categories}
                        />
                    </div>
                    <div>
                        <RoundDiagram 
                            transactions={expenseTransactions}
                            categories={categories}
                        />
                    </div>
                </div>
                <div className='container bar-diagram'>
                    <BarDiagram 
                    incomeTransactions={incomeTransactions}
                    expenseTransactions={expenseTransactions}
                    period={filters.show}
                    />
                </div>
            </div>
        </main>
    );
}

export default AppComponent