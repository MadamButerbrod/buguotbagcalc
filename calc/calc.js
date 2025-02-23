var height = document.getElementById('height');
var strengh = document.getElementById('strengh');
var volume = document.getElementById('volume');
function parseComma (el) {
    el.value = el.value.replace(',', '.');
    return el
}
function calculateVolume(h, s, v) {
    parseComma(h);
    parseComma(s);
    h = parseFloat(h.value);
    s = parseFloat(s.value);
    if (isNaN(h) || isNaN(s)) {
        v.innerText = '0 l kuprinė'
    } else {                
        vint = Math.round(((h**2)*(s*8+73))/9).toString();
        v.innerText = vint.concat(' l kuprinė');
    }
}
height.addEventListener('input', function(evt){
    calculateVolume(height, strengh, volume);
})
strengh.addEventListener('input', function(evt){
    calculateVolume(height, strengh, volume);
})
