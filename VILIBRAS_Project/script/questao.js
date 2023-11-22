openMenu.addEventListener(
    'click', () => {menu.style.display = 'flex'
})
// função quando algo é clicado
closeMenu.addEventListener(
    'click', () => {menu.removeAttribute('style')
})

//! lista de questões do quiz
const questoes = [
    {
        questao: "O que é Software?",
        respostas: [
            { text: "A) Peças como mouse e teclado", correct: false},
            { text: "B) Parte lógica do computador", correct: true},
            { text: "C) Parte física do computador", correct: false},
            { text: "D) Nenhuma alternativa", correct: false},
        ]
    },
    {
        questao: "O que é Hardware?",
        respostas: [
            { text: "A) Aplicativos, sites e programas", correct: false},
            { text: "B) Parte lógica do computador", correct: false},
            { text: "C) Parte física do computador", correct: true},
            { text: "D) Nenhuma alternativa", correct: false},
        ]
    }
];

//! plotando variaveis
const  questaoElemento = document.getElementById("pergunta");
const  botoesResposta = document.getElementById("buttons-resposta");
const  botaoProximo = document.getElementById("next-btn");

let indice_Atual_Questao = 0;
let score = 0;

//! funcao do quiz   
function startQuiz(){
    indice_Atual_Questao = 0;
    score = 0;
    botaoProximo.innerHTML = "Próximo";
    showQuestion();
}

//! funcao da proxima questao
function showQuestion(){
    resetState(); // ! funcao que reseta as perguntas
    let atualQuestao = questoes[indice_Atual_Questao];
    let questaoNum = indice_Atual_Questao + 1;
    questaoElemento.innerHTML = questaoNum + ". " + atualQuestao.questao;

    //! mostrar respostas
    atualQuestao.respostas.forEach(resposta => {
        const botao = document.createElement("botao");
        botao.innerHTML = resposta.text;
        botao.classList.add("btn");
        botoesResposta.appendChild(botao); //! mostrar se esta certo ou errado
        if(resposta.correct){
            botao.dataset.correct = resposta.correct;
        }
        botao.addEventListener("click", selecionaResposta_Correta);
    });
}

//! funcao que reseta as perguntas
function resetState(){
    botaoProximo.style.display = "none";
    while(botoesResposta.firstChild){
        botoesResposta.removeChild(botoesResposta.firstChild);
    }
}

//! funcao que seleciona a resposta correta
function selecionaResposta_Correta(e){
    const botaoSelecionado = e.target;
    const isCorrect = botaoSelecionado.dataset.correct === "true";
    if(isCorrect){
        botaoSelecionado.classList.add("correct");
        score++;
    }
    else{
        botaoSelecionado.classList.add("incorrect");
    }
    //! funcao que tira o selecionado do botão após ser clicado
    Array.from(botoesResposta.children).forEach(botao => {
        if(botao.dataset.correct === "true"){
            botao.classList.add("correct");
        }
        botao.disabled = true;
    });
    botaoProximo.style.display = "block";
}

function showScore(){
    resetState();
    questaoElemento.innerHTML = `sua pontuação foi ${score} de ${questoes.length}!`;
    botaoProximo.innerHTML = `Jogar novamente`;
    botaoProximo.style.display = "block";
}

function IdentificadorProximo_Botao(){
    indice_Atual_Questao++;
    if(indice_Atual_Questao < questoes.length){
        showQuestion(); //! apresentar outra pergunta se tiver
    }
    else {
        showScore(); //! mostrar socre
    }
}

botaoProximo.addEventListener("click", ()=>{
    if(indice_Atual_Questao < questoes.length){
        IdentificadorProximo_Botao();
    }
    else{
        startQuiz()
    }
});

startQuiz();