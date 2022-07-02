const addRef = document.querySelector('.add')
const listRef=document.querySelector('.todos')
const searchRef=document.querySelector('.search input')
const submitRef=document.querySelector('.submit')
const editRef=document.querySelector('.edit')

//const saveInd = document.getElementById("saveIndex");
const form = document.querySelector(".inputform")
let index = 0;
var todosList =[]
const generateTemplate= todo=>{

    const htmlTemplate=`<li class="list-group-item d-flex justify-content-between align-items-center individual-item">
    <span>${todo}</span>
    <span>
    <i class="fas fa-edit" style="color:green"></i>
    <i class="fas fa-times delete" style="color:red"></i>
    <span>
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
        e.target.parentElement.parentElement.remove()
        const toDelete=e.target.parentElement.parentElement.textContent.trim()
        todosList = todosList.filter(item =>{
            return item !== toDelete
        })
        localStorage.clear()
        localStorage.setItem('prevTodos',JSON.stringify(todosList))
        console.log(localStorage.getItem('prevTodos'));

    }

    if(e.target.classList.contains('fa-edit'))
    {
        form.value = e.target.parentElement.previousElementSibling.innerHTML;

        submitRef.style.display ="none";
        editRef.style.display = "block";


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
    console.log(todosList);
    if(newTodo !== "")
    {
        generateTemplate(newTodo)

    }
    addRef.reset()
    for(i=1;i<=todosList.length;i++){
    console.log(document.querySelector(`.individual-item:nth-child(${i})`).firstElementChild.innerHTML)}
}

submitRef.addEventListener('click',(e)=>{
    add();
})


//logic to edit tasks in to-do list
const edit = (e) =>{
    let x = 0;
    for(let i=1; i<=todosList.length;i++){
        if(todosList[i-1] === form.value){

            x=i;
            console.log(x);
            console.log(document.querySelector(`.individual-item:nth-child(${x})`).firstElementChild);
        }
    }
    todosList[x-1] === form.value;
    console.log(form.value);
    console.log(x);
    //document.querySelector(`.individual-item:nth-child(${x})`).firstElementChild.innerHTML = `${form.value}`;

}

//Event listener on edit button
editRef.addEventListener('click',(e)=>{
    edit(e);
    reset();
})

if(localStorage.getItem('prevTodos'))
{
    JSON.parse(localStorage.getItem('prevTodos')).forEach((Element)=>{
        todosList.push(Element)
        generateTemplate(Element)
    })
}

const reset = () => {
    submitRef.style.display ="block";
    editRef.style.display = "none";
}


