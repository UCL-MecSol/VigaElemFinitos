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
  var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) { return 0; }
  return Math.max(
       0,
       // Number of digits right of decimal point.
       (match[1] ? match[1].length : 0)
       // Adjust for scientific notation.
       - (match[2] ? +match[2] : 0));
}

function LimpaCanvas(){
	canvas.clear();
}

function LimpaApoios(){

	numApoios1Grau=0;
	numApoios2Grau=0;
	numApoios3Grau=0;
	Array1GrauPos = [];
	Array2GrauPos = [];
	Array3GrauPos = [];


	numApoios=0;
	$("#divApoios").empty();
}

function LimpaCargas(){

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
	numEsforc=0;
	$("#divCargas").empty();

}


function addPrimGrau(){
	numApoios1Grau++;
	numApoios++;

	var FuncaoJqueryAdd = $(document.createElement("div")).attr("class","input-group").attr("id", "inputGroup1Grau-"+numApoios1Grau).appendTo("#divApoios");
								$(document.createElement("div")).attr("class","input-group-addon").attr("id", "inputGroupAdd1Grau-"+numApoios1Grau).appendTo("#inputGroup1Grau-"+numApoios1Grau);
									$(document.createElement("img")).attr("width","47").attr("height","19").attr("alt","...").attr("src","http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/Img/rolete.png").attr("id","Foto1Grau-"+numApoios1Grau).appendTo("#inputGroupAdd1Grau-"+numApoios1Grau);
								$(document.createElement("input")).attr("id","Entrada1Grau-"+numApoios1Grau).attr("class","form-control block-geral").attr("type","Number").attr("placeholder","Posicao do Apoio").appendTo("#inputGroup1Grau-"+numApoios1Grau);
								$(document.createElement("span")).attr("class","input-group-btn").attr("id", "Span1Grau-"+numApoios1Grau).appendTo("#inputGroup1Grau-"+numApoios1Grau);
									$(document.createElement("button")).attr("class","btn btn-default").attr("onclick","removerPrimGrau(this.id);").attr("id","Remove1Grau-"+numApoios1Grau).appendTo("#Span1Grau-"+numApoios1Grau);
										$(document.createElement("span")).attr("class","glyphicon glyphicon-remove").attr("id",numApoios1Grau).appendTo("#Remove1Grau-"+numApoios1Grau);
}

function removerPrimGrau(valor){
	var IDindexRemover = $("#"+valor).closest("div").attr('id'); //RECEBE A ID DA DIV QUE CONTEM OS APOIOS
	var stringLength = IDindexRemover.length; // CALCULA TAMANHO DO ID PARA USAR NA FUNÇÃO ABAIXO
	var lastChar = IDindexRemover.charAt(stringLength - 1); //REMOVE TODOS OS CARACTERES MENOSO ULTIMO

	$("#"+IDindexRemover).remove(); //REMOVE A DIV ESPECIFICADA

	for(i = lastChar; i<=numApoios1Grau; i++){
		$("#inputGroup1Grau-"+(i)).attr("id", "inputGroup1Grau-"+(i-1));
		$("#inputGroupAdd1Grau-"+(i)).attr("id", "inputGroupAdd1Grau-"+(i-1));
		$("#Foto1Grau-"+(i)).attr("id", "Foto1Grau-"+(i-1));
		$("#Entrada1Grau-"+(i)).attr("id", "Entrada1Grau-"+(i-1));
		$("#Span1Grau-"+(i)).attr("id", "Span1Grau-"+(i-1));
		$("#Remove1Grau-"+(i)).attr("id", "Remove1Grau-"+(i-1));
		$("#"+(i)).attr("id",(i-1));
	}
	numApoios1Grau = numApoios1Grau -1;
	numApoios = numApoios -1;
}

function addSeguGrau(){
	numApoios2Grau++;
	numApoios++;

	var FuncaoJqueryAdd = $(document.createElement("div")).attr("class","input-group").attr("id", "inputGroup2Grau-"+numApoios2Grau).appendTo("#divApoios");
								$(document.createElement("div")).attr("class","input-group-addon").attr("id", "inputGroupAdd2Grau-"+numApoios2Grau).appendTo("#inputGroup2Grau-"+numApoios2Grau);
									$(document.createElement("img")).attr("width","47").attr("height","19").attr("alt","...").attr("src","https://raw.rawgitusercontent.com/UCL-MecSol/VigaElemFinitos/master/Img/apoio%202.png").attr("id","Foto2Grau-"+numApoios2Grau).appendTo("#inputGroupAdd2Grau-"+numApoios2Grau);
								$(document.createElement("input")).attr("id","Entrada2Grau-"+numApoios2Grau).attr("class","form-control block-geral").attr("type","Number").attr("placeholder","Posicao do Apoio").appendTo("#inputGroup2Grau-"+numApoios2Grau);
								$(document.createElement("span")).attr("class","input-group-btn").attr("id", "Span2Grau-"+numApoios2Grau).appendTo("#inputGroup2Grau-"+numApoios2Grau);
									$(document.createElement("button")).attr("class","btn btn-default").attr("onclick","removerSeguGrau(this.id);").attr("id","Remove2Grau-"+numApoios2Grau).appendTo("#Span2Grau-"+numApoios2Grau);
										$(document.createElement("span")).attr("class","glyphicon glyphicon-remove").attr("id",numApoios2Grau).appendTo("#Remove2Grau-"+numApoios2Grau);
}

function removerSeguGrau(valor){
	var IDindexRemover = $("#"+valor).closest("div").attr('id'); //RECEBE A ID DA DIV QUE CONTEM OS APOIOS
	var stringLength = IDindexRemover.length; // CALCULA TAMANHO DO ID PARA USAR NA FUNÇÃO ABAIXO
	var lastChar = IDindexRemover.charAt(stringLength - 1); //REMOVE TODOS OS CARACTERES MENOSO ULTIMO

	$("#"+IDindexRemover).remove(); //REMOVE A DIV ESPECIFICADA

	for(i = lastChar; i<=numApoios2Grau; i++){
		$("#inputGroup2Grau-"+(i)).attr("id", "inputGroup2Grau-"+(i-1));
		$("#inputGroupAdd2Grau-"+(i)).attr("id", "inputGroupAdd2Grau-"+(i-1));
		$("#Foto2Grau-"+(i)).attr("id", "Foto2Grau-"+(i-1));
		$("#Entrada2Grau-"+(i)).attr("id", "Entrada2Grau-"+(i-1));
		$("#Span2Grau-"+(i)).attr("id", "Span2Grau-"+(i-1));
		$("#Remove2Grau-"+(i)).attr("id", "Remove2Grau-"+(i-1));
		$("#"+(i)).attr("id",(i-1));
	}
	numApoios2Grau = numApoios2Grau -1;
	numApoios = numApoios -1;
}

