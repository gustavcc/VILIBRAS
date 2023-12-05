openMenu.addEventListener('click', () => {
    menu.style.display = 'flex',
    slide.style.display = 'none'

});
// função quando algo é clicado
closeMenu.addEventListener('click', () => {
    menu.removeAttribute('style'),
    slide.removeAttribute('style')
});

//slides de imagens

const imagens = document.getElementById('imagens');
const img = document.querySelectorAll('#imagens img');

let id = 0;

function carrossel() {
    id++;

    if(id > img.length - 1) {
        id = 0
    }

    imagens.style.transform = `translateX(${-id * 100}%)`;
}

setInterval(carrossel, 5000)