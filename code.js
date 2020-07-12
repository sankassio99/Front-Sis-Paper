
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

	div.setAttribute("class","check");
	input.setAttribute("type","checkbox")
	input.setAttribute("id","checkbox")
	input.setAttribute("value", item.peso);

	let textLabel = document.createTextNode(item.descricao);

	label.appendChild(textLabel);

	div.appendChild(input);
	div.appendChild(label);

	section.appendChild(div);

}
window.onload = () => {
	criaAjax("http://localhost:8080/Sis-Paper/api/itens/listar",mostrar);
}		

// window.onload = () =>{
// 	document.querySelector(".btnFinalizar").addEventListener('click',mostrar);
// }