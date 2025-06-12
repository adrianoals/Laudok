"use client";

import React from 'react';
import { ClipboardList, Camera, FileText, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: <ClipboardList className="w-6 h-6" />,
    title: 'Cadastro do Projeto',
    description: 'Informe os dados básicos do condomínio e inicie seu projeto.',
  },
  {
    icon: <Camera className="w-6 h-6" />,
    title: 'Vistoria Técnica',
    description: 'Realize a vistoria e registre as anomalias encontradas.',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Geração do Laudo',
    description: 'O sistema gera automaticamente o laudo conforme a NBR 16.747.',
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Revisão e Entrega',
    description: 'Revise o documento e entregue ao cliente com rapidez.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-gradient-laudok text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Como Funciona
          </h2>
          <p className="text-xl text-laudok-light max-w-3xl mx-auto">
            Processo simples e eficiente para elaboração de laudos técnicos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-8 shadow-laudok"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-laudok" />
              )}
              <div className="p-3 bg-laudok rounded-lg w-fit mb-6">
                <div className="text-white">{step.icon}</div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-laudok text-white font-bold">
                  {index + 1}
                </span>
                <h3 className="text-xl font-bold text-laudok-dark">
                  {step.title}
                </h3>
              </div>
              <p className="text-laudok-dark">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 