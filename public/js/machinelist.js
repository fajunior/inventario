getList();

function getList(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var machines = JSON.parse(this.responseText);
               
            machines.forEach(function(machine){
                adicionarLinhaJSON(machine);
            });
            
            
        }
    };
    xhttp.open("GET", "http://localhost:3000/machine", true);
    
    xhttp.send();
}