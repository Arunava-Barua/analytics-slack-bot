const cleaner = (str) => {

    if (str) {

        var strLower = str.toLowerCase();
        return strLower.replace(/\W/g, '');

    }

    return false;

}

module.exports={ cleaner };