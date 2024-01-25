# Votação BBB API

Este é um projeto de API para gerenciamento de votação, desenvolvido utilizando Spring Boot, MongoDB para armazenamento de dados e Kafka para comunicação assíncrona entre os serviços. O sistema é destinado ao gerenciamento de votações para participantes de um reality show, inspirado no Big Brother Brasil (BBB).

## Configurações

As configurações do MongoDB e Kafka são definidas nos arquivos `application.properties` para as APIs de votação (`spring.data.mongodb.*` e `spring.kafka.producer.*`) e para o microserviço de votação (`spring.data.mongodb.*` e `spring.kafka.consumer.*`). Certifique-se de configurar corretamente os ambientes de desenvolvimento e produção antes de executar o sistema.

## Estrutura do Projeto

O projeto está estruturado para facilitar a escalabilidade e a manutenção do código, mantendo uma clara separação de responsabilidades entre os controladores, modelos, repositórios e serviços.

### Controladores

#### ParametroController

Este controlador trata das operações relacionadas aos parâmetros do sistema. Possui dois endpoints principais:

- **POST /api/parametros/salvar:** Recebe um objeto `ParametroModel` no corpo da requisição e o salva no banco de dados.

- **GET /api/parametros/consultar:** Recebe um parâmetro chave como parâmetro de consulta e retorna o objeto `ParametroModel` correspondente, se existir.

#### ParticipanteController

O controlador `ParticipanteController` lida com as operações relacionadas aos participantes. Possui três endpoints principais:

- **POST /api/participantes/salvar:** Recebe um objeto `ParticipanteModel` no corpo da requisição e o salva no banco de dados.

- **GET /api/participantes/consultar:** Recebe um parâmetro id como parâmetro de consulta e retorna o objeto `ParticipanteModel` correspondente, se existir.

- **GET /api/participantes/todos:** Retorna uma lista de todos os participantes cadastrados no sistema.

#### VotacaoController

O controlador `VotacaoController` trata das operações relacionadas às votações. Possui um único endpoint:

- **POST /api/votacao:** Recebe um objeto `ParticipanteModel` no corpo da requisição, verifica se o participante existe no banco de dados e, em caso afirmativo, envia o participante para o serviço de votação assíncrona (`VotacaoService`). O serviço, por sua vez, publica o voto no tópico Kafka "votacao".

### Modelos

#### ParametroModel

Representa um parâmetro do sistema. Possui uma chave única (`chave`) e um valor associado (`valor`).

#### ParticipanteModel

Representa um participante do sistema. Possui um identificador único (`id`) e um nome associado (`nome`).

### Repositórios

- `ParametroRepository:` Interface que estende `MongoRepository` para operações relacionadas a `ParametroModel`.

- `ParticipanteRepository:` Interface que estende `MongoRepository` para operações relacionadas a `ParticipanteModel`.

### Serviços

#### VotacaoService

O serviço `VotacaoService` é responsável por adicionar eventos de votação. Ele recebe um participante e envia uma mensagem assíncrona para o tópico Kafka "votacao".

## Como Executar o Projeto

Certifique-se de ter o ambiente configurado corretamente com as propriedades do MongoDB e Kafka. Execute a aplicação Spring Boot e verifique se os serviços estão disponíveis nos endpoints mencionados nos controladores.

Para contribuir ou relatar problemas, sinta-se à vontade para criar issues e pull requests neste repositório.

Divirta-se votando! 🎉

# VotacaoApp React Component

Este é um componente React chamado VotacaoApp, que representa a parte do front-end de uma aplicação de votação. Este componente utiliza o estado do React para gerenciar a lista de participantes, o participante selecionado e interage com uma API backend para realizar operações de votação.

## Funcionalidades Principais

### Listagem de Participantes
Utiliza o estado `participantes` para armazenar a lista de participantes, que é obtida por meio de uma chamada à API no método `useEffect`.

### Seleção de Participante
Permite selecionar um participante clicando no botão "Selecionar".

### Votação
Ao clicar no botão "Votar", envia um voto para o backend através da API. Exibe mensagens de alerta em caso de sucesso ou erro.

## Interface e Estado

### Interface Participante
Define a estrutura de um participante com id e nome.

### Estado `participantes`
Armazena a lista de participantes obtida da API.

### Estado `selectedParticipante`
Armazena o id do participante selecionado.

## Requisições à API

- Chamada GET: Obtém a lista de participantes ao montar o componente.

- Chamada POST: Envia um voto para a API quando o botão "Votar" é clicado.

## Observações

Certifique-se de substituir `api` pelo objeto correto de chamada à API, configurado de acordo com sua aplicação.

As mensagens de alerta podem ser substituídas por tratamento de erros mais robusto ou por componentes de UI, dependendo das necessidades do projeto.

