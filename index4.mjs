import users from "./mock/users.mjs";
//import advantages from "./mock/about.mjs";


const userslist = document.querySelector('.users-list')
const container = document.querySelector('.users-list')
const loader = document.querySelector('.loader')
const modalWrapperEl = document.querySelector('.modal-wrapper')
const btnCloseFormForUsers = document.querySelector('.btn-close-form-for-users')
const btnAddUsers = document.querySelector('.btn-add-user')
const formForUsers = document.querySelector('.form-for-users')
const filtrUsers = document.querySelector('.filtr-users')
const unfiltrUsers = document.querySelector('.unfiltr-users')
const searchInput = document.getElementById('search-input')
const inputFromEl = document.getElementById('input-from')
const inputToEl = document.getElementById('input-to')
const selectPositionEl = document.getElementById('select-position')
let user = users 
//let advantage = advantages



const openModalWrapperEL = () => {
modalWrapperEl.style.display = 'flex'
}
  
const closeModalWrapperEL = () => {
modalWrapperEl.style.display = 'none'
}

btnAddUsers.addEventListener('click',openModalWrapperEL)
btnCloseFormForUsers.addEventListener('click',closeModalWrapperEL)

const handleformaddingproductselsubmit = (event) => {
  event.preventDefault()
  const formdata = new FormData(formForUsers)
  const newuser = {id:Math.random(), ...Object.fromEntries(formdata)}
  console.log(newuser)
  closeModalWrapperEL()
}

formForUsers.addEventListener('submit', handleformaddingproductselsubmit)




const loading = (callback) => {
loader.style.display = 'flex'
container.style.display = 'none'
setTimeout(() => {
loader.style.display = 'none'
container.style.display = 'flex'
if (callback) callback()
}, 1000);
}

const renderUserList = (filtredUsers) => {
console.log(filtredUsers)
container.innerHTML = "";
  filtredUsers.forEach((user) => {
  loading( () => {
  const card1 = document.createElement('div')
  card1.classList.add("user-card")
  let roleclass = 'role-user'
  if (user.role === "Admin") roleclass = "role-admin";
  if (user.role === "Moderator") roleclass = "role-admin"
   card1.innerHTML = `
   <img src="${user.avatar}" alt="${user.name}">
   <h2>${user.name}</h2>
   <p>${user.description}</p>
   <span class="${roleclass}">Role: ${user.role}</span>
   <p>${user.price}</p>
   <button data-id="${user.id}">Delete</button>
   <button data-id="${user.id}">Edit</button>
   `
   userslist.appendChild(card1);
  })
})}


renderUserList(user)

const filtrIncreaseUsers = () => {
 const IncreasedUser = user.sort((a,b) => a.price - b.price)
 renderUserList(IncreasedUser)
}



const filtrDecreaseUsers = () => {
  const DecreasedUser = user.sort((a,b) => b.price - a.price)
  renderUserList(DecreasedUser)
}


filtrUsers.addEventListener('click',filtrIncreaseUsers)
unfiltrUsers.addEventListener('click',filtrDecreaseUsers)



const deleteuser = (id) => {
  if(confirm('Are you sure you want to delete?')) {
    user = user.filter(user => user.id !== +id)
    filtredUsers(user)
  }
}

container.addEventListener("click", (event) => {
  const userid = event.target.dataset.id
  deleteuser(userid)
})


inputFromEl.addEventListener('change', (event) => {
  console.log(event.target.value)
  const filtredUsers = user.filter((item) => item.price > +event.target.value)
  renderUserList(filtredUsers)
})

inputToEl.addEventListener('change', (event) => {
  console.log(event.target.value)
  const filtredUsers = user.filter((item) => item.price < +event.target.value)
  renderUserList(filtredUsers)
})

selectPositionEl.addEventListener('change', (event) => {
  console.log(event.target.value)
  const selectedPosition = user.filter((item) => item.value)
  renderUserList(selectedPosition)
})
