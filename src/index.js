document.addEventListener("DOMContentLoaded", ()=>{

  const addBtn = document.querySelector('#new-toy-btn')
  const toyContainer = document.getElementById('toy-collection')

   let allToys = []
  //
  let addToy = false

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      newToyForm.style.display = 'block'
      // submit listener here
    } else {
      toyForm.style.display = 'none'
    }
  })

  function fetchToys(){
  fetch("http://localhost:3000/toys/", {method: "GET"})
    .then(response => response.json())
    .then(toyData => showAllToys(toyData))
  }

  const newToyForm = document.querySelector('.container')
    newToyForm.addEventListener("submit", function(e){
      const name = document.getElementById('toy-name').value
      const image = document.getElementById('toy-image').value
      let likes = 0;
      e.preventDefault()

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept" : "application/json"
      },//closes headers
      body: JSON.stringify({
        name: name,
        image: image,
        likes: likes,
      })//end of body
    })//closes fetch
    .then(function(response){
      return response.json()
    })//closes first then
    .then(function(toys){
      // console.log("i am here")
      allToys.push(toys)
      toyContainer.innerHTML +=
      renderSingleToy(toys)
    })//closes second then
  })//closes event listener

  function showAllToys(allToys){
    console.log(toyContainer)
    console.log(allToys[1])
    console.log(allToys.map(renderSingleToy))
    toyContainer.innerHTML = allToys.map(renderSingleToy).join("")
    // toyContainer.innerHTML = allToys.map(renderSingleToy).join('')
  }

  function renderSingleToy(toy) {
    // console.log(toy.name)
    // console.log(toy)
    return `
    <div class="card">
       <h2>${toy.name}</h2>
       <img src="${toy.image}"/>
       <p>${toy.likes}Likes</p>
       <button class="like-btn">Like <3</button>
     </div>
     `;
  }

// Increase a toy's likes via patch request
  // let patchedToyCard = toyContainer.querySelector(`div[data-id="${id}"]`)
  //   patchedToyCard.querySelector("h2").innerText = toyName
  //   patchedToyCard.querySelector("img").src = toyImage
  //   patchedToyCard.querySelector("p").innerText = toyLikes
  //
  // fetch("http://localhost:3000/toys/:id", {
  //   method:"PATCH",
  //   headers:{
  //     "Content-Type" : "application/json ;charset= utf-8",
  //     Accept: "application/json"
  //   },
  //   body:JSON.stringify({
  //     "name":toyName,
  //     "image":toyImage
  //     // "likes":toyLikes
  //   })
  // })




  fetchToys()

  }) //end of DOMContentLoaded
