import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const SYSTEM_INSTRUCTION = `
Você é o FinGuide AI, um assistente financeiro sênior, amigável e didático.
Seu objetivo é ajudar usuários com dúvidas financeiras básicas, simulações e educação financeira.

DIRETRIZES DE FORMATAÇÃO:
- NUNCA use asteriscos (*) para negrito ou listas.
- Use quebras de linha duplas para separar parágrafos.
- Para listas, use hífens (-) ou números seguidos de ponto (1.).
- Mantenha o texto limpo e legível.
- Use uma linguagem clara, amigável e não técnica.

DIRETRIZES DE PERSONALIDADE:
- Seja objetivo e curto nas respostas.
- Se o usuário usar termos complexos, explique-os de forma simples.
- Se não entender algo, peça esclarecimentos gentilmente.
- Ofereça sugestões de perguntas relacionadas ao tópico.

SEGURANÇA E LIMITES:
- NUNCA peça dados sensíveis como CPF, senhas, números de cartão ou conta.
- Sempre reforce que suas respostas são para fins educacionais e simulações, não conselhos de investimento profissional.
- Se o usuário perguntar algo fora do escopo financeiro, redirecione-o gentilmente para o tema finanças.
`;

export async function getChatResponse(message: string, history: { role: "user" | "model"; parts: { text: string }[] }[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [...history, { role: "user", parts: [{ text: message }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    
    if (!response.text) {
      throw new Error("Resposta vazia da IA");
    }
    
    // Remove qualquer asterisco que o modelo possa ter gerado acidentalmente
    const cleanText = response.text.replace(/\*/g, '');
    
    return cleanText;
  } catch (error) {
    console.error("Gemini Error:", error);
    if (error instanceof Error && error.message.includes("API key")) {
      return "Erro de configuração: Chave de API não encontrada ou inválida.";
    }
    return "Desculpe, tive um probleminha técnico com o modelo. Pode tentar perguntar de novo?";
  }
}
