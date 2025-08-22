import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { useApi } from "../hooks/useApi";

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { verificarAuth } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await verificarAuth(password);

      if (result.success) {
        // passa a senha para o pai (App ou AdminPanel)
        onLogin(password);
      } else {
        // mostra a mensagem retornada do backend
        setError(result.error || "Senha incorreta");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-2xl font-serif text-gray-900">
            Painel Administrativo
          </h1>
          <p className="text-gray-600 mt-2">
            Digite a senha para acessar o painel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Senha
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha do administrador"
              className="w-full"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700"
          >
            {loading ? "Verificando..." : "Entrar"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-amber-600 hover:text-amber-700 text-sm">
            ← Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