function addTercGrau(){

	if (numApoios3Grau < 2) {

		numApoios3Grau++;
		numApoios++;

			var FuncaoJqueryAdd = $(document.createElement("div")).attr("class","input-group").attr("id", "inputGroup3Grau-"+numApoios3Grau).appendTo("#divApoios");
										$(document.createElement("div")).attr("class","input-group-addon").attr("id", "inputGroupAdd3Grau-"+numApoios3Grau).appendTo("#inputGroup3Grau-"+numApoios3Grau);
											$(document.createElement("img")).attr("width","47").attr("height","19").attr("alt","...").attr("src","http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/Img/engasteIconeSmall.png").attr("id","Foto3Grau-"+numApoios3Grau).appendTo("#inputGroupAdd3Grau-"+numApoios3Grau);
										$(document.createElement("input")).attr("id","Entrada3Grau-"+numApoios3Grau).attr("class","form-control block-geral").attr("type","Number").attr("placeholder","Posicao do Apoio").appendTo("#inputGroup3Grau-"+numApoios3Grau);
										$(document.createElement("span")).attr("class","input-group-btn").attr("id", "Span3Grau-"+numApoios3Grau).appendTo("#inputGroup3Grau-"+numApoios3Grau);
											$(document.createElement("button")).attr("class","btn btn-default").attr("onclick","removerTercGrau(this.id);").attr("id","Remove3Grau-"+numApoios3Grau).appendTo("#Span3Grau-"+numApoios3Grau);
												$(document.createElement("span")).attr("class","glyphicon glyphicon-remove").attr("id",numApoios3Grau).appendTo("#Remove3Grau-"+numApoios3Grau);
	} else if (numApoios3Grau == 1) {
		numApoios3Grau++;
		numApoios++;

			var FuncaoJqueryAdd = $(document.createElement("div")).attr("class","input-group").attr("id", "inputGroup3Grau-"+numApoios3Grau).appendTo("#divApoios");
										$(document.createElement("div")).attr("class","input-group-addon").attr("id", "inputGroupAdd3Grau-"+numApoios3Grau).appendTo("#inputGroup3Grau-"+numApoios3Grau);
											$(document.createElement("img")).attr("width","47").attr("height","19").attr("alt","...").attr("src","http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/Img/engasteIconeSmall.png").attr("id","Foto3Grau-"+numApoios3Grau).appendTo("#inputGroupAdd3Grau-"+numApoios3Grau);
										$(document.createElement("input")).attr("id","Entrada3Grau-"+numApoios3Grau).attr("class","form-control block-geral").attr("type","Number").attr("placeholder","Posicao do Apoio").appendTo("#inputGroup3Grau-"+numApoios3Grau);
										$(document.createElement("span")).attr("class","input-group-btn").attr("id", "Span3Grau-"+numApoios3Grau).appendTo("#inputGroup3Grau-"+numApoios3Grau);
											$(document.createElement("button")).attr("class","btn btn-default").attr("onclick","removerTercGrau(this.id);").attr("id","Remove3Grau-"+numApoios3Grau).appendTo("#Span3Grau-"+numApoios3Grau);
												$(document.createElement("span")).attr("class","glyphicon glyphicon-remove").attr("id",numApoios3Grau).appendTo("#Remove3Grau-"+numApoios3Grau);

	} else {
		window.alert("Uma viga só pode ter no maximo dois engastes! Um no Inicio, e um no Fim!")
	}


}

function removerTercGrau(valor){
	var IDindexRemover = $("#"+valor).closest("div").attr('id'); //RECEBE A ID DA DIV QUE CONTEM OS APOIOS
	var stringLength = IDindexRemover.length; // CALCULA TAMANHO DO ID PARA USAR NA FUNÇÃO ABAIXO
	var lastChar = IDindexRemover.charAt(stringLength - 1); //REMOVE TODOS OS CARACTERES MENOSO ULTIMO

	$("#"+IDindexRemover).remove(); //REMOVE A DIV ESPECIFICADA

	for(i = lastChar; i<=numApoios3Grau; i++){
		$("#inputGroup3Grau-"+(i)).attr("id", "inputGroup3Grau-"+(i-1));
		$("#inputGroupAdd3Grau-"+(i)).attr("id", "inputGroupAdd3Grau-"+(i-1));
		$("#Foto3Grau-"+(i)).attr("id", "Foto3Grau-"+(i-1));
		$("#Entrada3Grau-"+(i)).attr("id", "Entrada3Grau-"+(i-1));
		$("#Span3Grau-"+(i)).attr("id", "Span3Grau-"+(i-1));
		$("#Remove3Grau-"+(i)).attr("id", "Remove3Grau-"+(i-1));
		$("#"+(i)).attr("id",(i-1));
	}
	numApoios3Grau = numApoios3Grau -1;
	numApoios = numApoios -1;
}



function addForca(){

	numEsforc++;
	numForcasAplic++;

	var FuncaoJqueryAdd = $(document.createElement("div")).attr("class","input-group").attr("id", "inputGroupForca-"+numForcasAplic).appendTo("#divCargas");
								 $(document.createElement("div")).attr("class","input-group-addon").attr("id", "inputGroupAddForca-"+numForcasAplic).appendTo("#inputGroupForca-"+numForcasAplic);
									 $(document.createElement("img")).attr("width","47").attr("height","47").attr("alt","...").attr("src","http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/Img/PIcone.png").attr("id","FotoForca-"+numForcasAplic).appendTo("#inputGroupAddForca-"+numForcasAplic);
								 $(document.createElement("input")).attr("id","EntradaPosicaoForca-"+numForcasAplic).attr("width","50%").attr("class","form-control").attr("type","Number").attr("placeholder","Posicao da Carga").appendTo("#inputGroupForca-"+numForcasAplic);
								 $(document.createElement("input")).attr("id","EntradaIntensiForca-"+numForcasAplic).attr("width","50%").attr("class","form-control").attr("type","Number").attr("placeholder","Intensid. da Carga").appendTo("#inputGroupForca-"+numForcasAplic);
								 $(document.createElement("span")).attr("class","input-group-btn").attr("id", "SpanForca-"+numForcasAplic).appendTo("#inputGroupForca-"+numForcasAplic);
									 $(document.createElement("button")).attr("class","btn btn-default").attr("id","RemoveForca-"+numForcasAplic).attr("onclick","removerForca(this.id);").appendTo("#SpanForca-"+numForcasAplic);
										 $(document.createElement("span")).attr("class","glyphicon-2linhas glyphicon-remove").appendTo("#RemoveForca-"+numForcasAplic);
}

function removerForca(valor){
	var IDindexRemover = $("#"+valor).closest("div").attr('id'); //RECEBE A ID DA DIV QUE CONTEM OS APOIOS
	var stringLength = IDindexRemover.length; // CALCULA TAMANHO DO ID PARA USAR NA FUNÇÃO ABAIXO
	var lastChar = IDindexRemover.charAt(stringLength - 1); //REMOVE TODOS OS CARACTERES MENOSO ULTIMO

	$("#"+IDindexRemover).remove(); //REMOVE A DIV ESPECIFICADA

	for(i = lastChar; i<=numForcasAplic; i++){
		$("#inputGroupForca-"+(i)).attr("id", "inputGroupForca-"+(i-1));
		$("#inputGroupAddForca-"+(i)).attr("id", "inputGroupAddForca-"+(i-1));
		$("#FotoForca-"+(i)).attr("id", "FotoForca-"+(i-1));
		$("#EntradaPosicaoForca-"+(i)).attr("id", "EntradaPosicaoForca-"+(i-1));
		$("#EntradaIntensiForca-"+(i)).attr("id", "EntradaIntensiForca-"+(i-1));
		$("#SpanForca-"+(i)).attr("id", "SpanForca-"+(i-1));
		$("#RemoveForca-"+(i)).attr("id", "RemoveForca-"+(i-1));
	}
	numForcasAplic = numForcasAplic -1;
	numEsforc = numEsforc -1;
}

function addCarreg(){

	numCarregAplic++;
	numEsforc++;

	var FuncaoJqueryAdd = $(document.createElement("div")).attr("class","input-group").attr("id", "inputGroupCarreg-"+numCarregAplic).appendTo("#divCargas");
								$(document.createElement("div")).attr("class","input-group-addon").attr("id", "inputGroupAddCarreg-"+numCarregAplic).appendTo("#inputGroupCarreg-"+numCarregAplic);
									$(document.createElement("img")).attr("width","47").attr("height","47").attr("alt","...").attr("src","http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/Img/carregamentoIcone.png").attr("id","FotoCarreg-"+numCarregAplic).appendTo("#inputGroupAddCarreg-"+numCarregAplic);
								$(document.createElement("input")).attr("id","EntradaPosicaoICarreg-"+numCarregAplic).attr("width","50%").attr("class","form-control-50").attr("type","Number").attr("placeholder","Posicao I").appendTo("#inputGroupCarreg-"+numCarregAplic);
								$(document.createElement("input")).attr("id","EntradaPosicaoFCarreg-"+numCarregAplic).attr("width","50%").attr("class","form-control-50").attr("type","Number").attr("placeholder","Posicao F").appendTo("#inputGroupCarreg-"+numCarregAplic);
								$(document.createElement("input")).attr("id","EntradaIntensiICarreg-"+numCarregAplic).attr("width","50%").attr("class","form-control-50").attr("type","Number").attr("placeholder","Intensid. I").appendTo("#inputGroupCarreg-"+numCarregAplic);
								$(document.createElement("input")).attr("id","EntradaIntensiFCarreg-"+numCarregAplic).attr("width","50%").attr("class","form-control-50").attr("type","Number").attr("placeholder","Intensid. F").appendTo("#inputGroupCarreg-"+numCarregAplic);
								$(document.createElement("span")).attr("class","input-group-btn").attr("id", "SpanCarreg-"+numCarregAplic).appendTo("#inputGroupCarreg-"+numCarregAplic);
									$(document.createElement("button")).attr("class","btn btn-default").attr("id","RemoveCarreg-"+numCarregAplic).attr("onclick","removerCarreg(this.id);").appendTo("#SpanCarreg-"+numCarregAplic);
										$(document.createElement("span")).attr("class","glyphicon-2linhas glyphicon-remove").appendTo("#RemoveCarreg-"+numCarregAplic);
}

