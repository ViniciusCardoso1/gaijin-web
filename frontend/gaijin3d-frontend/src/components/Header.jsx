import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Header = ({ onSearch, searchTerm, setSearchTerm }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="logo-text text-2xl text-gray-900 tracking-tight">
              Gaijin<span className="text-gray-600">3D</span>
            </h1>
          </div>

          {/* Search - Hidden on mobile, shown on larger screens */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSubmit} className="relative w-full">
              <Input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-gray-200 rounded-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-gray-50/50"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </form>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-8">
            <a
              href="#work"
              className="nav-link text-sm font-medium text-gray-900 hover:text-gray-600"
            >
              Trabalhos
            </a>
            <a
              href="#about"
              className="nav-link text-sm font-medium text-gray-900 hover:text-gray-600"
            >
              Sobre
            </a>
            <a
              href="#contact"
              className="nav-link text-sm font-medium text-gray-900 hover:text-gray-600"
            >
              Contato
            </a>
          </nav>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSubmit} className="relative">
            <Input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-gray-200 rounded-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-gray-50/50"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
