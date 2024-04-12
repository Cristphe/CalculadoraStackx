let expressao = '';
let historico = [];
let historicoTempo = [];

function adicionarAoVisor(valor) {
    expressao += valor;
    document.getElementById('display').value = expressao;
}

function limparVisor() {
    expressao = '';
    document.getElementById('display').value = expressao;
}

function calcular() {
    try {
        const calculo = expressao;
        const resultado = eval(expressao);
        adicionarAoHistorico(calculo + ' = ' + resultado);
        expressao = '';
        document.getElementById('display').value = '';
    } catch (error) {
        document.getElementById('display').value = 'Erro';
    }
}

function adicionarAoHistorico(item) {
    if (historico.length >= MAX_HISTORICO_LENGTH) {
        historico.shift();
    }
    historico.push(item);
    atualizarHistorico();
    adicionarAoHistoricoTempo();
}

function atualizarHistorico() {
    const listaHistorico = document.getElementById('historico-lista');
    listaHistorico.innerHTML = '';
    historico.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        li.addEventListener('click', () => {
            exibirCalculoDoHistorico(index);
        });
        listaHistorico.appendChild(li);
    });
}

function exibirCalculoDoHistorico(index) {
    const calculo = historico[index].split('=')[0].trim();
    expressao = calculo;
    document.getElementById('display').value = expressao;
}

function adicionarAoHistoricoTempo() {
    const tempoAtual = new Date();
    const opcoes = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const tempoFormatado = tempoAtual.toLocaleTimeString('pt-BR', opcoes);

    if (historicoTempo.length >= MAX_HISTORICO_LENGTH) {
        historicoTempo.shift(); 
    }
    historicoTempo.push(tempoFormatado);
    atualizarHistoricoTempo();
}

function atualizarHistoricoTempo() {
    const listaTempo = document.getElementById('tempo-lista');
    listaTempo.innerHTML = '';
    historicoTempo.forEach(tempo => {
        const li = document.createElement('li');
        li.textContent = tempo;
        listaTempo.appendChild(li);
    });
}

const MAX_HISTORICO_LENGTH = 5;
