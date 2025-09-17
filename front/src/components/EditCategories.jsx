import { useState } from "react";
import './Transactions.css'

function EditCategories({ categories, onAddCategory, onDeleteCategory }) {
    const [categoryName, setCategoryName] = useState('');
    const [categoryColor, setCategoryColor] = useState('#000000');
    const [transactionCategory, setTransactionCategory] = useState('Прочее');

    return (
        <div>
            <div className='interactive-elements-container'>
                <input type="text" placeholder="Название категории" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
                <input type="color" value={categoryColor} onChange={(e) => setCategoryColor(e.target.value)}/>
            </div>
            <div className='interactive-elements-container'>
                <button type='button' onClick={() => onAddCategory({name: categoryName, colorCode: categoryColor})}>Добавить категорию</button>
                <div></div>
            </div>
            <div className='interactive-elements-container'>
                <select value={transactionCategory} onChange={(e) => setTransactionCategory(e.target.value)}>
                    {Object.values(categories).map((category) => (
                        <option key={category.id}>{category.id}</option>
                    ))}
                </select>
                <button type='button' onClick={() => onDeleteCategory(transactionCategory)}>Удалить категорию</button>
            </div>
        </div>
    )
}

export default EditCategories