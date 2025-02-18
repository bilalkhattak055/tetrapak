export const generatePassword = () => {
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "!@#$%&*";
    
    // Ensure the password includes one of each required character type
    let password = '';
    password += lowerChars[Math.floor(Math.random() * lowerChars.length)];
    password += upperChars[Math.floor(Math.random() * upperChars.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Fill the rest of the password with random characters
    const allChars = lowerChars + upperChars + numbers + specialChars;
    for (let i = 4; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    // Shuffle the password to ensure randomness
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
    return password;

    
};