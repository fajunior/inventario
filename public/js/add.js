var figure = document.querySelector('figure');
var qrcode = document.querySelector('#qrcode');

function add(){
    console.log('chamou');
    var form = document.querySelector('form');
    
    var machine = JSON.parse('{}');  
    machine.tipoEquipamento = form.tipoEquipamento.value;
    machine.modelo = form.modelo.value;
    machine.mesAnoAquisicao = form.mesAnoAquisicao.value;
    machine.valorAquisicao = form.valorAquisicao.value;
    machine.nomeFoto = form.nomeFoto.value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            figure.classList.remove('hidden');
            
            var qrcodeAtt = document.createAttribute("src");
            qrcodeAtt.value = response.qr_img; 
            document.querySelector("#qrcode").setAttributeNode(qrcodeAtt);

            document.querySelector("#save").disabled = true;
            document.querySelector("#send").disabled = true;
            document.querySelector("#cancelSend").disabled = true;
            document.querySelector("#attach").disabled = true;
            document.querySelector("#cancel").innerHTML = "Lista";
        }
    };
    xhttp.open("POST", "http://localhost:3000/machine/", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(machine));

}