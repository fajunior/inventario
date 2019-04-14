function removeConfirm(element) {

    if (confirm('Confirma a remoção deste equipamento?')) {
        removeMachine(element);
    }
}

function removeMachine(element) {
    console.log(element);
    var linha = element.parentNode.parentNode;
    var code = linha.getElementsByTagName('td')[0].textContent;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 202) {
            var response = this.responseText;
            if (response == 'removido') {
                linha.classList.add('fadeOut');
                setTimeout(function () {
                    linha.remove();
                }, 500);
            }
        }
    };
    xhttp.open("DELETE", "http://localhost:3000/machine/" + code, true);

    xhttp.send();
}