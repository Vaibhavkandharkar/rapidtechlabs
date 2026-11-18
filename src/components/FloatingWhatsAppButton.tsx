export const WHATSAPP_NUMBER = "918806884168";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi RapidTechLabs, I would like to discuss a project with you.",
)}`;

export function FloatingWhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with RapidTechLabs on WhatsApp"
      title="Chat on WhatsApp (+91 8806884168)"
      className="group fixed bottom-20 right-5 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] p-3.5 text-white shadow-lg shadow-[#25D366]/35 ring-2 ring-white/25 transition-all duration-200 hover:scale-105 hover:bg-[#1ebe5d] hover:shadow-xl hover:shadow-[#25D366]/45 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="26"
        height="26"
        fill="currentColor"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.352.616 4.648 1.787 6.667L2.667 29.333l6.836-1.76A13.27 13.27 0 0 0 16.004 29.333C23.368 29.333 29.333 23.36 29.333 16S23.368 2.667 16.004 2.667zm0 24.44a11.08 11.08 0 0 1-5.654-1.547l-.405-.24-4.057 1.045 1.083-3.952-.264-.42a11.06 11.06 0 0 1-1.71-5.993c0-6.114 4.982-11.096 11.107-11.096 2.966 0 5.754 1.155 7.849 3.252a11.03 11.03 0 0 1 3.247 7.844c0 6.125-4.978 11.107-11.196 11.107zm6.09-8.31c-.334-.167-1.973-.974-2.279-1.085-.306-.111-.528-.167-.751.167-.223.334-.862 1.085-1.057 1.308-.195.223-.39.25-.723.084-.334-.167-1.409-.52-2.684-1.656-.992-.885-1.662-1.978-1.857-2.312-.195-.334-.021-.514.146-.68.15-.15.334-.39.501-.584.167-.195.223-.334.334-.556.111-.223.056-.417-.028-.584-.083-.167-.751-1.809-1.029-2.477-.271-.651-.546-.563-.751-.573-.195-.01-.417-.012-.64-.012s-.584.083-.89.417c-.306.334-1.168 1.141-1.168 2.783s1.196 3.229 1.363 3.452c.167.223 2.353 3.593 5.701 5.039.796.344 1.418.549 1.903.703.8.254 1.527.218 2.103.132.641-.096 1.973-.807 2.251-1.586.278-.779.278-1.447.195-1.586-.084-.139-.306-.223-.64-.39z" />
      </svg>
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-200 group-hover:max-w-[140px] sm:inline-block">
        WhatsApp Us
      </span>
    </a>
  );
}
