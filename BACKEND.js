var numApoios = 0;
var numEsforc = 0;

var numApoios1Grau = 0;
var numApoios2Grau = 0;
var numApoios3Grau = 0;

var numForcasAplic = 0;
var numCarregAplic = 0;
var numMomentAplic = 0;

var Array1GrauPos = [];
var Array2GrauPos = [];
var Array3GrauPos = [];

var ArrayForcaPos = [];
var ArrayForcaInt = [];
var ArrayMomenPos = [];
var ArrayMomenInt = [];

var ArrayCarrPosI = [];
var ArrayCarrPosF = [];
var ArrayCarrIntI = [];
var ArrayCarrIntF = [];

var tamvig = Number(document.getElementById("inputComprimentoViga").value);
var canvas = new fabric.Canvas('canvas');

var ArrayForcasEMomentosAplicados = [];
var ArrayDivVigaSemRepeticao = [];
var ArrayDeDeslocamentosEInclinacoes = undefined;
var ArrayEsforcosEReacoes = undefined;

//VARIÁVEIS DA KGlobal
var Elast = 1;
var Inerc = 1;
// console.log("Elast  = "+Elast+" & Inerc = "+Inerc)

var KGlobal = [];
var KGlobalModificada = [];
var KGlobalOriginal = [];
var explicacao = "";

var MatrizCoeficientesDasEquacoes = [];
//
//////////////////////////////////////////// PARTE DE INTERAÇÃO COM USUÁRIO /////////////////////////
function decimalPlaces(num) {
	var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
	if (!match) { return 0; }
	return Math.max(
		0,
		// Number of digits right of decimal point.
		(match[1] ? match[1].length : 0)
		// Adjust for scientific notation.
		- (match[2] ? +match[2] : 0));
}

function LimpaCanvas() {
	canvas.clear();
}

function LimpaApoios() {

	numApoios1Grau = 0;
	numApoios2Grau = 0;
	numApoios3Grau = 0;
	Array1GrauPos = [];
	Array2GrauPos = [];
	Array3GrauPos = [];


	numApoios = 0;
	$("#divApoios").empty();
}

function LimpaCargas() {

	numForcasAplic = 0;
	numCarregAplic = 0;
	numMomentAplic = 0;
	ArrayForcaPos = [];
	ArrayForcaInt = [];
	ArrayMomenPos = [];
	ArrayMomenInt = [];
	ArrayCarrPosI = [];
	ArrayCarrPosF = [];
	ArrayCarrIntI = [];
	ArrayCarrIntF = [];
	numEsforc = 0;
	$("#divCargas").empty();

}

function addApoio(grau) {
	this[`numApoios${grau}Grau`] = this[`numApoios${grau}Grau`] + 1;
	this['numApoios'] = this['numApoios'] + 1;
	let imagem = '';
	switch (grau) {
		case 1: imagem = 'rolete'; break;
		case 2: imagem = 'apoio 2'; break;
		case 3: imagem = 'engasteIconeSmall';
			if (numApoios3Grau > 2) {
				window.alert("Uma viga só pode ter no maximo dois engastes! Um no Inicio, e um no Fim!");
				return 'error';
			}
			break;
		default: break;
	}
	let valorEntrada = this[`numApoios${grau}Grau`];
	let dom = `<div class="input-group" id="inputGroup${grau}Grau-${valorEntrada}">
		<div class="input-group-addon" id="inputGroupAdd${grau}Grau-${valorEntrada}">
			<img width="47" height="19" alt="..." src="Img/${imagem}.png" id="Foto${grau}Grau-${valorEntrada}">
		</div>
		<input id="Entrada${grau}Grau-${valorEntrada}" style="font-size: 12px;" class="form-control block-geral" type="Number" placeholder="Posição do Apoio">
		<span class="input-group-btn" id="Span${grau}Grau-${valorEntrada}">
			<button class="btn btn-default" onclick="removerApoio(this.id, ${grau});" id="Remove${grau}Grau-${valorEntrada}">
				<span class="glyphicon glyphicon-remove" id="${valorEntrada}"></span>
			</button>
		</span>
	</div>`
	$('#divApoios').append(dom);
}

function removerApoio(valor, grau) {
	var IDindexRemover = $("#" + valor).closest("div").attr('id'); //RECEBE A ID DA DIV QUE CONTEM OS APOIOS
	var stringLength = IDindexRemover.length; // CALCULA TAMANHO DO ID PARA USAR NA FUNÇÃO ABAIXO
	var lastChar = IDindexRemover.charAt(stringLength - 1); //REMOVE TODOS OS CARACTERES MENOSO ULTIMO

	$("#" + IDindexRemover).remove(); //REMOVE A DIV ESPECIFICADA
	let valor2 = this[`numApoios${grau}Grau`];
	for (i = lastChar; i <= valor2; i++) {
		$(`#inputGroup${grau}Grau-` + (i)).attr(`id`, `inputGroup${grau}Grau-` + (i - 1));
		$(`#inputGroupAdd${grau}Grau-` + (i)).attr(`id`, `inputGroupAdd${grau}Grau-` + (i - 1));
		$(`#Foto${grau}Grau-` + (i)).attr(`id`, `Foto${grau}Grau-` + (i - 1));
		$(`#Entrada${grau}Grau-` + (i)).attr(`id`, `Entrada${grau}Grau-` + (i - 1));
		$(`#Span${grau}Grau-` + (i)).attr(`id`, `Span${grau}Grau-` + (i - 1));
		$(`#Remove${grau}Grau-` + (i)).attr(`id`, `Remove${grau}Grau-` + (i - 1));
		$(`#` + (i)).attr(`id`, (i - 1));
	}
	this[`numApoios${grau}Grau`] = this[`numApoios${grau}Grau`] - 1;
	this['numApoios'] = this['numApoios'] - 1;
}

function addForca() {
	numEsforc++;
	numForcasAplic++;
	let dom = `<div class="input-group" id="inputGroupForca-${numForcasAplic}">
		<div class="input-group-addon" id="inputGroupAddForca-${numForcasAplic}">
			<img width="47" height="47" alt="..." src="Img/PIcone.png" id="FotoForca-${numForcasAplic}">
		</div>
		<input id="EntradaPosiçãoForca-${numForcasAplic}" style="font-size: 12px;" width="50%" class="form-control" type="Number" placeholder="Posição da Carga">
		<input id="EntradaIntensiForca-${numForcasAplic}" style="font-size: 12px;" width="50%" class="form-control" type="Number" placeholder="Intensid. da Carga">
		<span class="input-group-btn" id="SpanForca-${numForcasAplic}">
			<button class="btn btn-default" id="RemoveForca-${numForcasAplic}" onclick="removerForca(this.id);">
				<span class="glyphicon-2linhas glyphicon-remove"></span>
			</button>
		</span>
	</div>`;
	$('#divCargas').append(dom);
}

function removerForca(valor) {
	var IDindexRemover = $("#" + valor).closest("div").attr('id'); //RECEBE A ID DA DIV QUE CONTEM OS APOIOS
	var stringLength = IDindexRemover.length; // CALCULA TAMANHO DO ID PARA USAR NA FUNÇÃO ABAIXO
	var lastChar = IDindexRemover.charAt(stringLength - 1); //REMOVE TODOS OS CARACTERES MENOSO ULTIMO

	$("#" + IDindexRemover).remove(); //REMOVE A DIV ESPECIFICADA

	for (i = lastChar; i <= numForcasAplic; i++) {
		$("#inputGroupForca-" + (i)).attr("id", "inputGroupForca-" + (i - 1));
		$("#inputGroupAddForca-" + (i)).attr("id", "inputGroupAddForca-" + (i - 1));
		$("#FotoForca-" + (i)).attr("id", "FotoForca-" + (i - 1));
		$("#EntradaPosiçãoForca-" + (i)).attr("id", "EntradaPosiçãoForca-" + (i - 1));
		$("#EntradaIntensiForca-" + (i)).attr("id", "EntradaIntensiForca-" + (i - 1));
		$("#SpanForca-" + (i)).attr("id", "SpanForca-" + (i - 1));
		$("#RemoveForca-" + (i)).attr("id", "RemoveForca-" + (i - 1));
	}
	numForcasAplic = numForcasAplic - 1;
	numEsforc = numEsforc - 1;
}

function addCarreg() {

	numCarregAplic++;
	numEsforc++;

	let dom = `<div class="input-group" id="inputGroupCarreg-1">
		<div class="input-group-addon" id="inputGroupAddCarreg-1">
			<img width="47" height="47" alt="..." src="Img/carregamentoIcone.png" id="FotoCarreg-${numCarregAplic}">
		</div>
		<input id="EntradaPosiçãoICarreg-${numCarregAplic}" style="font-size: 12px;" width="50%" class="form-control-50" type="Number" placeholder="Posição I">
		<input id="EntradaPosiçãoFCarreg-${numCarregAplic}" style="font-size: 12px;" width="50%" class="form-control-50" type="Number" placeholder="Posição F">
		<input id="EntradaIntensiICarreg-${numCarregAplic}" style="font-size: 12px;" width="50%" class="form-control-50" type="Number" placeholder="Intensid. I">
		<input id="EntradaIntensiFCarreg-${numCarregAplic}" style="font-size: 12px;" width="50%" class="form-control-50" type="Number" placeholder="Intensid. F">
		<span class="input-group-btn" id="SpanCarreg-${numCarregAplic}">
			<button class="btn btn-default" id="RemoveCarreg-${numCarregAplic}" onclick="removerCarreg(this.id);">
				<span class="glyphicon-2linhas glyphicon-remove"></span>
			</button>
		</span>
	</div>`;
	$('#divCargas').append(dom);
}

