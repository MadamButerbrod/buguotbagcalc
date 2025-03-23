class inventory {
    constructor () {
        this.inventory = [];
    }
    /**
     * @param {JQuery} i
     */
    set inTrans (i) {
        if (!(i.data('id'))) throw 'this item has no data-id attribute';
        this._inTransition = i;
        this._indexInInventory = this.inventory.findIndex(cat => this._inTransition.data('id') === cat.item.data('id'));
    }
    get inTrans () {
        return this._inTransition
    }
    /**
     * add new item to inventory
     * @param {JQuery} newItem 
     * @param {number} newQuantity 
     */
    addItem (newItem, newQuantity) {
            if (!(newItem.data('id'))) throw 'newItem has no data-id attribute';
            let i = this.inventory.findIndex(cat => newItem.data('id') === cat.item.data('id'));
            if (i != -1) {
                this.inventory[i].quantity += newQuantity;
                let upitem = $(`#inventory>[data-id='${newItem.data('id')}']`);
                let upquant = upitem.next();
                if (this.inventory[i].quantity <= 0) {
                    this.inventory.splice(i, 1);
                    upitem.remove();
                    upquant.remove();
                }
                else {
                    upquant.text(`x${this.inventory[i].quantity}`);
                }
            } 
            else {
                let newCategory = {
                        item: newItem,
                        quantity: newQuantity,
                };
                this.inventory.push(newCategory);
                $('#inventory').append(newItem);
                $('#inventory').append(`<p class='count'>x${newQuantity}</p>`);
                return newItem
            }

    }
    getCurrQuantity () {
        if(this._indexInInventory != -1) {return this.inventory[this._indexInInventory].quantity}
        else {return 0}
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

let inv = new inventory();
$(function(){
    $('body').on('click', '.item', function () {
        inv.inTrans = $(this).clone();
        let par = $(this).parent()
        if (par.attr('id')=='source') {
            show($('.inventory-dialog.get-in'));
        } else if (par.attr('id')=='inventory') {
            show($('.inventory-dialog.get-out'));
            $('.quantity').val(inv.getCurrQuantity())
        }
        let selection = inv.inTrans.clone().removeClass('item');
        selection.appendTo($('.selection'));
        show($('#overlay'));
    });
    $('.submit-btn').on('click', function () {
        let it = inv.inTrans;
        let qua = $(this).siblings('.quantity').val();
        inv.addItem(it, Number(qua));
        console.log(inv.inventory);
    });
    $('#target').on('click', function () {
        hide($('#source'));
        show($('#inventory'));
        show($('#target-dialog'));
    });
    $('.exit').on('click', function () {
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
})

