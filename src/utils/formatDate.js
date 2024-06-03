
const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Europe/Kiev'
};

export const formatDateToUkrainianFull = (dateString) => {
    return new Date(dateString).toLocaleString('uk-UA', options)
}





// Функция для форматирования даты на украинском языке
export const formatDateToUkrainianShort = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};


