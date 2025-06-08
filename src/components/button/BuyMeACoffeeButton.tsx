export default function BuyMeACoffeeButton() {
  return (
    <a
      href="https://www.buymeacoffee.com/feareis"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-[#FFDD00] hover:bg-[#ffce00] text-gray-800/80 rounded-lg shadow-xl transition-all duration-200 animate-float"
      style={{
        fontFamily: "'Comic Sans MS', 'Brush Script MT', cursive",
      }}
    >
      <img
        src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
        alt="Buy me a coffee"
        className="w-5 h-5"
      />
      <span className="text-base font-semibold">Buy me a coffee</span>
    </a>
  );
};
