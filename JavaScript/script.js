'use: strict';

const layout_task = document.querySelector('.layout-task-item');
const button_add = document.querySelector('.module-green');
const button_remove = document.querySelector('.module-red');
const button_screen = document.querySelector('.module-blue');
const key = 'task'
let body = document.body


button_add.addEventListener('click', function(){
    let input = document.querySelector('#text');

    if(!input.value) {
        alert('ERRO!! O campo não pode ficar vazio')
    } else {
        let storage_local = JSON.parse(localStorage.getItem(key) || "[]");
        storage_local.push({
            nome: input.value
        })
        localStorage.setItem(key, JSON.stringify(storage_local));
        addtask()
    }

    input.value = ''
})

function addtask() {
    let storage_local = JSON.parse(localStorage.getItem(key) || '[]')
    layout_task.replaceChildren()

    for(let c = 0; c < storage_local.length; c++) {
        let container = document.createElement('div');
        let taks_unidade  = document.createElement('div') ;
        let span = document.createElement('span');
        let button = document.createElement('button');

        container.classList.add('layout-taks-container');
        taks_unidade.classList.add('layout-taks-individual');
        span.classList.add('module-title-task');
        button.classList.add('module-button-check');

        layout_task.appendChild(container);
        container.appendChild(taks_unidade);
        taks_unidade.appendChild(span);
        taks_unidade.appendChild(button);

        span.innerHTML = `${storage_local[c]['nome']}`
        button.innerHTML = `<img src="src/assets/svg/check.svg" alt="" class="check">`
    }
    
    let checked_button = document.querySelectorAll('.module-button-check');

    checked_button.forEach((item, index) => {
        item.addEventListener('click', function(){
            remove(storage_local[index].nome);
        })
    })
}

function remove(elemento){
    let storage_local = JSON.parse(localStorage.getItem(key) || '[]');
    let idx = storage_local.findIndex((storage) => {
        return storage.nome == elemento
    })
    storage_local.splice(idx, 1);
    localStorage.setItem(key, JSON.stringify(storage_local))
    addtask()
}

button_remove.addEventListener('click', function(){
    localStorage.removeItem(key)
    addtask()
}) 

addtask()

