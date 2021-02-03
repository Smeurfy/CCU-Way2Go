export function formatValue(value_int) {
    let text = String(value_int)
    let value = text.split('.');
    if (value.length == 1)
        text += ".00"
    else if (value[1].length == 0)
        text += "00"
    else if (value[1].length == 1)
        text += "0"
    return text
}

export function handlePhone(text) {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
        if ( numbers.indexOf(text[i]) > -1 && newText.length < 9 ) {
          newText = newText + text[i];
        }
    }
    return newText;
}