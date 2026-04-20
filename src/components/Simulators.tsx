import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, TrendingUp, CreditCard, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export default function Simulators() {
  const [amount, setAmount] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [result, setResult] = useState<{ total: number; interest: number; monthly?: number } | null>(null);

  const calculateCompoundInterest = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t)) return;

    const total = p * Math.pow(1 + r, t);
    setResult({
      total: total,
      interest: total - p
    });
  };

  const calculateInstallments = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t)) return;

    // PMT = P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyRate = r;
    const pmt = (p * monthlyRate * Math.pow(1 + monthlyRate, t)) / (Math.pow(1 + monthlyRate, t) - 1);
    
    setResult({
      total: pmt * t,
      interest: (pmt * t) - p,
      monthly: pmt
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="compound" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="compound" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Juros Compostos
          </TabsTrigger>
          <TabsTrigger value="installments" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Parcelamento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="compound">
          <Card>
            <CardHeader>
              <CardTitle>Simulador de Investimento</CardTitle>
              <CardDescription>Veja quanto seu dinheiro pode render ao longo do tempo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Valor Inicial (R$)</Label>
                  <Input id="amount" type="number" placeholder="1000" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate">Taxa Mensal (%)</Label>
                  <Input id="rate" type="number" placeholder="1" value={rate} onChange={(e) => setRate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Tempo (Meses)</Label>
                  <Input id="time" type="number" placeholder="12" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
              </div>
              <Button onClick={calculateCompoundInterest} className="w-full">Calcular</Button>

              {result && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10"
                >
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Acumulado</p>
                      <p className="text-2xl font-bold text-primary">R$ {result.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total em Juros</p>
                      <p className="text-2xl font-bold text-green-600">R$ {result.interest.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="installments">
          <Card>
            <CardHeader>
              <CardTitle>Simulador de Parcelas</CardTitle>
              <CardDescription>Calcule o valor das parcelas de um empréstimo ou compra.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="p-amount">Valor do Bem (R$)</Label>
                  <Input id="p-amount" type="number" placeholder="5000" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="p-rate">Taxa de Juros Mensal (%)</Label>
                  <Input id="p-rate" type="number" placeholder="2.5" value={rate} onChange={(e) => setRate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="p-time">Número de Parcelas</Label>
                  <Input id="p-time" type="number" placeholder="12" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
              </div>
              <Button onClick={calculateInstallments} className="w-full">Calcular Parcelas</Button>

              {result && result.monthly && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Valor da Parcela</p>
                      <p className="text-xl font-bold text-primary">R$ {result.monthly.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total a Pagar</p>
                      <p className="text-xl font-bold">R$ {result.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total de Juros</p>
                      <p className="text-xl font-bold text-red-500">R$ {result.interest.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-sm text-yellow-800 flex items-start gap-3">
        <Calculator className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <p>
          <strong>Aviso:</strong> Estas simulações são apenas para fins educacionais e podem variar de acordo com taxas bancárias reais, IOF e outros encargos.
        </p>
      </div>
    </div>
  );
}
