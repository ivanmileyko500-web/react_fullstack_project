import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const barData = [
  { month: 'Янв', income: 4000, expense: 2400 },
  { month: 'Фев', income: 3000, expense: 1398 },
  { month: 'Мар', income: 2000, expense: 9800 },
  { month: 'Апр', income: 2780, expense: 3908 },
  { month: 'Май', income: 1890, expense: 4800 },
];

function BarDiagram() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="income" fill="#82ca9d" name="Доход" />
        <Bar dataKey="expense" fill="#8884d8" name="Расход" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarDiagram;