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
#### MatrizGlobal():
```
Descrição: Função para gerar matriz de rigidez global referente ao problema proposto apartir da matriz de rigidez local de cada elemento (fig. 1). Faz a somatória das matrizes de rigidez local em diagonal, gerando assim a matriz de rigidez global (fig. 2)
Parâmetros: KGlobal, KLocal.
Retorna: Matriz de rigidez global do problema.
```
#### RepeticaoZeraMatrizGlobal(ArrayDivVigaSemRepeticao):
Descrição: Função que gera a matriz de rigidez global reduzida à partir da matriz de rigidez global, possibilitando assim, a resolução do problema.
Parâmetros: KGlobalModificada, KGlobal.
Retorna: Matriz de rigidez global reduzida.
#### CalculaDeslocamentosInclinacoesEEsforcos():
Descrição: À partir da equação matricial abaixo, gera a array de deslocamentos utilizando a Matriz de rigidez local reduzida, e com a array de deslocamentos e Matriz de rigidez original gera a array contendo os esforços aplicados e as reações dos apoios.
\left\{F\right\}=\left[K\right].{X}

Parâmetros: KGlobalModificada, KGlobalOriginal, ArrayDeDeslocamentosEInclinacoes, ArrayEsforcosEReacoes.
Retorna: Array de deslocamentos e inclinações preenchida e array de Esforços e Reações preenchida.
#### CalculaCoeficientes(ArrayDivVigaSemRepeticao):
Descrição: A partir da equação matricial abaixo e dos deslocamentos e inclinações de cada nó, encontra as constantes para cada elemento, e agrupa em uma matriz para gerar os gráficos.

Parâmetros: MatrizValoresA, MatrizCoeficientesDasEquacoes, ArrayDeDeslocamentosEInclinacoes.
Retorna: Matriz de coefientes preenchidas.
#### mostrarExplicacao(explicacao):
Descrição: Utilizando do método de renderização matemática do MathJax, a explicação das matrizes é escrita através de loop.
Parâmetros: explicacao,
Retorna: Cria explicação para problema proposto e salva no parâmetro definido.
#### PlotaGrafico():
Descrição: Utilizando um gráfico da biblioteca HighCharts, plotamos as funções abaixo para cada trecho da viga.
v\left(x\right)=C_1+C_2.x+C_3.\ x^2+C_4.x^3
v\prime\left(x\right)=C_2+{2.C}_3.\ x+{3.C}_4.x^2
v^{\prime\prime}(x)={2.C}_3+{6.C}_4.x
v^{\prime\prime\prime}(x)={6.C}_4
Parâmetros: MatrizCoeficientesDasEquacoes.
Retorna: Plotagem dos gráficos a partir das constantes do parâmetro.




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
