import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import getDaysInWeek from '../tools/getDaysInWeek';
import getDaysInMonth from '../tools/getDaysInMonth';
import getMonthsInYear from '../tools/getMonthsInYear';

function aggregateTransactions(transactions, gropBy) {
  const keyMap = {
    'day': (date) => date,
    'month': (date) => date.slice(0, 7),
  }
  
  const aggregated = {};

  transactions.forEach(transaction => {
    const { date, amount } = transaction;
    const key = keyMap[gropBy](date);

    if (!aggregated[key]) {
      aggregated[key] = {
        date: key,
        amount: 0,
      };
    }
    aggregated[key].amount += Math.abs(amount);
  });

  return aggregated;
}

function formDisplayData(aggregatedIncome, aggregatedExpense, periodData) {
  const displayData = [];
  for (const date of periodData) {
    const income = aggregatedIncome[date]?.amount || 0;
    const expense = aggregatedExpense[date]?.amount || 0;
    displayData.push({ date, income, expense }); 
  }

  return displayData;
}

const getPeriodDataMap = {
  'week': {
    aggregate: (transactions) => aggregateTransactions(transactions, 'day'),
    getDateList: getDaysInWeek
  },
  'month': {
    aggregate: (transactions) => aggregateTransactions(transactions, 'day'),
    getDateList: getDaysInMonth
  },
  'year': {
    aggregate: (transactions) => aggregateTransactions(transactions, 'month'),
    getDateList: getMonthsInYear
  },
  'all' : {
    aggregate: (transactions) => aggregateTransactions(transactions, 'month'),
    getDateList: getMonthsInYear
  }
};

function BarDiagram({ incomeTransactions, expenseTransactions, period }) {
  const aggregatedIncome = getPeriodDataMap[period].aggregate(incomeTransactions);
  const aggregatedExpense = getPeriodDataMap[period].aggregate(expenseTransactions);
  const periodData = getPeriodDataMap[period].getDateList(new Date());

  const displayData = formDisplayData(aggregatedIncome, aggregatedExpense, periodData);
  console.log(displayData);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={displayData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="income" fill="#82ca9d" name="Доход" />
        <Bar dataKey="expense" fill="#ca8282ff" name="Расход" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarDiagram;