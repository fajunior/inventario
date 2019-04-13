var tbody = document.querySelector('tbody');

function adicionarLinhaJSON(elemento) {
    var linha = criarLinhaJSON(elemento);
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
    coluna.innerHTML = '<img src="img/detail.png" onclick="detail(this)"/><img src="img/delete.png" onclick="removeConfirm(this)"/>';
    linha.append(coluna);
    
    return linha;
}

function detail(element){
    var linha = element.parentNode.parentNode;
    var code = linha.getElementsByTagName('td')[0].textContent;
    console.log('detail');

    document.location.href = "http://localhost:3000/detalhes/" + code;
}