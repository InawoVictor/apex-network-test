const useCheckDate = (expectedDateInput) => {
    const expectedDate = new Date(expectedDateInput);
    
    const currentDate = new Date();
    // Set time to 00:00:00 to compare only dates without considering the time
    currentDate.setHours(0, 0, 0, 0);

    if (currentDate > expectedDate) {
        // Format the expected date as 'Month day, year', e.g., 'April 25, 2024'
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = expectedDate.toLocaleDateString('en-US', options);
        
        return true;
    } else {
        return false
    }
}

export default useCheckDate;

// Example usage
// console.log(checkDueDate("2024-05-10")); // Test with an expected date
