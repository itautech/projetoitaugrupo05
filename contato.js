
// Esta variável guarda o ID de um campo do formulário.
// Isso permite que, ao fechar uma mensagem de aviso (quando o usuário não preenche um campo obrigatório)
// o foco seja transferido direto para o campo que precisa ser preenchido.

var returnToFieldId = false;

// Esta função percorre a lista de campos obrigatórios e verifica se estão preenchidos.
// Se algum estiver vazio, oculta o formulário, mostra uma mensagem de aviso indicando o campo com problema.
// Interrompe o loop e retorna false para evitar o envio do formulário.

function checarCampos() {
	const fields = ["field_name", "field_email", "field_subject", "field_content"];
	for(let index in fields) {
		let id = fields[index];
		let field = document.getElementById(id);
		if(field.value.length == 0){
			returnToFieldId = id;
			document.getElementById("form").hidden = true;
			document.getElementById("form-msg-required-field").hidden = false;
			document.getElementById("form-display-label").innerHTML = field.previousElementSibling.innerText;
			return false;
		}
	}
	return true;
}

// Cria um objeto onde cada propriedade contém o valor de um dos campos do formulário:

function capturarCampos(){
	const fields = ["field_to", "field_name", "field_phone", "field_email", "field_subject", "field_content"];
var message = {};

	for(let index in fields) {
		let id = fields[index];
		let field = document.getElementById(id);
		message[id] = formatarCampoParaTransporte(field.value);
	}
	return message;
}

// Substitui caracteres especiais do conteúdo por "sequências de escape".
// Isso evita problemas no transporte e risco de ataques propositais.

function formatarCampoParaTransporte(input){
	var buffer = '';
	for (let i = 0; i < input.length; i++){
		if(input.charAt(i) == '\\')
			buffer += "#b";
		else if(input.charAt(i) == '"')
			buffer += "#q";
		else if(input.charAt(i) == '#')
			buffer += "#c";
		else if(input.charAt(i) == "\n")
			buffer += "#n";
		else if(input.charAt(i) == "\r")
			null;
		else if(input.charAt(i) == "\0")
			null;
		else
			buffer += input.charAt(i);
	}
	return buffer;
}

// Envia o formulário através de HTTP Request.
// Exibe uma mensagem de acordo com a resposta do servidor.

function enviar() {
	if(!checarCampos())
		return;

	const message = capturarCampos();
	const url = 'https://itau05.ecolabore.net/-endpoints/angelo-mailer';

	const request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.readyState != 4 || this.status != 200) 
			return;
		
		document.getElementById("form").hidden = true;
		document.getElementById("form-display-name").innerHTML = document.getElementById("field_name").value;
		var select = document.getElementById("field_to");
		document.getElementById("form-display-to").innerHTML = select.options[select.selectedIndex].text;
		document.getElementById("form-display-error").innerHTML = this.responseText;
		
		if(this.responseText == "ok")
			document.getElementById("form-msg-ok").hidden = false;
		else
			document.getElementById("form-msg-fail").hidden = false;
	};
	request.open("POST", url, true);
	request.send(JSON.stringify (message));
}

// Oculta qualquer mensagem que esteja sendo exibida e exibe o formulário.

function retornar() {
	document.getElementById("form").hidden = false;
	document.getElementById("form-msg-ok").hidden = true;
	document.getElementById("form-msg-fail").hidden = true;
}

// Oculta a mensagem de aviso, exibe o formulário e transfere o foco para o campo onde ocorreu o problema.

function corrigir() {
	document.getElementById("form").hidden = false;
	document.getElementById("form-msg-required-field").hidden = true;
	document.getElementById(returnToFieldId).focus();
}

