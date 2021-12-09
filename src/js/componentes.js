import { Todo } from '../classes';
import { todoList } from '../index';

// referencias en el html.....
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulfilters = document.querySelector('.filters');
const aFiltros = document.querySelectorAll('filtro');
const contTodo = document.querySelector('todo-count');

export const crearTodoHtml = (todo) => {

    //preparo el elemento con el contenido...

    const htmlTodo = `
    <li class=" ${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}">
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li> `;

    // lo creo.....

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;

}

// evento nuevo.....

txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {

        // console.log(txtInput.value)
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        // llamo al metodo para insertarlo en el html...
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    //    console.log('click') ;
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) // click en el check....
    {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) // click en el botón de eliminar
    {
        todoList.eliminarCompletados(todoId);
        divTodoList.removeChild(todoElemento);
    }
    //   console.log(todoList) ;
});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }


    }

})
ulfilters.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if (!filtro) {
        return;
    }
    aFiltros.forEach( element => element.classList.remove('selected') );
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {

        elemento.classList.remove('hidden');
        const completados = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completados) {
                    elemento.classList.add('hidden');

                }
                break;
            case 'Completados':
                if (!completados) {
                    elemento.classList.add('hidden');
                }
                break;
        }

    }

});

