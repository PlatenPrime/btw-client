export const groupByDate = (items) => {
    return items.reduce((groups, item) => {
        const date = new Date(item.createdAt).toISOString().split('T')[0];
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(item);
        return groups;
    }, {});
};



// Функция для форматирования даты на украинском языке
export const formatDateToUkrainian = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) ;
  };