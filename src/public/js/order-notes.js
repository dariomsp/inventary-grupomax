const modal = document.querySelector('.container_modal_order-notes')

const inputs = document.querySelectorAll('.article-and-amount_container')
const button = document.querySelectorAll('.addInput_button')
const selects = document.querySelectorAll('#select_article')
const lastOrderNote = document.querySelectorAll('#lastOrderNote')
const amount = document.querySelectorAll('#amount')
const removeInput = document.querySelectorAll('#removeInput')

console.log(inputs.length)
var index=0;

function openModal() {
    modal.classList.add('is-visible')
    document.addEventListener('keydown', (event) => {
        if(event.key=='Escape') {
            modal.classList.remove('is-visible')
        } 
    })


    button[0].addEventListener('click',(e)=>{
        if (index===inputs.length-1){
            index=0;
        }
        inputs[index+1].classList.add('is-display');
        index++;
        
        


        
        
        selects[index].removeAttribute('disabled')
        lastOrderNote[index].removeAttribute('disabled')
        amount[index].removeAttribute('disabled')
        
        document.addEventListener('click', (event) =>{
            
        if(event.target.firstChild.data=='-'){
            const button_pressionated = event.target;
            const NodePadre = button_pressionated.parentNode;
            NodePadre.classList.remove('is-display');
            NodePadre.childNodes[1].setAttribute('disabled','')
            NodeSelect = NodePadre.childNodes[3].childNodes[1];
            NodeSelect.setAttribute('disabled','')
            NodeAmount = NodePadre.childNodes[5].childNodes[1];
            NodeAmount.setAttribute('disabled','')
            
            console.log(NodeAmount); 
        }
    })


        
        //const clone = input.cloneNode(true)
        
        //const childsClone = clone.childNodes;
        
        //console.log(childsClone)
        //containerInputs.appendChild(clone)
        
        })

}

function closeModal() {
    modal.classList.remove('is-visible')
    button[0].removeEventListener;

}



//const input = document.querySelector('.article-and-amount_container')
//const containerInputs = document.querySelector('.inputs_articles')





