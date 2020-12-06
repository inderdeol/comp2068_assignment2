$(document).ready(function () {
    $('.delete').on('submit', function (e) {
        var currentForm = $(this).parent().parent();
        e.preventDefault();
        alert("Do you want to delete for sure..?");
        $.ajax({
            type: 'POST',
            url: '/remove/' + $(this).attr('id'),
            success: function (data) {
                // item will fadeout from the list
                currentForm.fadeOut();
                location.reload();
                setTimeout(function () {}, 3000);
            }
        });
    });
});