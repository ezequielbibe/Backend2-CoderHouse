export const phoneValidate = (number) => {
    const regexp = /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
    return regexp.test(number)
}