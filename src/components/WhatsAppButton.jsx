import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919650303312"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
    >
      <FaWhatsapp size={28} color="white" />
    </a>
  )
}
