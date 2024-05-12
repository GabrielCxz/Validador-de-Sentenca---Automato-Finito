function runAutomaton(input) {
    // TESTE
    let elementoTeste = document.getElementById('teste');

    //ESTADO INICIAL
    let EstadoInicial = document.getElementById('initialState');
    let auxEstadoInicial = EstadoInicial.value;

    const automaton = {
        alphabet: new Set(), //Feito
        initial: auxEstadoInicial, // FEITO
        accepting: new Set([]),//FEITO
        states: new Set([]),//FEITO
        transitions: {//FEITO
        }
    };

    //TRANSIÇÕES

    let transitionsElement = document.getElementById('transitions');
    let auxTransicoes = transitionsElement.value;
    let lines = auxTransicoes.split(";");

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line !== '') {
            const parts = line.split(',');
            if (parts.length === 2) {
                const currentState = parts[0].trim();
                const transition = parts[1].trim();
                const [input, nextState] = transition.split('->');
                const inputClean = input.trim();
                const nextStateClean = nextState.trim();

                if (!automaton.transitions[currentState]) {
                    automaton.transitions[currentState] = {};
                }

                automaton.transitions[currentState][inputClean] = nextStateClean;
            }
        }
    }

    //ESTADOS 
    let estado = document.getElementById('states');
    let auxEstado = estado.value;
    let vetorauxEstado = auxEstado.split(",");

    for (let i = 0; i < vetorauxEstado.length; i++) {
        const estado = vetorauxEstado[i].trim();
        if (estado !== '') {
            automaton.states.add(estado);
        }
    }

    //Alfabeto
    let letras = document.getElementById('letras');
    let auxLetras = letras.value;
    let vetorauxLetras = auxLetras.split(",");

    for (let i = 0; i < vetorauxLetras.length; i++) {
        const letra = vetorauxLetras[i].trim();
        if (letra !== '') {
            automaton.alphabet.add(letra);
        }
    }

    //Estados Finais
    let final = document.getElementById('acceptingStates');
    let auxFinal = final.value;
    let vetorauxFinal = auxFinal.split(",");

    for (let i = 0; i < vetorauxFinal.length; i++) {
        const final = vetorauxFinal[i].trim();
        if (final !== '') {
            automaton.accepting.add(final);
        }
    }

    /////////////////////

    let currentState = automaton.initial;

    for (let symbol of input) {
        if (!automaton.alphabet.has(symbol)) {
            return false;
        }
        currentState = automaton.transitions[currentState][symbol];
    }

    return automaton.accepting.has(currentState);
}

const form = document.getElementById('inputForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const inputSequence = document.getElementById('inputSequence').value;
    const isAccepted = runAutomaton(inputSequence);

    const result = document.getElementById('result');
    if (isAccepted) {
        result.textContent = 'Sentença Aceita';
    } else {
        result.textContent = 'Sentança Rejeitada';
    }
});