function removerCarreg(valor) {
	var IDindexRemover = $("#" + valor).closest("div").attr('id'); //RECEBE A ID DA DIV QUE CONTEM OS APOIOS
	var stringLength = IDindexRemover.length; // CALCULA TAMANHO DO ID PARA USAR NA FUNÇÃO ABAIXO
	var lastChar = IDindexRemover.charAt(stringLength - 1); //REMOVE TODOS OS CARACTERES MENOSO ULTIMO

	$("#" + IDindexRemover).remove(); //REMOVE A DIV ESPECIFICADA

	for (i = lastChar; i <= numCarregAplic; i++) {
		$("#inputGroupCarreg-" + (i)).attr("id", "inputGroupCarreg-" + (i - 1));
		$("#inputGroupAddCarreg-" + (i)).attr("id", "inputGroupAddCarreg-" + (i - 1));
		$("#FotoCarreg-" + (i)).attr("id", "FotoCarreg-" + (i - 1));
		$("#EntradaPosiçãoICarreg-" + (i)).attr("id", "EntradaPosiçãoICarreg-" + (i - 1));
		$("#EntradaPosiçãoFCarreg-" + (i)).attr("id", "EntradaPosiçãoFCarreg-" + (i - 1));
		$("#EntradaIntensiICarreg-" + (i)).attr("id", "EntradaIntensiICarreg-" + (i - 1));
		$("#EntradaIntensiFCarreg-" + (i)).attr("id", "EntradaIntensiFCarreg-" + (i - 1));
		$("#SpanCarreg-" + (i)).attr("id", "SpanCarreg-" + (i - 1));
		$("#RemoveCarreg-" + (i)).attr("id", "RemoveCarreg-" + (i - 1));
	}
	numCarregAplic = numCarregAplic - 1;
	numEsforc = numEsforc - 1;
}

function addMoment() {

	numEsforc++;
	numMomentAplic++;

	let dom = `<div class="input-group" id="inputGroupMoment-${numMomentAplic}">
		<div class="input-group-addon" id="inputGroupAddMoment-${numMomentAplic}">
			<img width="47" height="47" alt="..." src="Img/momento SH Icone.png" id="FotoMoment-${numMomentAplic}">
		</div>
		<input id="EntradaPosiçãoMoment-${numMomentAplic}" width="50%" style="font-size: 12px;" class="form-control" type="Number" placeholder="Posição da Carga">
		<input id="EntradaIntensiMoment-${numMomentAplic}" width="50%" style="font-size: 12px;" class="form-control" type="Number" placeholder="Intensid. da Carga">
		<span class="input-group-btn" id="SpanMoment-${numMomentAplic}">]
			<button class="btn btn-default" id="RemoveMoment-${numMomentAplic}" onclick="removerMoment(this.id);">
				<span class="glyphicon-2linhas glyphicon-remove"></span>
			</button>
		</span>
	</div>`;
	$('#divCargas').append(dom);
}

function removerMoment(valor) {
	var IDindexRemover = $("#" + valor).closest("div").attr('id'); //RECEBE A ID DA DIV QUE CONTEM OS APOIOS
	var stringLength = IDindexRemover.length; // CALCULA TAMANHO DO ID PARA USAR NA FUNÇÃO ABAIXO
	var lastChar = IDindexRemover.charAt(stringLength - 1); //REMOVE TODOS OS CARACTERES MENOSO ULTIMO

	$("#" + IDindexRemover).remove(); //REMOVE A DIV ESPECIFICADA

	for (i = lastChar; i <= numMomentAplic; i++) {
		$("#inputGroupMoment-" + (i)).attr("id", "inputGroupMoment-" + (i - 1));
		$("#inputGroupAddMoment-" + (i)).attr("id", "inputGroupAddMoment-" + (i - 1));
		$("#FotoMoment-" + (i)).attr("id", "FotoMoment-" + (i - 1));
		$("#EntradaPosiçãoMoment-" + (i)).attr("id", "EntradaPosiçãoMoment-" + (i - 1));
		$("#EntradaIntensiMoment-" + (i)).attr("id", "EntradaIntensiMoment-" + (i - 1));
		$("#SpanMoment-" + (i)).attr("id", "SpanMoment-" + (i - 1));
		$("#RemoveMoment-" + (i)).attr("id", "RemoveMoment-" + (i - 1));
	}
	numMomentAplic = numMomentAplic - 1;
	numEsforc = numEsforc - 1;
}


function addEsforco(grau) {

	let tipo = '';
	let valor;
	let input = '';
	switch (grau) {
		case 1: 
			tipo = 'Forcas';
			this[`num${tipo}Aplic`] = this[`num${tipo}Aplic`] + 1;
			valor = this[`num${tipo}Aplic`];
			input = `
				<input id="EntradaPosiçãoForca-${valor}" style="font-size: 12px !important;" width="50%" class="form-control" type="Number" placeholder="Posição da Carga">
				<input id="EntradaIntensiForca-${valor}" style="font-size: 12px !important;" width="50%" class="form-control" type="Number" placeholder="Intensid. da Carga">
			`;
			break;
		case 2: 
			tipo = 'Carreg';
			this[`num${tipo}Aplic`] = this[`num${tipo}Aplic`] + 1;
			valor = this[`num${tipo}Aplic`];
			input = `
				<input id="EntradaPosiçãoICarreg-${valor}" style="font-size: 12px !important;" width="50%" class="form-control-50" type="Number" placeholder="Posição I">
				<input id="EntradaPosiçãoFCarreg-${valor}" style="font-size: 12px !important;" width="50%" class="form-control-50" type="Number" placeholder="Posição F">
				<input id="EntradaIntensiICarreg-${valor}" style="font-size: 12px !important;" width="50%" class="form-control-50" type="Number" placeholder="Intensid. I">
				<input id="EntradaIntensiFCarreg-${valor}" style="font-size: 12px !important;" width="50%" class="form-control-50" type="Number" placeholder="Intensid. F">
			`;
			break;
		case 3: 
			tipo = 'Moment';
			this[`num${tipo}Aplic`] = this[`num${tipo}Aplic`] + 1;
			valor = this[`num${tipo}Aplic`];
			input = `
				<input id="EntradaPosiçãoMoment-${valor}" style="font-size: 12px !important;" width="50%" class="form-control" type="Number" placeholder="Posição da Carga">
				<input id="EntradaIntensiMoment-${valor}" style="font-size: 12px !important;" width="50%" class="form-control" type="Number" placeholder="Intensid. da Carga">
			`;
			break;
		default: break;
	}

	this['numEsforc'] = this['numEsforc'] + 1;

	let dom = `<div class="input-group" id="inputGroupCarreg-1">
		<div class="input-group-addon" id="inputGroupAddCarreg-1">
			<img width="47" height="47" alt="..." src="Img/carregamentoIcone.png" id="FotoCarreg-${valor}">
		</div>
		${input}
		<span class="input-group-btn" id="SpanCarreg-${valor}">
			<button class="btn btn-default" id="RemoveCarreg-${valor}" onclick="removerCarreg(this.id);">
				<span class="glyphicon-2linhas glyphicon-remove"></span>
			</button>
		</span>
	</div>`;
	$('#divCargas').append(dom);
}

///////////////////////////////////////////// PARTE DE INICIO DE CÁLCULOS ///////////////////////////

function canvasincial() {
	fabric.Image.fromURL('Img/viga I.png', function (oImg) {
		var widthcanvas = $('#canvas').width();
		var heightcanvas = $('#canvas').height();

		oImg.set({
			top: heightcanvas * 0.45,
			left: widthcanvas * 0.1,
			scaleX: widthcanvas * 0.0008,
			scaleY: widthcanvas * 0.0008,
			selectable: false
		})
		canvas.add(oImg);
	});

	canvas.renderAll();

	fabric.devicePixelRatio = 2;
}

function AvaliaCondicoesIniciaisDaViga() {
	var Valido = numApoios1Grau + numApoios2Grau + numApoios3Grau * 2;

	switch (true) {
		case (Valido >= 2):
			if (tamvig.length > 0) {
				console.log("Problema Válido")
				CalculaProblemaProposto()
				break;
			} else {
				console.log("Problema inVálido")
			}

		default:
			console.log("ERRADO")


	}
}

