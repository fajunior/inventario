var modal = document.getElementById("modal");
var divBloqueio = document.getElementById("divbloqueio");
var botaoSalvar = document.querySelector('#salvar');

function addPicture(){
    
    
    divBloqueio.style.visibility="visible";
    modal.style.visibility="visible";
    modal.classList.remove("hidden");

    if (botaoSalvar.disabled) {
        botaoSalvar.disabled = false;
    } else {
        botaoSalvar.disabled = true;   
    }

}

function sendPicture(){
    var file = document.querySelector('#fileoupload').files[0];

    var formData = new FormData();
    formData.append("myfile", file);

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            var filename = document.querySelector('#nomeFoto');
            filename.value = response.filename;
        }
    };

    xhr.open('POST', '/fileupload', true);
    xhr.send(formData);
    closePictureBox();
}

function closePictureBox(){
    modal.classList.add("hidden");
    divbloqueio.style.visibility="hidden";
    modal.style.visibility="hidden";
    if (botaoSalvar.disabled) {
        botaoSalvar.disabled = false;
    } else {
        botaoSalvar.disabled = true;   
    }
}