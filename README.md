# 🔐 Cifra de César — Demonstração Didática

Aplicação interativa para ensinar a Cifra de César, a cifra de substituição mais famosa da história.

---

## ▶ Opção 1 — Usar direto no browser (sem instalação)

Abra o arquivo `index.html` diretamente no navegador. Funciona 100% offline.

---

## ▶ Opção 2 — Rodar com Node.js

### Pré-requisitos
- Node.js 18+ instalado

### Instalação
```bash
npm install
```

### Iniciar
```bash
npm start
# Acesse: http://localhost:3000
```

---

## 🌐 API REST (com Node.js)

### Cifrar / Decifrar
```http
POST /api/caesar
Content-Type: application/json

{
  "text": "HELLO WORLD",
  "shift": 3,
  "decode": false,
  "preserve": true
}
```

**Resposta:**
```json
{
  "input": "HELLO WORLD",
  "output": "KHOOR ZRUOG",
  "shift": 3,
  "mode": "encode",
  "steps": [...]
}
```

### Força Bruta (todos os 25 deslocamentos)
```http
GET /api/brute?text=KHOOR%20ZRUOG
```

### Análise de Frequência
```http
GET /api/freq?text=KHOOR%20ZRUOG
```

---

## 🚀 Publicação Gratuita

| Plataforma | Tipo | Como usar |
|---|---|---|
| **GitHub Pages** | HTML estático | Suba o `index.html` + ative Pages nas configurações do repo |
| **Netlify** | HTML estático | Arraste a pasta em netlify.com/drop |
| **Vercel** | HTML / Node.js | `npx vercel` ou conecte repositório GitHub |
| **Railway** | Node.js | Conecte repositório, detecta automaticamente |
| **Render** | Node.js | Web Service grátis, conecte repositório |
| **Glitch** | Node.js | Edição ao vivo, ótimo para sala de aula |
| **CodePen** | HTML estático | Cole o HTML para compartilhar e editar online |

> **Recomendação didática:** Use **Netlify Drop** para o HTML (zero configuração) ou **Glitch** para a versão Node.js com edição colaborativa.

---

## 📚 Conceitos abordados

- Cifra de substituição monoalfabética
- Aritmética modular (mod 26)
- Operação inversa (cifrar × decifrar)
- Ataque por força bruta (26 chaves possíveis)
- Análise de frequência de letras
- Por que essa cifra **não é segura** para uso real

---

## 📁 Estrutura

```
cifra-cesar/
├── index.html     # App completo (funciona standalone)
├── server.js      # Servidor Node.js + Express + API REST
├── package.json   # Dependências
└── README.md      # Este arquivo
```
