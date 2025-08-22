import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Senha simples para o admin (em produção, usar hash e variáveis de ambiente)
const ADMIN_PASSWORD = "gaijin3d2024";

// Middlewares
// Habilita CORS para qualquer origem (ou coloque o domínio do seu frontend)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/img"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Apenas arquivos de imagem são permitidos!"), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Função para ler produtos do arquivo JSON
async function lerProdutos() {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "data/produtos.json"),
      "utf8"
    );
    return JSON.parse(data);
  } catch (error) {
    console.error("Erro ao ler produtos:", error);
    return [];
  }
}

// Função para salvar produtos no arquivo JSON
async function salvarProdutos(produtos) {
  try {
    await fs.writeFile(
      path.join(__dirname, "data/produtos.json"),
      JSON.stringify(produtos, null, 2)
    );
    return true;
  } catch (error) {
    console.error("Erro ao salvar produtos:", error);
    return false;
  }
}

// Middleware de autenticação para rotas admin
function verificarAuth(req, res, next) {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Senha incorreta" });
  }
  next();
}

// ROTAS DA API

// Listar todos os produtos
app.get("/api/produtos", async (req, res) => {
  try {
    const produtos = await lerProdutos();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Buscar produtos por nome ou tamanho
app.get("/api/produtos/buscar", async (req, res) => {
  try {
    const { q } = req.query;
    const produtos = await lerProdutos();
    if (!q) return res.json(produtos);

    const produtosFiltrados = produtos.filter(
      (produto) =>
        produto.nome.toLowerCase().includes(q.toLowerCase()) ||
        produto.tamanho.toLowerCase().includes(q.toLowerCase())
    );

    res.json(produtosFiltrados);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Obter produto por ID
app.get("/api/produtos/:id", async (req, res) => {
  try {
    const produtos = await lerProdutos();
    const produto = produtos.find((p) => p.id === parseInt(req.params.id));
    if (!produto)
      return res.status(404).json({ error: "Produto não encontrado" });

    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Adicionar novo produto (requer autenticação)
app.post("/api/produtos", verificarAuth, async (req, res) => {
  try {
    const { nome, descricao, tamanho, preco, imagens, link } = req.body;
    if (!nome || !descricao || !tamanho || !preco) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const produtos = await lerProdutos();
    const novoId =
      produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1;

    const novoProduto = {
      id: novoId,
      nome,
      descricao,
      tamanho,
      preco: parseFloat(preco),
      imagens: imagens || [],
      link: link || "",
    };

    produtos.push(novoProduto);

    if (await salvarProdutos(produtos)) {
      res.status(201).json(novoProduto);
    } else {
      res.status(500).json({ error: "Erro ao salvar produto" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Atualizar produto (requer autenticação)
app.put("/api/produtos/:id", verificarAuth, async (req, res) => {
  try {
    const { nome, descricao, tamanho, preco, imagens, link } = req.body;
    const produtos = await lerProdutos();
    const index = produtos.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1)
      return res.status(404).json({ error: "Produto não encontrado" });

    produtos[index] = {
      ...produtos[index],
      nome: nome || produtos[index].nome,
      descricao: descricao || produtos[index].descricao,
      tamanho: tamanho || produtos[index].tamanho,
      preco: preco ? parseFloat(preco) : produtos[index].preco,
      imagens: imagens || produtos[index].imagens,
      link: link !== undefined ? link : produtos[index].link,
    };

    if (await salvarProdutos(produtos)) {
      res.json(produtos[index]);
    } else {
      res.status(500).json({ error: "Erro ao atualizar produto" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Deletar produto (requer autenticação)
app.delete("/api/produtos/:id", verificarAuth, async (req, res) => {
  try {
    const produtos = await lerProdutos();
    const index = produtos.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1)
      return res.status(404).json({ error: "Produto não encontrado" });

    produtos.splice(index, 1);

    if (await salvarProdutos(produtos)) {
      res.json({ message: "Produto removido com sucesso" });
    } else {
      res.status(500).json({ error: "Erro ao remover produto" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Upload de imagem
app.post("/api/upload", upload.single("imagem"), (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "Nenhuma imagem foi enviada" });

    const imageUrl = `/public/img/${req.file.filename}`;
    // Retorna URL completa pública
    res.json({ url: `${req.protocol}://${req.get("host")}${imageUrl}` });
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer upload da imagem" });
  }
});

// Verificar senha do admin
app.post("/api/admin/auth", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, message: "Autenticação bem-sucedida" });
  } else {
    res.status(401).json({ success: false, error: "Senha incorreta" });
  }
});

// Rota de teste / health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Servidor Gaijin3D funcionando!" });
});

// Servir arquivos estáticos do frontend
app.use(
  express.static(path.join(__dirname, "../frontend/gaijin3d-frontend/dist"))
);

// Rota catch-all para o frontend (SPA)
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/gaijin3d-frontend/dist/index.html")
  );
});

// Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor Gaijin3D rodando na porta ${PORT}`);
  console.log(`📁 Servindo arquivos estáticos em /public`);
});

export default app;
