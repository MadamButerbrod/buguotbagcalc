class inventory {
    constructor (capacity) {
        this.capacity = capacity;
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
    get CurrQuantity () {
        if(this._indexInInventory != -1) {return this.inventory[this._indexInInventory].quantity}
        else {return 0}
    }
    get weight () {
        let _weight = 0
        this.inventory.forEach((c)=>{
            _weight += c.item.data('weight')*c.quantity
        })
        return _weight
    }
    get currCap () {
        return this.capacity-this.weight
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
currCapKg = () => inv.currCap/1000;

let inv = new inventory(0);
$(function(){
    $('.init-submit').on('click', function () {
        let par = $(this).parent();
        if($('.weight-input').val() > 0) {
            inv.capacity=$('.weight-input').val()*1000;
            $('#curr-capacity').text(currCapKg);
            hide($('#overlay'));
            hide(par);
        }
    })
    $('#curr-capacity').text(currCapKg);
    $('body').on('click', '.item', function () {
        inv.inTrans = $(this).clone();
        let par = $(this).parent();
        $('.quantity').val(1);
        if (par.attr('id')=='source') {
            show($('.inventory-dialog.get-in'));
        } else if (par.attr('id')=='inventory') {
            show($('.inventory-dialog.get-out'));
        }
        let selection = inv.inTrans.clone().removeClass('item');
        selection.appendTo($('.selection'));
        show($('#overlay'));
    });
    $('.minus').on('click', function () {
        let inval = $('.quantity').val()
        if (inval > 0) $('.quantity').val(inval-1);
    })
    $('.plus').on('click', function () {
        let inval = $('.quantity').val()
        $('.quantity').val(Number(inval)+1);
    })
    $('.submit-btn').on('click', function () {
        console.log('clicked');
        let it = inv.inTrans;
        let qua = Number($(this).siblings('.quantity').val());
        if (inv.currCap-(qua*inv.inTrans.data('weight')) >= 0) {
            let par = $(this).parent();
            qua = par.hasClass('get-out') ? -qua : qua;
            inv.addItem(it, qua);
            hide(par);
            hide($('#overlay'));
            hide($('.err'));
            $('.selection').empty();
            $('#curr-capacity').text(currCapKg);
        }
        else {
            show($('.err'));
        }
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
            hide($('.err'));
            $('.selection').empty();
        }
    })
})

