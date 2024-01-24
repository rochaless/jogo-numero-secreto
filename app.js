//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaNumSorteados = [];
let numLimite = 10;
let numeroSecreto = gerarNumAleatorio();
let tentativas = 1;

function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1','Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

/*verificar um trecho de código que determina uma ação*/
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Parabéns, você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'Tente de novo! Dica: número secreto é menor!');
        } else {
            exibirTextoNaTela('p', 'Tente de novo! Dica: o número secreto é maior!');
        }
        tentativas++; 
        limparCampo();
    }
}

function gerarNumAleatorio() {
    let numEscolhido = parseInt(Math.random() * numLimite + 1);
    let quantidadeNum = listaNumSorteados.length;

    if (quantidadeNum == numLimite) {
        listaNumSorteados = [];
    }

    if (listaNumSorteados.includes(numEscolhido)) {
        return gerarNumAleatorio ();
    } else {
        listaNumSorteados.push(numEscolhido);
        return numEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}