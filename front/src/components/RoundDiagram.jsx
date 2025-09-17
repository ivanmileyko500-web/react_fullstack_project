import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

function aggregateTransactionsByCategory(transactions, categories) {
  const aggregated = {};

  transactions.forEach(transaction => {
    const { category, amount } = transaction;
    const categoryData = categories[category];

    if (!aggregated[category]) {
      aggregated[category] = {
        category,
        amount: 0,
        color_code: categoryData.color_code
      };
    }

    aggregated[category].textColor = amount > 0 ? '#2e7d32' : '#d32f2f';
    aggregated[category].amount += Math.abs(amount);
  });

  return Object.values(aggregated).sort((a, b) => a.category.localeCompare(b.category));
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0].payload;

  return (
    <div
      style={{
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '6px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
    >
      <p style={{ margin: '0 0 6px 0', fontWeight: 'bold' }}>
        {data.category}
      </p>
      <p style={{ margin: '0', fontSize: '14px' }}>
        Сумма: <strong style={{ color: data.textColor }}>{data.textColor === '#2e7d32' ? '+' : '-'}{data.amount.toLocaleString()} ₽</strong>
      </p>
    </div>
  );
};

function RoundDiagram({ transactions, categories }) {
  const transactionsByCategory = aggregateTransactionsByCategory(transactions, categories);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={transactionsByCategory}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          innerRadius={65}
          fill="#8884d8"
          dataKey="amount"
        >
          {transactionsByCategory.map((tx, index) => (
            <Cell key={`cell-${index}`} fill={tx.color_code} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />}/>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default RoundDiagram