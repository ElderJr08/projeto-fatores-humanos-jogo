$(function(){
  createElement();
  var x = document.querySelectorAll('audio');
  x[0].autoplay = true;
});

const DEBUG_MODE = true;
const PRODUTO_FASE1 = ["leite","refri-lata","doces"];
const PRODUTO_FASE2 = ["coca","chocolate","chips"];
const VALOR_PRODUTO_FASE1 = ["2","6","2"];
const VALOR_PRODUTO_FASE2 = ["6","4","5"];
const DISPLAY_MONITOR = ["Leite ............... R$2,00","Refri-Lata ....... R$6,00","Doces ............. R$2,00"];
const DISPLAY_MONITOR2 = ["Coca-Cola ......... R$6,00","Chocolate .......... R$4,00","Chips ................. R$5,00"];
var total = 0;
var index = 0;
var troco = 0;
var shake = 0;
consoleLog("index1: "+index);
function consoleLog(msg){
  if(DEBUG_MODE){
    console.log(msg);
  }
}

function getProduto(id,valor){
  let element = document.getElementById(id);
  total+=valor;
  consoleLog(total);
  createElement();
  element.remove();

}

function createElement(){
  consoleLog(PRODUTO_FASE1[index]);
  let nextItem = document.createElement('img'),
      div_produto = document.getElementById('produtos');
  if(index < 3){
    nextItem.setAttribute('id',''+PRODUTO_FASE1[index]+'');
    nextItem.setAttribute('src','../FatoresHumanos/Image/Produtos/'+PRODUTO_FASE1[index]+'.png');
    nextItem.setAttribute('class','animated slideOutRight');
    nextItem.setAttribute('onclick','getProduto(this.id,'+VALOR_PRODUTO_FASE1[index]+'); addItens('+index+');');
    div_produto.appendChild(nextItem);
    index++
  }


}

function addItens(index){
  let valorItem = document.createElement('li'),
      campo = document.getElementById('add-itens'),
      texto = document.createTextNode(DISPLAY_MONITOR[index]),
      btn_confirma = document.querySelector('.confirma-troco input');
 
  if(index<3){
    valorItem.appendChild(texto);
    campo.appendChild(valorItem);
  }
  if(index === 2){
    btn_confirma.style.display = 'block';
    document.getElementById('total').innerHTML = 'TOTAL ..........R$'+total+',00';

  }
}

function confirm(){ 
  let btn_confirma = document.querySelector('.confirma-troco input'),
      nota_cliente = document.querySelector('#cedula-cliente');
  btn_confirma.remove();
  nota_cliente.style.display = 'block';
  troco = (20-total);
  document.getElementById('add-itens').innerHTML = 'Total: R$'+total+',00</br>Dinheiro: R$20,00';
  document.getElementById('total').innerHTML = 'TROCO ..........R$'+(troco)+',00'
}

function showModal(){
  let modalTroco = document.querySelector('#troco');
  modalTroco.style.display = 'block';
}

function getCedula(nota,mexer){
  let modalTroco = document.querySelectorAll('#troco img');
  if(nota - troco === 0){
    modalTroco[mexer].setAttribute('class','animated tada');
    modalTroco[mexer].style.border = '2px solid #117b13';
    wellDone();
    
  }else{
    modalTroco[mexer].setAttribute('class','animated shake');
    modalTroco[mexer].style.border = '2px solid red';
  }
     
}

function wellDone(){
  let divTroco = document.getElementById('troco'),
      congrat = document.getElementById('congratulations');
  setTimeout(function(){divTroco.setAttribute('class','animated bounceOut');},1000);
  setTimeout(function(){congrat.style.display='block';},1500);
  
  document.getElementById('add-itens').innerHTML = '';
  document.getElementById('total').innerHTML = ''

}



    