// eslint-disable-next-line @typescript-eslint/no-require-imports
const globals = require("globals");


module.exports = {
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended", // Regras recomendadas para TypeScript
    "plugin:import/errors", // Habilita o plugin de importação para capturar erros
    "plugin:import/warnings", // Habilita alertas para importações inválidas
  ],
  plugins: [
    "@typescript-eslint", // Plugin do TypeScript
    "import", // Plugin de importação
  ],
  globals: {
    ...globals.browser,
    ...globals.node,
  },
  rules: {
    "semi": [2, "always"], // Garante que cada instrução tenha ponto e vírgula
    "import/no-unresolved": "off", // Desativa a regra de caminhos de importação não resolvidos
    "indent": ["error", 2, { // Regras de indentação
      "SwitchCase": 1, // Indentação dos cases no switch
      "VariableDeclarator": 1, // Indentação de variáveis
      "outerIIFEBody": 1, // Indentação de funções IIFE (Immediately Invoked Function Expressions)
      "MemberExpression": 1, // Indentação de objetos e arrays
      "FunctionDeclaration": { "parameters": "first", "body": 1 }, // Indentação de funções
      "FunctionExpression": { "parameters": "first", "body": 1 }, // Indentação de funções anônimas
    }],
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }], // Ignora variáveis começando com "_"
  },
  overrides: [
    {
      files: ["**/*.ts"],
      parser: "@typescript-eslint/parser", // Usando o parser correto para TypeScript
      plugins: ["@typescript-eslint"], // Adiciona o plugin do TypeScript
    },
  ],
};