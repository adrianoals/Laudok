'use client';

import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function ProblemSolutionSection() {
  return (
    <section className="bg-gradient-laudok text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Desafios e Soluções
          </h2>
          <p className="text-xl text-laudok-light max-w-3xl mx-auto">
            Entendemos os desafios enfrentados pelos profissionais da área e oferecemos soluções inteligentes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Problemas */}
          <div className="bg-white rounded-2xl p-8 shadow-laudok hover:shadow-laudok-dark transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-laudok-dark">Desafios</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-red-600">•</span>
                <p className="text-gray-600">Tempo excessivo na elaboração de laudos</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600">•</span>
                <p className="text-gray-600">Risco de erros e inconsistências</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600">•</span>
                <p className="text-gray-600">Dificuldade em manter a conformidade com normas</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600">•</span>
                <p className="text-gray-600">Gestão ineficiente de múltiplos projetos</p>
              </li>
            </ul>
          </div>

          {/* Soluções */}
          <div className="bg-white rounded-2xl p-8 shadow-laudok hover:shadow-laudok-dark transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-laudok-light rounded-lg">
                <CheckCircle className="w-6 h-6 text-laudok" />
              </div>
              <h3 className="text-2xl font-bold text-laudok-dark">Nossa Solução</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-laudok">•</span>
                <p className="text-gray-600">Automação inteligente de processos</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-laudok">•</span>
                <p className="text-gray-600">Conformidade automática com NBR 16.747</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-laudok">•</span>
                <p className="text-gray-600">Gestão centralizada de projetos</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-laudok">•</span>
                <p className="text-gray-600">Suporte especializado e treinamento</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 