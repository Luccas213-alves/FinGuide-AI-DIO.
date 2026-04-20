import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FAQ_DATA } from '@/src/types/finance';
import { HelpCircle, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function FAQ() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {FAQ_DATA.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="h-full hover:border-primary/50 transition-colors cursor-default group">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2 group-hover:text-primary transition-colors">
                <HelpCircle className="w-4 h-4 text-primary" />
                {item.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.answer}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
