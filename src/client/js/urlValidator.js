function validateURL(inputText) {
    console.log("::: Running checkForName :::", inputText);
    return /^(http|https):\/\/[a-zA-Z0-9_\-\.~]+[a-zA-Z0-9_\-\.~:\/\?#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\%]*$/m.test(inputText)
}

export { validateURL }
