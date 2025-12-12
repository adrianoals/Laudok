import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-laudok-dark mb-6">
          Entre em Contato
        </h2>
        <p className="text-gray-600 mb-8">
          Estamos prontos para ajudar você. Entre em contato conosco através
          dos canais abaixo ou preencha o formulário ao lado.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-laudok-light rounded-lg">
            <Mail className="w-6 h-6 text-laudok" />
          </div>
          <div>
            <h3 className="font-semibold text-laudok-dark mb-1">E-mail</h3>
            <a
              href="mailto:contato@laudok.com.br"
              className="text-laudok hover:underline"
            >
              contato@laudok.com.br
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-laudok-light rounded-lg">
            <Phone className="w-6 h-6 text-laudok" />
          </div>
          <div>
            <h3 className="font-semibold text-laudok-dark mb-1">Telefone</h3>
            <a
              href="tel:+5511999999999"
              className="text-laudok hover:underline"
            >
              (11) 99999-9999
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-laudok-light rounded-lg">
            <MapPin className="w-6 h-6 text-laudok" />
          </div>
          <div>
            <h3 className="font-semibold text-laudok-dark mb-1">Localização</h3>
            <p className="text-gray-600">São Paulo, SP</p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Horário de atendimento: Segunda a Sexta, das 9h às 18h
        </p>
      </div>
    </div>
  );
}

