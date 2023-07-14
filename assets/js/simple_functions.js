// função para verificar se o item teve overflow
let isOverflow = document.querySelector('.overflowed')
function checkOverflow() {
    if (isOverflow.scrollHeight > isOverflow.clientHeight) {
        isOverflow.classList.add('overflowed')
    }
}