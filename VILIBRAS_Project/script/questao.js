openMenu.addEventListener(
    'click', () => {menu.style.display = 'flex'
})
// função quando algo é clicado
closeMenu.addEventListener(
    'click', () => {menu.removeAttribute('style')
})

// ----------------------------------------------------

//! lista de questões do quiz
const questoes = [
    {
        questao: "O que é Software?", //pergunta
        respostas: [
            { text: "A) Peças como mouse e teclado", correct: false}, //resposta
            { text: "B) Parte lógica do computador", correct: true}, //resposta correta
            { text: "C) Parte física do computador", correct: false}, //resposta
            { text: "D) Nenhuma alternativa", correct: false}, //resposta
        ]
    },
    {
        questao: "O que é Hardware?", //pergunta
        respostas: [
            { text: "A) Aplicativos, sites e programas", correct: false}, //resposta
            { text: "B) Parte lógica do computador", correct: false}, //resposta
            { text: "C) Parte física do computador", correct: true}, //resposta correta
            { text: "D) Nenhuma alternativa", correct: false}, //resposta
        ]
    }
];

//! plotando variaveis
const  perguntaElemento = document.getElementById("pergunta"); //elemento da pergunta
const  botoesResposta = document.getElementById("buttons-resposta"); //elemento das respostas (div com os botões)
const  botaoProximo = document.getElementById("next-btn"); //elemento de botão para próxima questão


//! definindo a pesgunta atual + pontuação de acertos
let indice_Atual_Questao = 0;
let score = 0;

//! funcao que inicia o quiz   
function startQuiz(){
    indice_Atual_Questao = 0; //começando o quiz do indice 0, primeira questão do dicionario
    score = 0;
    botaoProximo.innerHTML = "Próximo"; //nome escrito no botão, pois no final o nome será "Jogar novamente"
    showQuestion(); //funcao que mostra as questões
}

//! funcao que mostra as questões, com as perguntas e respostas do objeto (dicionario)
function showQuestion(){
    resetState(); // funcao que reseta as respostas
    let atualQuestao = questoes[indice_Atual_Questao]; // seleciona a questão atual apartir do indice do dicionário
    let questaoNum = indice_Atual_Questao + 1; //o indice é x, mas o numero da pergunta será x+1, para mostrar mp HTML
    perguntaElemento.innerHTML = questaoNum + ". " + atualQuestao.questao; // formato que a pergunta irá aparecer no HTML

    //! mostrar as possiveis respostas
    atualQuestao.respostas.forEach(resposta => { //para cada resposta, da pergunta atual, pois cada pergunta tem um conjunto de 4 respostas
        const botao = document.createElement("botao"); //crio o elemento botão, para cada botão de "botoesResposta" que irá adicionar no HTML depois
        botao.innerHTML = resposta.text; // em "respostas" no dicionario, temos o text, que é cada resposta, são 4 text, pois são 4 respostas para cada pergunta
        botao.classList.add("btn"); // no HTML, cada botão recebeu a class "btn", então adicionamos a class "btn" também para cada botão aqui, para que possa substituir no HTML sem erro
        botoesResposta.appendChild(botao); //finalmente adicionamos cada botão (Child) dentro da div "botoesResposta", que conta as respostas no  HTML, mas isso não substitui os valores padões do HTML, então fica com 8 respostas, dai vem a função "resetState", para substituir os valores padrões
        //! mostrar se esta certo ou errado
        if(resposta.correct){ //para a resposta correta, ou sejsa, com correct = true
            botao.dataset.correct = resposta.correct; //adiciona true para a o botão que criamos também
        }
        botao.addEventListener("click", selecionaResposta_Correta); //quando clicar na resposta, chama a função que define a questão correta, com as cores
    });
}

//! funcao que reseta as perguntas e mostra o estado inical das perguntas, antes de clicar na resposta
function resetState(){
    botaoProximo.style.display = "none";
    while(botoesResposta.firstChild){ //sempre que tiver um firstChild, que é o primeiro valor, ou seja, o valor padrão do HTML
        botoesResposta.removeChild(botoesResposta.firstChild); //remove os valores padrões do HTML
    }
}

//! funcao que seleciona a resposta correta
function selecionaResposta_Correta(e){ // "e" é o botção selecionado
    const botaoSelecionado = e.target; //adiciona o elemnto do botão selecionado para a variável
    const isCorrect = botaoSelecionado.dataset.correct === "true"; // determinamos a resposta certa em "showQuestion"
    if(isCorrect){ // se for correta
        botaoSelecionado.classList.add("correct"); //adiciona a class "correct" ao botão, e no CSS definimos a cor verde, indicando a certa
        score++;
    }
    else{ // se for a errada
        botaoSelecionado.classList.add("incorrect"); //adiciona a class "incorrect" ao botão, e no CSS definimos a cor vermelha, indicando a errada
    }
    //! funcao que mostra a correta mesmo selecionando uma resposta errada
    //* Um array é um tipo especial de variável utilizado para armazenar uma coleção de dados, ou uma lista
    Array.from(botoesResposta.children).forEach(botao => { //todos os botões da resposta atual é adicionado em uma lista (array) e para cada botão resposta clicado de "botoesResposta", mostra também a respota correta automaticmente (se a resposta escolhida for a errada), caso contrário já será a resposta
        if(botao.dataset.correct === "true"){ //se for a correta
            botao.classList.add("correct");
        }
    });
    botaoProximo.style.display = "block"; // ao responbder a questão, mostra o botão de proximo
}

//! função que mostra a pontuação
function showScore(){
    resetState();
    perguntaElemento.innerHTML = `sua pontuação foi ${score} de ${questoes.length}!`;
    botaoProximo.innerHTML = `Jogar novamente`;
    botaoProximo.style.display = "block";
}

//! função do botão de próxima questão
function IdentificadorProximo_Botao(){ 
    indice_Atual_Questao++; // sobe o indice para ir para próxima questão
    if(indice_Atual_Questao < questoes.length){ // se o indice existir no dicionario
        showQuestion(); //! apresentar outra pergunta se tiver
    }
    else { // se o indice não existir no dicionario
        showScore(); //! mostrar a pontuação
    }
}

//! quanto o botão de próxima questão for clicado
botaoProximo.addEventListener("click", ()=>{
    if(indice_Atual_Questao < questoes.length){ // se o indice existir no dicionario
        IdentificadorProximo_Botao(); //! chama a função de botão da próxima questão
    }
    else{ // se o indice não existir no dicionario
        startQuiz() //! reinicia o quiz com a primeira questão
    }
});

startQuiz(); // função que começa o quiz e redefine os valores padrões do HTML para os valor do dicionário / objeto (Quiz) para a primeira questão do dicionario