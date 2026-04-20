import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getChatResponse } from '@/src/lib/gemini';
import { Message } from '@/src/types/finance';

const SUGGESTIONS = [
  "Como economizar dinheiro?",
  "O que é reserva de emergência?",
  "Como funcionam os juros?",
  "Dicas para sair das dívidas"
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      content: 'Olá! Sou seu assistente FinGuide. Como posso te ajudar com suas finanças hoje?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    const response = await getChatResponse(text, history);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      content: response || 'Desculpe, não consegui processar sua pergunta.',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <Card className="h-[600px] flex flex-col border-none shadow-lg bg-white/50 backdrop-blur-sm">
      <CardHeader className="border-b bg-primary/5 py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            FinGuide AI
          </CardTitle>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Online
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full p-4" viewportRef={scrollRef}>
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                      m.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-tr-none' 
                        : 'bg-muted text-foreground rounded-tl-none'
                    }`}>
                      {m.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="bg-muted p-3 rounded-2xl rounded-tl-none flex gap-1">
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="p-4 border-t flex flex-col gap-3 bg-white">
        {messages.length < 5 && !isLoading && (
          <div className="flex flex-wrap gap-2 mb-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="text-xs bg-muted hover:bg-primary/10 hover:text-primary transition-colors px-3 py-1.5 rounded-full border border-transparent hover:border-primary/20"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        
        <div className="flex w-full gap-2">
          <Input
            placeholder="Pergunte algo sobre finanças..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={() => handleSend()} disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground justify-center">
          <AlertCircle className="w-3 h-3" />
          <span>Nunca compartilhe senhas ou dados sensíveis.</span>
        </div>
      </CardFooter>
    </Card>
  );
}
