function addInput(){
    var tag = $('<input class="w3-input w3-border w3-light-grey" style="margin:10px" type="file" name="myFile"> ')
    $("#Itag").append(tag)
}

function remInput(){
    $('#Itag input').last().remove();
}