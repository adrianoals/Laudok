'use client';

import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phone?: string;
  message?: string;
}

export default function WhatsAppButton({
  phone = '5511999999999',
  message = 'Olá! Gostaria de saber mais sobre o Laudok.',
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-4 px-6 rounded-md font-medium hover:bg-[#20BA5A] transition-colors shadow-lg hover:shadow-xl"
    >
      <MessageCircle className="w-6 h-6" />
      <span>Falar no WhatsApp</span>
    </a>
  );
}

