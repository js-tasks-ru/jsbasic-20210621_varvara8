function checkSpam(str) {
    const lowStr = str.toLowerCase();

    return lowStr.includes('XXX'.toLocaleLowerCase()) || lowStr.includes('1xbet'.toLocaleLowerCase());
}
