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

# Definindo um fluxo de trabalho
Em um arquivo YAML, você pode definir um fluxo de trabalho (workflow) para automatizar um conjunto de tarefas relacionadas. Um fluxo de trabalho pode ser composto por vários jobs, que são unidades de trabalho independentes. Cada job pode ter um conjunto de passos (steps) que serão executados sequencialmente.

Aqui está um exemplo de definição de um fluxo de trabalho básico:

``` yaml
name: Exemplo fluxo de trabalho
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    name: Construir
    runs-on: ubuntu-latest
    steps:
      - name: Checkout do repositório
        uses: actions/checkout@v3
      - name: Executar compilação
        run: make
      - name: Executar testes
        run: make test

  deploy:
    name: Implantação
    runs-on: ubuntu-latest
    steps:
      - name: Checkout do repositório
        uses: actions/checkout@v3
      - name: Implantação em produção
        run: make deploy
```

Nesse exemplo, temos um fluxo de trabalho com dois jobs: "build" e "deploy". O fluxo de trabalho é acionado quando ocorre um push na branch "main" ou quando é aberto um pull request também na branch "main".

O job "build" executa em um ambiente ubuntu-latest e possui três passos: fazer checkout do repositório, executar a compilação e executar os testes.

O job "deploy" também executa em um ambiente ubuntu-latest e possui dois passos: fazer checkout do repositório e realizar a implantação em produção.

# Especificando eventos desencadeadores
Em um arquivo YAML, é possível especificar os eventos que desencadearão a execução do fluxo de trabalho. Esses eventos podem ser ações como push em uma branch específica, abertura de um pull request, criação de uma tag, entre outros.

Aqui está um exemplo de especificação de eventos desencadeadores:

yaml
Copy code
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
Nesse exemplo, o fluxo de trabalho será acionado quando ocorrer um push na branch "main" ou quando for aberto um pull request também na branch "main". É possível adicionar outras condições e especificar eventos adicionais conforme necessário.

# Configurando jobs e steps
Em um arquivo YAML, é possível configurar jobs e seus respectivos passos (steps). Os jobs representam unidades de trabalho independentes que serão executadas em paralelo ou sequencialmente, dependendo da configuração. Os passos são as tarefas que serão executadas dentro de cada job.

Aqui está um exemplo de configuração de jobs e steps:

``` yaml
jobs:
  build: # <-- Job build
    name: Construir
    runs-on: ubuntu-latest
    steps:
      - name: Checkout do repositório
        uses: actions/checkout@v3

      - name: Executar compilação
        run: make

      - name: Executar testes
        run: make test

  deploy: # <-- Job deploy
    name: Implantação
    runs-on: ubuntu-latest
    steps:
      - name: Checkout do repositório
        uses: actions/checkout@v3

      - name: Implantação em produção
        run: make deploy
```

Nesse exemplo, temos dois jobs: "build" e "deploy". Cada job possui um nome, especificação do ambiente de execução (no caso, ubuntu-latest) e uma lista de steps.

Cada step tem um nome descritivo e pode executar uma ação pré-definida (como o "checkout" do repositório) ou executar um comando personalizado (usando a palavra-chave "run").

Usando ações pré-definidas e personalizadas
No contexto de fluxos de trabalho YAML, as ações são unidades de trabalho reutilizáveis que podem ser usadas nos steps dos jobs. Existem ações pré-definidas disponibilizadas pela comunidade e também é possível criar ações personalizadas para atender às necessidades específicas do projeto.

Aqui está um exemplo de uso de ações pré-definidas e personalizadas:

``` yaml
steps:
  - name: Checkout do repositório
    uses: actions/checkout@v3

  - name: Executar compilação
    run: make

  - name: Executar testes
    run: make test

  - name: Enviar notificação
    uses: minhas-actions/acoes-personalizadas/notificacao@v1
    with:
      mensagem: "Fluxo de trabalho concluído com sucesso"
```
Nesse exemplo, o step "Checkout do repositório" utiliza uma ação pré-definida chamada "checkout" fornecida pelo repositório "actions/checkout@v3". Os steps "Executar compilação" e "Executar testes" executam comandos personalizados usando a palavra-chave "run".

O último step, "Enviar notificação", utiliza uma ação personalizada chamada "notificacao" fornecida pelo repositório "minhas-actions/acoes-personalizadas/notificacao@v1". É possível passar parâmetros para a ação usando a palavra-chave "with" e especificando os valores desejados.

Aprenda mais sobre actions personalizadas em: [Desenvolvimento de ações personalizadas](https://github.com/HenrikSantos/aprendendo-github-actions/tree/actions-personalizadas).

Esses são apenas exemplos básicos da estrutura e configuração de arquivos YAML para fluxos de trabalho. Existem muitas outras opções e recursos disponíveis para personalizar e automatizar suas tarefas de desenvolvimento.