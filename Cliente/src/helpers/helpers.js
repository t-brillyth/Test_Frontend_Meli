export const number_format = (number) => {
    console.log(new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(number));
    return new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3,minimumIntegerDigits:3 }).format(number);
}