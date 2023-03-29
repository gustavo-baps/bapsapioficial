let inputBuscarFilme = document.querySelector("#input-buscar-filme");
let btnBuscarFilme = document.querySelector("#btn-buscar-filme");
let btnDetalhesFilme = document.querySelector(".btnDetalhesFilme");
let mostrarFilme = document.getElementById('mostrar-filme');
let info = document.getElementById('info');

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
        document.querySelector("#card-filme").innerHTML = "";
        document.querySelector("#card-filme").appendChild(filme.getDetalhesFilme());
        document.querySelector("#mostrar-filme").style.display = "flex";
        document.querySelector('#btnFechar').onclick = () =>{
            document.querySelector('#lista-filmes').style.display = 'flex';
            document.querySelector('#mostrar-filme').innerHTML = "";
            document.querySelector('#mostrar-filme').style.display = 'none';
        }
        document.querySelector('#btnSalvar').onclick = () =>{
            salvarFilme(filme);
        }
    });
}
let listarFilmes = async (filmes)=>{
    let listaFilmes = await document.querySelector("#lista-filmes");
    document.querySelector("#mostrar-filme").innerhtml = "";
    document.querySelector("#mostrar-filme").style.display = "none";
    console.log(listaFilmes);
    if (filmes.length > 0){
        filmes.forEach(async(filme)=>{
            listaFilmes.appendChild(await filme.getCard());
            filme.getBtnDetalhes().onclick=()=>{
                detalhesFilme(filme.id);
                mostrarFilme.style.display = "block";
            }
        });
    }
}
function fecharBotao(){
    mostrarFilme.style.display = "none";
} 