function removerCarreg(valor){
	var IDindexRemover = $("#"+valor).closest("div").attr('id'); //RECEBE A ID DA DIV QUE CONTEM OS APOIOS
	var stringLength = IDindexRemover.length; // CALCULA TAMANHO DO ID PARA USAR NA FUNÇÃO ABAIXO
	var lastChar = IDindexRemover.charAt(stringLength - 1); //REMOVE TODOS OS CARACTERES MENOSO ULTIMO

	$("#"+IDindexRemover).remove(); //REMOVE A DIV ESPECIFICADA

	for(i = lastChar; i<=numCarregAplic; i++){
		$("#inputGroupCarreg-"+(i)).attr("id", "inputGroupCarreg-"+(i-1));
		$("#inputGroupAddCarreg-"+(i)).attr("id", "inputGroupAddCarreg-"+(i-1));
		$("#FotoCarreg-"+(i)).attr("id", "FotoCarreg-"+(i-1));
		$("#EntradaPosicaoICarreg-"+(i)).attr("id", "EntradaPosicaoICarreg-"+(i-1));
		$("#EntradaPosicaoFCarreg-"+(i)).attr("id", "EntradaPosicaoFCarreg-"+(i-1));
		$("#EntradaIntensiICarreg-"+(i)).attr("id", "EntradaIntensiICarreg-"+(i-1));
		$("#EntradaIntensiFCarreg-"+(i)).attr("id", "EntradaIntensiFCarreg-"+(i-1));
		$("#SpanCarreg-"+(i)).attr("id", "SpanCarreg-"+(i-1));
		$("#RemoveCarreg-"+(i)).attr("id", "RemoveCarreg-"+(i-1));
	}
	numCarregAplic = numCarregAplic -1;
	numEsforc = numEsforc -1;
}

function addMoment(){

	numEsforc++;
	numMomentAplic++;

	var FuncaoJqueryAdd = $(document.createElement("div")).attr("class","input-group").attr("id", "inputGroupMoment-"+numMomentAplic).appendTo("#divCargas");
								$(document.createElement("div")).attr("class","input-group-addon").attr("id", "inputGroupAddMoment-"+numMomentAplic).appendTo("#inputGroupMoment-"+numMomentAplic);
									$(document.createElement("img")).attr("width","47").attr("height","47").attr("alt","...").attr("src","https://raw.rawgitusercontent.com/UCL-MecSol/VigaElemFinitos/master/Img/momento%20SH%20Icone.png").attr("id","FotoMoment-"+numMomentAplic).appendTo("#inputGroupAddMoment-"+numMomentAplic);
								$(document.createElement("input")).attr("id","EntradaPosicaoMoment-"+numMomentAplic).attr("width","50%").attr("class","form-control").attr("type","Number").attr("placeholder","Posicao da Carga").appendTo("#inputGroupMoment-"+numMomentAplic);
								$(document.createElement("input")).attr("id","EntradaIntensiMoment-"+numMomentAplic).attr("width","50%").attr("class","form-control").attr("type","Number").attr("placeholder","Intensid. da Carga").appendTo("#inputGroupMoment-"+numMomentAplic);
								$(document.createElement("span")).attr("class","input-group-btn").attr("id", "SpanMoment-"+numMomentAplic).appendTo("#inputGroupMoment-"+numMomentAplic);
									$(document.createElement("button")).attr("class","btn btn-default").attr("id","RemoveMoment-"+numMomentAplic).attr("onclick","removerMoment(this.id);").appendTo("#SpanMoment-"+numMomentAplic);
										$(document.createElement("span")).attr("class","glyphicon-2linhas glyphicon-remove").appendTo("#RemoveMoment-"+numMomentAplic);
}

function removerMoment(valor){
	var IDindexRemover = $("#"+valor).closest("div").attr('id'); //RECEBE A ID DA DIV QUE CONTEM OS APOIOS
	var stringLength = IDindexRemover.length; // CALCULA TAMANHO DO ID PARA USAR NA FUNÇÃO ABAIXO
	var lastChar = IDindexRemover.charAt(stringLength - 1); //REMOVE TODOS OS CARACTERES MENOSO ULTIMO

	$("#"+IDindexRemover).remove(); //REMOVE A DIV ESPECIFICADA

	for(i = lastChar; i<=numMomentAplic; i++){
		$("#inputGroupMoment-"+(i)).attr("id", "inputGroupMoment-"+(i-1));
		$("#inputGroupAddMoment-"+(i)).attr("id", "inputGroupAddMoment-"+(i-1));
		$("#FotoMoment-"+(i)).attr("id", "FotoMoment-"+(i-1));
		$("#EntradaPosicaoMoment-"+(i)).attr("id", "EntradaPosicaoMoment-"+(i-1));
		$("#EntradaIntensiMoment-"+(i)).attr("id", "EntradaIntensiMoment-"+(i-1));
		$("#SpanMoment-"+(i)).attr("id", "SpanMoment-"+(i-1));
		$("#RemoveMoment-"+(i)).attr("id", "RemoveMoment-"+(i-1));
	}
	numMomentAplic = numMomentAplic -1;
	numEsforc = numEsforc -1;
}

///////////////////////////////////////////// PARTE DE INICIO DE CÁLCULOS ///////////////////////////

function canvasincial() {
  fabric.Image.fromURL('https://rawgit.com/UCL-MecSol/VigaElemFinitos/blob/master/Img/viga%20I.png', function(oImg) {
  	var widthcanvas = $('#canvas').width();
  	var heightcanvas = $('#canvas').height();

    oImg.set({
      top:heightcanvas*0.45,
      left:widthcanvas*0.1,
  		scaleX: widthcanvas*0.0008,
  		scaleY: widthcanvas*0.0008,
      selectable: false})
    canvas.add(oImg);
  });

	canvas.renderAll();

	fabric.devicePixelRatio = 2;
}

