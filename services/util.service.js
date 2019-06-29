
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function makeId(length=5) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  function rndColor(){
      let colors = ['#cdfd96','#d6b0f9','#ccf0f7','#e5c8aa','#fef27e','#afccf8'];
      let idx = getRandomInt(0,colors.length);
      return colors[idx];
  }


function getDate(timeStamp){
    var date = new Date(timeStamp);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    return `${day}/${+month+1}/${year}`;
}

function getCurrency(currencyCode) {
    switch(currencyCode){
        case 'ILS' : 
            return '₪';
        case 'EUR' : 
            return '€';
        case 'USD' :
            return '$';
        default:
            return '';
    }
}

export default {
    getRandomInt,
    makeId,
    getCurrency,
    rndColor,
    getDate
}

