// ================================================
const myForm = document.querySelector("#myForm");
const userWrap = document.querySelector("#userWrap");
const singleData = document.querySelector("#singleData");
const heads = ["name", "age", "email" , "phone", "Status"];

const readFromStorage = (key = `users`) => JSON.parse(localStorage.getItem(key)) || []

const writeToStorage = (data, key=`users`) => localStorage.setItem(key, JSON.stringify(data))

// ================================================
const userCreateObj = (myForm)=>{
  const user = {
    id: Date.now()}
  heads.forEach(h => user[h] = myForm.elements[h].value)
  return user
}
// ================================================

const addUser = (user) => {
  const allUser = readFromStorage("users")
  allUser.push(user)
  writeToStorage(allUser, "users")
}

// ================================================

function creatMyElemant(ele, parent, txt = null, classes = null) {
  const myElement = document.createElement(ele)
  parent.appendChild(myElement)
  if (txt) myElement.textContent = txt
  if (classes) myElement.classList = classes
  return myElement
}
// ================================================

if(myForm){
  myForm.addEventListener("submit", function(e){
    e.preventDefault()
    
    const user = userCreateObj(myForm)
    
    addUser(user)
    window.location = "index.html"
  })
}
// ================================================
const showElement = (i) => {
  localStorage.setItem("index", i)
  window.location = "single.html"
}
// ================================================

// ================================================
const deleteElement = (allUser, i) => {
  allUser.splice(i, 1)
  writeToStorage(allUser, "users")
  drawData()
}
// ================================================
const drawData = ()=>{
  userWrap.innerHTML=""
  const allUser = readFromStorage("users")

  allUser.forEach((user, i) =>{
    const tr = creatMyElemant("tr", userWrap)
    creatMyElemant("td", tr, user.id)
    creatMyElemant("td", tr, user.name)
    creatMyElemant("td", tr, user.age)
    creatMyElemant("td", tr, user.email)
    creatMyElemant("td", tr, user.phone)
    creatMyElemant("td", tr, user.Status)
    
    
    const td = creatMyElemant("td", tr)
// =========================
    const showBtn = creatMyElemant("button", td, "Show", "mx-2 btn btn-primary")
    showBtn.addEventListener("click", (e)=> showElement(i))

// =========================
    const editBtn = creatMyElemant("button", td, "Edit", "mx-2 btn btn-warning")

    editBtn.addEventListener("click", function () {

      const allUser = readFromStorage("users")
      const index = localStorage.getItem("index");
      const Status = `${allUser[index].Status}`
      // const Status = document.getElementById("status")
      
      if (Status==='active') {
          Status=== "inactive"
        console.log(Status)
      }
      

    })
    
// =========================
    const delBtn = creatMyElemant("button", td, "Delete", "mx-2 btn btn-danger")
    delBtn.addEventListener("click", (e)=>  deleteElement(allUser , i))

// =========================

  })
}
// ================================================
if(userWrap){
  drawData()
}
// ================================================
if (singleData) {
  const index = localStorage.getItem("index");
  const allUser = readFromStorage("users")
  
  creatMyElemant("p" , singleData ,`Id:  ${allUser[index].id}`)
  creatMyElemant("p" , singleData , `Name: ${allUser[index].name}`)
  creatMyElemant("p" , singleData , `Age: ${allUser[index].age}`)
  creatMyElemant("p" , singleData , `Email: ${allUser[index].email}`)
  creatMyElemant("p" , singleData , `Phone: ${allUser[index].phone}`)
  creatMyElemant("p" , singleData , `Status: ${allUser[index].Status}`)
}
// ================================================


