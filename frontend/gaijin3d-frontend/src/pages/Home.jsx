import { useState } from "react";
import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import { useProdutos } from "../hooks/useApi";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { produtos, loading, error, carregarProdutos } = useProdutos();

  const handleSearch = async (term) => {
    await carregarProdutos(term);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Seção Hero */}
      <section className="hero-section relative flex items-center justify-center text-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/img/hero-vases.jpg')" }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <p className="text-sm font-medium tracking-widest uppercase mb-4 opacity-90">
            Bem-vindo à
          </p>
          <h1 className="text-6xl md:text-8xl font-serif font-medium mb-8 leading-tight tracking-tight">
            Gaijin <span className="inline">3D</span>
          </h1>
          <div className="mt-12">
            <a
              href="#work"
              className="inline-block px-8 py-3 border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium tracking-wide uppercase"
            >
              Nossos Trabalhos
            </a>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Seção Trabalhos */}
        <section id="work" className="section-spacing">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-8">
              Nossos Trabalhos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <h3 className="text-lg font-serif font-medium text-gray-900 mb-2">
                  Vasos Modernos
                </h3>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-serif font-medium text-gray-900 mb-2">
                  Geométrico
                </h3>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-serif font-medium text-gray-900 mb-2">
                  Orgânico
                </h3>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-serif font-medium text-gray-900 mb-2">
                  Minimalista
                </h3>
              </div>
            </div>
          </div>

          {/* Galeria de Projetos */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-serif font-medium text-gray-900">
                Galeria de Projetos
              </h3>
              <p className="text-sm text-gray-600">
                {produtos.length}{" "}
                {produtos.length === 1 ? "projeto" : "projetos"}
              </p>
            </div>

            <ProductGrid produtos={produtos} loading={loading} error={error} />
          </div>
        </section>

        {/* Seção Sobre */}
        <section
          id="about"
          className="section-spacing bg-gray-50 -mx-6 lg:-mx-8 px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-8">
              Sobre
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                A Gaijin3D é uma equipe de designers e tecnólogos apaixonados,
                especializados em vasos e objetos decorativos impressos em 3D.
                Nossa formação e experiência em manufatura moderna nos dão
                vantagem para explorar as complexidades do design 3D e
                ultrapassar limites criativos.
              </p>
              <p>
                Cada peça é cuidadosamente projetada e produzida com materiais
                de alta qualidade, garantindo durabilidade e beleza que resistem
                ao tempo.
              </p>
            </div>
          </div>
        </section>

        {/* Seção Contato */}
        <section id="contact" className="section-spacing text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-8">
            Contato
          </h2>
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            Tem alguma dúvida ou deseja um projeto personalizado? Entre em
            contato com a gente.
          </p>
          <div className="space-y-4">
            <p className="text-gray-700">
              <a
                href="mailto:contato@gaijin3d.com"
                className="hover:text-gray-900 transition-colors"
              >
                contato@gaijin3d.com
              </a>
            </p>
            <p className="text-gray-700">
              <a
                href="tel:+5511999999999"
                className="hover:text-gray-900 transition-colors"
              >
                (11) 99999-9999
              </a>
            </p>
            <p className="text-gray-700">Cocal do Sul, SC - Brasil</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
