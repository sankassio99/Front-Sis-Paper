
function criaAjax(url,funcao)
{
    let ajax=new XMLHttpRequest();
    ajax.onreadystatechange=funcao;
    ajax.open("GET",url,true);
    ajax.send();
}

function mostrar()
{
    if(this.readyState===4&&this.status===200)
    {
		const item= {
			id:'',
			numero:0,
			tipo:'',
			peso:0,
			grupo:'',
			descricao:''
		}
		let data = JSON.parse(this.responseText);
		// console.log(data);
		document.querySelector(".section").innerHTML ="";
		for (let i = 0; i < data.length; i++) {
			item.id = data[i].id ;
			item.numero = data[i].numero ;
			item.tipo = data[i].tipo ;
			item.peso = data[i].peso ;
			item.grupo = data[i].grupo ;
			item.descricao = data[i].descricao ;
			console.log(item);
			
			createELements(item);
		}
		
	}

}
function createELements(item){
	let section = document.querySelector(".section");
	let div = document.createElement("div");
	let input = document.createElement("input");
	let label = document.createElement("label");
	let lNum = document.createElement("label");

	div.setAttribute("class","check");
	input.setAttribute("type","checkbox")
	input.setAttribute("id","checkbox")
	input.setAttribute("value", item.peso);

	let textLabel = document.createTextNode(item.descricao);
	let lText = document.createTextNode(item.numero);

	label.appendChild(textLabel);
	lNum.appendChild(lText);

	div.appendChild(input);
	
	div.appendChild(lNum);
	div.appendChild(label);

	section.appendChild(div);

}
var global = null ;
function venda(){
	criaAjax("http://localhost:8080/Sis-Paper/api/itens/listar/1",mostrar);
	global = true;
	document.getElementById("proposta").setAttribute("placeholder","");
	document.querySelector(".indicativo").innerHTML = "Venda" ;
}
function naoVenda(){
	criaAjax("http://localhost:8080/Sis-Paper/api/itens/listar/2",mostrar);
	global = false;
	document.getElementById("proposta").setAttribute("placeholder","Não Contém");
	document.querySelector(".indicativo").innerHTML = "Não Venda" ;
}
window.onload = () => {
	// criaAjax("http://localhost:8080/Sis-Paper/api/itens/listar",mostrar);
	document.querySelector("#btnSim").addEventListener("click",venda);
	document.querySelector("#btnNao").addEventListener("click",naoVenda);
}		

// window.onload = () =>{
// 	document.querySelector(".btnFinalizar").addEventListener('click',mostrar);
// }