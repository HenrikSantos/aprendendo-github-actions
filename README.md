# Estrutura básica do arquivo YAML
O YAML (YAML Ain't Markup Language) é um formato de serialização de dados legível por humanos, frequentemente utilizado para configurar pipelines de integração contínua e outras tarefas relacionadas à automação de processos. A estrutura básica de um arquivo YAML é composta por pares de chave-valor, onde os valores podem ser de diferentes tipos, como strings, números, listas ou objetos aninhados.

Aqui está um exemplo básico de estrutura de um arquivo YAML:

``` yaml
chave1: valor1
chave2: valor2
chave3:
  - item1
  - item2
chave4:
  subchave1: valor3
  subchave2: valor4
```

Nesse exemplo, temos algumas chaves (chave1, chave2, chave3, chave4) e seus respectivos valores. A chave3 possui uma lista de itens (item1 e item2), enquanto a chave4 contém um objeto aninhado com subchaves (subchave1 e subchave2) e seus valores correspondentes.

- Documentação do [YAML](https://yaml.org/).

# Definindo um fluxo de trabalho
Em um arquivo YAML, você pode definir um fluxo de trabalho (workflow) para automatizar um conjunto de tarefas relacionadas. Um fluxo de trabalho pode ser composto por vários jobs, que são unidades de trabalho independentes. Cada job pode ter um conjunto de passos (steps) que serão executados sequencialmente.

Aqui está um exemplo de definição de um fluxo de trabalho básico:

``` yaml
name: Exemplo fluxo de trabalho
on: 
  push: # Event
    branches:
      - main
  pull_request: # Event
    branches:
      - main

jobs:
  build: # Job
    name: Construir
    runs-on: ubuntu-latest # Runner
    steps:
      - name: Checkout do repositório # Step
        uses: actions/checkout@v3
      - name: Executar compilação # Step
        run: npm ci
      - name: Executar testes # Step
        run: npm run test
      - name: Executar build # Step
        run: npm run build

  deploy: # Job
    name: Implementação
    runs-on: ubuntu-latest # Runner
    needs: build # Jobs rodam em paralelo, a não ser que você use o needs.
    steps:
      - name: Checkout do repositório # Step
        uses: actions/checkout@v3
      - name: Implementação em produção # Step
        run: npm run deploy
```

Nesse exemplo, temos um fluxo de trabalho com dois jobs: "build" e "deploy". O fluxo de trabalho é acionado quando ocorre um push na branch "main" ou quando é aberto um pull request também na branch "main".

O job "build" executa em um ambiente ubuntu-latest e possui três passos: fazer checkout do repositório utilizando a [action checkout](https://github.com/marketplace/actions/checkout), executar os testes e executar a compilação.

O job "deploy" também executa em um ambiente ubuntu-latest e possui dois passos: fazer checkout do repositório utilizando a [action checkout](https://github.com/marketplace/actions/checkout) e realizar a implantação em produção.

saiba mais em:
- [understanding-github-actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions)
- [about-workflows](https://docs.github.com/pt/actions/using-workflows/about-workflows)

# Especificando eventos desencadeadores
Em um arquivo YAML, é possível especificar os eventos que desencadearão a execução do fluxo de trabalho. Esses eventos podem ser ações como push em uma branch específica, abertura de um pull request, criação de uma tag, entre outros.

Aqui estão alguns exemplos de especificação de eventos desencadeadores:
``` yaml
on:
  push:
    branches:
      - main
      - develop
  pull_request:
    branches:
      - main
  release:
    types:
      - created
```
Nesse exemplo, o fluxo de trabalho será acionado quando ocorrer um push nas branches "main" ou "develop". Além disso, quando um pull request for aberto na branch "main" ou quando uma nova release for criada, o fluxo de trabalho também será desencadeado.

Você pode usar diferentes combinações de eventos para acionar o fluxo de trabalho de acordo com suas necessidades. Aqui estão alguns exemplos adicionais:

- Acionar o fluxo de trabalho somente quando uma tag for criada:
```yaml
on:
  create:
    tags:
      - "*"
```

- Acionar o fluxo de trabalho somente quando ocorrer um push em uma branch específica e houver modificações nos diretórios /src e /docs:
```yaml
on:
  push:
    branches:
      - main
      - develop
    paths:
      - 'src/**'
      - 'docs/**'
```

- Acionar o fluxo de trabalho somente quando um comentário for adicionado em um pull request:

``` yaml
on:
  issue_comment:
    types:
      - created
  pull_request:
    types:
      - synchronize
```

Ao usar o evento issue_comment, você pode verificar o conteúdo do comentário e tomar ações específicas com base nele.

Lembrando que esses são apenas exemplos e você pode adaptar a configuração dos eventos de acordo com os requisitos do seu projeto. O GitHub Actions oferece uma variedade de eventos disponíveis para acionar fluxos de trabalho, permitindo automações poderosas em resposta a diferentes ações no seu repositório.

Saiba mais em:
- [events-that-trigger-workflows](https://docs.github.com/pt/actions/using-workflows/events-that-trigger-workflows).

# Configurando jobs e steps
Em um arquivo YAML, é possível configurar jobs e seus respectivos passos (steps). Os jobs representam unidades de trabalho independentes que serão executadas em paralelo ou sequencialmente, dependendo da configuração. Os passos são as tarefas que serão executadas dentro de cada job.

Aqui está um exemplo de configuração de jobs e steps:

``` yaml
jobs:
  build: # Job build
    name: Construir
    runs-on: ubuntu-latest
    steps:
      - name: Checkout do repositório # Step 01
        uses: actions/checkout@v3
      
      - name: Executar compilação # Step 02
        run: npm run
      
      - name: Executar testes # Step 03
        run: npm run test

  deploy: # Job deploy
    name: Implantação
    runs-on: ubuntu-latest
    steps: # Steps
      - name: Checkout do repositório # Step 01
        uses: actions/checkout@v3
      
      - name: Implantação em produção # Step 02
        run: npm run deploy
```

Nesse exemplo, temos dois jobs: "build" e "deploy". Cada job possui um nome, especificação do ambiente de execução (no caso, ubuntu-latest) e uma lista de steps.

Cada step tem um nome descritivo e pode executar uma ação pré-definida (como o "checkout" do repositório) ou executar um comando personalizado (usando a palavra-chave "run").

# Lógica de programação em actions

No contexto do GitHub Actions, dentro do run, é possível rodar a linguagem bash, além disso é possível utilizar o if para rodar, ou não, determinadas etapas

- Esse workflow verifica se a variavel de ambiente é igual a my-value

``` yaml
jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    env:
      MY_VARIABLE: my-value
    steps:
      - name: Verificar se a variável é igual
        if: ${{ env.MY_VARIABLE == 'my-value' }}
        run: |
          echo "A variável é igual a 'my-value'"
          # Ações a serem executadas se a condição for verdadeira

      - name: Verificar se a variável é diferente
        if: ${{ env.MY_VARIABLE != 'my-value' }}
        run: |
          echo "A variável é diferente de 'my-value'"
          # Ações a serem executadas se a condição for falsa
```

O env é apenas um dos muitos contextos que podemos utilizar para acessar informações

Saiba mais em: [boas-praticas#Utilizando segredos e variáveis de ambiente](https://github.com/HenrikSantos/aprendendo-github-actions/tree/boas-praticas).

- Esse workflow verifica se o comentário de uma issue possui a palavra 'deploy'

``` yaml
name: Novo comentário em issue criado!

on:
  issue_comment:
    types: [created]

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    env:
      MY_VARIABLE: my-value
    steps:
      - name: Verificar variável
        if: ${{ github.event_name  == 'issue_comment' && contains(github.event.comment.body, 'deploy') == true }} 
        run: |
          echo "A variável é igual a 'my-value'"
          # Ações a serem executadas se a condição for verdadeira
```

- [[ ... ]]: É uma construção do Bash que inicia uma condição. O uso de [[ ... ]] permite comparar valores e realizar verificações.

- \$ e chaves duplas \${{ }}: Em YAML, as variáveis são acessadas usando a sintaxe \$ e chaves duplas \${{ }}. Nesse caso, estamos acessando as variáveis de contexto do GitHub Actions. Por exemplo, github.event_name representa o nome do evento que desencadeou o fluxo de trabalho, enquanto github.event.comment.body representa o corpo do comentário.
  - [webhook-events-and-payloads#issue_comment](https://docs.github.com/pt/webhooks-and-events/webhooks/webhook-events-and-payloads#issue_comment)

- Comparação de igualdade: A expressão == é usada para comparar se duas strings são iguais. No exemplo, estamos comparando se o github.event_name é igual a 'issue_comment'.

- &&: É um operador lógico "E" usado para combinar condições. Ambas as condições (evento é 'issue_comment' e o corpo do comentário contém a palavra-chave 'deploy') devem ser verdadeiras para que a condição seja verdadeira.

- contains(): É uma função auxiliar do GitHub Actions que verifica se uma string contém outra string. No exemplo, estamos usando contains(github.event.comment.body, 'deploy') para verificar se o corpo do comentário contém a palavra-chave 'deploy'.

- == true: Estamos comparando se a expressão contains(github.event.comment.body, 'deploy') é igual a true. Isso garante que a condição só seja verdadeira se o comentário contiver a palavra-chave "deploy".

- then e else: São palavras-chave usadas para definir as ações a serem executadas quando a condição for verdadeira (then) ou falsa (else).

Saiba mais em: [expressions](https://docs.github.com/pt/actions/learn-github-actions/expressions).

Obs: 
  - Os runners já vem com várias linguagens e ferramentas instaladas: 
    - [Runner Images](https://github.com/actions/runner-images/tree/main).
    - [ubuntu 20.04](https://github.com/actions/runner-images/blob/main/images/linux/Ubuntu2204-Readme.md).
    - [macOS 13](https://github.com/actions/runner-images/blob/main/images/macos/macos-13-Readme.md).
    - [windows 2022](https://github.com/actions/runner-images/blob/main/images/win/Windows2022-Readme.md).
  - É possível utilizar o docker com as actions:
    - [Executando actions em um runner](https://github.com/HenrikSantos/aprendendo-github-actions/tree/execucao).
    - [about-service-containers](https://docs.github.com/pt/actions/using-containerized-services/about-service-containers)

# Contextos

## Você pode acessar as informações de contexto nos fluxos de trabalho e nas ações

Os contextos são uma forma de acessar informações sobre execuções de fluxo de trabalho, variáveis, ambientes dos executores, trabalhos e etapas. Cada contexto é um objeto que contém propriedades, que podem ser cadeia de caracteres ou outros objetos.

  - **github**: 
    - Exemplo de conteúdo do contexto github:
      ````json
      {
        "token": "***",
        "job": "dump_contexts_to_log",
        "ref": "refs/heads/my_branch",
        "sha": "c27d339ee6075c1f744c5d4b200f7901aad2c369",
        "repository": "octocat/hello-world",
        "repository_owner": "octocat",
        "repositoryUrl": "git://github.com/octocat/hello-world.git",
        "run_id": "1536140711",
        "run_number": "314",
        "retention_days": "90",
        "run_attempt": "1",
        "actor": "octocat",
        "workflow": "Context testing",
        "head_ref": "",
        "base_ref": "",
        "event_name": "push",
        "event": {
          ...
        },
        "server_url": "https://github.com",
        "api_url": "https://api.github.com",
        "graphql_url": "https://api.github.com/graphql",
        "ref_name": "my_branch",
        "ref_protected": false,
        "ref_type": "branch",
        "secret_source": "Actions",
        "workspace": "/home/runner/work/hello-world/hello-world",
        "action": "github_step",
        "event_path": "/home/runner/work/_temp/_github_workflow/event.json",
        "action_repository": "",
        "action_ref": "",
        "path": "/home/runner/work/_temp/_runner_file_commands/add_path_b037e7b5-1c88-48e2-bf78-eaaab5e02602",
        "env": "/home/runner/work/_temp/_runner_file_commands/set_env_b037e7b5-1c88-48e2-bf78-eaaab5e02602"
      }
      ```
    - A propriedade event possui um objeto com as propriedades do evento que desencadeou o inicio do workflow, você pode ver quais propriedades cada evento possúi aqui: [webhook-events-and-payloads](https://docs.github.com/pt/webhooks-and-events/webhooks/webhook-events-and-payloads)
    - Para obter mais informações, confira [Contexto github](https://docs.github.com/pt/actions/learn-github-actions/contexts#github-context).

  - env:	Contém variáveis definidas em um fluxo de trabalho, um trabalho ou uma etapa. Para obter mais informações, confira [Contexto env](https://docs.github.com/pt/actions/learn-github-actions/contexts#env-context).

  - vars:	Contém variáveis definidas nos níveis do repositório, da organização ou do ambiente. Para obter mais informações, confira [Contexto vars](https://docs.github.com/pt/actions/learn-github-actions/contexts#vars-context).

  - **job**:
    - O contexto job contém informações sobre o trabalho atualmente em execução.
    - Exemplo de conteúdo do contexto job utilizando um container PostgreSQL:
      ``` json
      {
        "status": "success",
        "container": {
          "network": "github_network_53269bd575974817b43f4733536b200c"
        },
        "services": {
          "postgres": {
            "id": "60972d9aa486605e66b0dad4abb638dc3d9116f566579e418166eedb8abb9105",
            "ports": {
              "5432": "49153"
            },
            "network": "github_network_53269bd575974817b43f4733536b200c"
          }
        }
      }
      ```
    - Sem nenhuma configuração extra o contexto job apenas conterá a propriedade status.
    - Para obter mais informações, confira [Contexto job](https://docs.github.com/pt/actions/learn-github-actions/contexts#job-context).

  - **jobs**:
    - O contexto job contém informações sobre o trabalho atualmente em execução.
    - O contexto jobs só está disponível em fluxos de trabalho reutilizáveis.
    - Exemplo de conteúdo do contexto jobs
      ``` json
      {
        "example_job": {
          "result": "success",
          "outputs": {
            "output1": "hello",
            "output2": "world"
          }
        }
      }
      ```
    - Para obter mais informações, confira [Contexto jobs](https://docs.github.com/pt/actions/learn-github-actions/contexts#jobs-context).

  - **steps**:	
    - Informações sobre as etapas que foram executadas no trabalho atual.
    - O contexto steps contém informações sobre as etapas do trabalho atual que têm uma id especificada e que já foram executadas.
    - Exemplo de conteúdo do contexto steps
      ``` json
      {
        "checkout": {
          "outputs": {},
          "outcome": "success",
          "conclusion": "success"
        },
        "generate_number": {
          "outputs": {
            "random_number": "1"
          },
          "outcome": "success",
          "conclusion": "success"
        }
      }
      ```
    - Para obter mais informações, confira [Contexto steps](https://docs.github.com/pt/actions/learn-github-actions/contexts#steps-context).

  - **runner**:	
    - O contexto runner contém informações sobre o executor que está executando o trabalho atual.
    - Exemplo de conteúdo do contexto runner:
      ``` json
      {
        "os": "Linux",
        "arch": "X64",
        "name": "GitHub Actions 2",
        "tool_cache": "/opt/hostedtoolcache",
        "temp": "/home/runner/work/_temp"
      }
      ```
    - Para obter mais informações, confira [Contexto runner](https://docs.github.com/pt/actions/learn-github-actions/contexts#runner-context).

  - **secrets**:
    - Por padrão, o contexto secrets apenas guarda o githu_token, mas é possivel adicionar outras chaves nas configurações do repositório.
    - Exemplo de conteúdo do contexto secrets:
      ``` json
      {
        "github_token": "***",
        "SEU_SEGREDO": "***",
      }
      ```
    - Para obter mais informações, confira [Contexto secrets](https://docs.github.com/pt/actions/learn-github-actions/contexts#secrets-context).

  - **strategy**:	Informações sobre a estratégia de execução da matriz para o trabalho atual. Para obter mais informações, confira [Contexto strategy](https://docs.github.com/pt/actions/learn-github-actions/contexts#strategy-context).

  - **matrix**:	
    - Para fluxos de trabalho com uma matriz, o contexto matrix contém as propriedades definidas no arquivo de fluxo de trabalho que se aplicam ao trabalho atual. Por exemplo, se você configurar uma matriz com as chaves os e node, o objeto de contexto matrix incluirá as propriedades os e node com os valores que estão sendo usados para o trabalho atual.
    ``` json
    {
      "os": "ubuntu-latest",
      "node": 16
    }
    ```
    - Não há propriedades padrão no contexto matrix, apenas aquelas que são definidas no arquivo de fluxo de trabalho.
    - Para obter mais informações, confira Contexto matrix.

  - **needs**:	Contém as saídas de todos os trabalhos que são definidos como uma dependência do trabalho atual. Para obter mais informações, confira [Contexto needs](https://docs.github.com/pt/actions/learn-github-actions/contexts#needs-context).

  - **inputs**:	Contém as entradas de um fluxo de trabalho reutilizável ou acionado manualmente. Para obter mais informações, confira [Contexto inputs](https://docs.github.com/pt/actions/learn-github-actions/contexts#inputs-context).

## Obs
  - Esses são todos os contextos disponíveis, porém discorri apenas os que considero mais relevantes.
  - Todas as informações foram retiradas da página oficial do github [Context](https://docs.github.com/pt/actions/learn-github-actions/contexts).

# Usando actions pré-definidas e personalizadas
No contexto de fluxos de trabalho YAML, as actions são unidades de trabalho reutilizáveis que podem ser usadas nos steps dos jobs. Existem actions pré-definidas disponibilizadas pela comunidade e também é possível criar actions personalizadas para atender às necessidades específicas de um projeto.

Aqui está um exemplo de uso de actions pré-definidas e personalizadas:

O objetivo desse fluxo de trabalho é criar uma ação personalizada que recebe um nome como entrada e retorna uma saudação como saída.

``` yaml
# Usando actions externas.
name: Fluxo de Trabalho com Ação Personalizada

on:
  push:
    branches:
      - main

steps:
  - name: Checkout do repositório
    uses: actions/checkout@v3 # action pré-definida

  - name: Cria uma nova saudação
    uses: ./.github/actions/hello-world-action # action personalizada
    with:
      nome: "Henrik"

  - name: Exibir Saudação
      run: echo "${{ steps.saudacao.outputs.greeting }}" # acessa a saudação criada pela action personalizada
```

``` yaml
# Action Personalizada - A famosa função de saudação.

name: "Action Hello World"
description: "Recebe uma o nome da pessoa e devolve uma saudação"
inputs:
  nome: # id do input
    description: "Nome da pessoa"
    required: true
    default: "Sem nome"
outputs:
  saudacao: # id do output
    description: "Path to results file"
runs:
  using: 'node16'
  main: 'index.js'
```

``` js
// Script em JS - usa o actions/core para manipular as variaveis.

const core = require('@actions/core');

try {
  const name = core.getInput('nome');
  const greeting = `Olá, ${name}! Bem-vindo(a) à ação personalizada de saudação.`;
  core.setOutput('greeting', greeting);
} catch (error) {
  core.setFailed(error.message);
}
```

O fluxo de trabalho é acionado quando ocorre um push para a branch "main". Consiste em três etapas:

1. **Checkout do repositório**: Esta etapa usa uma ação predefinida chamada "actions/checkout@v3" para obter o código do repositório.

2. **Cria uma nova saudação**: Nesta etapa, uma ação personalizada definida localmente em `./.github/actions/hello-world-action` é usada. Esta ação personalizada recebe o nome "Henrik" como entrada.

3. **Exibir Saudação**: Esta etapa executa um comando `echo` para exibir a saudação criada pela ação personalizada.

## Ação Personalizada - Action Hello World

A ação personalizada chamada "Action Hello World" recebe um nome como entrada e retorna uma saudação como saída.

### Inputs

- `nome` (obrigatório): Nome da pessoa. O valor padrão é definido como "Sem nome".

### Outputs

- `saudacao`: Caminho para o arquivo de resultados.

### Script em JavaScript

O script em JavaScript (`index.js`) manipula as variáveis usando o pacote `actions/core`. Ele recebe o nome fornecido, cria uma saudação com base nesse nome e define a saudação como saída. Se ocorrer algum erro, a ação falhará e o erro será capturado.

Saiba mais em: 
  - [Desenvolvimento de ações personalizadas](https://github.com/HenrikSantos/aprendendo-github-actions/tree/actions-personalizadas).

Esses são apenas exemplos básicos da estrutura e configuração de arquivos YAML para fluxos de trabalho. Existem muitas outras opções e recursos disponíveis para personalizar e automatizar suas tarefas de desenvolvimento.