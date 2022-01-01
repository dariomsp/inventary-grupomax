const modal = document.querySelector('#modal1')


function openModal() {
    
     
    modal.classList.add('is-visible');
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', (event) => {
        
        if(event.key === 'Escape'){

            modal.classList.remove('is-visible');
            document.body.style.overflow = 'auto';
            
        }
    })
        
     
}


function closeModal() {

    modal.classList.remove('is-visible');
    document.body.style.overflow = 'auto';

}
 

const upButton = document.querySelector('.up_button');

window.onscroll = function() {
    if(document.documentElement.scrollTop > 100) {
        upButton.classList.add('is-visible')
    } else {
        upButton.classList.remove('is-visible')
    }
}

upButton.addEventListener('click', () => {
    window.scrollTo({
        top:0
    })
})