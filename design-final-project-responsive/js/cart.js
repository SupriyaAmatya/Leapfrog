let carts = document.querySelectorAll(".basket");

let products = [
    {
        name: 'Collector iOS Wireframe UI Kit',
        tag: 'ui-kit',
        price: 60,
        soldBy: 'Supriya Amatya',
        inCart: 0
    },

    {
        name: 'Water Bottle Mockup',
        tag: 'water-bottle',
        price: 0,
        soldBy: 'Supriya Amatya',
        inCart: 0
    },

    {
        name: 'T-shirt Mockup PSD',
        tag: 'tshirt',
        price: 15,
        soldBy: 'Supriya Amatya',
        inCart: 0
    },
    {
        name: 'Van Mockup PSD - 6 Angles',
        tag: 'van',
        price: 60,
        soldBy: 'Supriya Amatya',
        inCart: 0
    },

    {
        name: 'Kitchen Items Mockup',
        tag: 'kitchen-items',
        price: 50,
        soldBy: 'Supriya Amatya',
        inCart: 0
    },

    {
        name: 'Kitchen Items Mockup',
        tag: 'kitchen-items',
        price: 50,
        soldBy: 'Supriya Amatya',
        inCart: 0
    },

    {
        name: 'Kitchen Items Mockup',
        tag: 'kitchen-items',
        price: 50,
        soldBy: 'Supriya Amatya',
        inCart: 0
    },

    {
        name: 'Kitchen Items Mockup',
        tag: 'kitchen-items',
        price: 50,
        soldBy: 'Supriya Amatya',
        inCart: 0
    },

    {
        name: 'Kitchen Items Mockup',
        tag: 'kitchen-items',
        price: 50,
        soldBy: 'Supriya Amatya',
        inCart: 0
    },
];

for(let i = 0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart-number').textContent = productNumbers;
    }
}

function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers' , productNumbers + 1);
        document.querySelector('.cart-number').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers' , 1);
        document.querySelector('.cart-number').textContent = 1;
    }

    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.tag] == undefined){ //eg: cartItems[product.tag] is different than cartItems['iOSWireframe'] 
            cartItems = {
                ...cartItems,   //grabs whatever is on the cartItems from before.
                [product.tag]: product 
            }
        }
        cartItems[product.tag].inCart += 1; // eg: cartItems['iOSWireframe']
    }else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart" , JSON.stringify(cartItems));
}

function totalCost(product){
    // console.log(product.price);
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    }else{
        localStorage.setItem('totalCost', product.price);
    }

}

// function updateCart(product){
//     let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);

//     let productContent = document.querySelectorAll(".product");
//     for(let i=0; i<productContent.length; i++){
//         productContent[i].addEventListener('click', function(e){
//             console.log(e.target);
//         });
//     }

// }

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");

    let totalContainer = document.querySelector(".shoppingCartRight");
    let cartCost = localStorage.getItem('totalCost');
    let cartNumbers = localStorage.getItem('cartNumbers');
    
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += ` 
            <div class = "product cartWrapper clearfix">
                <div class="itemDetail th-col first-col">
                    <div class="thumbImg floatLeft">
                        <img src="./images/${item.tag}.png">
                    </div>
                    <div class="nameDetail floatLeft">
                        <a class = "title" href="#">
                            ${item.name}
                        </a>
                        <span class="fullWidth soldBy">Sold By <em>${item.soldBy}</em></span>
                        
                        <div class = "quantity-selector">
                            <ion-icon name="caret-back-outline" onclick="sub()"></ion-icon>
                            <span>${item.inCart}</span>
                            <ion-icon name="caret-forward-outline" onclick="add()"></ion-icon>
                        </div>
                    </div>
                </div>
                <div class="th-col totalAmount productPrice">
                    <div class="fullWidth">
                        <span class="price">$ ${item.inCart * item.price}.00</span>
                        <div class="fullWidth cartAction">
                            <a class="clearCart"><ion-icon name="trash"></ion-icon> Remove</a>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });

        totalContainer.innerHTML += `
        <div class="orderSummary">
            <h3 class="fullWidth">Subtotal(<span>${cartNumbers}</span> Items): $ <span>${cartCost}</span>.00</h3>
            <button class="login-btn"><img src="images/basket-logo.png"> BUY NOW</button>
        </div>
        `;
        document.querySelector(".cartTitle span").innerHTML = cartNumbers;
    }

    // let productContent = document.querySelectorAll(".product");
    // for(let i=0; i<productContent.length; i++){
    //     productContent[i].addEventListener('click', function(e){
    //         console.log(e.target);
    //     });
    // }
    

    // removeItems(cartItems);
}

function add(){
    let number = document.querySelector('.quantity-selector span');
    console.log(number);
}

function removeItems(cartItems){
    let clearItems = document.querySelectorAll(".clearCart");
    // let cartItems = localStorage.getItem('productsInCart');
    let productContent = document.querySelectorAll(".product")
    let products = Object.values(cartItems);

    for(let i=0; i<productContent.length; i++){
        productContent[i].addEventListener('click' , function(event){
            if(event.target.classList.contains("clearCart")){
                productContent[i].parentNode.removeChild(productContent[i]);
                // console.log(productContent);
                // localStorage.setItem('productsInCart', JSON.stringify(productContent));
            }
            // let index = productContent.indexOf(productContent[i]);
            // console.log(index);
            // console.log(event.target);
            // console.log(products.indexOf(productContent[i]));
        });
    }
    
}

onLoadCartNumbers();
displayCart();