function DesenhaProblemaProposto() {


	//VARIAVEIS UTILIZADAS
	var ArrayZero = []; //VER, SE CONSIGO RETIRAR ESSA ARRAY.
	var ArrayDivViga = [0];
	var IndexParaGerarKGlobalDoTamanhoCerto = 0;
	var ArrayReduzidaForcasPos = [];
	var ArrayReduzidaForcasInt = [];
	ArrayForcasEMomentosAplicados = [];
	KGlobal = math.matrix();
	KGlobalOriginal = math.matrix();

	var imgObj = new Image();
	imgObj.src = 'Img/viga I.png';
	var imgObj2 = new Image();
	imgObj2.src = 'Img/P.png'


	var widthcanvas = $('#canvas').width();
	var heightcanvas = $('#canvas').height();
	var heightviga = imgObj.height * widthcanvas * 0.0008;
	var widthviga = imgObj.width * widthcanvas * 0.0008;

	tamvig = Number(document.getElementById("inputComprimentoViga").value);
	Array1GrauPos = [];
	Array2GrauPos = [];
	Array3GrauPos = [];
	ArrayForcaPos = [];
	ArrayForcaInt = [];
	ArrayMomenPos = [];
	ArrayMomenInt = [];
	ArrayCarrPosI = [];
	ArrayCarrPosF = [];
	ArrayCarrIntI = [];
	ArrayCarrIntF = [];



	//

	//FUNÇÕES INICIADAS
	preencheArrayEDesenhaApoios()
	preencheArrayEDesenhaForcas()
	FuncaoGeraArrayDeDivisoesReduzidas()
	FuncaoGeraArray()
	RepeticaoPreencheArray(ArrayDivVigaSemRepeticao)
	TransformaCarregamentosEmForcas(ArrayDivVigaSemRepeticao)
	DesenhaCotas()
	//

	function preencheArrayEDesenhaApoios() {

		if (numApoios1Grau != 0) {
			for (var i = 0; i < numApoios1Grau; i++) {

				var Posição1 = Number(document.getElementById("Entrada1Grau-" + (i + 1)).value);

				if (Posição1 != "") {
					Array1GrauPos.push(Number(Posição1));
				} else {
					Array1GrauPos.push(0);
				}
			}
		}

		if (numApoios2Grau != 0) {
			for (var j = 0; j < numApoios2Grau; j++) {

				var Posição2 = Number(document.getElementById("Entrada2Grau-" + (j + 1)).value);
				if (Posição2 != "") {
					Array2GrauPos.push(Number(Posição2));
					// console.log(Array2GrauPos[j])
				} else {
					Array2GrauPos.push(0);
					// console.log(Array2GrauPos[j])
				}
			}
		}

		if (numApoios3Grau != 0) {
			for (var k = 0; k < numApoios3Grau; k++) {

				var Posição3 = Number(document.getElementById("Entrada3Grau-" + (k + 1)).value);
				if (Posição3 != "") {
					Array3GrauPos.push(Number(Posição3));
				} else {
					Array3GrauPos.push(0);
				}
			}
		}


		for (var i = 0; i < numApoios1Grau; i++) {
			adicionaEmLoopRolete(i)
		}

		for (var j = 0; j < numApoios2Grau; j++) {
			adicionaEmLoop2Grau(j)
		}

		for (var k = 0; k < numApoios3Grau; k++) {
			adicionaEmLoopEngaste(k)
		}

		function adicionaEmLoopRolete(i) {

			fabric.Image.fromURL('Img/rolete.png', function (oImg1) {
				oImg1.scale(widthcanvas * 0.0007);

				oImg1.set({
					top: heightcanvas * 0.449 + heightviga,
					left: widthcanvas * 0.1 + Array1GrauPos[i] * widthviga / tamvig - (oImg1.width * widthcanvas * 0.0007 / 2),
					id: "myID",
					selectable: false
				})
				canvas.add(oImg1);
			});
		}

		function adicionaEmLoop2Grau(j) {

			fabric.Image.fromURL('Img/apoio 2.png', function (oImg2) {
				oImg2.scale(widthcanvas * 0.0008);

				oImg2.set({
					top: heightcanvas * 0.45 + heightviga - (oImg2.height * widthcanvas * 0.0008 / 2.4),
					left: widthcanvas * 0.105 + Array2GrauPos[j] * widthviga * 0.985 / tamvig - (oImg2.width * widthcanvas * 0.0008 / 2),
					id: "myID",
					selectable: false
				})
				canvas.add(oImg2);
			});
		}

		function adicionaEmLoopEngaste(k) {
			var coef = 0;
			if (Array3GrauPos[k] == 0) {
				var url = 'Img/engaste E.png'
			}
			if (Array3GrauPos[k] == tamvig) {
				var url = 'Img/engaste D.png'
			}
			if (Array3GrauPos[k] != tamvig && Array3GrauPos[k] != 0) {
				console.log("Engaste " + (k + 1) + " na Posição Errada! Ajustada para a Posição mais próxima.")

				if (Array3GrauPos[k] > tamvig / 2) {
					document.getElementById("Entrada3Grau-" + (k + 1)).value = tamvig;
					Array3GrauPos[k] = Number(tamvig);
					var url = 'Img/engaste D.png'
				}
				if (Array3GrauPos[k] <= tamvig / 2) {
					document.getElementById("Entrada3Grau-" + (k + 1)).value = 0;
					Array3GrauPos[k] = 0;
					var url = 'Img/engaste E.png'
				}
			}

			fabric.Image.fromURL(url, function (oImg3) {
				oImg3.scale(widthcanvas * 0.0008);
				oImg3.set({
					top: heightcanvas * 0.45 + heightviga / 2 - (oImg3.height * widthcanvas * 0.0008 / 2),
					left: widthcanvas * 0.086 + Array3GrauPos[k] * widthviga * 1.018 / tamvig - (oImg3.width * widthcanvas * 0.0008 / 2.59),
					id: "myID",
					selectable: false
				})
				canvas.add(oImg3);
			});
		}
	}

	function preencheArrayEDesenhaForcas() {

		if (numForcasAplic != 0) {
			for (var i = 0; i < numForcasAplic; i++) {
				var PosiçãoForca1 = Number(document.getElementById("EntradaPosiçãoForca-" + (i + 1)).value);
				var IntensidadeForca1 = Number(document.getElementById("EntradaIntensiForca-" + (i + 1)).value);
				if (PosiçãoForca1 != "") {
					ArrayForcaPos.push(Number(PosiçãoForca1));
					ArrayForcaInt.push(Number(IntensidadeForca1));

				} else {
					ArrayForcaPos.push(0);
					ArrayForcaInt.push(0);
				}
			}
		}


		if (numCarregAplic != 0) {
			for (var i = 0; i < numCarregAplic; i++) {
				var PosiçãoCarregamentoI = Number(document.getElementById("EntradaPosiçãoICarreg-" + (i + 1)).value);
				var PosiçãoCarregamentoF = Number(document.getElementById("EntradaPosiçãoFCarreg-" + (i + 1)).value);
				var IntensidadeCarregamentoI = Number(document.getElementById("EntradaIntensiICarreg-" + (i + 1)).value);
				var IntensidadeCarregamentoF = Number(document.getElementById("EntradaIntensiFCarreg-" + (i + 1)).value);

				ArrayCarrPosI.push(Number(PosiçãoCarregamentoI));
				ArrayCarrPosF.push(Number(PosiçãoCarregamentoF));
				ArrayCarrIntI.push(Number(IntensidadeCarregamentoI));
				ArrayCarrIntF.push(Number(IntensidadeCarregamentoF));

			}
		}

		if (numMomentAplic != 0) {
			for (var i = 0; i < numMomentAplic; i++) {
				var PosiçãoMomento1 = Number(document.getElementById("EntradaPosiçãoMoment-" + (i + 1)).value);
				var IntensidadeMomento1 = Number(document.getElementById("EntradaIntensiMoment-" + (i + 1)).value);
				if (PosiçãoMomento1 != "") {
					ArrayMomenPos.push(Number(PosiçãoMomento1));
					ArrayMomenInt.push(Number(IntensidadeMomento1));

				} else {
					ArrayMomenPos.push(0);
					ArrayMomenInt.push(0);
				}
			}
		}



		if (ArrayReduzidaForcasPos.length == 0) {

			ArrayReduzidaForcasPos.push(Number(ArrayForcaPos[0]));
			ArrayReduzidaForcasInt.push(Number(ArrayForcaInt[0]));
		}

		if (ArrayReduzidaForcasPos.length != 0) {
			GiroGeraReduzida()

		}

		function GiroGeraReduzida() {
			for (var i = 0; i < (ArrayForcaPos.length - 1); i++) {
				for (var j = 0; j < ArrayReduzidaForcasPos.length; j++) {

					if (ArrayForcaPos[(i + 1)] == ArrayReduzidaForcasPos[j]) {
						ArrayReduzidaForcasInt[j] = math.add(ArrayReduzidaForcasInt[j], ArrayForcaInt[(i + 1)])
						j = ArrayReduzidaForcasPos.length;
					}

					if (ArrayForcaPos[(i + 1)] != ArrayReduzidaForcasPos[j]) {
						if (ArrayReduzidaForcasPos.length == (j + 1)) {
							ArrayReduzidaForcasPos.push(ArrayForcaPos[(i + 1)])
							ArrayReduzidaForcasInt.push(ArrayForcaInt[(i + 1)])
							j = ArrayReduzidaForcasPos.length;
						}

					}
				}
			}
		}

		for (var i = 0; i < ArrayReduzidaForcasPos.length; i++) {
			adicionaEmLoopForca(i)
		}

		for (var j = 0; j < numCarregAplic; j++) {

			var distancia = ArrayCarrPosF[j] - ArrayCarrPosI[j];
			var quant = Math.ceil(distancia) + 1;
			var angulInt = ArrayCarrIntF[j] - ArrayCarrIntI[j]; ///VARIAVEL QUE FALA SE É TRIANGULAR OU NÃO
			var IntLabel = math.add(ArrayCarrIntI[j], (angulInt / distancia));  /// ESCREVE O VALOR QUE FICA SOBRE O CARREGAMENTO

			adicionaEmLoopCarreg(j)
		}

		for (var k = 0; k < numMomentAplic; k++) {
			adicionaEmLoopMomento(k)
		}


		function adicionaEmLoopForca(i) {

			fabric.Image.fromURL('Img/P.png', function (oImg4) {

				oImg4.scale(widthcanvas * 0.0007);

				oImg4.set({
					top: heightcanvas * 0.449 - (oImg4.height * widthcanvas * 0.0007),
					left: widthcanvas * 0.1 + ArrayReduzidaForcasPos[i] * widthviga / tamvig - (oImg4.width * widthcanvas * 0.0007 / 1.35),
					id: "myID",
					selectable: false
				})
				canvas.add(oImg4);


				var TextoFabricNoCanvas = new fabric.Text(ArrayReduzidaForcasInt[i] + "N", {
					top: heightcanvas * 0.449 - (oImg4.height * widthcanvas * 0.0007),
					left: widthcanvas * 0.1 + ArrayReduzidaForcasPos[i] * widthviga / tamvig - (oImg4.width * widthcanvas * 0.0007 / 2.8),
					fontSize: 18 * widthcanvas * 0.0017,
					hoverCursor: 'default',
					// fontFamily: 'Comic Sans',
					selectable: false
				});
				canvas.add(TextoFabricNoCanvas);
			});


		}


		function adicionaEmLoopCarreg(j) {
			for (var m = 0; m < quant; m++) {
				LoopInterno(m)
			}
			DesenhaLinhaEEscreveCarregamento()

			function DesenhaLinhaEEscreveCarregamento() {

				// var rect = new fabric.Rect({
				// 	left: widthcanvas*0.0995+(ArrayCarrPosI[j]*widthviga/tamvig),
				// 	top: heightcanvas*0.449-(imgObj2.height*widthcanvas*0.0007/1.35),
				// 	fill: 'black',
				// 	width: (distancia*widthviga/tamvig),
				// 	height: 2,
				// 	selectable: false
				// });
				// canvas.add(rect);

				var topDown = heightcanvas * 0.449;
				var left = widthcanvas * 0.0995 + (ArrayCarrPosI[j] * widthviga / tamvig);
				var top = heightcanvas * 0.449 - ((imgObj2.height * widthcanvas * 0.0007 / 1.35) * (ArrayCarrIntI[j] / ArrayCarrIntF[j]));
				var leftTo = widthcanvas * 0.0995 + (ArrayCarrPosI[j] * widthviga / tamvig) + (distancia * widthviga / tamvig);
				var topTo = heightcanvas * 0.449 - (imgObj2.height * widthcanvas * 0.0007 / 1.35);


				var line1 = new fabric.Line([left, topDown, left, top], {
					fill: 'black',
					stroke: 'black',
					strokeWidth: 2,
					selectable: false
				});
				canvas.add(line1);

				var line2 = new fabric.Line([left, top, leftTo, topTo], {
					fill: 'black',
					stroke: 'black',
					strokeWidth: 2,
					selectable: false
				});
				canvas.add(line2);

				var line3 = new fabric.Line([leftTo, topTo, leftTo, topDown], {
					fill: 'black',
					stroke: 'black',
					strokeWidth: 2,
					selectable: false
				});
				canvas.add(line3);

				// console.log("ENTROU PARA DESENHAR A COTA");
				var TextoFabricNoCanvas = new fabric.Text(IntLabel + "N/m", {
					top: heightcanvas * 0.449 - (imgObj2.height * widthcanvas * 0.0007),
					left: widthcanvas * 0.0995 + (ArrayCarrPosI[j] * widthviga / tamvig),
					fontSize: 18 * widthcanvas * 0.0017,
					hoverCursor: 'default',
					selectable: false
				});
				canvas.add(TextoFabricNoCanvas);
			}


			function LoopInterno(m) {
				fabric.Image.fromURL('Img/PCarr.png', function (oImg4) {
					oImg4.scale(widthcanvas * 0.0007);

					var topImagem = heightcanvas * 0.449 - (oImg4.height * widthcanvas * 0.0007);
					var leftImagem = widthcanvas * 0.1 + (ArrayCarrPosI[j] * widthviga / tamvig) + ((m * distancia / (quant - 1)) * widthviga / tamvig) - (oImg4.width * widthcanvas * 0.0007 / 1.35);

					var top = heightcanvas * 0.449 - ((imgObj2.height * widthcanvas * 0.0007 / 1.35) * (ArrayCarrIntI[j] / ArrayCarrIntF[j]));
					var topTo = heightcanvas * 0.449 - (imgObj2.height * widthcanvas * 0.0007 / 1.35);
					var left = widthcanvas * 0.0995 + (ArrayCarrPosI[j] * widthviga / tamvig);

					var topDown = heightcanvas * 0.449;
					var leftVetor = leftImagem + (oImg4.width * widthcanvas * 0.0007 / 1.35);
					var topVetor = top - (m / quant) * (top - topTo);

					var lineVetor = new fabric.Line([leftVetor, topVetor, leftVetor, topDown], {
						fill: 'black',
						stroke: 'black',
						strokeWidth: 2,
						selectable: false
					});
					canvas.add(lineVetor);

					oImg4.set({
						top: topImagem,
						left: leftImagem,
						id: "myID",
						selectable: false
					})
					canvas.add(oImg4);
				});
			}
		}


		function adicionaEmLoopMomento(k) {

			fabric.Image.fromURL('Img/momento SH canvas.png', function (oImg6) {
				oImg6.scale(widthcanvas * 0.0007);

				oImg6.set({
					top: heightcanvas * 0.449 - (oImg6.height * widthcanvas * 0.0007) / 2.5,
					left: widthcanvas * 0.1 + ArrayMomenPos[k] * widthviga / tamvig - (oImg6.width * widthcanvas * 0.0007 / 2.35),
					id: "myID",
					selectable: false
				})
				canvas.add(oImg6);


				var TextoFabricNoCanvas = new fabric.Text(ArrayMomenInt[k] + "N.m", {
					top: heightcanvas * 0.449 - (oImg6.height * widthcanvas * 0.0007) / 2.8,
					left: widthcanvas * 0.1 + ArrayMomenPos[k] * widthviga / tamvig - (oImg6.width * widthcanvas * 0.0007 / 2.8),
					fontSize: 18 * widthcanvas * 0.0017,
					hoverCursor: 'default',
					// fontFamily: 'Comic Sans',
					selectable: false
				});
				canvas.add(TextoFabricNoCanvas);
			});
		}

	}

	function FuncaoGeraArrayDeDivisoesReduzidas() {
		ArrayDivViga = ArrayZero.concat(0, Array1GrauPos, Array2GrauPos, Array3GrauPos, ArrayForcaPos, ArrayMomenPos, ArrayCarrPosI, ArrayCarrPosF, tamvig);

		function sortfunction(a, b) {
			return (a - b) //faz com que o array seja ordenado numericamente e de ordem crescente.
		}
		ArrayDivViga.sort(sortfunction);

		ArrayDivVigaSemRepeticao = [];
		$.each(ArrayDivViga, function (i, el) {
			if ($.inArray(el, ArrayDivVigaSemRepeticao) === -1) ArrayDivVigaSemRepeticao.push(el);
		});

		console.log("ArrayDivViga = " + ArrayDivViga);
		console.log("ArrayDivVigaSemRepeticao = " + ArrayDivVigaSemRepeticao);

	}



	///////////////////////////////// ESSAS 3 FUNÇÕES GERAM O VETOR COM AS FORÇAS E MOMENTOS APLICADOS NOS NÓS
	function FuncaoGeraArray() {  //ESSA FUNÇÃO, GERA A ArrayForcasEMomentosAplicados, QUE CONTÊM AS FORÇAS E MOMENTOS EQUIVALENTES DOS CARREGAMENTOS
		for (var i = 0; i < ((ArrayDivVigaSemRepeticao.length) * 2); i++) {
			ArrayForcasEMomentosAplicados[i] = 0;
		}
		console.log("O VETOR DE FORÇAS E MOMENTOS FINAL LIMPA É :" + ArrayForcasEMomentosAplicados);
	}

	function TransformaCarregamentosEmForcas(ArrayDivVigaSemRepeticao) {
		//ESSA FUNÇÃO, PEGA A ArrayForcasEMomentosAplicados, E SOMA AS FORÇAS E MOMENTOS EQUIVALENTES DOS CARREGAMENTOS
		var XInicial = 0;
		var XFinal = 0;
		var CInicialCarr = 0;
		var CFinalCarr = 0;
		var Wi = 0;
		var Wf = 0;
		var ForcaCarregTrecho = 0;
		var XBarraEsquerda = 0;
		var XBarraDireita = 0;
		var FNoEsquerda = 0;
		var FNoDireita = 0;

		if (numCarregAplic != 0) {
			for (var i = 0; i < ArrayCarrPosI.length; i++) {
				console.log("======================================================================================================")
				CInicialCarr = ArrayCarrPosI[i];
				console.log("INICIO DO CARREGAMENTO EM " + CInicialCarr)
				CFinalCarr = ArrayCarrPosF[i];
				console.log("FINAL DO CARREGAMENTO EM " + CFinalCarr)

				for (var j = 0; j < ArrayDivVigaSemRepeticao.length; j++) {
					XInicial = ArrayDivVigaSemRepeticao[j];
					console.log("X AVALIADO EM " + XInicial)
					if (Number(XInicial) >= Number(CInicialCarr)) {
						console.log("SE ENTROU AQUI, ENTÃO : " + XInicial + " É MAIOR OU IGUAL QUE " + CInicialCarr)
						if (Number(XInicial) < Number(CFinalCarr)) { //SE O TRECHO ANALISADO É O PROXIMO E NÃO SOFRE MAIS AÇAO DO CARREGAMENTO, PASSA A ANALISAR O PROXIMO CARREGAMENTO.
							console.log("SE ENTROU AQUI, ENTÃO : " + XInicial + " É MENOR OU IGUAL QUE " + CFinalCarr)
							XFinal = ArrayDivVigaSemRepeticao[j + 1];
							Wi = 0;
							Wf = 0;
							ForcaCarregTrech = 0;
							XBarraEsquerda = 0;
							XBarraDireita = 0;
							FNoEsquerda = 0;
							FNoDireita = 0;


							Wi = math.add(ArrayCarrIntI[i], (ArrayCarrIntF[i] - ArrayCarrIntI[i]) * (XInicial - CInicialCarr) / (CFinalCarr - CInicialCarr));
							Wf = math.add(ArrayCarrIntI[i], (ArrayCarrIntF[i] - ArrayCarrIntI[i]) * (XFinal - CInicialCarr) / (CFinalCarr - CInicialCarr));

							ForcaCarregTrecho = (math.add(Wi, Wf)) * (math.add(XFinal, -XInicial)) / 2;

							XBarraEsquerda = (math.add(XFinal, -XInicial)) * (math.add((Wi / 3), (2 * Wf / 3))) / (math.add(Wi, Wf));
							XBarraDireita = (XFinal - XInicial - XBarraEsquerda);

							FNoEsquerda = ForcaCarregTrecho * (XBarraDireita) / (XBarraDireita + XBarraEsquerda);
							FNoDireita = ForcaCarregTrecho * (XBarraEsquerda) / (XBarraDireita + XBarraEsquerda);

							ArrayForcasEMomentosAplicados[(2 * j)] = math.add(ArrayForcasEMomentosAplicados[(2 * j)], FNoEsquerda);
							ArrayForcasEMomentosAplicados[((2 * j) + 2)] = math.add(ArrayForcasEMomentosAplicados[((2 * j) + 2)], FNoDireita);

							ArrayForcasEMomentosAplicados[(2 * j) + 1] = math.add(ArrayForcasEMomentosAplicados[(2 * j) + 1], (ForcaCarregTrecho * XBarraEsquerda));
							ArrayForcasEMomentosAplicados[((2 * j) + 3)] = math.add(ArrayForcasEMomentosAplicados[((2 * j) + 3)], (ForcaCarregTrecho * XBarraDireita * (-1))); //O *(-1) É DEVIDO QUANDO A FORÇA DE CARREGAMENTO APLICADA É POSITIVA, O MOMENTO NA DIREITA É ANTI HORARIO.

							//console.log("O VETOR DE FORÇAS E MOMENTOS FINAL É :"+ArrayForcasEMomentosAplicados);
						}

					}
				}
			}

		}
		console.log("======================================================================================================")
	}

	function RepeticaoPreencheArray(ArrayDivVigaSemRepeticao) {
		//ESSA FUNÇÃO, PEGA A ArrayForcasEMomentosAplicados, E SOMA AS FORÇAS E MOMENTOS APLICADOS NOS NÓS

		if (numForcasAplic != 0 || numMomentAplic != 0) {

			for (var i = 0; i < ArrayDivVigaSemRepeticao.length; i++) {
				if (numForcasAplic != 0) {
					for (var j = 0; j < numForcasAplic; j++) {
						if (ArrayDivVigaSemRepeticao[i] == ArrayForcaPos[j]) {
							ArrayForcasEMomentosAplicados[(2 * i)] = math.add(ArrayForcasEMomentosAplicados[(2 * i)], ArrayForcaInt[j]);
						}
					}
				}

				if (numMomentAplic != 0) {
					for (var k = 0; k < numMomentAplic; k++) {
						if (ArrayDivVigaSemRepeticao[i] == ArrayMomenPos[k]) {
							ArrayForcasEMomentosAplicados[((2 * i) + 1)] = math.add(ArrayForcasEMomentosAplicados[(2 * i + 1)], ArrayMomenInt[k]);
						}
					}
				}
			}
		}
		///////////////////////////////////// NESSA FUNÇÃO, SAI A MATRIZ DE FORÇAS APLICADAS //////////////////
	}
	///////////////////////////////// ESSAS 3 FUNÇÕES GERAM O VETOR COM AS FORÇAS E MOMENTOS APLICADOS NOS NÓS


	function DesenhaCotas() {

		var PosiçãoUltimaCota = ArrayDivVigaSemRepeticao.length;
		var rect4 = new fabric.Rect({
			left: widthcanvas * 0.0995 + (ArrayDivVigaSemRepeticao[(PosiçãoUltimaCota - 1)] * widthviga / tamvig),
			top: heightcanvas * 0.759 - (0.02 * widthviga),
			fill: 'black',
			width: 1,
			height: (0.04 * widthviga),
			selectable: false
		}); //ESSE RECT DESENHA A ULTIMA COTA, QUE SEMPRE VAI SER NO FIM DA VIGA

		canvas.add(rect4);

		for (var j = 0; j < (ArrayDivVigaSemRepeticao.length - 1); j++) {
			DesenhaDivisoriaCotas()
			DesenhaLinhaCotas()
		}

		function DesenhaLinhaCotas() {
			var rect2 = new fabric.Rect({
				left: widthcanvas * 0.0995 + (ArrayDivVigaSemRepeticao[j] * widthviga / tamvig),
				top: heightcanvas * 0.759,
				fill: 'black',
				width: ((ArrayDivVigaSemRepeticao[(j + 1)] - ArrayDivVigaSemRepeticao[(j)]) * widthviga / tamvig),
				height: 1,
				selectable: false
			});
			// console.log("DESENHOU A LINHA");
			canvas.add(rect2);
		}

		function DesenhaDivisoriaCotas() {
			var rect3 = new fabric.Rect({
				left: widthcanvas * 0.0995 + (ArrayDivVigaSemRepeticao[j] * widthviga / tamvig),
				top: heightcanvas * 0.759 - (0.02 * widthviga),
				fill: 'black',
				width: 1,
				height: (0.04 * widthviga),
				selectable: false
			});
			canvas.add(rect3);

			// console.log("ENTROU PARA DESENHAR A COTA");
			var TamanhoTrecho = (ArrayDivVigaSemRepeticao[j + 1] - ArrayDivVigaSemRepeticao[j]);


			if (decimalPlaces(ArrayDivVigaSemRepeticao[j + 1]) > decimalPlaces(ArrayDivVigaSemRepeticao[j])) {
				var TamanhoTrechoArredondado = TamanhoTrecho.toFixed(decimalPlaces(ArrayDivVigaSemRepeticao[j + 1]));
			}
			if (decimalPlaces(ArrayDivVigaSemRepeticao[j + 1]) <= decimalPlaces(ArrayDivVigaSemRepeticao[j])) {
				var TamanhoTrechoArredondado = TamanhoTrecho.toFixed(decimalPlaces(ArrayDivVigaSemRepeticao[j]));
			}




			var TextoFabricNoCanvas = new fabric.Text(TamanhoTrechoArredondado + "m", {
				top: heightcanvas * 0.759 - (19 * widthcanvas * 0.0017),
				left: widthcanvas * 0.0995 + (ArrayDivVigaSemRepeticao[j] * widthviga / tamvig) + (TamanhoTrechoArredondado * widthviga * 0.45 / (tamvig)),
				fontSize: 18 * widthcanvas * 0.0017,
				hoverCursor: 'default',
				// fontFamily: 'Comic Sans',
				selectable: false
			});
			canvas.add(TextoFabricNoCanvas);
			// console.log("DESENHOU A COTA");
		}

	}

}

