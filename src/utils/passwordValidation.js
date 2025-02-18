export const validatePassword = (value) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(value) || 'Password must have at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long';
};