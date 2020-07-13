function criaAjax(url,dados,funcao)
{
    let ajax=new XMLHttpRequest();
    ajax.onreadystatechange=funcao;
    ajax.open("POST",url,true);
    ajax.setRequestHeader("Content-type", "application/json");
    ajax.send(dados);
}


function cadastrar(){

    const item= {
        numero:0,
        tipo:'',
        peso:0,
        grupo:'',
        descricao:''
    }
    let contInputs = document.querySelectorAll("input").length ;
    item.numero = parseInt(document.querySelectorAll("input")[0].value);
    item.tipo = document.querySelectorAll("input")[1].value;
    item.grupo = document.querySelectorAll("input")[2].value;
    item.descricao = document.querySelectorAll("input")[3].value;
    item.peso = parseInt(document.querySelectorAll("input")[4].value);

    console.log(item);
    const itemJson = JSON.stringify(item);
    criaAjax("http://localhost:8080/Sis-Paper/api/itens",itemJson,mostrar);
}

function mostrar()
{
    if(this.readyState===4&&this.status===200)
    {
          let res = this.responseText ;
          alert("O item foi cadastrado com sucesso, Id do Item: "+res);
    }
}

window.onload = function(){
    document.querySelector(".btnCadastrar").addEventListener('click', cadastrar);
} 