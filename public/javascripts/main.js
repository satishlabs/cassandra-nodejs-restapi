$(document).ready(function(){
    $('.deletefiler').on('click',deleteFiler);
});

function deleteFiler(){
    event.preventDefault();

    var confirmation = confirm("Are you sure that you want to delete this filer?");
    if(confirmation){
        $.ajax({
            type: 'DELETE',
            url: '/filer/'+ $('.deletefiler').data('filer')
        }).done(function(response){
           window.location.replace('/filers');
        });
    }else{
        return false;
    }
}