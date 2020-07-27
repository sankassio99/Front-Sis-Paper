
/**Atraz de uma requisição ajax é enviado um metodo post para salvar o paper no banco de dados  */
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
/* ANALISA SE O TIPO DO PAPAER É VENDA OU NÃO */
function analisar(){
    // let venda = document.getElementsByName("check");
    paper.venda = global;
    if ( global)//true
    {      
        paper.nomeUser = document.getElementById("nomeAtendente").value ;
        paper.telefone = document.getElementById("telefoneCliente").value ;
        paper.proposta = document.getElementById("proposta").value ;
        paper.data_monitoria = new Date();
        verificaNull(paper);
    }else if ( !global)//false
    {
        paper.nomeUser = document.getElementById("nomeAtendente").value ;
        paper.telefone = document.getElementById("telefoneCliente").value ;
        paper.data_monitoria = new Date();
        paper.proposta = null ;
        verificaNull(paper);
    }
  
}
/**Verifica se o usuario não esqueceu de preecher nenhum campo  */
function verificaNull(paper){
 
    if(paper.nomeUser==undefined || paper.telefone==undefined 
        || paper.nomeUser=='' ||paper.telefone==''){
        alert("Preencha Todos os campos Disponiveis");
    }else {
        getValues();
    }
}

function ret()
{
    if(this.readyState===4&&this.status===200)
    {
          let res = this.responseText ;
          alert("O paper foi cadastrado com o seguinte id: "+res);
          let section = document.querySelector(".section").innerHTML = "";
          document.querySelector("#btnSim").setAttribute("hidden","true");
          document.querySelector("#btnNao").setAttribute("hidden","true");
          showResume();
          createButton();
    }
}

/*cRIA O BOTAO QUE DA A OPÇÃO DE CRIAR UM NOVO PAPER */
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
/**QUANDO É FINALIZADO O PAPER, ESSA FUNÇÃO MOSTRA O RESUMO DO PAPER CADASTRADO */
function showResume(){
    let res = document.querySelectorAll(".res");

    res[0].innerHTML = "<h3>Resumo do Paper Cadastrado</h3>";
    res[1].innerHTML = "<label>Nome: "+paper.nomeUser+"</label>";
    res[2].innerHTML = "<label>Telefone: "+paper.telefone+"</label>";
    res[3].innerHTML = "<label>Proposta: "+paper.proposta+"</label>";
    res[4].innerHTML = "<label>Potuação Final: "+paper.pontuacao+"</label>";

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

function getTotal(){
    let valores = document.querySelectorAll("#checkbox").value ;
    let total = 0 ;
    for (let i = 0; i < valores.length; i++) {
        total = parseInt(valores[i]);   
    }
    return total ;
}



    

