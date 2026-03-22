export default function Footer() {
  return (
    <footer 
      className="relative bg-[#0B0B0B] border-t border-[#C89B3C]/10 py-10"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C89B3C]/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[#A0A0A0] text-sm tracking-wide">
          © {new Date().getFullYear()} Alex Morgan. All rights reserved.
        </p>
        
        <div className="flex items-center gap-6 text-sm text-[#A0A0A0]">
          <a href="#" className="hover:text-[#C89B3C] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#C89B3C] transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
