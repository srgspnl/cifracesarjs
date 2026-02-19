// server.js — Cifra de César com Node.js + Express
// Uso: npm install express && node server.js

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ===================== ALGORITMO =====================
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function caesarChar(char, shift, decode) {
  const upper = char.toUpperCase();
  const idx = ALPHA.indexOf(upper);
  if (idx === -1) return null;
  const n = decode ? (26 - (shift % 26)) : (shift % 26);
  return ALPHA[(idx + n) % 26];
}

function caesarProcess(text, shift, decode = false, preserve = true) {
  let result = '';
  for (const ch of text) {
    const transformed = caesarChar(ch, shift, decode);
    if (transformed === null) {
      result += preserve ? ch : '';
    } else {
      result += ch === ch.toUpperCase() ? transformed : transformed.toLowerCase();
    }
  }
  return result;
}

function buildSteps(text, shift, decode) {
  return [...text.toUpperCase()].map(ch => {
    const idx = ALPHA.indexOf(ch);
    if (idx === -1) return { char: ch, isAlpha: false };
    const n = decode ? (26 - (shift % 26)) : (shift % 26);
    const newIdx = (idx + n) % 26;
    return {
      char: ch,
      isAlpha: true,
      originalPos: idx,
      newPos: newIdx,
      result: ALPHA[newIdx],
      formula: `(${idx} ${decode ? '-' : '+'}${shift}) mod 26 = ${newIdx}`,
    };
  });
}

// ===================== ROTAS API =====================

// POST /api/caesar — cifrar ou decifrar
app.post('/api/caesar', (req, res) => {
  const { text, shift = 3, decode = false, preserve = true } = req.body;
  if (!text) return res.status(400).json({ error: 'Campo "text" obrigatório.' });
  const n = parseInt(shift);
  if (isNaN(n) || n < 1 || n > 25)
    return res.status(400).json({ error: 'Deslocamento deve ser entre 1 e 25.' });

  const result = caesarProcess(text, n, decode, preserve);
  const steps = buildSteps(text, n, decode);

  res.json({ input: text, output: result, shift: n, mode: decode ? 'decode' : 'encode', steps });
});

// GET /api/brute — força bruta (todos os 25 deslocamentos)
app.get('/api/brute', (req, res) => {
  const { text, preserve = 'true' } = req.query;
  if (!text) return res.status(400).json({ error: 'Parâmetro "text" obrigatório.' });
  const pres = preserve !== 'false';
  const results = [];
  for (let n = 1; n <= 25; n++) {
    results.push({ shift: n, decoded: caesarProcess(text, n, true, pres) });
  }
  res.json({ input: text, results });
});

// GET /api/info — frequência de letras (análise)
app.get('/api/freq', (req, res) => {
  const { text } = req.query;
  if (!text) return res.status(400).json({ error: 'Parâmetro "text" obrigatório.' });
  const freq = {};
  for (const ch of text.toUpperCase()) {
    if (ALPHA.includes(ch)) freq[ch] = (freq[ch] || 0) + 1;
  }
  const sorted = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .map(([letter, count]) => ({ letter, count }));
  res.json({ input: text, frequency: sorted });
});

// Serve index.html para todas as outras rotas
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🔐 Cifra de César — Servidor rodando`);
  console.log(`   URL: http://localhost:${PORT}`);
  console.log(`   API: http://localhost:${PORT}/api/caesar\n`);
});
