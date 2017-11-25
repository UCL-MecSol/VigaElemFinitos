# SOFTWARE ACADÊMICO PARA RESOLUÇÃO DE VIGA GENÉRICA PELO MÉTODO DOS ELEMENTOS FINITOS
## Introdução
Durante sua formação acadêmica e na vida profissional, muitas vezes o Engenheiro Mecânico e Civil encontra-se com problemas estruturais de difícil resolução. Durante a fase acadêmica ou exercendo sua profissão, é necessário resolver problemas mais complexos, como estruturas de Vigas e Pórticos, que necessitam de uma parte matemática mais robusta, e nem sempre o engenheiro tem rapidamente à mão um software que auxilie na resolução, ou que possa validar os cálculos já previamente feitos. Esse é um problema que pode ser ocasional na vida do engenheiro se o mesmo trabalhar na área de projetos ou se o acadêmico estiver cursando as disciplinas de Resistência dos Materiais I e II.

Portanto, esse trabalho se baseia em fornecer um software didático, prático, open-source para dimensionamento e cálculos, que possa suprir a necessidade de ambos os usuários.

## Instalação
Para este software não é necessário instalação, o mesmo é executado diretamente no link [viga.ucl.br](viga.ucl.br).

## Base Teórica
Este software foi desenvolvido como um trabalho de conclusão de curso, toda a base teórica e matematica se encontra no artigo tambem presente neste projeto GitHub, no link [viga.ucl.br](viga.ucl.br).

