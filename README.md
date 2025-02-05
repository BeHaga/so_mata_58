# Projeto - SO
(✅) (⌛) (❌)

**Equipe:** Bruno Henrique, Vitor Renato e Rafael Lins

**Cronograma** - pode ser revisado via commit:
- **Dia 27/01:** Planejamento e setup do projeto (✅)
    - Instalação do Vite, configurações das dependências e criação do README
- **Dia 28/01:** Criação dos componentes processos e escolhas do sistema (✅)
- **Dia 29/01:** Aplicação de onClick e validação e pré-set dos inputs, armazenamento dos dados inseridos no card (✅)
- **Dia 30/01:** Ajustes no front-end e inserção do escalonador Fifo (✅)
- **Dia 31/01:** Implementação do gráfico de Gantt, escalonador SJF e alguns ajustes no algoritmo (✅)
- **Dia 01/02:** Inserção do escalonador Round Robin (✅)
- **Dia 02/02:** Ajustes no front-end, adição do Disco e RAM, implementação do delay no gráfico de Gantt (✅)
- **Dia 03/02:** Transferência do Disco para a RAM (✅)
- **Dia 04/02:** Inserção do escalonador EDF (✅)
- **Dia 05/02:** Correção nos escalonadores EDF e RR (✅)

## 1. Descrição Geral do Projeto
- Cada processo deve ter até 10 páginas (entrada do usuário). Cada página tem 4K de tamanho. A RAM tem 200 K de memória.

- Crie a abstração de DISCO para utilização da memória virtual. Caso ocorra falta de página, utilize N u.t. para o uso do Disco (O grupo está livre para a criação de qualquer abstração extra que se mostrar necessária.).

- Os processos só executam se todas as suas páginas estiverem na RAM.

- Deve-se criar o gráfico de Gantt para mostrar as execuções dos processos, visualização da CPU e da RAM

- Deve-se criar o gráfico de uso da RAM e do Disco, mostrando as página presentes em tempo-real.

- A resposta deve ser dada em função do turnaround médio (tempo de espera + tempo de execução)

- Colocar delay para verificar a execução

- A linguagem de programação é de escolha do grupo.

## 2. Linguagens de programação usadas

- TypeScript
    - Framework: React
    - Bibliotecas:
        - useState e useEffect
        - async/await (para criar os delays)

## 3. Como instalar as dependências

- Usar Vite 6.1.1 para facilitar o desenvolvimento
    - ``npm create vite@latest`` (instalar o Vite)
        - React
        - TypeScript
    - ``npm install`` (instalar as dependências)
    - ``npm run dev`` (para rodar o projeto)
- Usar .gitignore para excluir os arquivos desnecessários como o node_modules
- Commits claros
- Tentar comentar o código usando comentários do tipo JSDoc (❌)