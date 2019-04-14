var containerResult = document.querySelector('#container2');
var containerNotFound = document.querySelector('#container3');

function find() {
    var codeInput = document.querySelector('#codeInput');
    if (codeInput.value == "") {
        alert('Digite um valor para o código');
    } else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var machine = JSON.parse(this.responseText);
                containerResult.classList.remove('hidden');
                console.log(this.responseText);
                document.querySelector("#codigo").textContent = machine.codigo;
                document.querySelector("#tipoEquipamento").textContent = machine.tipoEquipamento;
                document.querySelector("#modelo").textContent = machine.modelo;
                document.querySelector("#mesAnoAquisicao").textContent = machine.mesAnoAquisicao;
                document.querySelector("#valorAquisicao").textContent = machine.valorAquisicao;
                document.querySelector("#depreciacao").textContent = machine.depreciacao;
                document.querySelector("#valorAtual").textContent = machine.valorAtual;

                if (machine.nomeFoto) {
                    document.querySelector("#figurePicture").classList.remove("hidden");
                    var att = document.createAttribute("src"); 
                    att.value = "/pictures/"+machine.nomeFoto; 
                    document.querySelector("#picture").setAttributeNode(att);
                } else {
                    document.querySelector("#figurePicture").classList.add("hidden");
                }
                document.querySelector("#figureQrcode").classList.remove("hidden");
                var qrcodeAtt = document.createAttribute("src");
                qrcodeAtt.value = machine.qrcodeURL; 
                document.querySelector("#qrcode").setAttributeNode(qrcodeAtt);
                containerNotFound.classList.add("hidden");

            } else if (this.readyState == 4 && this.status == 400) {
                document.querySelector("#figureQrcode").classList.add("hidden");
                document.querySelector("#figurePicture").classList.add("hidden");
                containerResult.classList.add("hidden");
                containerNotFound.classList.remove("hidden");
            }
        };
        xhttp.open("GET", "http://localhost:3000/buscar/" + codeInput.value, true);

        xhttp.send();
    }


    containerResult.classList.add('hidden');

}