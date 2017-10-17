var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var obj = JSON.parse(this.responseText);

        var visited = document.querySelector('#visited'),
            itemsVisited = document.querySelector('.visited-items');
        itemsVisited.appendChild(createProductItem(obj[0].data.item));
        visited.appendChild(itemsVisited);

        var recommended = document.querySelector('#recommendations'),
            itemsRecommended = document.querySelector('.recommended-items'),
            suggestedList = obj[0].data.recommendation;

        for (var i=0; i<suggestedList.length; i++) {
            itemsRecommended.appendChild(createProductItem(suggestedList[i]));
        }
        recommended.append(itemsRecommended);
    }
}

xhr.open("GET", 'https://raw.githubusercontent.com/meendoo/itelios-frontend-challenge/master/products.json', true);
xhr.send();

function createProductItem (obj) {
    
    // CONTAINER
    var container = newElement('li', 'item');
    container.setAttribute('id', obj.businessId);
    var linkToItem = newElement('a');
    linkToItem.setAttribute('href', '#'+obj.businessId);

    // IMAGE
    var imgHolder = newElement('div', 'item-preview'),
        img = newElement('img');
    img.setAttribute('src', obj.imageName.replace('//www.itelios.com.br/arquivos/imagens/', 'https://raw.githubusercontent.com/meendoo/itelios-frontend-challenge/master/images/')); // fix pro src das imagens
    imgHolder.append(img);
    linkToItem.append(imgHolder);
    
    // NAME
    var itemName = newElement('div', 'item-name');
    itemName.innerHTML = obj.name.slice(0, 84).concat('...');
    itemName.setAttribute('title', obj.name);
    linkToItem.append(itemName);

    container.append(linkToItem);
    
    // OLD PRICE
    // Experimento com o preço antigo, removido porque não estava no layout proposto

    // var oldPrice;
    // if (obj.oldPrice) {
    //     oldPrice = newElement('div', 'item-oldprice');
    //     oldPrice.innerHTML = `De: <span class="price__strikethrough">${obj.oldPrice}</span>`;
    //     container.append(oldPrice);
    // }
    
    // PRICE
    var itemPrice = newElement('div', 'item-price');
    itemPrice.innerHTML = `Por: <span class="price__bold">${obj.price}</span>`;
    container.append(itemPrice);

    // PAYMENT CONDITIONS
    var splitPrice = newElement('div', 'item-splitprice');
    var pt1 = 'ou até ',
        pt2 = ' sem juros';
    var stringFragment = obj.productInfo.paymentConditions.split(pt1);
    var priceString = stringFragment[1].split(pt2);
    splitPrice.innerHTML = `${pt1}<strong>${priceString}</strong>${pt2}`;
    container.append(splitPrice);

    // ADD TO CART BUTTON
    var addToCartWrapper = newElement('div', 'item-add-wrapper');
    var addToCart = newElement('a', 'item-add');
    addToCart.setAttribute('href', '#');
    var addText = newElement('span', 'add-text');
    addText.innerHTML = "adicionar ao carrinho";
    addToCart.append(addText);
    var addIcon = newElement('i', 'item-add-icon material-icons');
    addIcon.innerHTML = "add_shopping_cart";
    addToCart.append(addIcon);
    addToCartWrapper.append(addToCart);
    container.append(addToCartWrapper);

    return container;
}

function newElement(tagname, className) {
    var element = document.createElement(tagname);
    if (className) {
        element.setAttribute('class', className);
    }
    return element;
}