function AvaliaCondicoesIniciaisDaViga(){
  var Valido = numApoios1Grau + numApoios2Grau + numApoios3Grau*2;

	switch (true) {
		case (Valido >= 2) :
      if (tamvig.length > 0){
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

function DesenhaProblemaProposto (){


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
    imgObj.src = 'https://rawgit.com/UCL-MecSol/VigaElemFinitos/blob/master/Img/viga%20I.png';
    var imgObj2 = new Image();
    imgObj2.src = 'https://rawgit.com/UCL-MecSol/VigaElemFinitos/blob/master/Img/P.png'


    var widthcanvas = $('#canvas').width();
    var heightcanvas = $('#canvas').height();
    var heightviga = imgObj.height*widthcanvas*0.0008;
    var widthviga = imgObj.width*widthcanvas*0.0008;

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

  function preencheArrayEDesenhaApoios(){

  	if (numApoios1Grau != 0) {
  		for (var i = 0; i < numApoios1Grau; i++) {

  			var Posicao1 = Number(document.getElementById("Entrada1Grau-"+(i+1)).value);

  			if(Posicao1 != ""){
  				Array1GrauPos.push(Number(Posicao1));
  			} else {
  				Array1GrauPos.push(0);
  			}
  		}
  	}

  	if (numApoios2Grau != 0) {
  		for (var j = 0; j < numApoios2Grau; j++) {

  			var Posicao2 = Number(document.getElementById("Entrada2Grau-"+(j+1)).value);
  			if(Posicao2 != ""){
  				Array2GrauPos.push(Number(Posicao2));
  				// console.log(Array2GrauPos[j])
  			} else {
  				Array2GrauPos.push(0);
  				// console.log(Array2GrauPos[j])
  			}
  		}
  	}

  	if (numApoios3Grau != 0) {
  		for (var k = 0; k < numApoios3Grau; k++) {

  			var Posicao3 = Number(document.getElementById("Entrada3Grau-"+(k+1)).value);
  			if(Posicao3 != ""){
  				Array3GrauPos.push(Number(Posicao3));
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

  	function adicionaEmLoopRolete(i){

  		fabric.Image.fromURL('https://rawgit.com/UCL-MecSol/VigaElemFinitos/blob/master/Img/rolete.png', function(oImg1) {
  		oImg1.scale(widthcanvas*0.0007);

  		oImg1.set({
  			top:heightcanvas*0.449+heightviga,
  			left:widthcanvas*0.1+Array1GrauPos[i]*widthviga/tamvig-(oImg1.width*widthcanvas*0.0007/2),
  			id:"myID",
  			selectable: false})
  		canvas.add(oImg1);
  		});
  	}

  	function adicionaEmLoop2Grau(j){

  		fabric.Image.fromURL('https://rawgit.com/UCL-MecSol/VigaElemFinitos/blob/master/Img/apoio 2.png', function(oImg2) {
  		oImg2.scale(widthcanvas*0.0008);

  		oImg2.set({
  			top:heightcanvas*0.45+heightviga-(oImg2.height*widthcanvas*0.0008/2.4),
  			left:widthcanvas*0.105+Array2GrauPos[j]*widthviga*0.985/tamvig-(oImg2.width*widthcanvas*0.0008/2),
  			id:"myID",
  			selectable: false})
  		canvas.add(oImg2);
  		});
  	}

  	function adicionaEmLoopEngaste(k){
  		var coef=0;
  		if (Array3GrauPos[k] == 0) {
  			var url = 'https://rawgit.com/UCL-MecSol/VigaElemFinitos/blob/master/Img/engaste E.png'
  		}
  		if (Array3GrauPos[k] == tamvig) {
  			var url = 'https://rawgit.com/UCL-MecSol/VigaElemFinitos/blob/master/Img/engaste D.png'
  		}
  		if (Array3GrauPos[k] != tamvig && Array3GrauPos[k] != 0) {
  			console.log("Engaste "+(k+1)+" na Posição Errada! Ajustada para a Posição mais próxima.")

  				if (Array3GrauPos[k] > tamvig/2) {
  					document.getElementById("Entrada3Grau-"+(k+1)).value=tamvig;
  					Array3GrauPos[k] = Number(tamvig);
  					var url = 'https://rawgit.com/UCL-MecSol/VigaElemFinitos/blob/master/Img/engaste D.png'
  				}
  				if (Array3GrauPos[k] <= tamvig/2) {
  					document.getElementById("Entrada3Grau-"+(k+1)).value=0;
  					Array3GrauPos[k] = 0;
  					var url = 'https://rawgit.com/UCL-MecSol/VigaElemFinitos/blob/master/Img/engaste E.png'
  				}
  		}

  		fabric.Image.fromURL(url, function(oImg3) {
  		oImg3.scale(widthcanvas*0.0008);
  		oImg3.set({
  			top:heightcanvas*0.45+heightviga/2-(oImg3.height*widthcanvas*0.0008/2),
  			left:widthcanvas*0.086+Array3GrauPos[k]*widthviga*1.018/tamvig-(oImg3.width*widthcanvas*0.0008/2.59),
  			id:"myID",
  			selectable: false})
  		canvas.add(oImg3);
  		});
  	}
  }

  function preencheArrayEDesenhaForcas(){

  	if (numForcasAplic != 0) {
  		for (var i = 0; i < numForcasAplic; i++) {
  			var PosicaoForca1 = Number(document.getElementById("EntradaPosicaoForca-"+(i+1)).value);
  			var IntensidadeForca1 = Number(document.getElementById("EntradaIntensiForca-"+(i+1)).value);
  			if(PosicaoForca1 != ""){
  				ArrayForcaPos.push(Number(PosicaoForca1));
  				ArrayForcaInt.push(Number(IntensidadeForca1));

  			} else {
  				ArrayForcaPos.push(0);
  				ArrayForcaInt.push(0);
  			}
  		}
  	}


  	if (numCarregAplic != 0) {
  		for (var i = 0; i < numCarregAplic; i++) {
  			var PosicaoCarregamentoI = Number(document.getElementById("EntradaPosicaoICarreg-"+(i+1)).value);
  			var PosicaoCarregamentoF = Number(document.getElementById("EntradaPosicaoFCarreg-"+(i+1)).value);
  			var IntensidadeCarregamentoI = Number(document.getElementById("EntradaIntensiICarreg-"+(i+1)).value);
  			var IntensidadeCarregamentoF = Number(document.getElementById("EntradaIntensiFCarreg-"+(i+1)).value);

  				ArrayCarrPosI.push(Number(PosicaoCarregamentoI));
  				ArrayCarrPosF.push(Number(PosicaoCarregamentoF));
  				ArrayCarrIntI.push(Number(IntensidadeCarregamentoI));
  				ArrayCarrIntF.push(Number(IntensidadeCarregamentoF));

  		}
  	}

  	if (numMomentAplic != 0) {
  		for (var i = 0; i < numMomentAplic; i++) {
  			var PosicaoMomento1 = Number(document.getElementById("EntradaPosicaoMoment-"+(i+1)).value);
  			var IntensidadeMomento1 = Number(document.getElementById("EntradaIntensiMoment-"+(i+1)).value);
  			if(PosicaoMomento1 != ""){
  				ArrayMomenPos.push(Number(PosicaoMomento1));
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
  		for (var i = 0; i < (ArrayForcaPos.length-1); i++) {
  			for (var j = 0; j < ArrayReduzidaForcasPos.length; j++) {

  				if (ArrayForcaPos[(i+1)] == ArrayReduzidaForcasPos[j]){
  					ArrayReduzidaForcasInt[j] = math.add(ArrayReduzidaForcasInt[j], ArrayForcaInt[(i+1)])
  					j = ArrayReduzidaForcasPos.length;
  				}

  				if (ArrayForcaPos[(i+1)] != ArrayReduzidaForcasPos[j]){
  					if (ArrayReduzidaForcasPos.length == (j+1)) {
  						ArrayReduzidaForcasPos.push(ArrayForcaPos[(i+1)])
  						ArrayReduzidaForcasInt.push(ArrayForcaInt[(i+1)])
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
  		var quant = Math.ceil(distancia)+1;
  		var angulInt = ArrayCarrIntF[j] - ArrayCarrIntI[j]; ///VARIAVEL QUE FALA SE É TRIANGULAR OU NÃO
  		var IntLabel = math.add(ArrayCarrIntI[j],(angulInt/distancia));  /// ESCREVE O VALOR QUE FICA SOBRE O CARREGAMENTO

  		adicionaEmLoopCarreg(j)
  	}

  	for (var k = 0; k < numMomentAplic; k++) {
  		adicionaEmLoopMomento(k)
  	}


  	function adicionaEmLoopForca(i){

  		fabric.Image.fromURL('https://rawgit.com/UCL-MecSol/VigaElemFinitos/blob/master/Img/P.png', function(oImg4) {

  		oImg4.scale(widthcanvas*0.0007);

  		oImg4.set({
  			top:heightcanvas*0.449-(oImg4.height*widthcanvas*0.0007),
  			left:widthcanvas*0.1+ArrayReduzidaForcasPos[i]*widthviga/tamvig-(oImg4.width*widthcanvas*0.0007/1.35),
  			id:"myID",
  			selectable: false})
  		canvas.add(oImg4);


  		var TextoFabricNoCanvas = new fabric.Text(ArrayReduzidaForcasInt[i]+"N", {
  			top:heightcanvas*0.449-(oImg4.height*widthcanvas*0.0007),
  			left:widthcanvas*0.1+ArrayReduzidaForcasPos[i]*widthviga/tamvig-(oImg4.width*widthcanvas*0.0007/2.8),
  			fontSize: 18*widthcanvas*0.0017,
  			hoverCursor: 'default',
  			// fontFamily: 'Comic Sans',
  			selectable: false
  		});
  		canvas.add(TextoFabricNoCanvas);
  		});


  	}


  	function adicionaEmLoopCarreg(j){
  		for (var m = 0; m < quant; m++) {
  			LoopInterno(m)
  		}
  		DesenhaLinhaEEscreveCarregamento()

  		function DesenhaLinhaEEscreveCarregamento(){

  			// var rect = new fabric.Rect({
  			// 	left: widthcanvas*0.0995+(ArrayCarrPosI[j]*widthviga/tamvig),
  			// 	top: heightcanvas*0.449-(imgObj2.height*widthcanvas*0.0007/1.35),
  			// 	fill: 'black',
  			// 	width: (distancia*widthviga/tamvig),
  			// 	height: 2,
  			// 	selectable: false
  			// });
  			// canvas.add(rect);

        var topDown = heightcanvas*0.449;
        var left = widthcanvas*0.0995+(ArrayCarrPosI[j]*widthviga/tamvig);
        var top =  heightcanvas*0.449-((imgObj2.height*widthcanvas*0.0007/1.35)*(ArrayCarrIntI[j]/ArrayCarrIntF[j]));
        var leftTo = widthcanvas*0.0995+(ArrayCarrPosI[j]*widthviga/tamvig)+(distancia*widthviga/tamvig);
        var topTo = heightcanvas*0.449-(imgObj2.height*widthcanvas*0.0007/1.35);


        var line1 = new fabric.Line([left,topDown,left,top], {
          fill: 'black',
          stroke: 'black',
          strokeWidth: 2,
          selectable: false
        });
        canvas.add(line1);

        var line2 = new fabric.Line([left,top,leftTo,topTo], {
          fill: 'black',
          stroke: 'black',
          strokeWidth: 2,
          selectable: false
        });
        canvas.add(line2);

        var line3 = new fabric.Line([leftTo,topTo,leftTo,topDown], {
          fill: 'black',
          stroke: 'black',
          strokeWidth: 2,
          selectable: false
        });
        canvas.add(line3);

  			// console.log("ENTROU PARA DESENHAR A COTA");
  			var TextoFabricNoCanvas = new fabric.Text(IntLabel+"N/m", {
  				top:heightcanvas*0.449-(imgObj2.height*widthcanvas*0.0007),
  				left:widthcanvas*0.0995+(ArrayCarrPosI[j]*widthviga/tamvig),
  				fontSize: 18*widthcanvas*0.0017,
  				hoverCursor: 'default',
  				selectable: false
  			});
  			canvas.add(TextoFabricNoCanvas);
  		}


  		function LoopInterno(m) {
  			fabric.Image.fromURL('https://rawgit.com/UCL-MecSol/VigaElemFinitos/blob/master/Img/PCarr.png', function(oImg4) {
  			oImg4.scale(widthcanvas*0.0007);

        var topImagem = heightcanvas*0.449-(oImg4.height*widthcanvas*0.0007);
        var leftImagem = widthcanvas*0.1 + (ArrayCarrPosI[j]*widthviga/tamvig) + ((m*distancia/(quant-1))*widthviga/tamvig) - (oImg4.width*widthcanvas*0.0007/1.35);

        var top =  heightcanvas*0.449-((imgObj2.height*widthcanvas*0.0007/1.35)*(ArrayCarrIntI[j]/ArrayCarrIntF[j]));
        var topTo = heightcanvas*0.449-(imgObj2.height*widthcanvas*0.0007/1.35);
        var left = widthcanvas*0.0995+(ArrayCarrPosI[j]*widthviga/tamvig);

        var topDown = heightcanvas*0.449;
        var leftVetor = leftImagem + (oImg4.width*widthcanvas*0.0007/1.35);
        var topVetor = top - (m/quant)*(top-topTo);

        var lineVetor = new fabric.Line([leftVetor,topVetor,leftVetor,topDown], {
          fill: 'black',
          stroke: 'black',
          strokeWidth: 2,
          selectable: false
        });
        canvas.add(lineVetor);

  			oImg4.set({
  				top: topImagem,
  				left: leftImagem,
  				id:"myID",
  				selectable: false})
  			canvas.add(oImg4);
  			});
  		}
  	}


  	function adicionaEmLoopMomento(k){

  		fabric.Image.fromURL('https://rawgit.com/UCL-MecSol/VigaElemFinitos/blob/master/Img/momento SH canvas.png', function(oImg6) {
  		oImg6.scale(widthcanvas*0.0007);

  		oImg6.set({
  			top:heightcanvas*0.449-(oImg6.height*widthcanvas*0.0007)/2.5,
  			left:widthcanvas*0.1+ArrayMomenPos[k]*widthviga/tamvig-(oImg6.width*widthcanvas*0.0007/2.35),
  			id:"myID",
  			selectable: false})
  		canvas.add(oImg6);


  		var TextoFabricNoCanvas = new fabric.Text(ArrayMomenInt[k]+"N.m", {
  			top:heightcanvas*0.449-(oImg6.height*widthcanvas*0.0007)/2.8,
  			left:widthcanvas*0.1+ArrayMomenPos[k]*widthviga/tamvig-(oImg6.width*widthcanvas*0.0007/2.8),
  			fontSize: 18*widthcanvas*0.0017,
  			hoverCursor: 'default',
  			// fontFamily: 'Comic Sans',
  			selectable: false
  		});
  		canvas.add(TextoFabricNoCanvas);
  		});
  	}

  }

	function FuncaoGeraArrayDeDivisoesReduzidas() {
		ArrayDivViga = ArrayZero.concat(0,Array1GrauPos,Array2GrauPos,Array3GrauPos,ArrayForcaPos,ArrayMomenPos,ArrayCarrPosI,ArrayCarrPosF,tamvig);

		function sortfunction(a, b){
	  return (a - b) //faz com que o array seja ordenado numericamente e de ordem crescente.
		}
		ArrayDivViga.sort(sortfunction);

		ArrayDivVigaSemRepeticao = [];
		$.each(ArrayDivViga, function(i, el){
		    if($.inArray(el, ArrayDivVigaSemRepeticao) === -1) ArrayDivVigaSemRepeticao.push(el);
		});

		console.log("ArrayDivViga = "+ArrayDivViga);
		console.log("ArrayDivVigaSemRepeticao = "+ArrayDivVigaSemRepeticao);

	}



	///////////////////////////////// ESSAS 3 FUNÇÕES GERAM O VETOR COM AS FORÇAS E MOMENTOS APLICADOS NOS NÓS
		function FuncaoGeraArray() {  //ESSA FUNÇÃO, GERA A ArrayForcasEMomentosAplicados, QUE CONTÊM AS FORÇAS E MOMENTOS EQUIVALENTES DOS CARREGAMENTOS
			for (var i = 0; i < ((ArrayDivVigaSemRepeticao.length)*2); i++) {
				ArrayForcasEMomentosAplicados[i] = 0;
			}
			console.log("O VETOR DE FORÇAS E MOMENTOS FINAL LIMPA É :"+ArrayForcasEMomentosAplicados);
		}

		function TransformaCarregamentosEmForcas(ArrayDivVigaSemRepeticao){  //ESSA FUNÇÃO, PEGA A ArrayForcasEMomentosAplicados, E SOMA AS FORÇAS E MOMENTOS EQUIVALENTES DOS CARREGAMENTOS
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
          console.log("INICIO DO CARREGAMENTO EM "+CInicialCarr)
					CFinalCarr = ArrayCarrPosF[i];
          console.log("FINAL DO CARREGAMENTO EM "+CFinalCarr)

					for (var j = 0; j < ArrayDivVigaSemRepeticao.length; j++) {
						XInicial = ArrayDivVigaSemRepeticao[j];
            console.log("X AVALIADO EM "+XInicial)
						if (Number(XInicial) >= Number(CInicialCarr)) {
              console.log("SE ENTROU AQUI, ENTÃO : "+XInicial+" É MAIOR OU IGUAL QUE "+CInicialCarr)
							if (Number(XInicial) < Number(CFinalCarr)) { //SE O TRECHO ANALISADO É O PROXIMO E NÃO SOFRE MAIS AÇAO DO CARREGAMENTO, PASSA A ANALISAR O PROXIMO CARREGAMENTO.
                console.log("SE ENTROU AQUI, ENTÃO : "+XInicial+" É MENOR OU IGUAL QUE "+CFinalCarr)
                XFinal = ArrayDivVigaSemRepeticao[j+1];
								Wi = 0;
								Wf = 0;
								ForcaCarregTrech = 0;
								XBarraEsquerda = 0;
								XBarraDireita = 0;
								FNoEsquerda = 0;
								FNoDireita = 0;


								Wi = math.add(ArrayCarrIntI[i], (ArrayCarrIntF[i] - ArrayCarrIntI[i])*(XInicial-CInicialCarr)/(CFinalCarr-CInicialCarr));
								Wf = math.add(ArrayCarrIntI[i], (ArrayCarrIntF[i] - ArrayCarrIntI[i])*(XFinal-CInicialCarr)/(CFinalCarr-CInicialCarr));

								ForcaCarregTrecho = (math.add(Wi,Wf))*(math.add(XFinal,-XInicial))/2;

								XBarraEsquerda = (math.add(XFinal,-XInicial))*(math.add((Wi/3),(2*Wf/3)))/(math.add(Wi,Wf));
								XBarraDireita = (XFinal - XInicial - XBarraEsquerda);

								FNoEsquerda = ForcaCarregTrecho*(XBarraDireita)/(XBarraDireita+XBarraEsquerda);
								FNoDireita = ForcaCarregTrecho*(XBarraEsquerda)/(XBarraDireita+XBarraEsquerda);

								ArrayForcasEMomentosAplicados[(2*j)] = math.add(ArrayForcasEMomentosAplicados[(2*j)], FNoEsquerda);
								ArrayForcasEMomentosAplicados[((2*j)+2)] = math.add(ArrayForcasEMomentosAplicados[((2*j)+2)], FNoDireita);

								ArrayForcasEMomentosAplicados[(2*j)+1] = math.add(ArrayForcasEMomentosAplicados[(2*j)+1], (ForcaCarregTrecho*XBarraEsquerda));
								ArrayForcasEMomentosAplicados[((2*j)+3)] = math.add(ArrayForcasEMomentosAplicados[((2*j)+3)], (ForcaCarregTrecho*XBarraDireita*(-1))); //O *(-1) É DEVIDO QUANDO A FORÇA DE CARREGAMENTO APLICADA É POSITIVA, O MOMENTO NA DIREITA É ANTI HORARIO.

								//console.log("O VETOR DE FORÇAS E MOMENTOS FINAL É :"+ArrayForcasEMomentosAplicados);
							}

						}
					}
				}

			}
      console.log("======================================================================================================")
		}

		function RepeticaoPreencheArray(ArrayDivVigaSemRepeticao) {  //ESSA FUNÇÃO, PEGA A ArrayForcasEMomentosAplicados, E SOMA AS FORÇAS E MOMENTOS APLICADOS NOS NÓS

  		if (numForcasAplic != 0 || numMomentAplic != 0) {

  			for (var i = 0; i < ArrayDivVigaSemRepeticao.length; i++) {
  				if (numForcasAplic != 0) {
  					for (var j = 0; j < numForcasAplic; j++) {
  						if (ArrayDivVigaSemRepeticao[i] == ArrayForcaPos[j]) {
  							ArrayForcasEMomentosAplicados[(2*i)] = math.add(ArrayForcasEMomentosAplicados[(2*i)], ArrayForcaInt[j]);
  						}
  					}
  				}

  				if (numMomentAplic != 0) {
  					for (var k = 0; k < numMomentAplic; k++) {
  						if (ArrayDivVigaSemRepeticao[i] == ArrayMomenPos[k]) {
  							ArrayForcasEMomentosAplicados[((2*i)+1)] = math.add(ArrayForcasEMomentosAplicados[(2*i+1)], ArrayMomenInt[k]);
  						}
  					}
  				}
  			}
  		}
		  ///////////////////////////////////// NESSA FUNÇÃO, SAI A MATRIZ DE FORÇAS APLICADAS //////////////////
	  }
	///////////////////////////////// ESSAS 3 FUNÇÕES GERAM O VETOR COM AS FORÇAS E MOMENTOS APLICADOS NOS NÓS


	function DesenhaCotas() {

		var posicaoUltimaCota = ArrayDivVigaSemRepeticao.length;
		var rect4 = new fabric.Rect({
			left: widthcanvas*0.0995+(ArrayDivVigaSemRepeticao[(posicaoUltimaCota-1)]*widthviga/tamvig),
			top: heightcanvas*0.759-(0.02*widthviga),
			fill: 'black',
			width: 1,
			height: (0.04*widthviga),
			selectable: false
		}); //ESSE RECT DESENHA A ULTIMA COTA, QUE SEMPRE VAI SER NO FIM DA VIGA

		canvas.add(rect4);

		for (var j = 0; j < (ArrayDivVigaSemRepeticao.length-1); j++) {
			DesenhaDivisoriaCotas()
			DesenhaLinhaCotas()
		}

		function DesenhaLinhaCotas(){
			var rect2 = new fabric.Rect({
				left: widthcanvas*0.0995+(ArrayDivVigaSemRepeticao[j]*widthviga/tamvig),
				top: heightcanvas*0.759,
				fill: 'black',
				width: ((ArrayDivVigaSemRepeticao[(j+1)]-ArrayDivVigaSemRepeticao[(j)])*widthviga/tamvig),
				height: 1,
				selectable: false
			});
			// console.log("DESENHOU A LINHA");
			canvas.add(rect2);
		}

		function DesenhaDivisoriaCotas(){
			var rect3 = new fabric.Rect({
				left: widthcanvas*0.0995+(ArrayDivVigaSemRepeticao[j]*widthviga/tamvig),
				top: heightcanvas*0.759-(0.02*widthviga),
				fill: 'black',
				width: 1,
				height: (0.04*widthviga),
				selectable: false
			});
			canvas.add(rect3);

			// console.log("ENTROU PARA DESENHAR A COTA");
			var TamanhoTrecho = (ArrayDivVigaSemRepeticao[j+1]-ArrayDivVigaSemRepeticao[j]);


			if (decimalPlaces(ArrayDivVigaSemRepeticao[j+1]) > decimalPlaces(ArrayDivVigaSemRepeticao[j])) {
				var TamanhoTrechoArredondado = TamanhoTrecho.toFixed(decimalPlaces(ArrayDivVigaSemRepeticao[j+1]));
			}
			if (decimalPlaces(ArrayDivVigaSemRepeticao[j+1]) <= decimalPlaces(ArrayDivVigaSemRepeticao[j])) {
				var TamanhoTrechoArredondado = TamanhoTrecho.toFixed(decimalPlaces(ArrayDivVigaSemRepeticao[j]));
			}




			var TextoFabricNoCanvas = new fabric.Text(TamanhoTrechoArredondado+"m", {
				top:heightcanvas*0.759-(19*widthcanvas*0.0017),
				left:widthcanvas*0.0995+(ArrayDivVigaSemRepeticao[j]*widthviga/tamvig)+(TamanhoTrechoArredondado*widthviga*0.45/(tamvig)),
				fontSize: 18*widthcanvas*0.0017,
				hoverCursor: 'default',
				// fontFamily: 'Comic Sans',
				selectable: false
			});
			canvas.add(TextoFabricNoCanvas);
			// console.log("DESENHOU A COTA");
		}

	}

}

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
			Elast = Number((document.getElementById("inputElasticidade").value)*1000000000);
			Inerc = Number(document.getElementById("inputInercia").value);
			var tudoB = Elast*Inerc/(LTrech*LTrech*LTrech);
			var KLocal =  [[12*tudoB, 			6*tudoB*LTrech, 			 -12*tudoB, 			6*tudoB*LTrech],
										[6*tudoB*LTrech, 4*tudoB*LTrech*LTrech, -6*tudoB*LTrech, 2*tudoB*LTrech*LTrech],
										[-12*tudoB, 			-6*tudoB*LTrech, 			 12*tudoB, 			-6*tudoB*LTrech],
										[6*tudoB*LTrech, 2*tudoB*LTrech*LTrech, -6*tudoB*LTrech, 4*tudoB*LTrech*LTrech]]
			;
		//

    //GERA A KGlobal ZERADA
			IndexParaGerarKGlobalDoTamanhoCerto = ((2*ArrayDivVigaSemRepeticao.length)-1);
			KGlobal.subset(math.index(IndexParaGerarKGlobalDoTamanhoCerto,IndexParaGerarKGlobalDoTamanhoCerto), 0);
		//


		//ADICIONA VALORES NA KGlobal
			for (var l = 0; l < (ArrayDivVigaSemRepeticao.length-1); l++) {
				LTrech = ArrayDivVigaSemRepeticao[(l+1)] - ArrayDivVigaSemRepeticao[l];
				tudoB = Elast*Inerc/(LTrech*LTrech*LTrech);
				KLocal =  [[12*tudoB, 			6*tudoB*LTrech, 			 -12*tudoB, 			6*tudoB*LTrech],
									[6*tudoB*LTrech, 4*tudoB*LTrech*LTrech, -6*tudoB*LTrech, 2*tudoB*LTrech*LTrech],
									[-12*tudoB, 			-6*tudoB*LTrech, 			 12*tudoB, 			-6*tudoB*LTrech],
									[6*tudoB*LTrech, 2*tudoB*LTrech*LTrech, -6*tudoB*LTrech, 4*tudoB*LTrech*LTrech]]
				;

				for (var i = 0; i < 4; i++) {
					for (var j = 0; j < 4; j++) {
						var ValorK = math.subset(KGlobal, math.index((i+2*l), (j+2*l)));
						KGlobal.subset(math.index((i+2*l),(j+2*l)), (ValorK+KLocal[i][j]));
            KGlobalOriginal.subset(math.index((i+2*l),(j+2*l)), (ValorK+KLocal[i][j]));
					}
				}

			}
		//

		KGlobalModificada = undefined;
		KGlobalModificada = KGlobal; // KGlobalModificada COPIA A KGlobal
	}


	function RepeticaoZeraMatrizGlobal(ArrayDivVigaSemRepeticao) {//ESSA FUNÇÃO VAI ZERAR AS LINHAS E COLUNAS ONDE NÃO EXISTE DESLOCAMENTO VERTICAL E INCLINAÇÕES

		if (numApoios1Grau != 0 || numApoios2Grau != 0 || numApoios3Grau != 0) {
			console.log("numApoios1Grau = "+numApoios1Grau)
			console.log("numApoios2Grau = "+numApoios2Grau)
			for (var i = 0; i < ArrayDivVigaSemRepeticao.length; i++) {

				if (numApoios1Grau != 0) {
					for (var j = 0; j < numApoios1Grau; j++) {
						if (ArrayDivVigaSemRepeticao[i] == Array1GrauPos[j]) {
							for (var l = 0; l <= IndexParaGerarKGlobalDoTamanhoCerto; l++) {
								// var z = math.subset(KGlobalModificada, math.index(2*i, 2*i));
								KGlobalModificada.subset(math.index(2*i,l), 0); //ESSA FUNÇÃO ZERA A LINHA
								// KGlobalModificada.subset(math.index(l,2*i), 0); //ESSA FUNÇÃO ZERA A COLUNA
								KGlobalModificada.subset(math.index(2*i,2*i), 1); //ESSA FUNÇÃO CHAMA O VALOR DE 1
							}
						}
					}
				}

				if (numApoios2Grau != 0) {
					for (var k = 0; k < numApoios2Grau; k++) {
						if (ArrayDivVigaSemRepeticao[i] == Array2GrauPos[k]) {
							for (var l = 0; l <= IndexParaGerarKGlobalDoTamanhoCerto; l++) {
								// var z = math.subset(KGlobalModificada, math.index(2*i, 2*i));
								KGlobalModificada.subset(math.index(2*i,l), 0); //ESSA FUNÇÃO ZERA A LINHA
								// KGlobalModificada.subset(math.index(l,2*i), 0); //ESSA FUNÇÃO ZERA A COLUNA
								KGlobalModificada.subset(math.index(2*i,2*i), 1); //ESSA FUNÇÃO CHAMA O VALOR DE 1
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
								KGlobalModificada.subset(math.index(2*i,l), 0); //ESSA FUNÇÃO ZERA A LINHA
								// KGlobalModificada.subset(math.index(l,2*i), 0); //ESSA FUNÇÃO ZERA A COLUNA
								KGlobalModificada.subset(math.index(2*i,2*i), 1); //ESSA FUNÇÃO CHAMA O VALOR DE 1

								KGlobalModificada.subset(math.index((2*i+1),l), 0); //ESSA FUNÇÃO ZERA A LINHA
								// KGlobalModificada.subset(math.index(l,(2*i+1)), 0); //ESSA FUNÇÃO ZERA A COLUNA
								KGlobalModificada.subset(math.index((2*i+1),(2*i+1)), 1); //ESSA FUNÇÃO CHAMA O VALOR DE 1
							}
						}
					}
				}

			}
		}
		console.log("KGlobalModificada  FINAL =  "+KGlobalModificada);
		console.log("ArrayForcasEMomentosAplicados  FINAL =  "+ArrayForcasEMomentosAplicados);

		//FAZER ESSAS CONTAS AO FIM DE TUDO.


	}

  function CalculaDeslocamentosInclinacoesEEsforcos(){
    ArrayDeDeslocamentosEInclinacoes = math.lusolve(KGlobalModificada, ArrayForcasEMomentosAplicados);
		ArrayEsforcosEReacoes = math.multiply(KGlobalOriginal, ArrayDeDeslocamentosEInclinacoes);
  }

  function CalculaCoeficientes(ArrayDivVigaSemRepeticao) {
    MatrizCoeficientesDasEquacoes = math.matrix();
    for (var l = 0; l < (ArrayDivVigaSemRepeticao.length-1); l++) {
      var LTrech = 1;
      LTrech = ArrayDivVigaSemRepeticao[(l+1)] - ArrayDivVigaSemRepeticao[l];
      var MatrizValoresA = [[1,0,0,0],
                            [0,1,0,0],
                            [1,LTrech,LTrech*LTrech,LTrech*LTrech*LTrech],
                            [0,1,2*LTrech,3*LTrech*LTrech]]
      ;
      var MatrizLocalDeDeslocamentosEInclinações = [];
      MatrizLocalDeDeslocamentosEInclinações = [[math.subset(ArrayDeDeslocamentosEInclinacoes, math.index((2*l),0))],[math.subset(ArrayDeDeslocamentosEInclinacoes, math.index((2*l+1),0))],[math.subset(ArrayDeDeslocamentosEInclinacoes, math.index((2*l+2),0))],[math.subset(ArrayDeDeslocamentosEInclinacoes, math.index((2*l+3),0))]]
      var ArrayLocalDeCoeficientesParaGerarEquacoes = math.matrix();
      ArrayLocalDeCoeficientesParaGerarEquacoes = math.lusolve(MatrizValoresA, MatrizLocalDeDeslocamentosEInclinações);

      for (var j = 0; j < 4; j++) {
        var valorDeGirodoFor = math.subset(ArrayLocalDeCoeficientesParaGerarEquacoes, math.index(j,0));
        MatrizCoeficientesDasEquacoes.subset(math.index(l,j), valorDeGirodoFor);
      }
    }
  }


	function mostrarExplicacao(explicacao){
		//
		// console.log("KGlobalModificada  = "+KGlobalModificada)
		// console.log("IndexParaGerarKGlobalDoTamanhoCerto  = "+IndexParaGerarKGlobalDoTamanhoCerto)
    explicacao += ("<center><b>A MATRIZ GLOBAL ORIGINAL ABAIXO: </b></center>")
		explicacao += ("$$  \K_g = \\begin{bmatrix} ")
		for (var i = 0; i <= IndexParaGerarKGlobalDoTamanhoCerto; i++) {
			for (var j = 0; j <= IndexParaGerarKGlobalDoTamanhoCerto; j++) {
				explicacao += math.subset(KGlobalOriginal, math.index(i, j));
				if (j != (IndexParaGerarKGlobalDoTamanhoCerto)) {
					explicacao += (" & ")
				}
			}
			explicacao += (" \\\\ ")
		}
		explicacao += ("\\end{bmatrix} $$ ")


		explicacao += ("<center><b>A MATRIZ GLOBAL ABAIXO (CASO 1 E CASO 2): </b></center>")
		explicacao += ("$$  \K_g = \\begin{bmatrix} ")
		for (var i = 0; i <= IndexParaGerarKGlobalDoTamanhoCerto; i++) {
			for (var j = 0; j <= IndexParaGerarKGlobalDoTamanhoCerto; j++) {
				explicacao += math.subset(KGlobalModificada, math.index(i, j));
				if (j != (IndexParaGerarKGlobalDoTamanhoCerto)) {
					explicacao += (" & ")
				}
			}
			explicacao += (" \\\\ ")
		}
		explicacao += ("\\end{bmatrix} $$ ")


		explicacao += ("<center><b>A MATRIZ DAS FORÇAS ABAIXO: </b></center>")
		explicacao += ("$$  \F = \\begin{bmatrix} ")
		for (var i = 0; i < ArrayForcasEMomentosAplicados.length; i++) {
			explicacao += ArrayForcasEMomentosAplicados[i];
			if (j != (ArrayForcasEMomentosAplicados.length)) {
				explicacao += (" & ")
			}
			explicacao += (" \\\\ ")
		}
		explicacao += ("\\end{bmatrix} $$ ")

		explicacao += ("<center><b>A MATRIZ DE DESLOCAMENTOS E INCLINAÇÕES ABAIXO: </b></center>")
		explicacao += ("$$  \X = \\begin{bmatrix} ")
		for (var i = 0; i < ArrayForcasEMomentosAplicados.length; i++) {
			explicacao += math.subset(ArrayDeDeslocamentosEInclinacoes, math.index(i, 0));
			if (j != (ArrayForcasEMomentosAplicados.length)) {
				explicacao += (" & ")
			}
			explicacao += (" \\\\ ")
		}
		explicacao += ("\\end{bmatrix} $$ ")


		explicacao += ("$$  \R = \\begin{bmatrix} ")
		for (var i = 0; i < ArrayForcasEMomentosAplicados.length; i++) {
			explicacao += math.subset(ArrayEsforcosEReacoes, math.index(i, 0));
			if (j != (ArrayForcasEMomentosAplicados.length)) {
				explicacao += (" & ")
			}
			explicacao += (" \\\\ ")
		}
		explicacao += ("\\end{bmatrix} $$ ")


    explicacao += ("<center><b>A MATRIZ DE COEFICIENTES C ABAIXO: </b></center>")
    explicacao += ("$$  \C = \\begin{bmatrix} ")
		for (var i = 0; i < (ArrayDivVigaSemRepeticao.length-1); i++) {
			for (var j = 0; j < 4; j++) {
				explicacao += math.subset(MatrizCoeficientesDasEquacoes, math.index(i, j));
				if (j != (IndexParaGerarKGlobalDoTamanhoCerto)) {
					explicacao += (" & ")
				}
			}
			explicacao += (" \\\\ ")
		}
		explicacao += ("\\end{bmatrix} $$ ")


		var divExplicacao = document.getElementById("texto-explicacao");
		divExplicacao.innerHTML = "<h4 style='text-align: center'> ";
		divExplicacao.innerHTML += explicacao;
		divExplicacao.innerHTML += "</h4>";

		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

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
                    text: "Grafico de v(x)"
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
                        return '<b>' + Highcharts.NumberFormat(this.y, 6) + "  (" + Highcharts.NumberFormat(this.x, 6) + ")  ";
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
                          var valorDaDivisão = (1000/tamvig)-1;
                        }
                        for (var j = 0; j < ArrayDivVigaSemRepeticao.length-1; j++) {
                          // console.log("L INICIAL do trecho  '"+j+"' ============"+ArrayDivVigaSemRepeticao[j])*valorDaDivisão)
                          // console.log("L FINAL do trecho  '"+j+"' ============"+ArrayDivVigaSemRepeticao[(j+1)])*valorDaDivisão)
                          var Linicial = (ArrayDivVigaSemRepeticao[j])*valorDaDivisão;
                          var LFinal = (ArrayDivVigaSemRepeticao[(j+1)])*valorDaDivisão;
                          for (i = Linicial; i <= LFinal; i++) {
                              data.push({
                                  x: i/valorDaDivisão,
                                  y: -(MatrizCoeficientesDasEquacoes._data[j][0] + MatrizCoeficientesDasEquacoes._data[j][1]*(i-Linicial)/valorDaDivisão + MatrizCoeficientesDasEquacoes._data[j][2]*(i-Linicial)*(i-Linicial)/(valorDaDivisão*valorDaDivisão) + MatrizCoeficientesDasEquacoes._data[j][3]*(i-Linicial)*(i-Linicial)*(i-Linicial)/(valorDaDivisão*valorDaDivisão*valorDaDivisão))
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
                    text: "Grafico de v'(x)"
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
                        return '<b>' + Highcharts.NumberFormat(this.y, 6) + "  (" + Highcharts.NumberFormat(this.x, 6) + ")  ";
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
                          var valorDaDivisão = (1000/tamvig)-1;
                        }
                        for (var j = 0; j < ArrayDivVigaSemRepeticao.length-1; j++) {
                          var Linicial = (ArrayDivVigaSemRepeticao[j])*valorDaDivisão;
                          var LFinal = (ArrayDivVigaSemRepeticao[(j+1)])*valorDaDivisão;
                          for (i = (ArrayDivVigaSemRepeticao[j])*valorDaDivisão; i <= (ArrayDivVigaSemRepeticao[(j+1)])*valorDaDivisão; i++) {
                              data.push({
                                  x: i/valorDaDivisão,
                                  y: -(MatrizCoeficientesDasEquacoes._data[j][1] + MatrizCoeficientesDasEquacoes._data[j][2]*(i-Linicial)*2/(valorDaDivisão) + MatrizCoeficientesDasEquacoes._data[j][3]*(i-Linicial)*(i-Linicial)*3/(valorDaDivisão*valorDaDivisão))
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
                    text: "Grafico de v''(x)"
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
                        return '<b>' + Highcharts.NumberFormat(this.y, 6) + "  (" + Highcharts.NumberFormat(this.x, 6) + ")  ";
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
                          var valorDaDivisão = (1000/tamvig)-1;
                        }
                        for (var j = 0; j < ArrayDivVigaSemRepeticao.length-1; j++) {
                          var Linicial = (ArrayDivVigaSemRepeticao[j])*valorDaDivisão;
                          var LFinal = (ArrayDivVigaSemRepeticao[(j+1)])*valorDaDivisão;
                          for (i = (ArrayDivVigaSemRepeticao[j])*valorDaDivisão; i <= (ArrayDivVigaSemRepeticao[(j+1)])*valorDaDivisão; i++) {
                              data.push({
                                  x: i/valorDaDivisão,
                                  y: -(MatrizCoeficientesDasEquacoes._data[j][2]*2 + MatrizCoeficientesDasEquacoes._data[j][3]*(i-Linicial)*2*3/(valorDaDivisão))
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
                    text: "Grafico de v'''(x)"
                },
                xAxis: {
                    type: 'X da viga',
                    tickPixelInterval: 150
                },
                yAxis: {
                    title: {
                        text: 'Força Cortante'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + Highcharts.NumberFormat(this.y, 6) + "  (" + Highcharts.NumberFormat(this.x, 6) + ")  ";
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
                          var valorDaDivisão = (1000/tamvig)-1;
                        }
                        for (var j = 0; j < ArrayDivVigaSemRepeticao.length-1; j++) {
                          var Linicial = (ArrayDivVigaSemRepeticao[j])*valorDaDivisão;
                          var LFinal = (ArrayDivVigaSemRepeticao[(j+1)])*valorDaDivisão;
                          for (i = (ArrayDivVigaSemRepeticao[j])*valorDaDivisão; i <= (ArrayDivVigaSemRepeticao[(j+1)])*valorDaDivisão; i++) {
                              data.push({
                                  x: i/valorDaDivisão,
                                  y: -(MatrizCoeficientesDasEquacoes._data[j][3]*2*3)
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
