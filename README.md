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
#### imgObj2 = new Image();
Variável de imagem, contendo a imagem do vetor de Força.
```
  Descrição: Variável de imagem, contendo a imagem do vetor de Força.
  Tipo: Imagem.
  Valor inicial: _void_.
```
#### tamvig:
```
  Descrição: Variável que contém o valor de input do tamanho da viga proposta.
  Tipo: Integer.
  Valor inicial: 0.
  ```
#### canvas:
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
#### Inerc = 1;
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
