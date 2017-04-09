var isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0; 
}; //trim() removes all leading and trailing empty space '   f ' = 'f' 

module.exports = {
    isRealString: isRealString
}