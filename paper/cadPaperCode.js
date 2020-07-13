
function ajaxPost(url,dados,funcao)
{
    let ajax=new XMLHttpRequest();
    ajax.onreadystatechange=funcao;
    ajax.open("POST",url,true);
    ajax.setRequestHeader("Content-type", "application/json");
    ajax.send(dados);
}

const paper = {
    nomeUser:"",
    data_monitoria:null,
    pontuacao:0,
    proposta:"",
    telefone:"",
    venda: true 
}
/* Pegar dados DO ITEM VENDA PARA SABER SE FOI UMA VENDA OU NÃO */
function analisar(){
    
    let venda = document.getElementsByName("check");

    if ( venda[0].checked && venda[1].checked){
       alert("Não pode marcar dois itens VENDA ");      
    }else if ( venda[0].checked)//true
    {
        paper.venda = venda[0].value;
        paper.nomeUser = document.getElementById("nomeAtendente").value ;
        paper.telefone = document.getElementById("telefoneCliente").value ;
        paper.proposta = document.getElementById("proposta").value ;
        paper.data_monitoria = new Date();
        getValues()
    }else if ( venda[1].checked)//false
    {
        paper.venda = venda[1].value;
        paper.nomeUser = document.getElementById("nomeAtendente").value ;
        paper.telefone = document.getElementById("telefoneCliente").value ;
        paper.data_monitoria = new Date();
        paper.proposta = null ;
        getValues()
    }
  
}

/* PEGAR DADOS DOS INPUTS TEXT */
// function getText(){
//     paper.nomeUser = document.getElementById("nomeAtendente").value ;
//     paper.telefone = document.getElementById("telefoneCliente").value ;
//     if(paper.venda){
//         alert("Paper true")
//         paper.proposta = document.getElementById("proposta").value ;
//     }else{
//         alert("Paper False")
//         paper.proposta = null ;
//     }   
// }
function ret()
{
    if(this.readyState===4&&this.status===200)
    {
          let res = this.responseText ;
          alert("O paper foi cadastrado com o seguinte id: "+res);
          let section = document.querySelector(".section").innerHTML = "";
          createButton();
    }
}

function createButton(){
    let end = document.querySelector(".end");
    document.querySelector("#btnFinalizar").setAttribute("hidden","true");

    let button = document.createElement("button");

    button.setAttribute("onclick","document.location.reload(true)");
    button.setAttribute("class","btn");

    let textButton = document.createTextNode("Criar novo Paper");

    button.appendChild(textButton);

    end.appendChild(button);
}

/* FAZENDO CALCULOS DOS ITENS DESCONTADOS */
function getValues() {
    
    let marcados = document.querySelectorAll('[id=checkbox]:checked');
    let total = 100 ;
    let valorMarcado = 0 ;
    
    for (var i = 0; i < marcados.length; i++) {
      // utilize o valor aqui, adicionei ao array para exemplo
      valorMarcado = parseInt(marcados[i].value) ;
      total = total - valorMarcado ;
    }
    paper.pontuacao = total ;
    let paperJson = JSON.stringify(paper);
    ajaxPost("http://localhost:8080/Sis-Paper/api/itens/paper",paperJson,ret);   
}



    

