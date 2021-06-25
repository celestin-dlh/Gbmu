export const formatHexNumber = (number, leadingZero = 4) => {
    const hexNumber = number.toString(16).toUpperCase();
    return hexNumber.padStart(leadingZero, '0');
}