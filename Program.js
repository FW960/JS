"use strict";

const $wrapper = document.querySelector(".wrapper");

const $cart = document.createElement("div");

$cart.classList.add("element");

const $elements = document.querySelector(".elements");

$cart.textContent = "Cart";

$elements.append($cart);

const $cartMenu = document.createElement("div");

$cartMenu.classList.add("cartMenu");

const $catalog = document.querySelector(".catalog");

class Shop 
{
    cart = new Cart();

    productsDB = new ProductsDataBase();

    AddToCart(product, cart) 
    {
        cart.goods.push(product);
    }

    RemoveFromCart(product, cart) 
    {
        let count = 0;

        for (let i = 0; i < cart.goods.length; i++)
        {
            if (product.id == cart.goods[i].id)
            {
                cart.goods.splice(i, 1); break;
            }
        }
    }

    CalculateCartPrice(cart)
    {
        let wholePrice = 0;

        for (let i = 0; i < cart.goods.length; i++)
            wholePrice += cart.goods[i].Price;

        return wholePrice;
    }
    AddNewProductToDB(Name, Price, Manufacturer, id)
    {
        for (let i = 0; i < this.productsDB.allProducts.length; i++)
        {
            if (id == this.productsDB.allProducts[i].id)
                return;
        }

        this.productsDB.allProducts.push(new Product(Name, Price, Manufacturer, id));
    }
    RemoveProductFromDB(productId)
    {
        for (let i = 0; i < this.productsDB.allProducts.length; i++)
        {
            if (productId == this.productsDB.allProducts[i].id)
            {
                this.productsDB.allProducts.splice(i, 1); break;
            }
        }
    }

}

class ProductsDataBase
{
    allProducts = new Array();
}

class Product
{
    constructor(Name, Price, Manufacturer, id)
    {
        this.Name = Name;

        this.Price = Price;

        this.Manufacturer = Manufacturer;

        this.id = id;
    }
}

class Cart
{
    goods = new Array();
}

let shop = new Shop();

shop.AddNewProductToDB("Banana", 30, "Khyrgish.inc", 0);

shop.AddNewProductToDB("Apple", 20, "Khyban.co", 1);

shop.AddNewProductToDB("Grape", 25, "Khyban.co", 2);

displayCatalogElems();

function displayCatalogElems()
{
    for (let i = 0; i < shop.productsDB.allProducts.length; i++)
    {
        let product = shop.productsDB.allProducts[i];

        let $productElem = document.createElement("div");

        let $productElemList = document.createElement("ul");

        $productElemList.classList.add("catalogElementList");

        $productElem.classList.add("catalogElement");

        let $elemButtonsContainer = document.createElement("div");

        $elemButtonsContainer.classList.add("elemButtonsContainer");

        let $addToCartButton = document.createElement("div");
        
        $addToCartButton.textContent = "Add";
        
        $addToCartButton.classList.add("addToCartButton");
        
        $addToCartButton.addEventListener("click", shop.AddToCart.bind(shop.AddToCart, shop.productsDB.allProducts[i], shop.cart));

        let $removeFromCartButton = document.createElement("div");

        $removeFromCartButton.textContent = "Remove";

        $removeFromCartButton.classList.add("removeFromCartButton");

        $removeFromCartButton.addEventListener("click", shop.RemoveFromCart.bind(shop.RemoveFromCart, shop.productsDB.allProducts[i], shop.cart));      

        $catalog.append($productElem);

        $productElem.append($productElemList);

        $productElem.append($elemButtonsContainer);

        $elemButtonsContainer.append($addToCartButton, $removeFromCartButton);

        for (const key in product)
        {
            if (key == "id")
                continue;

            let $productElemListElement = document.createElement("p");

            $productElemListElement.classList.add("catalogElementListElement");

            $productElemListElement.textContent = `${key} ${product[key]}`;

            $productElemList.append($productElemListElement);
        }

    }
}

$cart.addEventListener("click", showCart);

let cartIsDisplayed = true;

function showCart()
{

    if (cartIsDisplayed)
    {
        $wrapper.append($cartMenu);

        enumCartGoogsAndDisplay(shop, false);

        cartIsDisplayed = false;
    } else
    {
        $cartMenu.innerHTML = "";

        $cartMenu.remove(); cartIsDisplayed = true;
    }

}

function enumCartGoogsAndDisplay(shop)
{
    let $cartElem = document.createElement("p");

    $cartElem.classList.add("cartMenuElement");

    let cartElemInfo = "";

    if (shop.cart.goods.length == 0)
    {
        $cartElem.textContent = "Cart is Empty";
    }
    else
    {
        cartElemInfo = `There is ${shop.cart.goods.length} products in your cart with total Price ${shop.CalculateCartPrice(shop.cart)}`; 
        
        $cartElem.textContent = cartElemInfo;
    }

    $cartMenu.append($cartElem);
}

