## Feature-Oriented SPL
Este repositório refere-se ao desenvolvimento de um projeto piloto sobre as áreas de pesquisa listadas abaixo para exemplificar o capítulo Design de Pesquisa do meu trabalho de conclusão de curso de Engenharia de Computação da Universidade Federal do Recôncavo da Bahia (UFRB).

### Áreas de pesquisa
- Feature-Oriented Software Product Line;
- JavaScript Frameworks (Angular and Ionic);
- Variability Implementation Techniques.

**Obs.:** Para executar qualquer projeto, primeiro faça um `$ npm install` dentro da pasta do projeto para instalar os módulos node e criar o arquivo package-lock.json


#### sem-tecnica:
Este repositório contém a implementação do software descrito no documento de requisitos (também presente no repositório) sem a implementação de alguma técnica de variabilidade. Até então, este projeto piloto descrito no documento de requisitos não apresenta vestígios de um projeto que possa ser variável, por conta da sua simplicidade. No entanto, forçamos que ele seja variável para obtermos os três possíveis modelos de features: as features obrigatórias, opcionais e alternativas, como é demonstrado no "feature-model-revised.drawio". Onde você pode [acessar aqui](https://www.draw.io/) e importar esse modelo, para visualizar o feature model.


#### parameters:
Este repositório apresenta a primeira técnica de implementação de variabilidade sobre o projeto piloto após o modelo de features criado. Utilizando arquivo de configuração para Angular, conseguimos realizar a variabilidade com base na literatura de *Apel et al. (2013)*. Neste caso, derivamos um software com base na seleção de features realizadas previamente.


#### design-patterns:
Os design patterns desenvolvidos foram o template-method e strategy. Esses repositórios reutilizam do projeto sem técnica implementando os conceitos de classes abstratas e interfaces respectivamente. Assim, implementamos a variabilidade conforme o modelo de features apenas nas features alternativa e opcional.


#### frameworks white-box e black-box:
Não foi possível implementar, pelo Ionic e Angular não possui um comando CLI que juntasse as features desenvolvidas separadamente em um único projeto/software.


#### component-service:
Nativamente Angular e Ionic promovem o uso de Component. Para o Ionic o uso mais fácil desse conceito é o Page. Assim, reimplementamos de forma simplificada utilizando os recursos de Page e Component dentro de uma Page, para exemplificar a variabilidade.
