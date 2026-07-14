import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-background/85 backdrop-blur-xl">
      <div className="container mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <span className="text-xl font-black tracking-[-.04em] text-foreground md:text-2xl">
              AUTOCAR<span className="text-primary">X</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="hidden md:inline-flex uppercase tracking-wider font-bold">
                Get Quote
              </Button>
            </Link>
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 animate-fade-in">
            <div className="flex flex-col gap-5 border-t border-white/10 pt-6">
              <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
              <MobileNavLink to="/services" onClick={() => setIsMenuOpen(false)}>Services</MobileNavLink>
              <MobileNavLink to="/projects" onClick={() => setIsMenuOpen(false)}>Projects</MobileNavLink>
              <MobileNavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</MobileNavLink>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                <Button size="lg" className="w-full uppercase tracking-wider font-bold">
                  Get Quote
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`text-sm font-medium transition-colors uppercase tracking-wider ${
        isActive ? "text-primary" : "hover:text-primary"
      }`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to}
      onClick={onClick}
      className={`text-sm font-medium transition-colors uppercase tracking-wider ${
        isActive ? "text-primary" : "hover:text-primary"
      }`}
    >
      {children}
    </Link>
  );
};

export default Navigation;
