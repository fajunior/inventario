var tbody = document.querySelector('tbody');

function adicionarLinhaJSON(elemento) {
    console.log(elemento);
    var linha = criarLinhaJSON(elemento);
    
    console.log(linha);
    tbody.appendChild(linha);
    
}

function criarColunaValor(valor) {    
    var coluna = document.createElement('td');
    coluna.textContent = valor;
    return coluna;
}

function criarLinhaJSON(elemento){
    var linha = document.createElement('tr');
    
    var valor = elemento.codigo ;
    var coluna = criarColunaValor(valor);
    linha.appendChild(coluna);
    
    var valor = elemento.tipoEquipamento ;
    var coluna = criarColunaValor(valor);
    linha.appendChild(coluna);
    
    var valor = elemento.modelo ;
    var coluna = criarColunaValor(valor);
    linha.appendChild(coluna);
    
    coluna = document.createElement('td');
    coluna.innerHTML = '<img src="img/detail.png" onclick="detalhar(this)"/><img src="img/edit.png" onclick="editar(this)"/><img src="img/delete.png" onclick="remover(this)"/>';
    linha.append(coluna);
    
    return linha;
}