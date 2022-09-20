$('.modal').on('hide.bs.modal', function () {
    var memory = $(this).html();
    $(this).html(memory);
})