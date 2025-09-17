import './Transactions.css'

function Filter({ filters, setFilters }) {
    return (
        <>
            <div className='interactive-elements-container'>
                <label>Сортировать по: </label>
                <select value={filters.sortBy} onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}>
                    <option value="date">Дате</option>
                    <option value="amount">Сумме</option>
                </select>
            </div>

            {filters.sortBy === 'date' && (
                <div className='interactive-elements-container'>
                    <label>Порядок: </label>
                    <select value={filters.dateFrom} onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}>
                        <option value="newest">Новые → Старые</option>
                        <option value="oldest">Старые → Новые</option>
                    </select>
                </div>
            )}

            {filters.sortBy === 'amount' && (
                <div className='interactive-elements-container'>
                    <label>Порядок: </label>
                    <select value={filters.amountFrom} onChange={(e) => setFilters(prev => ({ ...prev, amountFrom: e.target.value }))}>
                        <option value="biggest">Большие → Маленькие</option>
                        <option value="smallest">Маленькие → Большие</option>
                    </select>
                </div>
            )}
            
            <div className='interactive-elements-container'>
                <label>Показать за: </label>
                <select value={filters.show} onChange={(e) => setFilters(prev => ({ ...prev, show: e.target.value }))}>
                    <option value="all">Всё время</option>
                    <option value="week">Неделю</option>
                    <option value="month">Месяц</option>
                    <option value="year">Год</option>
                </select>
            </div>
        </>
    )
}

export default Filter