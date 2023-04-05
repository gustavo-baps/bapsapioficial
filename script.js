let inputBuscarFilme = document.querySelector("#input-buscar-filme");
let btnBuscarFilme = document.querySelector("#btn-buscar-filme");
let btnDetalhesFilme = document.querySelector(".btnDetalhesFilme");
let mostrarFilme = document.getElementById('mostrar-filme');
let navFavoritos = document.querySelector('#nav-favoritos');
let home = document.querySelector("#home");

home.onclick=()=>{
    document.querySelector("#lista-filmes").innerHTML = "";
}

btnBuscarFilme.onclick = () =>{
    if(inputBuscarFilme.value.length > 0){
        let filmes = new Array();
        fetch("http://www.omdbapi.com/?apikey=6752ca2a&s="+inputBuscarFilme.value, {mode:"cors"})
        .then((resp)=>resp.json())
        .then((resp)=>{
            resp.Search.forEach((item)=>{
                console.log(item);
                let filme = new Filme(
                    item.imdbID,
                    item.Title,
                    item.Year,
                    item.Genre,
                    item.Runtime,
                    item.Poster,
                    item.Plot,
                    item.Director,
                    item.Actors,
                    item.Awards,
                    item.imdbRating
                );
                filmes.push(filme);
            });
            listarFilmes(filmes)
        })
    }
    return false;
}
let detalhesFilme = async (id)=>{
    fetch("http://www.omdbapi.com/?apikey=6752ca2a&i="+id)
    .then((resp)=>resp.json())
    .then((resp)=>{
        let filme = new Filme(
            resp.imdbID,
            resp.Title,
            resp.Year,
            resp.Genre.split(","),
            resp.Runtime,
            resp.Poster,
            resp.Plot,
            resp.Director,
            resp.Actors.split(","),
            resp.Awards,
            resp.imdbRating
        )
        mostrarFilme.appendChild(filme.getDetalhesFilme());
        document.querySelector("#btnSalvar").onclick =()=>{
            salvarFilme(filme);
        }
        document.querySelector("#btnExcluir").onclick=()=>{
            excluirFilme(filme);
        }
    });
}
let listarFilmes = async (filmes)=>{
    let listaFilmes = await document.querySelector("#lista-filmes");
    listaFilmes.innerHTML = "";
    if (filmes.length > 0){
        filmes.forEach(async(filme)=>{
            listaFilmes.appendChild(filme.getCard());
            filme.getBtnDetalhes().onclick=()=>{
                detalhesFilme(filme.id);
                mostrarFilme.innerHTML = "";
                mostrarFilme.style.display = "block";
                let botao = document.createElement('a');
                botao.appendChild(document.createTextNode('x'));
                botao.setAttribute('onclick','fecharBotao()');
                mostrarFilme.appendChild(botao);
            }
        });
    }
}

function listarFavoritos(){
    let filmesFavoritos = localStorage.getItem('filmesFavoritos');
    filmesFavoritos=JSON.parse(filmesFavoritos);
    let filmes = new Array();
    filmesFavoritos.forEach((item)=>{
        let filme = new Filme(
            item.id,
            item.titulo,
            item.ano,
            item.genero,
            item.duracao,
            item.cartaz,
            item.direcao,
            item.elenco,
            item.classificacao,
            item.avaliacao
        );
        filmes.push(filme);
    })
    listarFilmes(filmes);
}
let salvarFilme = (filme) => {
    let filmesString = localStorage.getItem('filmesFavoritos');
    let filmes=null;
    if(filmesString){
        filmes=JSON.parse(filmesString);
        filmes.push(filme);
        console.log('b');
    }else{
        filmes=[filme];
        console.log('a');
    }
    
    filmes = JSON.stringify(filmes);
    localStorage.setItem('filmesFavoritos',filmes);
    console.log(filmes);
}
  
navFavoritos.onclick = () =>{
    listarFavoritos();
}
function fecharBotao(){
    mostrarFilme.style.display = "none";
    document.querySelector("#card-filme").innerHTML = "";
}