const useFormatDateText = (dateString) => {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    const date = new Date(dateString);
    
    const day = date.getDate();
    const monthIndex = date.getMonth(); // getMonth returns an index from 0 to 11
    const year = date.getFullYear();

    return `${day} ${months[monthIndex]}, ${year}`;
}

export default useFormatDateText;