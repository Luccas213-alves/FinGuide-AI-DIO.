# FinGuide AI - Assistente Financeiro Inteligente

Este projeto é um chatbot financeiro completo com IA generativa, focado em relacionamento com o usuário e educação financeira.

## Estrutura do Projeto

- `/src`: Frontend em React + TypeScript + Tailwind CSS + Shadcn UI.
- `/src/lib/gemini.ts`: Integração direta com a API do Gemini (usada no preview).
- `/backend`: Exemplo de backend em Python (FastAPI) conforme solicitado.
- `/components`: Componentes modulares de Chat, Simuladores e FAQ.

## Tecnologias Utilizadas

- **Frontend:** React 19, Vite, Tailwind CSS, Framer Motion, Lucide React.
- **IA:** Google Gemini API (@google/genai).
- **UI:** Shadcn UI.
- **Backend (Opcional):** Python + FastAPI.

## Como Rodar Localmente

### Frontend (Node.js)

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure sua chave de API no arquivo `.env`:
   ```env
   GEMINI_API_KEY=sua_chave_aqui
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

### Backend (Python - Opcional)

1. Vá para a pasta backend:
   ```bash
   cd backend
   ```
2. Crie um ambiente virtual e instale as dependências:
   ```bash
   python -m venv venv
   source venv/bin/activate  # No Windows: venv\Scripts\activate
   pip install fastapi uvicorn google-generativeai python-dotenv
   ```
3. Rode o servidor:
   ```bash
   python main.py
   ```

## Funcionalidades

- **Chat Inteligente:** Respostas contextualizadas sobre finanças.
- **Simuladores:** Cálculo de juros compostos e parcelamentos.
- **FAQ:** Perguntas frequentes sobre produtos financeiros.
- **UX Polida:** Interface limpa, responsiva e com animações suaves.
- **Segurança:** Avisos educativos e proteção de dados sensíveis.

## Exemplos de Uso

- **Input:** "O que é CDI?"
- **Output:** "O CDI é uma taxa que os bancos usam para emprestar dinheiro entre si. É muito comum ver investimentos rendendo '100% do CDI'..."

- **Input:** "Como faço para economizar?"
- **Output:** "Uma ótima dica é a regra dos 50-30-20: 50% para necessidades, 30% para desejos e 20% para dívidas ou investimentos."
