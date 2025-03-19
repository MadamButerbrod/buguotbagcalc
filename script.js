/**
 * @param {object} jq - JQery object of an item, default is all elements with class .item
 */
class item {
    constructor (jq = $('.item')) {
        this.jq = jq;
        this.weight = this.jq.data('weight');
    }
}
class inventory {
    constructor () {
        this.inventory = [];
    }
    /**
     * add new item to inventory
     * @param {item} newItem 
     * @param {number} newQuantity 
     */
    addItem (newItem, newQuantity) {
        if (this.inventory.length != 0) {
            let i = this.inventory.findIndex(cat => newItem.jq.attr('id') === cat.item.jq.attr('id'));
            if (i != -1) {
                this.inventory[i].quantity += newQuantity;
                if (this.inventory[i].quantity <= 0) {
                    delete this.inventory[i]
                } return
            } 
        }
        let newCategory = {
                item: newItem,
                quantity: newQuantity,
        };
        this.inventory.push(newCategory);
    }
    get jq () {
        return $('#inventory')
    }
}

function show (block) {
    if (!(block.hasClass('show'))) {
        block.addClass('show');
    }
}
function hide (block) {
    if (block.hasClass('show')) {
        block.removeClass('show');
    }
}


$(function(){
    new item().jq.on('click', function(){
        let par = $(this).parent()
        if (par.attr('id')=='source') {
            show($('.inventory-dialog.get-in'));
        } else if (par.attr('id')=='inventory') {
            show($('.inventory-dialog.get-out'));
        }
        $(this).clone().appendTo($('.selection'))
        show($('#overlay'));
    });
    $('.exit').on('click', function(){
        let par = $(this).parent()
        hide(par);
        if (par.attr('id')=='target-dialog') {
            hide($('#inventory'));
            show($('#source'));
        } else if (par.hasClass('inventory-dialog')) {
            hide($('#overlay'));
            $('.selection').empty();
        }
    })
    $('#target').on('click', function(){
        hide($('#source'));
        show($('#inventory'));
        show($('#target-dialog'));
    });
})

inv = new inventory(); //sukuriu nają inventory objektą. Jis turi kol kas vieną atributą, tuščią masyvą 'inventory' ir vieną metodą pridėti daiktų į tą masyvą.
comp = new item($('#compass70')); //sukuriu du item objektus, kuriuos vėliau pridėsiu į tą savo masyvą. Item objektai iš esmės tėra jqery ojektas su papildomu svorio atributu, kurį kostruktorius nuskaito automatiškai
wat = new item($('#water500')); 
inv.addItem(comp, 2); // pridedu vieną
console.log(inv);
inv.addItem(wat, 3); //pridedu kitą
console.log(inv); //IR PO VELNIŲ, ABU CONSOLE.LOG() MAN RODO TĄ PATĮ GALUTINĮ REZULTATĄ. Net jei antras item prie inventory nepridėtas! Kodėl?
