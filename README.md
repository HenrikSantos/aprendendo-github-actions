## O que são GitHub Actions

GitHub Actions é um serviço de integração contínua e entrega contínua (CI/CD) fornecido pelo GitHub. Ele permite automatizar o fluxo de trabalho de desenvolvimento de software, ajudando equipes a criar, testar e implantar aplicativos de forma mais eficiente.

## Benefícios de usar Actions

Os benefícios de usar o GitHub Actions são diversos:

- **Automação do fluxo de trabalho:** As Actions permitem que você defina um conjunto de etapas automatizadas que são executadas sempre que ocorre um evento específico no seu repositório do GitHub. Isso inclui eventos como push de código, criação de pull requests ou até mesmo um cronograma regular.

- **Integração com o ecossistema do GitHub:** O GitHub Actions está profundamente integrado ao GitHub, o que significa que você pode aproveitar os recursos existentes, como issues, pull requests e revisões de código, em conjunto com suas Actions. Isso facilita a implementação de práticas recomendadas de desenvolvimento e colaboração em seu fluxo de trabalho.

- **Configuração flexível:** Você pode criar fluxos de trabalho personalizados usando arquivos YAML. Isso permite que você defina etapas, dependências, variáveis de ambiente e até mesmo personalize as ações executadas em seu fluxo de trabalho.

- **Grande variedade de ações pré-construídas:** O GitHub Actions possui um marketplace onde você pode encontrar uma ampla gama de ações pré-construídas para realizar tarefas comuns, como testes, implantações em nuvem, notificações e muito mais. Isso ajuda a acelerar o processo de desenvolvimento, pois você não precisa criar tudo do zero.
## Como as Actions funcionam

As GitHub Actions são definidas e configuradas usando um arquivo YAML. Esse arquivo, geralmente chamado de arquivo de fluxo de trabalho (workflow file), contém as instruções para as ações que serão executadas, esses arquivos devem estar dentro do diretório .github/workflows.

Agora, vamos entender alguns termos importantes:

1. **Fluxo de trabalho:** Um fluxo de trabalho é uma sequência de ações que são executadas quando um evento específico ocorre no repositório do GitHub. No arquivo de fluxo de trabalho, você define quais eventos acionarão a execução das ações.

2. **Job:** Um job é uma unidade de trabalho dentro de um fluxo de trabalho. Você pode ter vários jobs em um fluxo de trabalho, e eles são executados em paralelo ou em sequência, dependendo das dependências entre eles. Cada job é composto por uma ou mais etapas (steps).

3. **Step:** Um step é uma etapa individual dentro de um job. Cada step consiste em uma única ação que é executada. As ações podem ser executadas diretamente no ambiente hospedado pelo GitHub ou em um runner, que é uma máquina virtual ou física gerenciada por você.

4. **Runner:** Um runner é uma instância do GitHub Actions que executa os jobs e steps definidos em seus fluxos de trabalho. Os runners podem ser hospedados pelo GitHub ou por você em sua própria infraestrutura.

O arquivo de fluxo de trabalho define o fluxo de execução das ações, as dependências entre os jobs, as ações a serem executadas em cada step e as variáveis de ambiente necessárias. Com a flexibilidade do arquivo YAML, você pode personalizar completamente o comportamento das suas ações de acordo com as necessidades do seu projeto.

mais em: [using-workflows](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions).

## Estrutura simples de uma action
``` yml
# Arquivo de Fluxo de Trabalho (myFirstAction.yml)

name: Exemplo de Fluxo de Trabalho
# Event
on:
  push:
    branches:
      - introducao

# Jobs
jobs:
  # Job
  build: # Job name
    # Runner
    runs-on: ubuntu-latest
    steps:
      # Step 1
      - name: Verificar código
        run: echo "Executando verificação do código..."

      # Step 2
      - name: Construir aplicativo
        run: echo "Executando a construção do aplicativo..."

      # Step 3
      - name: Testar aplicativo
        run: echo "Executando testes do aplicativo..."

      # Step 4
      - name: Enviar status code 0 para que o github entenda que deu tudo certo
        run: exit 0
```
<img src="./images/pull_request%20steps.png" alt="Descrição da imagem" width="60%" height="auto">

<img src="./images/pull_request%20checks%20passed.png" alt="Descrição da imagem" width="60%" height="auto">

