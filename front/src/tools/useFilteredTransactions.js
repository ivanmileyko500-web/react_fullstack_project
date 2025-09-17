import { useMemo } from 'react';

export const useFilteredTransactions = (transactions, filters) => {
  return useMemo(() => {
    let filtered = Object.values(transactions);

    const now = new Date();
    if (filters.show !== 'all') {
      const cutoffDate = new Date();

      switch (filters.show) {
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          break;
      }

      filtered = filtered.filter(tx => {
        const txDate = new Date(tx.date);
        return txDate >= cutoffDate;
      });
    }

    filtered.sort((a, b) => {
      if (filters.sortBy === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return filters.dateFrom === 'newest'
          ? dateB - dateA 
          : dateA - dateB; 
      } else if (filters.sortBy === 'amount') {
        return filters.amountFrom === 'biggest'
          ? b.amount - a.amount 
          : a.amount - b.amount; 
      }
    });

    return filtered;
  }, [transactions, filters]);
};