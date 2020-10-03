const addRef = document.querySelector('.add')
const listRef=document.querySelector('.todos')
const searchRef=document.querySelector('.search input')
const submitRef=document.querySelector('.submit')
var todosList =[]
const generateTemplate= todo=>{

    const htmlTemplate=`<li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <i class="fas fa-times delete" style="color:red;"></i>
    </li>`
listRef.innerHTML=htmlTemplate+listRef.innerHTML
}

const filterTodo=(term)=>{
    Array.from(listRef.children)
    .filter((todo)=> !todo.textContent.toLowerCase().includes(term.toLowerCase()))
    .forEach((todo) => todo.classList.add('filtered'))

    Array.from(listRef.children)
    .filter((todo)=> todo.textContent.toLowerCase().includes(term.toLowerCase()))
    .forEach((todo) => todo.classList.remove('filtered'))
    
}

searchRef.addEventListener('keyup',()=>{
    const term=searchRef.value.trim();
    filterTodo(term)

})

listRef.addEventListener('click',(e)=>{
    if(e.target.classList.contains('delete'))
    {
        e.target.parentElement.remove()
        const toDelete=e.target.parentElement.textContent.trim()
        todosList = todosList.filter(item =>{
            return item !== toDelete
        })
        localStorage.clear()
        localStorage.setItem('prevTodos',JSON.stringify(todosList))
    }
})

addRef.addEventListener('submit',(e)=>{
    e.preventDefault();
    add();
})
const add=()=>{
    const newTodo=addRef.inputField.value.trim()
    todosList.push(newTodo)
    localStorage.setItem('prevTodos',JSON.stringify(todosList))
    if(newTodo !== "")
    {
        generateTemplate(newTodo)
        
    }
    addRef.reset()
}

submitRef.addEventListener('click',(e)=>{
    add();
})

if(localStorage.getItem('prevTodos'))
{
    JSON.parse(localStorage.getItem('prevTodos')).forEach((Element)=>{
        todosList.push(Element)
        generateTemplate(Element)
    })
}