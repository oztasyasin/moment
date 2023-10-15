export const getFormattedDate = (date) => {
    const yil = date.getFullYear();
    const ay = String(date.getMonth() + 1).padStart(2, '0');
    const gun = String(date.getDate()).padStart(2, '0');
    const saat = date.getHours();
    const dakika = date.getMinutes();
    const saniye = date.getSeconds();
    return `${yil}-${ay}-${gun}T${saat}:${dakika}:${saniye}`;
}