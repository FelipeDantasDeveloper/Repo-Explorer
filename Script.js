let CampoPesquisa = document.querySelector('.CampoPesquisa')
let ResultadoPesquisa = document.querySelector('.ResultadoPesquisa')
let AvisoError = document.createElement('h1')

async function BuscarRepositor(Repo){

     let repo = CampoPesquisa.value
     
    try{  
      //Capitura o que foi digitado
       CampoPesquisa.value = ''
       CampoPesquisa.placeholder = 'carregando...'
       CampoPesquisa.setAttribute('disabled', 'disabled')
       ResultadoPesquisa.value = ''
       ResultadoPesquisa.innerHTML = ''
      
       
    //--------------------------------
    // Requisição do repositório digitado usando api
       let response = await fetch(`https://api.github.com/search/repositories?q=${repo}`);
    
       if (response.ok) {
         
       let data = await response.json()
        
        while (data.items.length === 0 ) {
            CampoPesquisa.removeAttribute('disabled', 'disabled')
            CampoPesquisa.placeholder = 'Ex..: Inteligência Artificial';
            AvisoError.innerText = 'Usuário não encontrado'
            ResultadoPesquisa.appendChild(AvisoError)
            return
        }
    // Determinando quais dados vão aparecer do repositório
       data.items.forEach((repo) => {
         
       let card = document.createElement('div')
       let cardimg = document.createElement('div')
       let nome = document.createElement('h1')
       let link = document.createElement('a')
       let descricao = document.createElement('p')
       let img = document.createElement('img')
       let stars = document.createElement('p')

       stars.textContent = `${repo.stargazers_count} Estrelas`
       nome.textContent = repo.name
       link.textContent = 'ver repositório'
       link.href = repo.html_url
       descricao.textContent = repo.description;
       img.src = repo.owner.avatar_url
       
       card.appendChild(stars)
       card.appendChild(nome)
       card.appendChild(link)
       card.appendChild(descricao)
       cardimg.appendChild(img)
       cardimg.appendChild(card)

       ResultadoPesquisa.appendChild(cardimg)

       card.classList.add('card')
       cardimg.classList.add('cardimg')

       CampoPesquisa.removeAttribute('disabled', 'disabled')
       CampoPesquisa.placeholder = 'Ex..: Inteligência Artificial';
        CampoPesquisa.style.outline = '1px solid white';
       })  } }
               
       
       
        catch (error){
              CampoPesquisa.removeAttribute('disabled', 'disabled')
              CampoPesquisa.placeholder = 'Ex..: Inteligência Artificial';
              AvisoError.innerText = 'Erro de requisição';     
              ResultadoPesquisa.appendChild(AvisoError)
       }   
    }
       

    

CampoPesquisa.addEventListener('keydown', (event) =>{

   

   if(event.key === 'Enter'){
      if (CampoPesquisa.value.trim() === '' ){
           CampoPesquisa.placeholder = 'Campo está vazio';
           CampoPesquisa.style.outline = '1px solid Red';
           return
           
       }
       else{
     BuscarRepositor();
      } }
     
})

 
 
