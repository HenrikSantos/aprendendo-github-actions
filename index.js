const core = require('@actions/core');

try {
  const name = core.getInput('nome');
  const greeting = `Olá, ${name}! Bem-vindo(a) à ação personalizada de saudação.`;
  core.setOutput('greeting', greeting);
} catch (error) {
  core.setFailed(error.message);
}
