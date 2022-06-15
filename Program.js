"use strict";

const $wrapper = document.querySelector(".wrapper");

const $cart = document.createElement("div");

$cart.classList.add("element");

const $headerElements = document.querySelector(".headerElements");

$cart.textContent = "There is no goods in your cart at the moment";

$headerElements.append($cart);

const $cartMenu = document.createElement("div");

$cartMenu.classList.add("cartMenu");

const $catalog = document.querySelector(".catalog");

class Shop 
{
    cart = new Cart();

    productsDB = new ProductsDataBase();

    AddToCart(product, cart, calcCartPrice, calcAmountOfGoods) 
    {
        for (let i = 0; i < cart.goods.length; i++)
        {
            console.log(i);

            if (cart.goods[i].id == product.id)
            {
                cart.goods[i].AmountInCart++;
                break;
            }

            if (i == cart.goods.length - 1)
            {
                cart.goods.push(product);
                product.AmountInCart = 1;
                break;
            }
        }

        if (cart.goods.length == 0)
        {
            cart.goods.push(product);
            product.AmountInCart = 1;
        }


        enumCartGoogsInHeader(calcCartPrice(cart), calcAmountOfGoods(cart));

        if (!cartIsDisplayed)
        {
            $cartMenu.innerHTML = "";
            enumCartGoodsInside(cart);
        }

    }

    RemoveFromCart(product, cart) 
    {
        for (let i = 0; i < cart.goods.length; i++)
        {
            if (product.id == cart.goods[i].id)
            {
                if (cart.goods[i].AmountInCart > 0)
                    cart.goods[i].AmountInCart--;

                if(cart.goods[i].AmountInCart == 0)
                    cart.goods.splice(i, 1);
            }
        }

        if (!cartIsDisplayed)
        {
            $cartMenu.innerHTML = "";
            enumCartGoodsInside(cart);
        }
    }

    CalculateCartPrice(cart)
    {
        let wholePrice = 0;

        for (let i = 0; i < cart.goods.length; i++)
        {
            wholePrice += (cart.goods[i].Price * cart.goods[i].AmountInCart);
        }

        return wholePrice;
    }
    CalculateAmountOfGoods(cart)
    {
        let amount = 0;

        for (let i = 0; i < cart.goods.length; i++)
            amount += cart.goods[i].AmountInCart;

        return amount;
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
    constructor(Name, Price, Manufacturer, id, img)
    {
        this.Name = Name;

        this.Price = Price;

        this.Manufacturer = Manufacturer;

        this.id = id;

        this.AmountInCart = 0;

        this.img = img;
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

        $addToCartButton.addEventListener("click", shop.AddToCart.bind(shop.AddToCart, shop.productsDB.allProducts[i], shop.cart, shop.CalculateCartPrice, shop.CalculateAmountOfGoods));

        $catalog.append($productElem);

        $productElem.append($productElemList);

        $productElem.append($elemButtonsContainer);

        $elemButtonsContainer.append($addToCartButton);

        for (const key in product)
        {
            if (key == "id" || key == "AmountInCart" || key == "img")
                continue;

            let $productElemListElement = document.createElement("p");

            $productElemListElement.classList.add("catalogElementListElement");

            $productElemListElement.textContent = `${key} ${product[key]}`;

            if (key == "Price")
                $productElemListElement.textContent += ` $`;

            $productElemList.append($productElemListElement);
        }

    }
}

$cart.addEventListener("click", showCart.bind(showCart, shop.cart));

let cartIsDisplayed = true;

function showCart(cart)
{
    if (cartIsDisplayed)
    {
        enumCartGoodsInside(cart);

        $wrapper.append($cartMenu);

        cartIsDisplayed = false;
    } else
    {
        $cartMenu.innerHTML = "";

        $cartMenu.remove(); cartIsDisplayed = true;
    }

}
function enumCartGoodsInside(cart)
{
    let $cartMenuElementHeader = document.createElement("h2");

    $cartMenuElementHeader.textContent = "There is:"; $cartMenuElementHeader.classList.add("cartMenuElement");

    $cartMenu.append($cartMenuElementHeader);

    let $cartMenuElementList = document.createElement("ol");

    $cartMenuElementList.classList.add("cartMenuList");

    for (let i = 0; i < cart.goods.length; i++)
    {
        let $cartMenuElementListProduct = document.createElement("p");

        $cartMenuElementListProduct.textContent = `${cart.goods[i].Name} - ${cart.goods[i].AmountInCart}. Price ${cart.goods[i].AmountInCart * cart.goods[i].Price} $`;

        $cartMenuElementListProduct.classList.add("cartMenuListProduct");

        let $cartMenuButtons = document.createElement("div");

        $cartMenuButtons.classList.add("cartMenuButtons");

        let $addOneButtonInCart = document.createElement("div");

        $addOneButtonInCart.addEventListener("click", shop.AddToCart.bind(shop.AddToCart, shop.cart.goods[i], shop.cart, shop.CalculateCartPrice, shop.CalculateAmountOfGoods))

        $addOneButtonInCart.classList.add("addOne"); $addOneButtonInCart.textContent = "+";

        let $removeOneButtonInCart = document.createElement("div"); $removeOneButtonInCart.textContent = "-";

        $removeOneButtonInCart.addEventListener("click", shop.RemoveFromCart.bind(shop.RemoveFromCart, shop.cart.goods[i], shop.cart))

        $removeOneButtonInCart.classList.add("removeOne");

        $cartMenuButtons.append($addOneButtonInCart, $removeOneButtonInCart);

        $cartMenuElementListProduct.append($cartMenuButtons);

        $cartMenuElementList.append($cartMenuElementListProduct);
    }

    $cartMenu.append($cartMenuElementList);
}


function enumCartGoogsInHeader(cartPrice, amountOfGoods)
{
    $cart.remove();

    if (cartPrice == 0)
    {
        $cart.textContent = "There is no goods in your cart at the moment"
    } else if (cartPrice > 0)
    {
        $cart.textContent = `There is ${amountOfGoods} goods in your with total price ${cartPrice} $`
    }

    $headerElements.append($cart);
}

