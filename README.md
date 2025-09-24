# Sorteio Solidário - Frontend

Uma aplicação Next.js para sorteios solidários que permite aos usuários participar de rifas beneficentes de forma transparente e segura.

## 🎯 Funcionalidades

- **Landing Page**: Apresentação da iniciativa com sorteios ativos
- **Página do Sorteio**: Detalhes completos do prêmio com galeria de imagens
- **Formulário de Compra**: Interface intuitiva para participação
- **Página de Confirmação**: Exibição dos números da sorte adquiridos
- **Design Responsivo**: Otimizado para dispositivos móveis

## 🛠️ Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **shadcn/ui** - Componentes de interface
- **Lucide React** - Ícones

## 🏗️ Arquitetura

### Frontend (Next.js)
- Páginas públicas que consomem API Laravel
- Componentes reutilizáveis com shadcn/ui
- Gerenciamento de estado local com React hooks
- Validação de formulários com tipos TypeScript

### Backend (Laravel) - Não incluído
- API REST para operações CRUD
- Painel administrativo com Blade templates
- Integração com gateway de pagamento
- Sistema de notificações

## 📁 Estrutura do Projeto

\`\`\`
├── app/                    # Páginas (App Router)
│   ├── page.tsx           # Landing page
│   ├── sorteio/[slug]/    # Página individual do sorteio
│   ├── parabens/          # Página de confirmação
│   └── not-found.tsx      # Página 404
├── components/            # Componentes React
│   ├── ui/               # Componentes base (shadcn/ui)
│   ├── raffle-card.tsx   # Card do sorteio
│   ├── raffle-gallery.tsx # Galeria de imagens
│   ├── raffle-info.tsx   # Informações do sorteio
│   └── purchase-form.tsx # Formulário de compra
├── lib/                  # Utilitários e configurações
│   ├── api.ts           # Configuração da API
│   ├── mock-data.ts     # Dados de desenvolvimento
│   └── utils.ts         # Funções utilitárias
├── scripts/             # Scripts SQL para o backend
│   ├── 001_create_raffles_table.sql
│   ├── 002_create_customers_table.sql
│   └── ...
└── public/              # Arquivos estáticos
    └── *.jpg            # Imagens dos prêmios
\`\`\`

## 🚀 Como Executar

1. **Instalar dependências**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Configurar variáveis de ambiente**:
   \`\`\`bash
   # .env.local
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   \`\`\`

3. **Executar em desenvolvimento**:
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Acessar a aplicação**:
   - Frontend: http://localhost:3000
   - Backend Laravel: http://localhost:8000 (configurar separadamente)

## 🗄️ Banco de Dados

Os scripts SQL na pasta `scripts/` criam a estrutura necessária:

- **raffles**: Informações dos sorteios
- **customers**: Dados dos participantes  
- **purchases**: Registros de compras
- **tickets**: Números individuais dos sorteios

## 🎨 Design System

- **Cores**: Sistema de tokens semânticos com suporte a tema escuro
- **Tipografia**: Geist Sans como fonte principal
- **Componentes**: Baseados em shadcn/ui para consistência
- **Layout**: Mobile-first com breakpoints responsivos

## 📱 Páginas

### Landing Page (`/`)
- Hero section com call-to-action
- Grid de sorteios ativos
- Estatísticas e informações sobre transparência

### Página do Sorteio (`/sorteio/[slug]`)
- Galeria interativa de imagens do prêmio
- Informações detalhadas e regulamento
- Formulário de compra com validação

### Confirmação (`/parabens`)
- Mensagem de sucesso personalizada
- Exibição dos números da sorte
- Opção de compartilhamento

## 🔗 Integração com Backend

A aplicação consome uma API Laravel através das seguintes rotas:

- `GET /api/sorteios` - Lista sorteios ativos
- `GET /api/sorteio/{slug}` - Detalhes de um sorteio
- `POST /api/sorteio/{slug}/comprar` - Processar compra
- `POST /api/webhooks/pagseguro` - Webhook de pagamento

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de demonstração.
