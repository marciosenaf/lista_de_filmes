function filmes (){

fetch('http://localhost:3030/person')
.then(res => res.json() )
.then(data => {
    const list = document.querySelector('#fill_list')

    data.map((item) => {
        const li = document.createElement('li');

        li.setAttribute('_id' , item._id );
        li.innerHTML =`
        <div class="user">
        <p class="imagem" ><img src="${item.poster}" alt="" /></p>
        
        <h2 class="user2">${item.titulo}</h2>
        
        <h3 class="user3">${item.genero}</h3>
        
        <h4 class="user4">${item.enredo}</h4>
        
        <h5 class="user5">${item.nota}⭐</h5>
        

        </div>`
        list.appendChild(li);
    })
    })
}







 
        

       /* li.setAttribute('_id' , item._id );
        li.innerHTML = 
        list.appendChild(li) */

   
//https:jsonplaceholder.typicode.com/todos
//9ycT@7rS4YgNjiX