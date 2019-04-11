'use strict';

window.addEventListener('load', productPage);

function productPage(){
    var coloursMap={},propertyMap={},sizeArr=[],qtyArr=[],prodJson,selectedColor='',curPrice=0.00,prevPrice=0.00,saving=0.00;    
    callServlet();
    return;
function buildDataConfig(productJson){
    for(var k=0;k<productJson.styles.length-1;k++){
        var styleObj=productJson.styles[k];
      
      for(var l=0;l<styleObj.skus.length-1;l++){
          var skusObj=styleObj.skus[l];
          sizeArr[l]=skusObj.size.Size;
          qtyArr[l]=skusObj.maximumPurchaseQuantity;
          propertyMap['#'+skusObj.size.Size]={colour:styleObj.colour,size:skusObj.size.Size,qty:skusObj.maximumPurchaseQuantity,curPrice:skusObj.price.currentPrice,prevPrice:skusObj.price.previousPrice};
      }
      coloursMap[styleObj.hexCode]= propertyMap;
  }
}
function buildPage(){
    document.getElementById('data-brand').innerHTML=prodJson.brand;
    document.getElementById('data-product-name').innerHTML=prodJson.name;
    document.getElementById('data-prod-image').style='background-image:url("'+prodJson.images[0].normal+'")';
    document.getElementById('add-to-cart-bttn').addEventListener('click',callAddToCart.bind(this));
  buildColourPalette();
    buildSizeCombo('');
    buildQtyCombo('');
    
}
function callAddToCart(){
    var data = new FormData();
data.append('colour',document.getElementById('data-prod-color').innerHTML);
data.append('size', document.getElementById('data-size-combo').innerHTML);
data.append('qty', document.getElementById('data-qty-combo').innerHTML);

var postReq = new XMLHttpRequest();
postReq.open('POST', 'ProductServlet', true);
postReq.onload = function () {
    alert(data+'\r\n'+this.responseText);
};
postReq.send(data);
}
function buildColourPalette(){
        var colourPalette=document.getElementById('data-color-row');
        Object.keys(coloursMap).forEach(function(item,itemKey){
          var  td = document.createElement('td');
            td.style='background-color:'+item;
                colourPalette.appendChild(td);
                td.addEventListener('click',onColorChange.bind(this,td,item));
        });
        return;
        function onColorChange(tdElem,colorVal){ 
            tdElem.classList.add('highlight');
            buildSizeCombo(colorVal);
            buildQtyCombo(colorVal);
            document.getElementById('data-prod-color').innerHTML=selectedColor;
            document.getElementById('data-prev-price').innerHTML=prevPrice;
            document.getElementById('data-cur-price').innerHTML=curPrice;
            saving=prevPrice-curPrice;
            document.getElementById('data-saving-price').innerHTML=saving;
            console.log();
        }
}
function callServlet() {
      // New XMLHTTPRequest
    var request = new XMLHttpRequest();
    request.open('GET', 'ProductServlet', true);
    request.setRequestHeader('Content-Type', 'text/plain');
    request.send();
    request.onreadystatechange = function () {
     if (request.readyState == 4 && request.status == 200) {
            var response = request.responseText;
            prodJson = JSON.parse(response); 
            buildDataConfig(prodJson);      
            buildPage();
        }
    // view request status
   
   };
}

function buildSizeCombo(colorVal){
    var sizeSelect=document.getElementById('data-size-combo');
    sizeSelect.innerHTML='';
    console.log('color hexcode'+colorVal);
    var sizeMap=coloursMap[colorVal];
    console.log('color sizemap'+sizeMap);
    var sizeList=Object.keys(sizeMap);
    console.log('color sizelist'+sizeList);
    for (var i = 0, il = sizeList.length, size, option; i < il; i++) {
                size = sizeList[i].substring(1,sizeList[i].length);
                option = document.createElement('option');
                option.value = size;
                option.innerHTML = size;
                sizeSelect.appendChild(option);
            }
}
function buildQtyCombo(colorVal){
    var qtySelect=document.getElementById('data-qty-combo');
    qtySelect.innerHTML='';
    var sizeMap=coloursMap[colorVal];
    var sizeList=Object.keys(sizeMap);
    for (var i = 0, il = sizeList.length, qty, option; i < il; i++) {
                qty = coloursMap[colorVal][sizeList[i]].qty;
                selectedColor=coloursMap[colorVal][sizeList[i]].colour;
                prevPrice=coloursMap[colorVal][sizeList[i]].prevPrice;
                curPrice=coloursMap[colorVal][sizeList[i]].curPrice;
                option = document.createElement('option');
                option.value = qty;
                option.innerHTML = qty;
                qtySelect.appendChild(option);
            }
}
}
