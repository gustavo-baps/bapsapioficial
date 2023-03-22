class Ator{
    constructor(id,nome){
        this.nome=nome;
        this.id=id
    }
}
class Diretor{
    constructor(id,nome){
        this.nome=nome;
        this.id=id;
    }
}
class Filme{
    constructor(id, titulo, ano, genero, duracao, cartaz, sinopse, direcao, elenco, classificacao, avaliacao){
        this.id=id;
        this.titulo=titulo;
        this.ano=ano;
        this.genero=genero;
        this.duracao=duracao;
        this.sinopse=sinopse;
        this.cartaz=cartaz;
        this.direcao=direcao;
        this.elenco=elenco;
        this.classificacao=classificacao;
        this.avaliacao=avaliacao;
        this.btnDetalhes=null;
    }
    getCard = () => {
        let card = document.createElement("div");
        card.setAttribute("class","card");
        let imgCartaz= document.createElement("img");
        imgCartaz.setAttribute("class", "card-img-topz");
        imgCartaz.setAttribute("src",this.cartaz);
        let cardBody = document.createElement("div");
        cardBody.setAttribute("class","card-body"); 
        let hCardTitle=document.createElement("h5");
        hCardTitle.setAttribute("class", "card-title"); 
        let divDetalhes = document.createElement("div");
        divDetalhes.setAttribute("style","display:flex; justify-content:space-aroud;");
        let divGenero= document.createElement("div");
        divGenero.setAttribute("style", "flex-grow:1;"); 
        let divAnoProducao= document.createElement("div");
        divAnoProducao.setAttribute("style","flex-grow:1;");
        let divClassificacao= document.createElement("div");
        divClassificacao.setAttribute("style","flex-grow:1;"); 
        hCardTitle.appendChild(document.createTextNode(this.titulo)); 
        divGenero.appendChild(document.createTextNode(this.genero)); 
        divAnoProducao.appendChild(document.createTextNode(this.ano));
        divClassificacao.appendChild(document.createTextNode(this.classificacao));
        divDetalhes.appendChild(divGenero);
        divDetalhes.appendChild(divAnoProducao);
        divDetalhes.appendChild(divClassificacao);
        card.appendChild(imgCartaz);
        card.appendChild(cardBody);
        cardBody.appendChild(hCardTitle);
        cardBody.appendChild(divDetalhes);

        this.setBtnDetalhes();
        cardBody.appendChild(this.getBtnDetalhes());

        return card;
    }
    setBtnDetalhes = () =>{
    this.btnDetalhes = document.createElement('button');
    this.btnDetalhes.appendChild(document.createTextNode("Detalhes"));
    this.btnDetalhes.setAttribute("id", this.id);
    this.btnDetalhes.setAttribute("class", "btnDetalhesFilme");
    }
    getBtnDetalhes = () =>{
        return this.btnDetalhes
    }

    getDetalhesFilme = () =>{
        let cardDetalhes = document.createElement('div');
        cardDetalhes.setAttribute('class', 'card mb-3');
        cardDetalhes.style.maxWidth = '540px';
        let row = document.createElement('div');
        row.setAttribute('class','row g-0');
        let col = document.createElement('div');
        col.setAttribute('class','col-md-4');
        let img = document.createElement('img');
        img.setAttribute('class','img-fluid rounded-start');
        img.setAttribute('src',this.cartaz);
        col.appendChild(img);
        row.appendChild(col);
        let col2 = document.createElement('div');
        col2.setAttribute('class','col-md-8');
        let cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body');
        let cardText = document.createElement('h5');
        cardText.setAttribute('class', 'card-title');
        let cardText2 = document.createElement('p');
        cardText2.setAttribute('class', 'card-text');
        



    }
}

