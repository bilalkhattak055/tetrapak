export default function capitalizeFirstLetter(str) {
    // Check if the input is not a string
    if (typeof str !== 'string') {
        console.error('Input must be a string');
        return ''; // Return empty string if input is not valid
    }
    
    // Check if the string is empty 
    if (str.trim().length === 0) {
        return ''; // Return empty string if input string is empty or contains only spaces
    }

    try {
        // Capitalize the first letter and lowercase the rest
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    } catch (error) {
        // Catch any unexpected error (e.g. if str is unexpectedly an object)
        console.error('Error while capitalizing the string:', error);
        return ''; // Return empty string in case of error
    }
}
