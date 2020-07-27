

function criaAjax(url,funcao)
{
    let ajax=new XMLHttpRequest();
    ajax.onreadystatechange=funcao;
    ajax.open("GET",url,true);
    ajax.send();
}


function filtraVenda(){
    criaAjax("http://localhost:8080/Sis-Paper/api/itens/paper/listar/true",mostrar);
    alert("Filtrado Por Tipo Venda")
}
function filtraNaoVenda(){
    criaAjax("http://localhost:8080/Sis-Paper/api/itens/paper/listar/false",mostrar);
    alert("Filtrado Por Tipo Não Venda")
}
function filtraTodos(){
    criaAjax("http://localhost:8080/Sis-Paper/api/itens/paper/listar",mostrar);
    alert("Todos os Tipos")
}

function mostrar()
{
    if(this.readyState===4&&this.status===200)
    {
        const paper= {
            id:0,
			nomeUser:'',
			proposta:'',
			pontuacao:0,
            telefone:'',
            data_monitoria:"",
			venda:true
		}
		let data = JSON.parse(this.responseText);
		// console.log(data);
		document.querySelector(".tbody").innerHTML ="";
		for (let i = 0; i < data.length; i++) {
			paper.id = data[i].id ;
			paper.nomeUser = data[i].nomeUser ;
			paper.proposta = data[i].proposta ;
			paper.pontuacao = data[i].pontuacao ;
			paper.telefone = data[i].telefone ;
            paper.venda = data[i].venda ;
            paper.data_monitoria = data[i].data_monitoria ;
			console.log(paper);
			
			createELements(paper);
        }
    }    
}
function createELements(paper){
    let tbody = document.querySelector(".tbody");
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    
    let tr1Text = document.createTextNode(paper.id);
    let tr2Text = document.createTextNode(paper.nomeUser);
    let tr3Text = document.createTextNode(paper.proposta);
    let tr4Text = document.createTextNode(paper.pontuacao);
    let tr5Text = document.createTextNode(paper.data_monitoria);

    td1.appendChild(tr1Text);
    td2.appendChild(tr2Text);
    td3.appendChild(tr3Text);
    td4.appendChild(tr4Text);
    td5.appendChild(tr5Text);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    // for (let i = 0; i < 4; i++) {
    //     const element = array[i];    
    // }

	tbody.appendChild(tr);

}

window.onload = () => {
	criaAjax("http://localhost:8080/Sis-Paper/api/itens/paper/listar",mostrar);
	document.querySelector("#btnVenda").addEventListener("click",filtraVenda);
    document.querySelector("#btnNaoVenda").addEventListener("click",filtraNaoVenda);
    document.querySelector("#btnTodos").addEventListener('click', filtraTodos);
}	