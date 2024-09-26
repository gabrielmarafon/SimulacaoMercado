// Acadêmicos: Gabriel Marafon e Victor Hugo Soligo

// Defina a quantidade de caixas. NÃO altere a propriedade tempoRestante, ela deve ser inicializada como 0.
let caixas = [
  { livre: true, tempoRestante: 0 },  
  { livre: true, tempoRestante: 0 }  
];

// Altere as variáveis para personalizar a simulação.
let tempoSimulacao = 600;          // Duração da simulação em minutos
let tempoAtendimentoMin = 4;       // Tempo mínimo de atendimento (minutos)
let tempoAtendimentoMax = 10;       // Tempo máximo de atendimento (minutos)
let taxaChegadaNormal = 5;         // Intervalo de chegada dos clientes (minutos) em horários normais
let taxaChegadaPico = 2;           // Intervalo de chegada dos clientes (minutos) em horários de pico

// Não alrere estas variáveis
let totalClientes = 0;             
let tempoAtual = 0;               
let fila = []; 

function gerarAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function taxaChegada(tempoAtual) {
  if (tempoAtual >= 240 && tempoAtual <= 300) { 
    return taxaChegadaPico;
  }

  return taxaChegadaNormal;
}

function chegadaCliente() {
  let cliente = { id: totalClientes++, tempoEntrada: tempoAtual };
  fila.push(cliente);
  console.log(`Cliente ${cliente.id} chegou na fila às ${tempoAtual} minutos.`);
}

function atenderClientes() {
  caixas.forEach((caixa, index) => {
    if (caixa.livre && fila.length > 0) {
      let cliente = fila.shift(); 
      caixa.tempoRestante = gerarAleatorio(tempoAtendimentoMin, tempoAtendimentoMax);
      caixa.livre = false;
      console.log(`Cliente ${cliente.id} está sendo atendido no caixa ${index + 1} por ${caixa.tempoRestante} minutos.`);
    }

    if (!caixa.livre) {
      caixa.tempoRestante--;
      if (caixa.tempoRestante === 0) {
        caixa.livre = true;  
        console.log(`Caixa ${index + 1} finalizou o atendimento.`);
      }
    }
  });
}

function simular() {
  let proximaChegada = taxaChegada(tempoAtual);

  while (tempoAtual < tempoSimulacao) {
    if (tempoAtual === proximaChegada) {
      chegadaCliente();
      proximaChegada = tempoAtual + taxaChegada(tempoAtual);
    }

    atenderClientes();

    tempoAtual++;
  }

  console.log(`Simulação finalizada após ${tempoSimulacao} minutos.`);
  console.log(`Total de clientes atendidos: ${totalClientes - fila.length}.`);
  console.log(`Clientes restantes na fila: ${fila.length}.`);
}

simular();