## Desenvolvido com:
- [BootStrap](https://getbootstrap.com/) - Bootstrap. Build responsive, mobile-first projects on the web with the world's most popular front-end component library.
- [MathJS](http://mathjs.org/) - An extensive math library for JavaScript and Node.js. It features big numbers, complex numbers, matrices, units, and a flexible expression parser.
- [MathJax](https://www.mathjax.org/) - uses CSS with web fonts or SVG, instead of bitmap images or Flash, so equations scale with surrounding text at all zoom levels.
- [HighCharts](https://www.highcharts.com/) - Interactive JavaScript charts for your web pages.
- [FabricJS](http://fabricjs.com/) - A powerful and simple Javascript HTML5 canvas library.
- [JQuery](https://jquery.com/) - The Write Less, Do More, JavaScript Library.

## 1. Lista de Variáveis


#### - numApoios
```
  Descrição: Contador para número total de apoios aplicados no problema.
  Tipo: Integer.
  Valor inicial: 0.
```
#### - numEsforc
```
  Descrição: Contador para número total de Esforços aplicados no problema.
  Tipo: Integer.
  Valor inicial: 0.
```
#### - numApoios1Grau
```
  Descrição: Contador para número total de apoios de 1º grau aplicados no problema.
  Tipo: Integer.
  Valor inicial: 0.
```
#### numApoios2Grau

```
  Descrição: Contador para número total de apoios 2º grau aplicados no problema.
  Tipo: Integer.
  Valor inicial: 0.
```
#### numApoios3Grau
```
  Descrição: Contador para número total de apoios 3º grau aplicados no problema.
  Tipo: Integer.
  Valor inicial: 0.
```
#### numForcasAplic
```
  Descrição: Contador para número total de Forças aplicados no problema.
  Tipo: Integer.
  Valor inicial: 0.
```
#### numCarregAplic
```
  Descrição: Contador para número total Carregamentos aplicados no problema.
  Tipo: Integer.
  Valor inicial: 0.
```
#### numMomentAplic
```
  Descrição: Contador para número total de Momentos aplicados no problema.
  Tipo: Integer.
  Valor inicial: 0.
  ```
#### Array1GrauPos
```
  Descrição: Array contendo as posições onde foram aplicadas os Apoios de 1º grau.
  Tipo: Array.
  Valor inicial: [].
```
#### Array2GrauPos
```
  Descrição: Array contendo as posições onde foram aplicadas os Apoios de 2º grau.
  Tipo: Array.
  Valor inicial: [].
```
#### Array3GrauPos
```
  Descrição: Array contendo as posições onde foram aplicadas os Apoios de 3º grau.
  Tipo: Array.
  Valor inicial: [].
```
#### ArrayForcaPos
```
  Descrição: Array contendo as posições onde foram aplicadas as Forças, na respectiva ordem que foram adicionadas.
  Tipo: Array.
  Valor inicial: [].
```
#### ArrayForcaInt
```
  Descrição: Array contendo as intensidades das Forças, na respectiva ordem que foram adicionadas.
  Tipo: Array.
  Valor inicial: [].
```
#### ArrayCarrPosI
```
  Descrição: Array contendo as posições iniciais onde foram aplicados carregamentos, na respectiva ordem que foram adicionadas.
  Tipo: Array.
  Valor inicial: [].
```
#### ArrayCarrPosF
```
  Descrição: Array contendo as posições finais onde foram aplicados carregamentos, na respectiva ordem que foram adicionadas.
  Tipo: Array.
  Valor inicial: [].
```
#### ArrayCarrIntI
```
  Descrição: Array contendo as intensidades iniciais dos carregamentos aplicados, na respectiva ordem que foram adicionadas.
  Tipo: Array.
  Valor inicial: [].
```
#### ArrayCarrIntF
```
  Descrição: Array contendo as intensidades finais dos carregamentos aplicados, na respectiva ordem que foram adicionadas.
  Tipo: Array.
  Valor inicial: [].
```
#### ArrayMomenPos
```
  Descrição: Array contendo as posições onde foram aplicados Momentos, na respectiva ordem que foram adicionadas.
  Tipo: Array.
  Valor inicial: [].
```
#### ArrayMomenInt
```
  Descrição: Array contendo as intensidades dos Momentos, na respectiva ordem que foram adicionadas.
  Tipo: Array.
  Valor inicial: [].
```
#### imgObj
```
  Descrição: Variável de imagem, contendo a imagem da viga inicial.
  Tipo: Imagem.
  Valor inicial: _void_.
```
#### imgObj2
```
  Descrição: Variável de imagem, contendo a imagem do vetor de Força.
  Tipo: Imagem.
  Valor inicial: _void_.
```
#### tamvig
```
  Descrição: Variável que contém o valor de input do tamanho da viga proposta.
  Tipo: Integer.
  Valor inicial: 0.
  ```
#### canvas
```
  Descrição: Variável contendo o objeto Canvas do FabricJS.
  Tipo: Integer.
  Valor inicial: 0.
  ```
#### ArrayForcasEMomentosAplicados
```
  Descrição: Array contendo os valores de Forças e momentos em cada nó, após a transformação da viga em estrutura reticulada.
  Tipo: Array.
  Valor inicial: [].
```
#### ArrayDivVigaSemRepeticao
```
  Descrição: Array contendo o valor da posição em X de cada nó.
  Tipo: Array.
  Valor inicial: [].
```
#### ArrayDeDeslocamentosEInclinacoes
```
  Descrição: Array contendo os valores após cálculos de cada deslocamento e inclinação em cada nó.
  tipo:undefined.
  Tipo: Array.
  Valor inicial: [].
```
#### ArrayForcasEReacoes
```
  Descrição: Array contendo os valores após cálculos de cada Forca e momento aplicado ou reacional, em cada nó.
  Tipo: Array.
  Valor inicial: undefined.
```
#### Elast
```
  Descrição: Variável contendo o valor do módulo de elasticidade que foi definido pelo usuário para o problema.
  Tipo: Integer.
  Valor inicial: 1.
```
#### Inerc
```
  Descrição: Variável contendo o valor do módulo de inércia que foi definido pelo usuário para o problema.
  Tipo: Integer.
  Valor inicial: 1.
```

#### KGlobal
```
  Descrição: Matriz contendo a matriz de Rigidez global para manipulação dentro do código.
  Tipo: MathJS.Matrix.
  Valor inicial: undefined.
```
#### KGlobalModificada
```
  Descrição: Matriz que salva a matriz de Rigidez global modificada, após manipulação dentro do código.
  Tipo: MathJS.Matrix.
  Valor inicial: undefined.
```
#### KGlobalOriginal
```
  Descrição: Matriz que salva a matriz de Rigidez global original, após manipulação dentro do código.
  Tipo: MathJS.Matrix.
  Valor inicial: undefined.
```
#### explicacao
```
  Descrição: Variável que contém a string de explicação, que vai ser renderizada pelo MathJax, mostrando assim, o resultado do software.
  Tipo: String.
  Valor inicial: undefined.
```
#### MatrizCoeficientesDasEquacoes
```
  Descrição: Matriz contendo os coeficientes Utilizados para gerar as Equações.
  Tipo: MathJS.Matrix.
  Valor inicial: undefined.
```

## 2. Funções
#### decimalPlaces(num):
```
Descrição: Função para arredondar os valores.
Parâmetros: Num – Variavel sendo evaluada.
Retorna: Valor da variável arredondada.
```
#### LimpaApoios():
```
Descrição: Função para limpeza das variáveis relacionadas ao painel de apoios, e apagar os objetos, e esvazia a Div contendo os objetos.
Parâmetros: numApoios1Grau, numApoios2Grau, numApoios3Grau, Array1GrauPos, Array2GrauPos, Array3GrauPos e numApoios.
Retorna: Parâmetros Limpos.
```
#### LimpaCargas():
```
Descrição: Função para limpeza das variáveis relacionadas ao painel de esforços, e apagar os objetos, e esvazia a Div contendo os objetos.
Parâmetros: numForcasAplic, numCarregAplic, numMomentAplic, ArrayForcaPos, ArrayForcaInt, ArrayMomenPos, ArrayMomenInt, ArrayCarrPosI, ArrayCarrPosF, ArrayCarrIntI, ArrayCarrIntF e numEsforc.
Retorna: Parâmetros Limpos.
```
#### addPrimGrau():
```
Descrição: Função para adição de objetos na Div de apoios. Aumenta o valor dos contadores do apoio de 1º grau e do contador de apoios geral em 1. Adiciona um conjunto de objetos, contendo uma pequena imagem representando o apoio adicionado no problema, v, e um botão de remoção que irá remover o conjunto de objetos.
Parâmetros: numApoios, numApoios1Grau, divApoios.
Retorna: Adição de um conjunto de elementos.
```
#### removerPrimGrau(valor):
```
Descrição: Função para remover o conjunto de objetos do apoio escolhido na Div de Apoios. Reduz o valor dos contadores do apoio de 1º grau e do contador de apoios geral em 1. Tem efeito inverso da função AddPrimGrau().
Parâmetros: numApoios , numApoios1Grau, divApoios.
Retorna: Remoção de um conjunto de elementos.
```
#### addSeguGrau():
```
Descrição: Função para adição de objetos na Div de apoios. Aumenta o valor dos contadores do apoio de 2º grau e do contador de apoios geral em 1. Adiciona um conjunto de objetos, contendo uma pequena imagem representando o apoio adicionado no problema, inputs necessários para resolução do problema, e um botão de remoção que irá remover o conjunto de objetos.
Parâmetros: numApoios, numApoios2Grau, divApoios.
Retorna: Adição de um conjunto de elementos.
```
#### removerSeguGrau(valor):
```
Descrição: Função para remover o conjunto de objetos do apoio escolhido na Div de Apoios. Reduz o valor dos contadores do apoio de 2º grau e do contador de apoios geral em 1. Tem efeito inverso da função addSeguGrau().
Parâmetros: numApoios , numApoios2Grau, divApoios.
Retorna: Remoção de um conjunto de elementos.
```
#### addTercGrau():
```
Descrição: Função para adição de objetos na Div de apoios. Aumenta o valor dos contadores do apoio de 3º grau e do contador de apoios geral em 1. Adiciona um conjunto de objetos, contendo uma pequena imagem representando o apoio adicionado no problema, inputs necessários para resolução do problema, e um botão de remoção que irá remover o conjunto de objetos.
Parâmetros: numApoios, numApoios3Grau, divApoios.
Retorna: Adição de um conjunto de elementos.
```
#### removerTercGrau(valor):
```
Descrição: Função para remover o conjunto de objetos do apoio escolhido na Div de Apoios. Reduz o valor dos contadores do apoio de 3º grau e do contador de apoios geral em 1. Tem efeito inverso da função addTercGrau().
Parâmetros: numApoios , numApoios3Grau, divApoios.
Retorna: Remoção de um conjunto de elementos.
```
#### addForca():
```
Descrição: Função para adição de objetos na Div de esforços. Aumenta o valor dos contadores de esforços e do contador de forças em 1. Adiciona um conjunto de objetos, contendo uma pequena imagem representando o esforço adicionado no problema, inputs necessários para resolução do problema, e um botão de remoção que irá remover o conjunto de objetos.
Parâmetros: numEsforc, numForcasAplic, divCargas.
Retorna: Adição de um conjunto de elementos.
```
#### removerForca(valor):
```
Descrição: Função para remover o conjunto de objetos do esforço escolhido na Div de esforços. Reduz o valor dos contadores de Forças e do contador de esforços em 1. Tem efeito inverso da função addForca().
Parâmetros: numEsforc, numForcasAplic, divCargas.
Retorna: Remoção de um conjunto de elementos.
```
#### addCarreg():
```
Descrição: Função para adição de objetos na Div de esforços. Aumenta o valor dos contadores de esforços e do contador de carregamentos em 1. Adiciona um conjunto de objetos, contendo uma pequena imagem representando o esforço adicionado no problema, inputs necessários para resolução do problema, e um botão de remoção que irá remover o conjunto de objetos.
Parâmetros: numEsforc, numCarregAplic, divCargas.
Retorna: Adição de um conjunto de elementos.
```
#### removerCarreg(valor):
```
Descrição: Função para remover o conjunto de objetos do esforço escolhido na Div de esforços. Reduz o valor dos contadores de Carregamentos e do contador de esforços em 1. Tem efeito inverso da função addCarreg().
Parâmetros: numEsforc, numCarregAplic, divCargas.
Retorna: Remoção de um conjunto de elementos.
```
#### addMoment():
```
Descrição: Função para adição de objetos na Div de esforços. Aumenta o valor dos contadores de esforços e do contador de momentos em 1. Adiciona um conjunto de objetos, contendo uma pequena imagem representando o esforço adicionado no problema, inputs necessários para resolução do problema, e um botão de remoção que irá remover o conjunto de objetos.
Parâmetros: numEsforc, numMomentAplic, divCargas.
Retorna: Adição de um conjunto de elementos.
```
#### removerMoment(valor):
```
Descrição: Função para remover o conjunto de objetos do esforço escolhido na Div de esforços. Reduz o valor dos contadores de momentos e do contador de esforços em 1. Tem efeito inverso da função addMoment().
Parâmetros: numEsforc, numMomentAplic, divCargas.
Retorna: Remoção de um conjunto de elementos.
```
#### canvasincial():
```
Descrição: Desenha a viga inicial do Canvas utilizando o FabricJS. Carrega a imagem inicial na página e redimensiona a mesma de acordo com o tamanho do Canvas
Parâmetros: canvas, oImg.
Retorna: Adiciona a imagem no canvas.
```
#### AvaliaCondicoesIniciaisDaViga():
```
Descrição: Função que avalia se as restrições iniciais do problema estão sendo cumpridas. Caso não estejam, mostra uma mensagem de erro para o usuário.
Parâmetros: numApoios, numApoios1Grau, numApoios2Grau, numApoios3Grau.
Retorna: Chama função DesenhaProblemaProposto().
```
#### DesenhaProblemaProposto():
```
Descrição: Função que encapsula todas as funções de desenho pré-cálculo da lógica do problema.
Parâmetros: void.
Retorna: Chama Funções de Desenho.
```
#### preencheArrayEDesenhaApoios():
```
Descrição: Função que adiciona ao Canvas, a quantidade especificada de apoios do problema, e preenche array contendo suas posições.
Parâmetros: Array1GrauPos, Array2GrauPos, Array3GrauPos.
Retorna: Parâmetros populados com os valores, e Canvas com os apoios em suas posições.
```
#### preencheArrayEDesenhaForcas():
```
Descrição: Função que adiciona ao Canvas, a quantidade especificada de Forças do problema, e preenche array contendo suas posições e intensidades.
Parâmetros: ArrayForcaPos, ArrayForcaInt, ArrayCarrPosI, ArrayCarrPosF, ArrayCarrIntI, ArrayCarrIntF, ArrayMomenPos, ArrayMomenInt.
Retorna: Parâmetros populados com os valores, e Canvas com os apoios em suas posições.
```
#### FuncaoGeraArrayDeDivisoesReduzidas():
```
Descrição: Função que gera uma array com todas as posições dos nós da estrutura reticulada.
Parâmetros: ArrayDivVigaSemRepeticao.
Retorna: Organiza parâmetro em ordem crescente remove os valores repetidos.
```
#### TransformaCarregamentosEmForcas(ArrayDivVigaSemRepeticao):
```
Descrição: Função que transforma o carregamento em forças e momento nos nós onde está aplicado.
Parâmetros: ArrayForcasEMomentosAplicados.
Retorna: Adiciona intensidade das forças e momentos resultantes do carregamento no parâmetro.
```
#### RepeticaoPreencheArray(ArrayDivVigaSemRepeticao):
```
Descrição: Função para preenchimento de vetor com intensidades aplicadas nos nós.
Parâmetros: ArrayForcasEMomentosAplicados.
Retorna: Popula array parametrizada com valores das forças e momentos aplicados em cada nó.
```
#### DesenhaCotas():
```
Descrição: Desenha as cotas da viga no Canvas.
Parâmetros: canvas.
Retorna: Desenhos das cotas da viga no Canvas com id dos parâmetros.
```
#### CalculaProblemaProposto():
```
Descrição: Função que inicia os cálculos da viga.
Parâmetros: void.
Retorna: Inicializa as funções MatrizGlobal(), RepeticaoZeraMatrizGlobal(),   CalculaCoeficientes(), mostrarExplicacao() e PlotaGrafico().
```


## Examples
- [ai/size-limit](https://github.com/ai/size-limit) - Project logo, clear description, screenshot, step-by-step installing instructions.

## Articles
- ["Art of Readme - Learn the art of writing quality READMEs."](https://github.com/noffle/art-of-readme) - *Stephen Whitmore*

## Tools

- [Common Readme](https://github.com/noffle/common-readme) - A common readme style for Node. Includes a guide and a readme generator.

## Creating GIFs

Embedding an animated gif in your README quickly demonstrates what your project does and catches the reader's eye.  Here are a few programs that can help you quickly create gifs for your project:

- [Gifox](https://gifox.io) - **$4** - Cleanest UI, hotkeys, lots of advanced features


## Contribute

Contributions are always welcome!
Please read the [contribution guidelines](contributing.md) first.

## License

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, [Matias Singers](http://mts.io) has waived all copyright and related or neighboring rights to this work.


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>

    <style>
    html, body {
      width: 100%;
      height: 100%;
      margin: 0px;
      border: 0;
    }
    </style>


    <!-- Bootstrap -->
    <link rel="stylesheet" href="http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/CSS/bootstrap.min.css">
    <!-- <link rel="stylesheet" href="file:///C:/Users/Spencer/Desktop/Datas/PROJETO TCC/CODIGO PRINCIPAL/CSS/bootstrap.min.css"> -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/JS/moment.js">
    <!-- <script src="http://fabricjs.com/lib/fabric.js"></script> -->
    <script src="http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/JS/fabric.min.js"></script>
    <script type="text/javascript" src="http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/JS/fabricExtensions.js"></script>
    <script type="text/javascript" src="http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/JS/moment.js"></script>





    <script type="text/x-mathjax-config"> <!-- Biblioteca para escrever equação com LaTeX -->
      MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
      MathJax.Hub.Config({
      CommonHTML: { linebreaks: { automatic: true } },
      "HTML-CSS": { linebreaks: { automatic: true } },
             SVG: { linebreaks: { automatic: true } }
    });
    MathJax.Hub.Register.StartupHook("End Jax",function () {
      var BROWSER = MathJax.Hub.Browser;
      var jax = "HTML-CSS";
      if (BROWSER.isMSIE && BROWSER.hasMathPlayer) jax = "NativeMML";
      return MathJax.Hub.setRenderer(jax);
    });
    </script>

    <script type="text/javascript" async
      src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_CHTML">
    </script>


  </head>
  <body onload="canvasincial();startcanvas();">
    <!-- <div class="jumbotron text-center">
      <h1>My First Bootstrap Page</h1>
      <p>Resize this responsive page to see the effect!</p>
    </div> -->

    <!-- <ul class="nav nav-tabs">
      <li role="presentation" class="active"><a href="#">Simulacao de Viga</a></li>
      <li role="presentation"><a href="#">Exemplos Prontos</a></li>
      <li role="presentation"><a href="#">Messages</a></li>
    </ul>
    <b>  .</b> -->

<div class="container-fluid">

    <div class="row">

      <div class="col-md-3">
        <div class="panel-group" role="tablist" aria-multiselectable="true">
          <div class="panel panel-default">
            <div class="panel-heading bg-info" role="tab" id="headingOne">
              <h4 class="panel-title">
                <a role="button" data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <b>Adicione novos Apoios!</b>
                </a>
              </h4>
            </div>
            <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
              <div class="panel-body">
                <table class="table" width="100%">
                  <tr>
                    <td style="padding: 2px">
                      <!-- <button type="button" class="btn btn-default" name="button"> -->
                      <button class="btn btn-default btn-no-border" width="100%">
                        <img src="http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/Img/RoleteIcone.png" alt="..." height="60" width="60" onclick="addPrimGrau()">
                      </button>
                    </td>
                    <td style="padding: 2px">
                      <button class="btn btn-default btn-no-border">
                      <!-- <button type="button" class="btn btn-default" name="button"> -->
                        <img src="http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/Img/Apoio2Icone.png" alt="..." height="60" width="60" onclick="addSeguGrau()">
                      </button>
                    </td>
                    <td style="padding: 2px">
                      <button class="btn btn-default btn-no-border">
                      <!-- <button type="button" class="btn btn-default" name="button"> -->
                        <img src="http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/Img/EngasteIcone.png" alt="..." height="60" width="60" onclick="addTercGrau()">
                      </button>
                    </td>
                  </tr>
                </table>

                <p><div class="" id="divApoios"></div></p>
                <p><button id="limpaApoios" class="btn btn-danger btn-block" type="button" name="button" onclick="LimpaApoios();">Apagar todos os Apoios</button></p>

              </div>
            </div>
          </div>


          <div class="panel panel-default">
            <div class="panel-heading bg-info" role="tab" id="heading-2">
              <h4 class="panel-title">
                <a role="button" data-toggle="collapse" href="#collapse-2" aria-expanded="true" aria-controls="collapse-2">
                  <b>Adicione novas Cargas!</b>
                </a>
              </h4>
            </div>
            <div id="collapse-2" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading-2">
              <div class="panel-body">

                <table class="table" width="100%">
                  <tr>
                    <td style="padding: 2px">
                      <button class="btn btn-default btn-no-border" width="100%">
                        <img src="http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/Img/PIcone.png" alt="..." height="60" width="60" onclick="addForca()">
                      </button>
                    </td>
                    <td style="padding: 2px">
                      <button class="btn btn-default btn-no-border">
                        <img src="http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/Img/carregamentoIcone.png" alt="..." height="60" width="60" onclick="addCarreg()">
                      </button>
                    </td>
                    <td style="padding: 2px">
                      <button class="btn btn-default btn-no-border">
                        <img src="http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/Img/momento SH Icone.png" alt="..." height="60" width="60" onclick="addMoment()">
                      </button>
                    </td>
                  </tr>
                </table>

                <p><div class="" id="divCargas"></div></p>
                <p><button id="limpaCargas" class="btn btn-danger btn-block" type="button" name="button" onclick="LimpaCargas();">Apagar todas as Cargas</button></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="panel-group" role="tablist" aria-multiselectable="true">
          <div class="panel panel-default">
            <div class="panel-heading bg-info" role="tab" id="heading2">
              <h4 class="panel-title">
                <a role="button" data-toggle="collapse" href="#collapse2" aria-expanded="true" aria-controls="collapse2">
                  <b>Montagem da viga</b>
                </a>
              </h4>
            </div>
            <div id="collapse2" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading2">
              <div id="PainelDaCanvas" class="panel-body">

                <canvas id="canvas" style='position:absolute;'></canvas>
                <button class="btn btn-primary btn-block" type="button" name="button" onclick="CalculaProblemaProposto()"><b> Resolver! </b></button>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="panel-group" role="tablist" aria-multiselectable="true">
          <div class="panel panel-default">
            <div class="panel-heading bg-info" role="tab" id="heading3">
              <h4 class="panel-title">
                <a role="button" data-toggle="collapse" href="#collapse3" aria-expanded="true" aria-controls="collapse3">
                  <b>Montagem do Perfil</b>
                </a>
              </h4>
            </div>
            <div id="collapse3" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading3">
                <ul class="list-group">
                  <li class="list-group-item">
                    <p>
                      <b>Comprimento da Viga (m)</b>
                      <input id="inputComprimentoViga" type="number" class="form-control" width="40%" placeholder="Comprimento da Viga em Metros">
                    </p>

                    <p>
                      <b>Momento de Inércia (m^4)</b>
                      <input id="inputInercia" type="number" class="form-control" width="40%" placeholder="Inércia da Viga em Metros^4">
                    </p>

                    <p>
                      <b>Modulo de Elasticidade (GPa)</b>
                      <input id="inputElasticidade" type="number" class="form-control" width="40%" placeholder="Elasticidade da Viga em GPa">
                    </p>

                    <p><button class="btn btn-primary btn-block btn-lg" type="button" name="button" onclick="LimpaCanvas();canvasincial();DesenhaProblemaProposto();">Desenhe sua Viga!</button></p>

                  </li>
                  <!-- <li class="list-group-item">
                    <p><button class="btn btn-primary btn-block btn-md" type="button" name="button" style="width: 49%, display: inline-block" data-toggle="modal" data-target="#ModalCalculadora">Calculadora de Inércia</button></p>
                    <p><button class="btn btn-primary btn-block btn-md" type="button" name="button" style="width: 49%, display: inline-block" data-toggle="modal" data-target="#ModalMateriais">Materiais Padrão</button></p>
                  </li> -->
                </ul>
              <!-- </div> -->
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="row">

        <div class="col-md-12">
          <div class="panel-group" role="tablist" aria-multiselectable="true">
            <div class="panel panel-default">
              <div class="panel-heading bg-info" role="tab" id="row2headingOne">
                <h4 class="panel-title">
                  <a role="button" data-toggle="collapse" href="#row2collapseOne" aria-expanded="true" aria-controls="row2collapseOne">
                    <b>Resultado dos Calculos!</b>
                  </a>
                </h4>
              </div>
              <div id="row2collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="row2headingOne">
                <div class="panel-body">


                  <div id="texto-explicacao" style="width: 92%">
                  </div>

                  <div id="container" style="min-width: 90%; margin: 0 auto"></div>
                  <div id="container2" style="min-width: 90%; margin: 0 auto"></div>
                  <div id="container3" style="min-width: 90%; margin: 0 auto"></div>
                  <div id="container4" style="min-width: 90%; margin: 0 auto"></div>


                </div>
              </div>
            </div>
          </div>
        </div>
    </div>






    <!-- Modal CALCULADORA-->
    <!-- <div class="modal fade bs-example-modal-lg" id="ModalCalculadora" tabindex="-1" role="dialog" aria-labelledby="ModalCalculadoraLabel">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="ModalCalculadoraLabel">Modal title</h4>
          </div>
          <div class="modal-body">
            Calculadora
            <div class="row">
              <ul class="nav nav-tabs" role="tablist">
                <li role="presentation"><button type="button" class="btn btn-default" href="#VigaI" aria-controls="VigaI" role="tab" data-toggle="tab">
                  <img src="file:///http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/Img/Imagens\Imagens Temporarias\secao-transversal-I-e1406825272180.jpg" alt=""></button></li></li>
                <li role="presentation"><button type="button" class="btn btn-default" href="#VigaH" aria-controls="VigaH" role="tab" data-toggle="tab">
                  <img src="file:///http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/Img/Imagens\Imagens Temporarias\secao-transversal-I-e1406825272180.jpg" alt=""></button></li>
                <li role="presentation"><button type="button" class="btn btn-default" href="#VigaRetangular" aria-controls="VigaRetangular" role="tab" data-toggle="tab">
                  <img src="file:///http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/Img/Imagens\Imagens Temporarias\seccao-transversal-retangular-e1406825573410.jpg" alt=""></button></li>
                <li role="presentation"><button type="button" class="btn btn-default" href="#Viga Retangular Tubular" aria-controls="Viga Retangular Tubular" role="tab" data-toggle="tab">
                  <img src="file:///http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/Img/Imagens\Imagens Temporarias\secao-transversal-tubular-retangular-e1406825178498.jpg" alt=""></button></li>
                <li role="presentation"><button type="button" class="btn btn-default" href="#Viga I" aria-controls="Viga I" role="tab" data-toggle="tab">
                  <img src="file:///http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/Img/Imagens\Imagens Temporarias\secao-transversal-circular-cheia.jpg" alt=""></button></li>
                <li role="presentation"><button type="button" class="btn btn-default" href="#Viga I" aria-controls="Viga I" role="tab" data-toggle="tab">
                  <img src="file:///http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/Img/Imagens\Imagens Temporarias\secao-transversal-circular-vazada-e1406825255997.jpg" alt=""></button></li>
                <li role="presentation"><button type="button" class="btn btn-default" href="#Viga I" aria-controls="Viga I" role="tab" data-toggle="tab">
                  <img src="file:///http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/Img/Imagens\Imagens Temporarias\secao-transversal-C-e1406825295678.jpg" alt=""></button></li>
                <li role="presentation"><button type="button" class="btn btn-default" href="#Viga I" aria-controls="Viga I" role="tab" data-toggle="tab">
                  <img src="file:///http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/Img/Imagens\Imagens Temporarias\secao-transversal-T-e1406825311501.jpg" alt=""></button></li>
              </ul>
            </div>
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane active" id="home">Clique em um botão e escolha seu Perfil!</div>
              <div role="tabpanel" class="tab-pane" id="VigaI">Viga I</div>
              <div role="tabpanel" class="tab-pane" id="VigaH">Viga H</div>
              <div role="tabpanel" class="tab-pane" id="VigaRetangular">...</div> -->
              <!-- <div role="tabpanel" class="tab-pane" id="Viga Retangular Tubular">...</div> -->
            <!-- </div>
          </div>

          <script>
            $('#myTabs a').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
            })
          </script>

          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div> -->


    <!-- Modal MATERIAIS -->
    <!-- <div class="modal fade bs-example-modal-sm" id="ModalMateriais" tabindex="-1" role="dialog" aria-labelledby="ModalMateriaisLabel">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="ModalMateriaisLabel">Modal title</h4>
          </div>
          <div class="modal-body">
            Lista de Materiais
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div> -->


    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/JS/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/JS/bootstrap.min.js"></script>
    <script type="text/javascript" src="http://rawgit.com/UCL-MecSol/VigaElemFinitos/master/BACKEND.js"></script>
    <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/mathjs/3.16.3/math.js"></script>

    <script src="http://code.highcharts.com/highcharts.js"></script>
    <script src="http://code.highcharts.com/modules/exporting.js"></script>
    <script>
    (function startcanvas(){

      window.addEventListener('load', resizeCanvas, false);
      window.addEventListener('resize', resizeCanvas, false);

      function resizeCanvas() {
        var widthser = $('#PainelDaCanvas').width();
        canvas.setHeight(window.innerHeight*0.45);
        canvas.setWidth(widthser);
        canvas.renderAll();
        canvas.clear();
        canvasincial()
        DesenhaProblemaProposto()
      }

      // resize on init
      resizeCanvas();
    })();
    </script>

  </body>
</html>
