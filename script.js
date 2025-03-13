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
    $('.item').on('click', function(){
        show($('#inventory-dialog'));
    });
    $('.close').on('click', function(){
        let par = $(this).parent()
        hide(par);
        if (par.attr('id')=='target-dialog') {
            hide($('#inventory'));
            show($('#source'));
        }
    })
    $('#target').on('click', function(){
        hide($('#source'));
        show($('#inventory'));
        show($('#target-dialog'));
    });
})