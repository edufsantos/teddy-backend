# Painel Administrativo

## Visão Geral

Este projeto é um painel administrativo para gerenciar clientes. Ele permite:

- Inserir um nome e acessar a lista de clientes cadastrados.
- Criar, visualizar, atualizar e excluir clientes.
- Visualizar detalhes dos clientes selecionados.

## Tecnologias Utilizadas

### Front-End:

- React + Vite
- TypeScript
- TailwindCSS (para estilização)
- ShadCN (componentes)
- Testes end-to-end (NÃO IMPLEMENTADO - AINDA)

### Back-End:

- NestJS
- CQRS
- TypeORM + PostgreSQL
- Swagger para documentação
- Observabilidade com ferramentas apropriadas(NÃO IMPLEMENTADO - AINDA)
- Testes unitários
- BullMQ para escalabilidade

### Gerais:

- Docker e Docker Compose para facilitar a execução
- AWS para infraestrutura
- Deploy das aplicações
- Arquitetura desenhada considerando escalabilidade

## Tempo Estimado de Desenvolvimento

### Tempo total: **2 a 5 semanas (1 - 2 Sprints)**, considerando os diferenciais.

- **Semana 1:** Configuração inicial (Boilerplate), setup de tecnologias, definição da arquitetura.
- **Semana 2:** Desenvolvimento do CRUD no backend e frontend.
- **Semana 3:** Melhorias no front, integração com AWS, testes unitários.
- **Semana 4:** Implementação de diferenciais como observabilidade, mensageria e testes e2e.
- **Semana 5:** Ajustes finais, otimizações e Deploy e validações finais.

## Equipe Necessária

**2 a 3 desenvolvedores**

- 1 **Desenvolvedor Full Stack Sênior** (para arquitetura, integrações e decisões técnicas críticas)
- 1 **Desenvolvedor Front-End Pleno ou Sênior** (para desenvolvimento do painel e testes)
- 1 **Desenvolvedor Back-End Pleno ou Sênior** (para regras de negócio, API, banco de dados e mensageria)

## Rodando o Projeto - Back-End

### Pré-requisitos:

- Node.js (versão recente)
- pnpm ou yarn (gerenciador de pacotes)
- Navegador atualizado para acessar a aplicação
- Editor de código (recomendado: Visual Studio Code)
- Extensão do VS Code para ESLint (opcional, mas recomendado)

### Passos :

1. Clone este repositório:
   ```sh
   git clone https://github.com/edufsantos/teddy-front-end
   ```
2. Acesse a pasta do projeto:
   ```sh
   cd teddy-front-end
   ```
3. Instale as dependencias
   ```sh
   pnpm install
   ```
4. Suba os containers com Docker Compose:
   ```sh
   docker-compose up -d
   ```
5. Acesse o frontend em `http://localhost:3000` e a documentação do Swagger em `http://localhost:3000/docs`

## Melhorias Futuras

- Implementação de autenticação com JWT
- Controle de permissões para diferentes usuários
- Suporte a múltiplos bancos de dados

## Contato

Caso tenha dúvidas ou sugestões, entre em contato pelo e-mail: `eduardosantosifms@gmail.com`.
