const modal = document.querySelector('.container_modal_order-notes')

function openModal() {
    modal.classList.add('is-visible')
    document.addEventListener('keydown', (event) => {
        if(event.key=='Escape') {
            modal.classList.remove('is-visible')
        } 
    })

}

function closeModal() {
    modal.classList.remove('is-visible')
}