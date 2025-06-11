"use client";

import React from 'react';
import { FileText, Clock, Shield, Users, Zap, BarChart } from 'lucide-react';

const features = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Laudos Padronizados',
    description: 'Gere laudos técnicos conforme a NBR 16.747/2020 de forma automática e padronizada.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Economia de Tempo',
    description: 'Reduza em até 80% o tempo gasto na elaboração de laudos com nossa automação inteligente.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Conformidade Garantida',
    description: 'Mantenha-se sempre atualizado com as normas técnicas mais recentes.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Colaboração em Equipe',
    description: 'Trabalhe em equipe de forma eficiente com compartilhamento de projetos e documentos.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Processo Otimizado',
    description: 'Fluxo de trabalho inteligente que guia você em cada etapa do laudo.',
  },
  {
    icon: <BarChart className="w-6 h-6" />,
    title: 'Análises Detalhadas',
    description: 'Relatórios completos com gráficos e estatísticas para melhor tomada de decisão.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-laudok-dark mb-4">
            Funcionalidades Principais
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tudo que você precisa para elaborar laudos técnicos de forma eficiente e profissional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-laudok-light rounded-2xl p-8 shadow-laudok hover:shadow-laudok-dark transition-shadow"
            >
              <div className="p-3 bg-laudok rounded-lg w-fit mb-6">
                <div className="text-white">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-laudok-dark mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 