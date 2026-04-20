export interface Message {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
}

export interface SimulationResult {
  totalAmount: number;
  interestAmount: number;
  monthlyPayment?: number;
  installments?: {
    number: number;
    payment: number;
    interest: number;
    principal: number;
    balance: number;
  }[];
}

export const FAQ_DATA = [
  {
    question: "Como abrir uma conta?",
    answer: "Para abrir uma conta, geralmente você precisa ser maior de 18 anos, ter um documento de identidade válido (RG ou CNH) e um comprovante de residência. Muitas instituições permitem a abertura 100% digital pelo app."
  },
  {
    question: "O que são juros compostos?",
    answer: "Juros compostos são os 'juros sobre juros'. Diferente dos juros simples, que calculam o valor apenas sobre o valor inicial, os compostos calculam sobre o valor inicial mais os juros acumulados dos períodos anteriores."
  },
  {
    question: "Qual a diferença entre cartão de crédito e débito?",
    answer: "No débito, o valor é retirado da sua conta na hora. No crédito, você 'pega emprestado' do banco para pagar depois, geralmente em uma fatura mensal única ou parcelada."
  },
  {
    question: "O que é o CDI?",
    answer: "CDI significa Certificado de Depósito Interbancário. É uma taxa que os bancos usam para emprestar dinheiro entre si. Muitos investimentos, como o CDB, usam o CDI como referência de rendimento."
  }
];
