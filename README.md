# 🎨 Chroma

Um **estúdio de cores** divertido para escolher cores e converter entre **HEX** e **RGB** na hora.

Feito com **Next.js**, **TypeScript** e **Tailwind CSS**, e publicado automaticamente no **GitHub Pages**.

[![Deploy Next.js to GitHub Pages](https://github.com/l-saul/colorchroma/actions/workflows/deploy.yml/badge.svg)](https://github.com/l-saul/colorchroma/actions/workflows/deploy.yml)

🔗 **Acesse online:** https://l-saul.github.io/colorchroma/

---

## ✨ O que dá pra fazer no Chroma

Não precisa instalar nada para usar: é só abrir o link acima no navegador (celular ou computador).

- 🎨 **Roda de cores interativa** — arraste para escolher a cor e veja o HEX e o RGB mudarem ao vivo.
- 🔆 **Controle de brilho** — uma barrinha para deixar a cor mais clara ou mais escura.
- 🎲 **Me surpreenda!** — gera uma cor aleatória com um clique (e já abre com uma cor nova toda vez).
- 🕔 **Histórico das últimas cores** — guarda as 5 cores geradas mais recentes; clique em qualquer uma para usá-la de novo.
- 🔁 **Conversor HEX → RGB** — digite um código como `#FF0080` e veja o RGB na hora.
- 🔂 **Conversor RGB → HEX** — digite os três valores (0 a 255) e receba o código HEX.
- 📋 **Colar inteligente** — cole algo como `255, 0, 128` em qualquer campo e ele separa sozinho em R, G e B.
- 📎 **Copiar com um clique** — botão de copiar em todos os valores.
- 🌗 **Contraste automático do texto** — o texto fica preto ou branco conforme a cor de fundo, para sempre dar pra ler.
- 🖱️ **Seletor nativo do sistema** — também dá pra usar o seletor de cores do próprio navegador.

> 💡 **HEX e RGB?** São duas formas de escrever a mesma cor.
> O **HEX** é aquele código com `#` (ex.: `#FF0080`), muito usado na web.
> O **RGB** descreve a cor pela quantidade de **vermelho, verde e azul** (ex.: `255, 0, 128`).
> O Chroma traduz uma na outra para você.

---

## 🚀 Rodando o projeto localmente

Para quem quer **clonar e mexer no código**.

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm (já vem junto com o Node)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/l-saul/colorchroma.git

# 2. Entre na pasta
cd colorchroma

# 3. Instale as dependências
npm install

# 4. Rode o servidor de desenvolvimento
npm run dev
```

Depois é só abrir **http://localhost:3000** no navegador. 🎉

O site recarrega sozinho sempre que você salvar um arquivo.

> ℹ️ Em desenvolvimento o app roda na **raiz** (`/`). O caminho `/colorchroma`
> (`basePath`) só é aplicado no **build de produção**, para o GitHub Pages
> funcionar sem quebrar o ambiente local. Veja [`next.config.ts`](next.config.ts).

### Outros comandos

```bash
npm run build     # gera o site estático na pasta ./out
npm run preview   # serve a pasta ./out localmente (igual à produção)
npm run lint      # roda o ESLint
```

---

## 🧰 Tecnologias usadas

- **Next.js 16** (App Router, Turbopack, React Compiler)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **GitHub Pages + GitHub Actions** (CI/CD)

---

## 📁 Onde está cada coisa

```
src/
├── app/
│   ├── page.tsx              # Página principal (seletor + conversores)
│   ├── layout.tsx            # Layout, metadados e SEO
│   ├── globals.css           # Estilos globais e animações
│   ├── icon.svg              # Favicon (roda de cores)
│   └── opengraph-image.tsx   # Imagem de preview para redes sociais
└── components/
    ├── ColorWheel.tsx        # A roda de cores interativa
    └── colors.tsx            # Funções de conversão (HEX, RGB, HSV)
```

---

## 🌐 Deploy

Todo push na branch `main` dispara o workflow
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que gera o site
estático (`output: 'export'`) e publica a pasta `./out` no GitHub Pages.

O favicon ([`src/app/icon.svg`](src/app/icon.svg)) e a imagem de preview social
([`src/app/opengraph-image.tsx`](src/app/opengraph-image.tsx)) são gerados pelo
Next.js no momento do build, sem precisar de imagens manuais.

---

Desenvolvido por [Luis Henrique Engel Saul](https://luishsaul.com.br) 💜
