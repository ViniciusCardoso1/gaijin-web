# Gaijin3D - Sistema de Vasos 3D

Um projeto web completo para a empresa Gaijin3D, especializada em vasos 3D únicos e modernos.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React** - Biblioteca JavaScript para interfaces
- **Tailwind CSS** - Framework CSS utilitário
- **Vite** - Build tool e servidor de desenvolvimento
- **React Router** - Roteamento para SPA
- **Lucide React** - Ícones modernos

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web para Node.js
- **Multer** - Middleware para upload de arquivos
- **CORS** - Middleware para requisições cross-origin

### Armazenamento
- **JSON** - Arquivo `produtos.json` para persistência de dados
- **Sistema de arquivos** - Upload de imagens na pasta `public/img`

## 📁 Estrutura do Projeto

```
gaijin3d-project/
├── backend/
│   ├── data/
│   │   └── produtos.json          # Dados dos produtos
│   ├── public/
│   │   └── img/                   # Imagens uploadadas
│   ├── server.js                  # Servidor Express
│   └── package.json
└── frontend/
    └── gaijin3d-frontend/
        ├── src/
        │   ├── components/        # Componentes React
        │   ├── hooks/            # Hooks personalizados
        │   ├── pages/            # Páginas da aplicação
        │   └── App.jsx           # Componente principal
        └── package.json
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou pnpm

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

O servidor estará rodando em `http://localhost:3001`

### 2. Frontend

```bash
cd frontend/gaijin3d-frontend
npm install
npm run dev -- --host
```

A aplicação estará disponível em `http://localhost:5173`

## 🔧 Configuração da API

### Endpoints Disponíveis

#### Produtos
- `GET /api/produtos` - Listar todos os produtos
- `GET /api/produtos/buscar?q=termo` - Buscar produtos por nome ou tamanho
- `GET /api/produtos/:id` - Obter produto específico
- `POST /api/produtos` - Adicionar novo produto (requer autenticação)
- `PUT /api/produtos/:id` - Atualizar produto (requer autenticação)
- `DELETE /api/produtos/:id` - Remover produto (requer autenticação)

#### Upload e Autenticação
- `POST /api/upload` - Upload de imagem
- `POST /api/admin/auth` - Verificar senha do administrador
- `GET /api/health` - Status do servidor

### Autenticação
- **Senha padrão do admin**: `gaijin3d2024`
- A senha deve ser enviada no body das requisições que requerem autenticação

## 🎨 Funcionalidades

### Site Principal (`/`)
- **Catálogo de produtos** com imagens, descrições e preços
- **Sistema de busca** por nome ou tamanho
- **Galeria de imagens** em carrossel para cada produto
- **Design responsivo** para desktop e mobile
- **Seções informativas** (Sobre, Contato)

### Painel Administrativo (`/admin`)
- **Autenticação** com senha
- **Gerenciamento completo** de produtos (CRUD)
- **Upload de imagens** via formulário
- **Suporte a URLs externas** para imagens
- **Interface intuitiva** para administração

## 📱 Responsividade

O site foi desenvolvido com foco em responsividade:
- **Desktop**: Layout em grid com 3 colunas
- **Tablet**: Layout em grid com 2 colunas
- **Mobile**: Layout em coluna única
- **Navegação adaptativa** com menu responsivo

## 🎯 Estrutura de Dados

### Produto (JSON)
```json
{
  "id": 1,
  "nome": "Vaso Geométrico Moderno",
  "descricao": "Descrição detalhada do produto...",
  "tamanho": "Pequeno (10cm x 10cm x 12cm)",
  "preco": 45.90,
  "imagens": [
    "https://exemplo.com/imagem1.jpg",
    "/public/img/imagem-local.jpg"
  ]
}
```

## 🔒 Segurança

- **Validação de entrada** em todos os endpoints
- **Autenticação simples** para área administrativa
- **Validação de tipos de arquivo** no upload
- **Sanitização de dados** antes do armazenamento

## 🚀 Deploy

### Backend
1. Configure as variáveis de ambiente
2. Execute `npm start`
3. Certifique-se que a porta 3001 está disponível

### Frontend
1. Execute `npm run build` para gerar os arquivos de produção
2. Sirva os arquivos da pasta `dist` com um servidor web

## 📝 Uso do Sistema

### Para Usuários
1. Acesse o site principal
2. Navegue pelos produtos
3. Use a busca para encontrar produtos específicos
4. Visualize detalhes e imagens dos produtos

### Para Administradores
1. Acesse `/admin`
2. Digite a senha: `gaijin3d2024`
3. Gerencie produtos (adicionar, editar, remover)
4. Faça upload de imagens ou use URLs externas

## 🎨 Design

O design foi inspirado no site Vorrath Woodworks, seguindo:
- **Tipografia elegante** com fontes serifadas para títulos
- **Paleta de cores neutra** com destaque em âmbar
- **Layout minimalista** com foco nos produtos
- **Espaçamento generoso** para respiração visual
- **Imagens de alta qualidade** como protagonistas

## 🐛 Solução de Problemas

### Problemas Comuns

1. **Erro de CORS**: Certifique-se que o backend está configurado para aceitar requisições do frontend
2. **Imagens não carregam**: Verifique se as URLs estão corretas e acessíveis
3. **Upload falha**: Confirme que a pasta `public/img` existe e tem permissões de escrita

### Logs
- Backend: Logs aparecem no console do servidor
- Frontend: Use as ferramentas de desenvolvedor do navegador

## 📞 Suporte

Para dúvidas ou problemas:
- Email: contato@gaijin3d.com
- Telefone: (11) 99999-9999

---

**Desenvolvido com ❤️ para Gaijin3D**

