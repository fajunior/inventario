var figure = document.querySelector('figure');
var qrcode = document.querySelector('#qrcode');
var ulErrors = document.querySelector('#erros');

function validar(field) {
    str = field.value;
    if (str.length > 6) {

      field.value = str.substring(0, str.length - 1);
    }
  }
  
  function numerico(evt) {
    var key_code = evt.keyCode ? evt.keyCode : evt.charCode ? evt.charCode : evt.which ? evt.which : void 0;
    if (key_code == 8 || key_code == 9 || key_code == 13 || key_code == 27 || key_code == 46) {
      return true;
    } else if ((key_code >= 35) && (key_code <= 40)) {
      return true
    } else if ((key_code >= 48) && (key_code <= 57)) {
      return true
    }
    return false;
  }

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
        ulErrors.innerHTML="";
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
        } else {
            var list = JSON.parse(this.responseText);
            list.forEach(function(item){
                var li = document.createElement('li');
                li.textContent = item.msg;
                ulErrors.appendChild(li);
            });
        }
    };
    xhttp.open("POST", "http://localhost:3000/machine/", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(machine));

}