/*
API PARA RECEBER DADOS DO USUARIO E RETORNAR UM JSON CONTENDO OS RESULTADOS CALCULADOS
PARA CHAMAR A FUNÇÃO, BASTA DECLARAR UMA VARIAVEL CONTENDO UM OBJETO JSON E INSTERIR NA FUNCAO
function CalculaProblemaProposto(jsonDadosEntrada={
	apoios:{
		num1grau: [Posição1,Posição2,Posição3...],
		num2grau: [Posição1,Posição2,Posição3...],
		num3grau: [Posição1,Posição2],
	},
	esforcos:{
		esf1grau: [
			{posicao: Posição1, carga: Carga1},
			{posicao: Posição2, carga: Carga2},
			{posicao: Posição3, carga: Carga3},
			...
		],
		esf2grau: [
			{posicao: Posição1, carga: Carga1},
			{posicao: Posição2, carga: Carga2},
			{posicao: Posição3, carga: Carga3},
			...
		],
		esf3grau: [
			{posicaoInicial: Posição1Inicial, posicaoFinal: Posição1Final, cargaInicial: Carga1Inicial, cargaFinal: Carga1Final},
			{posicaoInicial: Posição2Inicial, posicaoFinal: Posição2Final, cargaInicial: Carga2Inicial, cargaFinal: Carga2Final},
			{posicaoInicial: Posição3Inicial, posicaoFinal: Posição3Final, cargaInicial: Carga3Inicial, cargaFinal: Carga3Final},
			...
		]
	},
	propriedades{
		comprimento: ComprimentoDaViga,
		inercia: ValorMomentodeInercia,
		elasticidade: valorModulodeElasticidade
	}
}){
RETURN JSON FILE
}

var BLABLABLA = CalculaProblemaProposto(jsonDadosEntrada);

*/
function CalculaProblemaProposto() {
	MatrizGlobal()
	RepeticaoZeraMatrizGlobal(ArrayDivVigaSemRepeticao)
	CalculaDeslocamentosInclinacoesEEsforcos()
	CalculaCoeficientes(ArrayDivVigaSemRepeticao)
	mostrarExplicacao(explicacao);
	PlotaGrafico()



	function MatrizGlobal() {

		//VARIAVEIS LOCAIS UTILIZADAS

		//

		//GERAÇÃO DA KLOCAL PARA FAZER A KGlobal
		var LTrech = 1;
		Elast = Number((document.getElementById("inputElasticidade").value) * 1000000000);
		Inerc = Number(document.getElementById("inputInercia").value);
		var tudoB = Elast * Inerc / (LTrech * LTrech * LTrech);
		var KLocal = [[12 * tudoB, 6 * tudoB * LTrech, -12 * tudoB, 6 * tudoB * LTrech],
		[6 * tudoB * LTrech, 4 * tudoB * LTrech * LTrech, -6 * tudoB * LTrech, 2 * tudoB * LTrech * LTrech],
		[-12 * tudoB, -6 * tudoB * LTrech, 12 * tudoB, -6 * tudoB * LTrech],
		[6 * tudoB * LTrech, 2 * tudoB * LTrech * LTrech, -6 * tudoB * LTrech, 4 * tudoB * LTrech * LTrech]]
			;
		//

		//GERA A KGlobal ZERADA
		IndexParaGerarKGlobalDoTamanhoCerto = ((2 * ArrayDivVigaSemRepeticao.length) - 1);
		KGlobal.subset(math.index(IndexParaGerarKGlobalDoTamanhoCerto, IndexParaGerarKGlobalDoTamanhoCerto), 0);
		//


		//ADICIONA VALORES NA KGlobal
		for (var l = 0; l < (ArrayDivVigaSemRepeticao.length - 1); l++) {
			LTrech = ArrayDivVigaSemRepeticao[(l + 1)] - ArrayDivVigaSemRepeticao[l];
			tudoB = Elast * Inerc / (LTrech * LTrech * LTrech);
			KLocal = [[12 * tudoB, 6 * tudoB * LTrech, -12 * tudoB, 6 * tudoB * LTrech],
			[6 * tudoB * LTrech, 4 * tudoB * LTrech * LTrech, -6 * tudoB * LTrech, 2 * tudoB * LTrech * LTrech],
			[-12 * tudoB, -6 * tudoB * LTrech, 12 * tudoB, -6 * tudoB * LTrech],
			[6 * tudoB * LTrech, 2 * tudoB * LTrech * LTrech, -6 * tudoB * LTrech, 4 * tudoB * LTrech * LTrech]]
				;

			for (var i = 0; i < 4; i++) {
				for (var j = 0; j < 4; j++) {
					var ValorK = math.subset(KGlobal, math.index((i + 2 * l), (j + 2 * l)));
					KGlobal.subset(math.index((i + 2 * l), (j + 2 * l)), (ValorK + KLocal[i][j]));
					KGlobalOriginal.subset(math.index((i + 2 * l), (j + 2 * l)), (ValorK + KLocal[i][j]));
				}
			}

		}
		//

		KGlobalModificada = undefined;
		KGlobalModificada = KGlobal; // KGlobalModificada COPIA A KGlobal
	}
	function RepeticaoZeraMatrizGlobal(ArrayDivVigaSemRepeticao) {
		//ESSA FUNÇÃO VAI ZERAR AS LINHAS E COLUNAS ONDE NÃO EXISTE DESLOCAMENTO VERTICAL E INCLINAÇÕES

		if (numApoios1Grau != 0 || numApoios2Grau != 0 || numApoios3Grau != 0) {
			console.log("numApoios1Grau = " + numApoios1Grau)
			console.log("numApoios2Grau = " + numApoios2Grau)
			for (var i = 0; i < ArrayDivVigaSemRepeticao.length; i++) {

				if (numApoios1Grau != 0) {
					for (var j = 0; j < numApoios1Grau; j++) {
						if (ArrayDivVigaSemRepeticao[i] == Array1GrauPos[j]) {
							for (var l = 0; l <= IndexParaGerarKGlobalDoTamanhoCerto; l++) {
								// var z = math.subset(KGlobalModificada, math.index(2*i, 2*i));
								KGlobalModificada.subset(math.index(2 * i, l), 0); //ESSA FUNÇÃO ZERA A LINHA
								// KGlobalModificada.subset(math.index(l,2*i), 0); //ESSA FUNÇÃO ZERA A COLUNA
								KGlobalModificada.subset(math.index(2 * i, 2 * i), 1); //ESSA FUNÇÃO CHAMA O VALOR DE 1
							}
						}
					}
				}

				if (numApoios2Grau != 0) {
					for (var k = 0; k < numApoios2Grau; k++) {
						if (ArrayDivVigaSemRepeticao[i] == Array2GrauPos[k]) {
							for (var l = 0; l <= IndexParaGerarKGlobalDoTamanhoCerto; l++) {
								// var z = math.subset(KGlobalModificada, math.index(2*i, 2*i));
								KGlobalModificada.subset(math.index(2 * i, l), 0); //ESSA FUNÇÃO ZERA A LINHA
								// KGlobalModificada.subset(math.index(l,2*i), 0); //ESSA FUNÇÃO ZERA A COLUNA
								KGlobalModificada.subset(math.index(2 * i, 2 * i), 1); //ESSA FUNÇÃO CHAMA O VALOR DE 1
							}
						}
					}
				}

				if (numApoios3Grau != 0) {
					for (var k = 0; k < numApoios3Grau; k++) {
						if (ArrayDivVigaSemRepeticao[i] == Array3GrauPos[k]) {
							for (var l = 0; l <= IndexParaGerarKGlobalDoTamanhoCerto; l++) {
								// var z = math.subset(KGlobalModificada, math.index(2*i, 2*i));
								// var y = math.subset(KGlobalModificada, math.index((2*i+1),(2*i+1)));
								KGlobalModificada.subset(math.index(2 * i, l), 0); //ESSA FUNÇÃO ZERA A LINHA
								// KGlobalModificada.subset(math.index(l,2*i), 0); //ESSA FUNÇÃO ZERA A COLUNA
								KGlobalModificada.subset(math.index(2 * i, 2 * i), 1); //ESSA FUNÇÃO CHAMA O VALOR DE 1

								KGlobalModificada.subset(math.index((2 * i + 1), l), 0); //ESSA FUNÇÃO ZERA A LINHA
								// KGlobalModificada.subset(math.index(l,(2*i+1)), 0); //ESSA FUNÇÃO ZERA A COLUNA
								KGlobalModificada.subset(math.index((2 * i + 1), (2 * i + 1)), 1); //ESSA FUNÇÃO CHAMA O VALOR DE 1
							}
						}
					}
				}

			}
		}
		console.log("KGlobalModificada  FINAL =  " + KGlobalModificada);
		console.log("ArrayForcasEMomentosAplicados  FINAL =  " + ArrayForcasEMomentosAplicados);

		//FAZER ESSAS CONTAS AO FIM DE TUDO.


	}
	function CalculaDeslocamentosInclinacoesEEsforcos() {
		ArrayDeDeslocamentosEInclinacoes = math.lusolve(KGlobalModificada, ArrayForcasEMomentosAplicados);
		ArrayEsforcosEReacoes = math.multiply(KGlobalOriginal, ArrayDeDeslocamentosEInclinacoes);
	}
	function CalculaCoeficientes(ArrayDivVigaSemRepeticao) {
		MatrizCoeficientesDasEquacoes = math.matrix();
		for (var l = 0; l < (ArrayDivVigaSemRepeticao.length - 1); l++) {
			var LTrech = 1;
			LTrech = ArrayDivVigaSemRepeticao[(l + 1)] - ArrayDivVigaSemRepeticao[l];
			var MatrizValoresA = [[1, 0, 0, 0],
			[0, 1, 0, 0],
			[1, LTrech, LTrech * LTrech, LTrech * LTrech * LTrech],
			[0, 1, 2 * LTrech, 3 * LTrech * LTrech]]
				;
			var MatrizLocalDeDeslocamentosEInclinações = [];
			MatrizLocalDeDeslocamentosEInclinações = [[math.subset(ArrayDeDeslocamentosEInclinacoes, math.index((2 * l), 0))], [math.subset(ArrayDeDeslocamentosEInclinacoes, math.index((2 * l + 1), 0))], [math.subset(ArrayDeDeslocamentosEInclinacoes, math.index((2 * l + 2), 0))], [math.subset(ArrayDeDeslocamentosEInclinacoes, math.index((2 * l + 3), 0))]]
			var ArrayLocalDeCoeficientesParaGerarEquacoes = math.matrix();
			ArrayLocalDeCoeficientesParaGerarEquacoes = math.lusolve(MatrizValoresA, MatrizLocalDeDeslocamentosEInclinações);

			for (var j = 0; j < 4; j++) {
				var valorDeGirodoFor = math.subset(ArrayLocalDeCoeficientesParaGerarEquacoes, math.index(j, 0));
				MatrizCoeficientesDasEquacoes.subset(math.index(l, j), valorDeGirodoFor);
			}
		}
	}
	function mostrarExplicacao(explicacao) {
		//
		// console.log("KGlobalModificada  = "+KGlobalModificada)
		// console.log("IndexParaGerarKGlobalDoTamanhoCerto  = "+IndexParaGerarKGlobalDoTamanhoCerto)
		explicacao += ("<div style='display: inline-flex;width: 100%;margin-top: 20px;'><div style='width: 100%;'><center><b style='font-size: large;'>A MATRIZ GLOBAL ORIGINAL ABAIXO: </b></center></div><button class='btn btn-default btn-zoom-up'><span class='glyphicon glyphicon-plus'></span></button><button class='btn btn-default btn-zoom-down'><span class='glyphicon glyphicon-minus'></span></button></div>")
		explicacao += ("<div style='border: 1px solid #ccc;margin-top: 5px;overflow: auto;' id='matriz1'> $$  \K_g = \\begin{bmatrix} ")
		for (var i = 0; i <= IndexParaGerarKGlobalDoTamanhoCerto; i++) {
			for (var j = 0; j <= IndexParaGerarKGlobalDoTamanhoCerto; j++) {
				explicacao += math.subset(KGlobalOriginal, math.index(i, j));
				if (j != (IndexParaGerarKGlobalDoTamanhoCerto)) {
					explicacao += (" & ")
				}
			}
			explicacao += (" \\\\ ")
		}
		explicacao += ("\\end{bmatrix} $$ </div>")

		explicacao += ("<div style='display: inline-flex;width: 100%;margin-top: 20px;'><div style='width: 100%;'><center><b style='font-size: large;'>A MATRIZ GLOBAL ABAIXO (CASO 1 E CASO 2): </b></center></div><button class='btn btn-default btn-zoom-up'><span class='glyphicon glyphicon-plus'></span></button><button class='btn btn-default btn-zoom-down'><span class='glyphicon glyphicon-minus'></span></button></div>")
		explicacao += ("<div style='border: 1px solid #ccc;margin-top: 5px;overflow: auto;' id='matriz2'> $$  \K_g = \\begin{bmatrix} ")
		for (var i = 0; i <= IndexParaGerarKGlobalDoTamanhoCerto; i++) {
			for (var j = 0; j <= IndexParaGerarKGlobalDoTamanhoCerto; j++) {
				explicacao += math.subset(KGlobalModificada, math.index(i, j));
				if (j != (IndexParaGerarKGlobalDoTamanhoCerto)) {
					explicacao += (" & ")
				}
			}
			explicacao += (" \\\\ ")
		}
		explicacao += ("\\end{bmatrix} $$ </div>")

		explicacao += ("<div style='display: inline-flex;width: 100%;margin-top: 20px;'><div style='width: 100%;'><center><b style='font-size: large;'>A MATRIZ DAS FORÇAS ABAIXO: </b></center></div><button class='btn btn-default btn-zoom-up'><span class='glyphicon glyphicon-plus'></span></button><button class='btn btn-default btn-zoom-down'><span class='glyphicon glyphicon-minus'></span></button></div>")
		explicacao += ("<div style='border: 1px solid #ccc;margin-top: 5px;overflow: auto;' id='matriz3'> $$  \F = \\begin{bmatrix} ")
		for (var i = 0; i < ArrayForcasEMomentosAplicados.length; i++) {
			explicacao += ArrayForcasEMomentosAplicados[i];
			if (j != (ArrayForcasEMomentosAplicados.length)) {
				explicacao += (" & ")
			}
			explicacao += (" \\\\ ")
		}
		explicacao += ("\\end{bmatrix} $$ </div>")

		explicacao += ("<div style='display: inline-flex;width: 100%;margin-top: 20px;'><div style='width: 100%;'><center><b style='font-size: large;'>A MATRIZ DE DESLOCAMENTOS E INCLINAÇÕES ABAIXO: </b></center></div><button class='btn btn-default btn-zoom-up'><span class='glyphicon glyphicon-plus'></span></button><button class='btn btn-default btn-zoom-down'><span class='glyphicon glyphicon-minus'></span></button></div>")
		explicacao += ("<div style='border: 1px solid #ccc;margin-top: 5px;overflow: auto;' id='matriz4'> $$  \X = \\begin{bmatrix} ")
		for (var i = 0; i < ArrayForcasEMomentosAplicados.length; i++) {
			explicacao += math.subset(ArrayDeDeslocamentosEInclinacoes, math.index(i, 0));
			if (j != (ArrayForcasEMomentosAplicados.length)) {
				explicacao += (" & ")
			}
			explicacao += (" \\\\ ")
		}
		explicacao += ("\\end{bmatrix} $$ </div>")


		explicacao += ("<div style='border: 1px solid #ccc;margin-top: 5px;overflow: auto;' id='matriz5'> $$  \R = \\begin{bmatrix} ")
		for (var i = 0; i < ArrayForcasEMomentosAplicados.length; i++) {
			explicacao += math.subset(ArrayEsforcosEReacoes, math.index(i, 0));
			if (j != (ArrayForcasEMomentosAplicados.length)) {
				explicacao += (" & ")
			}
			explicacao += (" \\\\ ")
		}
		explicacao += ("\\end{bmatrix} $$ </div>")


		explicacao += ("<div style='display: inline-flex;width: 100%;margin-top: 20px;'><div style='width: 100%;'><center><b style='font-size: large;'>A MATRIZ DE COEFICIENTES C ABAIXO: </b></center></div><button class='btn btn-default btn-zoom-up'><span class='glyphicon glyphicon-plus'></span></button><button class='btn btn-default btn-zoom-down'><span class='glyphicon glyphicon-minus'></span></button></div>")
		explicacao += ("<div style='border: 1px solid #ccc;margin-top: 5px;overflow: auto;' id='matriz6'> $$  \C = \\begin{bmatrix} ")
		for (var i = 0; i < (ArrayDivVigaSemRepeticao.length - 1); i++) {
			for (var j = 0; j < 4; j++) {
				explicacao += math.subset(MatrizCoeficientesDasEquacoes, math.index(i, j));
				if (j != (IndexParaGerarKGlobalDoTamanhoCerto)) {
					explicacao += (" & ")
				}
			}
			explicacao += (" \\\\ ")
		}
		explicacao += ("\\end{bmatrix} $$ </div>")


		var divExplicacao = document.getElementById("texto-explicacao");
		divExplicacao.innerHTML = "<h4 style='text-align: center'> ";
		divExplicacao.innerHTML += explicacao;
		divExplicacao.innerHTML += "</h4>";

		MathJax.Hub.Config({
			CommonHTML: { linebreaks: { width: "93vw" } },
			"HTML-CSS": { linebreaks: { width: "93vw" } },
			SVG: { linebreaks: { width: "93vw" } }
		});
		MathJax.Hub.Queue(
			["setRenderer", MathJax.Hub, "SVG"],
			["Typeset", MathJax.Hub]
		);

		// console.log("Elast  = "+Elast+" & Inerc = "+Inerc)
	}
	function PlotaGrafico() {

		$(function () {
			$(document).ready(function () {
				Highcharts.setOptions({
					global: {
						useUTC: false
					}
				});

				var chart;
				$('#container').highcharts({
					chart: {
						type: 'area',
						animation: Highcharts.svg, // don't animate in old IE
						marginRight: 10,

					},
					title: {
						text: "Gráfico de v(x)"
					},
					xAxis: {
						type: 'X da viga',
						tickPixelInterval: 150
					},
					yAxis: {
						title: {
							text: 'Deslocamento em y'
						},
						plotLines: [{
							value: 0,
							width: 1,
							color: '#808080'
						}]
					},
					tooltip: {
						formatter: function () {
							// return '<b>' + Highcharts.NumberFormat(this.y, 6) + "  (" + Highcharts.NumberFormat(this.x, 6) + ")  ";
							return '<b>' + this.y + "m  (" + this.x + ")  ";
						}
					},
					legend: {
						enabled: false
					},
					exporting: {
						enabled: true
					},
					series: [{
						name: 'Random data',
						data: (function () {
							// generate an array of random data
							var data = [],
								//time = (new Date()).getTime(),
								i;

							// for (var j = 0; j < 3; j++) {
							//   for (i = 0; i <= 40; i++) {
							//       data.push({
							//           x: i*0.1,
							//           y: 2
							//       });
							//   }
							// }
							var valorDaDivisão = 100;
							if (tamvig >= 10) {
								var valorDaDivisão = (1000 / tamvig) - 1;
							}
							for (var j = 0; j < ArrayDivVigaSemRepeticao.length - 1; j++) {
								// console.log("L INICIAL do trecho  '"+j+"' ============"+ArrayDivVigaSemRepeticao[j])*valorDaDivisão)
								// console.log("L FINAL do trecho  '"+j+"' ============"+ArrayDivVigaSemRepeticao[(j+1)])*valorDaDivisão)
								var Linicial = (ArrayDivVigaSemRepeticao[j]) * valorDaDivisão;
								var LFinal = (ArrayDivVigaSemRepeticao[(j + 1)]) * valorDaDivisão;
								for (i = Linicial; i <= LFinal; i++) {
									data.push({
										x: i / valorDaDivisão,
										y: -(MatrizCoeficientesDasEquacoes._data[j][0] + MatrizCoeficientesDasEquacoes._data[j][1] * (i - Linicial) / valorDaDivisão + MatrizCoeficientesDasEquacoes._data[j][2] * (i - Linicial) * (i - Linicial) / (valorDaDivisão * valorDaDivisão) + MatrizCoeficientesDasEquacoes._data[j][3] * (i - Linicial) * (i - Linicial) * (i - Linicial) / (valorDaDivisão * valorDaDivisão * valorDaDivisão))
									});
								}
							}
							return data;
						})()
					}]
				});
			});

		});

		$(function () {
			$(document).ready(function () {
				Highcharts.setOptions({
					global: {
						useUTC: false
					}
				});

				var chart;
				$('#container2').highcharts({
					chart: {
						type: 'area',
						animation: Highcharts.svg, // don't animate in old IE
						marginRight: 10,

					},
					title: {
						text: "Gráfico de v'(x)"
					},
					xAxis: {
						type: 'X da viga',
						tickPixelInterval: 150
					},
					yAxis: {
						title: {
							text: 'Inclinação (Tangente)'
						},
						plotLines: [{
							value: 0,
							width: 1,
							color: '#808080'
						}]
					},
					tooltip: {
						formatter: function () {
							// return '<b>' + Highcharts.NumberFormat(this.y, 6) + "  (" + Highcharts.NumberFormat(this.x, 6) + ")  ";
							return '<b>' + this.y + "  (" + this.x + ")  ";
						}
					},
					legend: {
						enabled: false
					},
					exporting: {
						enabled: true
					},
					series: [{
						name: 'Random data',
						data: (function () {
							// generate an array of random data
							var data = [],
								//time = (new Date()).getTime(),
								i;

							// for (var j = 0; j < 3; j++) {
							//   for (i = 0; i <= 40; i++) {
							//       data.push({
							//           x: i*0.1,
							//           y: 2
							//       });
							//   }
							// }
							var valorDaDivisão = 100;
							if (tamvig >= 10) {
								var valorDaDivisão = (1000 / tamvig) - 1;
							}
							for (var j = 0; j < ArrayDivVigaSemRepeticao.length - 1; j++) {
								var Linicial = (ArrayDivVigaSemRepeticao[j]) * valorDaDivisão;
								var LFinal = (ArrayDivVigaSemRepeticao[(j + 1)]) * valorDaDivisão;
								for (i = (ArrayDivVigaSemRepeticao[j]) * valorDaDivisão; i <= (ArrayDivVigaSemRepeticao[(j + 1)]) * valorDaDivisão; i++) {
									data.push({
										x: i / valorDaDivisão,
										y: -(MatrizCoeficientesDasEquacoes._data[j][1] + MatrizCoeficientesDasEquacoes._data[j][2] * (i - Linicial) * 2 / (valorDaDivisão) + MatrizCoeficientesDasEquacoes._data[j][3] * (i - Linicial) * (i - Linicial) * 3 / (valorDaDivisão * valorDaDivisão))
									});
								}
							}
							return data;
						})()
					}]
				});
			});

		});

		$(function () {
			$(document).ready(function () {
				Highcharts.setOptions({
					global: {
						useUTC: false
					}
				});

				var chart;
				$('#container3').highcharts({
					chart: {
						type: 'area',
						animation: Highcharts.svg, // don't animate in old IE
						marginRight: 10,

					},
					title: {
						text: "Gráfico de v''(x)"
					},
					xAxis: {
						type: 'X da viga',
						tickPixelInterval: 150
					},
					yAxis: {
						title: {
							text: 'Momento Fletor'
						},
						plotLines: [{
							value: 0,
							width: 1,
							color: '#808080'
						}]
					},
					tooltip: {
						formatter: function () {
							//// return '<b>' + Highcharts.NumberFormat(this.y, 6) + "  (" + Highcharts.NumberFormat(this.x, 6) + ")  ";
							return '<b>' + this.y + "N.m  (" + this.x + ")  ";
						}
					},
					legend: {
						enabled: false
					},
					exporting: {
						enabled: true
					},
					series: [{
						name: 'Random data',
						data: (function () {
							// generate an array of random data
							var data = [],
								//time = (new Date()).getTime(),
								i;

							// for (var j = 0; j < 3; j++) {
							//   for (i = 0; i <= 40; i++) {
							//       data.push({
							//           x: i*0.1,
							//           y: 2
							//       });
							//   }
							// }
							var valorDaDivisão = 100;
							if (tamvig >= 10) {
								var valorDaDivisão = (1000 / tamvig) - 1;
							}
							for (var j = 0; j < ArrayDivVigaSemRepeticao.length - 1; j++) {
								var Linicial = (ArrayDivVigaSemRepeticao[j]) * valorDaDivisão;
								var LFinal = (ArrayDivVigaSemRepeticao[(j + 1)]) * valorDaDivisão;
								for (i = (ArrayDivVigaSemRepeticao[j]) * valorDaDivisão; i <= (ArrayDivVigaSemRepeticao[(j + 1)]) * valorDaDivisão; i++) {
									data.push({
										x: i / valorDaDivisão,
										y: -Elast * Inerc * (MatrizCoeficientesDasEquacoes._data[j][2] * 2 + MatrizCoeficientesDasEquacoes._data[j][3] * (i - Linicial) * 2 * 3 / (valorDaDivisão))
									});
								}
							}
							return data;
						})()
					}]
				});
			});

		});

		$(function () {
			$(document).ready(function () {
				Highcharts.setOptions({
					global: {
						useUTC: false
					}
				});

				var chart;
				$('#container4').highcharts({
					chart: {
						type: 'area',
						animation: Highcharts.svg, // don't animate in old IE
						marginRight: 10,

					},
					title: {
						text: "Gráfico de v'''(x)"
					},
					xAxis: {
						type: 'X da viga',
						tickPixelInterval: 150
					},
					yAxis: {
						title: {
							text: 'Esforço Cortante'
						},
						plotLines: [{
							value: 0,
							width: 1,
							color: '#808080'
						}]
					},
					tooltip: {
						formatter: function () {
							// return '<b>' + Highcharts.NumberFormat(this.y, 6) + "  (" + Highcharts.NumberFormat(this.x, 6) + ")  ";
							return '<b>' + this.y + "N  (" + this.x + ")  ";
						}
					},
					legend: {
						enabled: false
					},
					exporting: {
						enabled: true
					},
					series: [{
						name: 'Random data',
						data: (function () {
							// generate an array of random data
							var data = [],
								//time = (new Date()).getTime(),
								i;

							// for (var j = 0; j < 3; j++) {
							//   for (i = 0; i <= 40; i++) {
							//       data.push({
							//           x: i*0.1,
							//           y: 2
							//       });
							//   }
							// }
							var valorDaDivisão = 100;
							if (tamvig >= 10) {
								var valorDaDivisão = (1000 / tamvig) - 1;
							}
							for (var j = 0; j < ArrayDivVigaSemRepeticao.length - 1; j++) {
								var Linicial = (ArrayDivVigaSemRepeticao[j]) * valorDaDivisão;
								var LFinal = (ArrayDivVigaSemRepeticao[(j + 1)]) * valorDaDivisão;
								for (i = (ArrayDivVigaSemRepeticao[j]) * valorDaDivisão; i <= (ArrayDivVigaSemRepeticao[(j + 1)]) * valorDaDivisão; i++) {
									data.push({
										x: i / valorDaDivisão,
										y: -Elast * Inerc * (MatrizCoeficientesDasEquacoes._data[j][3] * 2 * 3)
									});
								}
							}
							return data;
						})()
					}]
				});
			});

		});

	}
}

$(".btn-zoom-up").on("click", function () {
	var idSelecionado = $(this).parent().next().attr("id");
	zoomUp(idSelecionado)
});
$(".btn-zoom-down").on("click", function () {
	var idSelecionado = $(this).parent().next().attr("id");
	zoomDown(idSelecionado)
});
$("#materiaisSugeridos").children().children().on("click", function () {
	var materialClicado = $(this).attr("value");
	insereValor(materialClicado)
});

function insereValor(valor) {
	$("#inputElasticidade").val(valor);
}
function zoomDown(idSelecionado) {
	var boxWidth = $("#" + idSelecionado).children(".MathJax_SVG_Display").children("span").children("svg").css("max-width");
	if (boxWidth == "none") {
		$("#" + idSelecionado).children(".MathJax_SVG_Display").children("span").children("svg").css("max-width", "88vw")
	}
}
function zoomUp(idSelecionado) {
	var boxWidth = $("#" + idSelecionado).children(".MathJax_SVG_Display").children("span").children("svg").css("max-width");
	if (boxWidth != "none") {
		$("#" + idSelecionado).children(".MathJax_SVG_Display").children("span").children("svg").css("max-width", "none")
	}
}