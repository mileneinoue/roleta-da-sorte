const frases = [
  "Um novo começo vem aí.",
  "Uma oportunidade chega logo.",
  "Confie: o tempo tá a seu favor.",
  "Hoje pequeno, amanhã gigante.",
  "Um reencontro vai te alegrar.",
  "Boas energias por perto.",
  "Acredite e o sucesso vem.",
  "Alguém pensa em você agora."
];

const disco    = document.getElementById('disco');
const etiquetas= document.getElementById('etiquetas');
const btn      = document.getElementById('btnGirar');
const saida    = document.getElementById('saida');

const pedaco = 360 / frases.length; // ângulo de cada fatia
const meio   = pedaco / 2;          // centro da fatia

// coloca os ícones (poderia ser texto também)
frases.forEach((_, i) => {
  const el = document.createElement('span');
  el.textContent = '🥠';

  const ang = -90 + i * pedaco + meio;

  // centraliza primeiro, depois aplica rotação
  el.style.transform = `
    translate(-50%, -50%)
    rotate(${ang}deg)
    translateX(75%)
    rotate(${-ang}deg)
  `;

  if (i % 2 === 0) el.classList.add('branco');
  etiquetas.appendChild(el);
});


let giroAtual = 0;

btn.addEventListener('click', () => {
  saida.textContent = '';
  btn.disabled = true;

  const vencedor = Math.floor(Math.random() * frases.length);
  const centroVencedor = vencedor * pedaco + meio;

  // gira algumas voltas e para com a fatia vencedora no topo
  const voltas = 5;
  const destino = giroAtual + voltas * 360 + (360 - centroVencedor);

  disco.style.transform = `rotate(${destino}deg)`;

  const terminou = () => {
    disco.removeEventListener('transitionend', terminou);
    giroAtual = destino % 360;
    saida.textContent = `Sua mensagem: ${frases[vencedor]}`;
    btn.disabled = false;
  };

  disco.addEventListener('transitionend', terminou, { once:true });
});
