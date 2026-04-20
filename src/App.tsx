/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Bot, Calculator, HelpCircle, Wallet, TrendingUp, ShieldCheck } from 'lucide-react';
import Chat from './components/Chat';
import Simulators from './components/Simulators';
import FAQ from './components/FAQ';
import { Toaster } from '@/components/ui/sonner';
import { motion } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-primary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Wallet className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">FinGuide <span className="text-primary">AI</span></h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Seu Futuro Financeiro</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-slate-100 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
              Ambiente Seguro & Educativo
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Navigation (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-2">
            <nav className="space-y-1">
              {[
                { id: 'chat', label: 'Conversar', icon: Bot },
                { id: 'simulators', label: 'Simuladores', icon: Calculator },
                { id: 'faq', label: 'Dúvidas Frequentes', icon: HelpCircle },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === item.id 
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/10' 
                      : 'text-muted-foreground hover:bg-white hover:text-primary'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Dica do Dia</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Comece sua reserva de emergência guardando pelo menos 10% da sua renda mensal. Pequenos passos levam a grandes conquistas!
              </p>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            <div className="lg:hidden mb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="simulators">Simular</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'chat' && <Chat />}
              {activeTab === 'simulators' && <Simulators />}
              {activeTab === 'faq' && (
                <div className="space-y-6">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold">Dúvidas Frequentes</h2>
                    <p className="text-muted-foreground">Respostas rápidas para as perguntas mais comuns.</p>
                  </div>
                  <FAQ />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 FinGuide AI. Desenvolvido para educação financeira.
          </p>
          <div className="mt-2 flex justify-center gap-4 text-xs text-muted-foreground">
            <span>Privacidade</span>
            <span>Termos de Uso</span>
            <span>Contato</span>
          </div>
        </div>
      </footer>

      <Toaster position="top-right" />
    </div>
  );
}

