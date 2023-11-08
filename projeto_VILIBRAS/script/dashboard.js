openMenu.addEventListener('click', () => {
    menu.style.display = 'flex',
    containerSlide.style.display = 'none'

})
// função quando algo é clicado
closeMenu.addEventListener('click', () => {
    menu.removeAttribute('style'),
    containerSlide.removeAttribute('style')
})


var proximaImagem = 1;//guarda a posição da imagem que deve entrar na tela, no caso é a imagem da posição 1, pois a imagem 0 já está visível na tela
var zIndexAtual = 0;//usado para criar um aumento progressivo no z-index
var imagens = document.getElementById("containerSlide").children;//pega todos os nodos filhos da div #container, ou seja, nossa coleção de imagens

function avancarImagem(){
    imagem = imagens[proximaImagem];//armazena a proxima imagem na fila em uma variável
    imagem.style.zIndex = ++zIndexAtual;//aumenta o índice do z-index e atribui à próxima imagem da fila
    imagem.style.marginLeft = "0%";//reseta a margem da imagem, fazendo ela entrar na tela

    proximaImagem++;//ajusta o índice que aponta a próxima imagem

    //caso o índice tenha alcançado o fim da fila, resetá-lo
    if(proximaImagem >= imagens.length){
        proximaImagem = 0;
    }

    //aqui está o truque para fazer com que as imagens que já passaram voltem para fora da área visível
    //o tempo de intervalo está aqui para que isso ocorra depois que a imagem ficou atrás da nova imagem da fila
    setTimeout(resetarImagens,500);
}

function resetarImagens(){
    imagemVisivel = proximaImagem -1;

    //se o índice alcançou o início da fila, voltar para o final
    if(imagemVisivel < 0){
        //o menos 1 está aqui pois o parâmetro length retorna o total de itens no array (no caso, 3)
        //precisamos da posição do último item do array (sempre é length-1)
        imagemVisivel = imagens.length - 1;
    }

    //retorna todas as imagens à sua posição original, menos a imagem visível
    for(var i = 0; i < imagens.length; i++){
        if(i != imagemVisivel){
            imagens[i].style.marginLeft = "100%";
        }
    }
}

var intervalo = setInterval(avancarImagem,5000);