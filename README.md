# SOFTWARE ACADÊMICO PARA RESOLUÇÃO DE VIGA GENÉRICA PELO MÉTODO DOS ELEMENTOS FINITOS
## Introdução
Durante sua formação acadêmica e na vida profissional, muitas vezes o Engenheiro Mecânico e Civil encontra-se com problemas estruturais de difícil resolução. Durante a fase acadêmica ou exercendo sua profissão, é necessário resolver problemas mais complexos, como estruturas de Vigas e Pórticos, que necessitam de uma parte matemática mais robusta, e nem sempre o engenheiro tem rapidamente à mão um software que auxilie na resolução, ou que possa validar os cálculos já previamente feitos. Esse é um problema que pode ser ocasional na vida do engenheiro se o mesmo trabalhar na área de projetos ou se o acadêmico estiver cursando as disciplinas de Resistência dos Materiais I e II.
Portanto, esse trabalho se baseia em fornecer um software didático, prático, open-source para dimensionamento e cálculos, que possa suprir a necessidade de ambos os usuários.

## Instalação
Para este software não é necessário instalação, o mesmo é executado diretamente no link [viga.ucl.br](viga.ucl.br).

## 1. Desenvolvido com:
- [BootStrap](https://getbootstrap.com/) - Project logo, clear description, screenshot, step-by-step installing instructions.
- [MathJS](http://mathjs.org/) - Project logo, clear description, screenshot, step-by-step installing instructions.
- [MathJax](https://www.mathjax.org/) - Project logo, clear description, screenshot, step-by-step installing instructions.
- [HighCharts](https://github.com/ai/size-limit) - Project logo, clear description, screenshot, step-by-step installing instructions.
- [FabricJS](http://fabricjs.com/) - Project logo, clear description, screenshot, step-by-step installing instructions.
- [JQuery](https://jquery.com/) - Project logo, clear description, screenshot, step-by-step installing instructions.

## 2. Lista de Variáveis

### numApoios
  Contador para número total de apoios aplicados no problema.
  Tipo: Integer.
  Valor inicial: 0.

### numEsforc
  Contador para número total de Esforços aplicados no problema.

### numApoios1Grau
  Contador para número total de apoios de 1º grau aplicados no problema.

### numApoios2Grau
  Contador para número total de apoios 2º grau aplicados no problema.

### numApoios3Grau
  Contador para número total de apoios 3º grau aplicados no problema.

### numForcasAplic
  Contador para número total de Forças aplicados no problema.
### numCarregAplic
  Contador para número total Carregamentos aplicados no problema.
### numMomentAplic
  Contador para número total de Momentos aplicados no problema.

### Array1GrauPos
  Array contendo as posições onde foram aplicadas os Apoios de 1º grau
### Array2GrauPos
  Array contendo as posições onde foram aplicadas os Apoios de 2º grau
### Array3GrauPos
  Array contendo as posições onde foram aplicadas os Apoios de 3º grau

### ArrayForcaPos
  Array contendo as posições onde foram aplicadas as Forças, na respectiva ordem que foram adicionadas.
### ArrayForcaInt
  Array contendo as intensidades das Forças, na respectiva ordem que foram adicionadas.

### ArrayCarrPosI
  Array contendo as posições iniciais onde foram aplicados carregamentos, na respectiva ordem que foram adicionadas.
### ArrayCarrPosF
  Array contendo as posições finais onde foram aplicados carregamentos, na respectiva ordem que foram adicionadas.
### ArrayCarrIntI
  Array contendo as intensidades iniciais dos carregamentos aplicados, na respectiva ordem que foram adicionadas.
### ArrayCarrIntF
  Array contendo as intensidades finais dos carregamentos aplicados, na respectiva ordem que foram adicionadas.

### ArrayMomenPos
  Array contendo as posições onde foram aplicados Momentos, na respectiva ordem que foram adicionadas.
### ArrayMomenInt
  Array contendo as intensidades dos Momentos, na respectiva ordem que foram adicionadas.


### imgObj = new Image(); Variavel de imagem, contendo a imagem da viga inicial.
### imgObj2 = new Image(); Variavel de imagem, contendo a imagem do vetor de Força.
### tamvig: Variavel que contém o valor de input do tamanho da viga proposta.
### canvas: Variavel contendo o objeto Canvas do FabricJS.

### ArrayForcasEMomentosAplicados
  Array contendo os valores de Forças e momentos em cada nó, após a transformação da viga em estrutura reticulada.
### ArrayDivVigaSemRepeticao
  Array contendo o valor da posição em X de cada nó.
### ArrayDeDeslocamentosEInclinacoes = undefined; Array contendo os valores após cálculos de cada deslocamento e inclinação em cada nó.
### ArrayForcasEReacoes = undefined; Array contendo os valores após cálculos de cada Forca e momento aplicado ou reacional, em cada nó.
### Elast = 1; Variável contendo o valor do módulo de elasticidade que foi definido pelo usuário para o problema. (Contém valor inicial 1 para evitar erros de cálculo.)
### Inerc = 1; Variável contendo o valor do módulo de inércia que foi definido pelo usuário para o problema. (Contém valor inicial 1 para evitar erros de cálculo.)


### KGlobal
  Matriz contendo a matriz de Rigidez global para manipulação dentro do código.
### KGlobalModificada
  Matriz que salva a matriz de Rigidez global modificada, após manipulação dentro do código.
### KGlobalOriginal
  Matriz que salva a matriz de Rigidez global original, após manipulação dentro do código.
### explicacao = ""; Variável que contém a string de explicação, que vai ser renderizada pelo MathJax, mostrando assim, o resultado do software.

### MatrizCoeficientesDasEquacoes= []; Matriz contendo os coeficientes Utilizados para gerar as Equações.


# Awesome README [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)
> A curated list of awesome READMEs

Elements in beautiful READMEs include, but are not limited to: images, screenshots, GIFs, text formatting, etc.

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
