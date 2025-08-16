const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="text-center">
          <h3 className="logo-text text-xl text-gray-900 mb-4">
            Gaijin<span className="text-gray-600">3D</span>
          </h3>
          <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
            Criando vasos únicos impressos em 3D, onde tecnologia e design se
            encontram para transformar qualquer ambiente.
          </p>
          <div className="flex justify-center space-x-8 mb-8">
            <a
              href="mailto:contato@gaijin3d.com"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              contato@gaijin3d.com
            </a>
            <a
              href="tel:+5511999999999"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              (11) 99999-9999
            </a>
          </div>
          <div className="pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              © {currentYear} Gaijin3D. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
