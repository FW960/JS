"use strict";

const $wrapper = document.querySelector(".wrapper");

const $cart = document.createElement("div");

$cart.classList.add("element");

const $headerElements = document.querySelector(".headerElements");

$cart.textContent = "Корзина пуста";

$headerElements.append($cart);

const $cartMenuBox = document.createElement("div");

$cartMenuBox.classList.add("cartMenuBox");

const $cartMenu = document.createElement("div");

$cartMenu.classList.add("cartMenu");

const $catalog = document.querySelector(".catalog");

const $orderForm = document.createElement("form");

$orderForm.id = "orderForm";

$orderForm.setAttribute("style", "visibility: hidden;");

$orderForm.setAttribute("action", "#");

$orderForm.setAttribute("method", "get");

let orderFormIsDisplayed = false;

let productPhotoIsDisplayed = false;

document.addEventListener("keydown", displayPrevOrNextPhoto);

class Shop 
{
    cart = new Cart();

    productsDB = new ProductsDataBase();

    AddToCart(product, cart, calcCartPrice, calcAmountOfGoods) 
    {
        for (let i = 0; i < cart.goods.length; i++)
        {
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
            enumGoodsInsideCart(cart);
        }

        if (orderFormIsDisplayed)
        {
            $orderForm.innerHTML = ""
            displayOrderFormContent();
        }

    }

    RemoveFromCart(product, cart, calcCartPrice, calcAmountOfGoods) 
    {
        for (let i = 0; i < cart.goods.length; i++)
        {
            if (product.id == cart.goods[i].id)
            {
                if (cart.goods[i].AmountInCart > 0)
                    cart.goods[i].AmountInCart--;

                if (cart.goods[i].AmountInCart == 0)
                    cart.goods.splice(i, 1);
            }
        }

        enumCartGoogsInHeader(calcCartPrice(cart), calcAmountOfGoods(cart));

        if (!cartIsDisplayed)
        {
            $cartMenu.innerHTML = "";
            enumGoodsInsideCart(cart);
        }

        if (orderFormIsDisplayed)
        {
            $orderForm.innerHTML = ""
            displayOrderFormContent();
        }

        if (shop.cart.goods.length == 0)
        {
            orderFormIsDisplayed = false;
            $orderForm.setAttribute("style", "visibility: hidden;");
            $orderForm.innerHTML = "";
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
    AddNewProductToDB(Name, Price, Manufacturer, id, img, description)
    {
        for (let i = 0; i < this.productsDB.allProducts.length; i++)
        {
            if (id == this.productsDB.allProducts[i].id)
                return;
        }

        this.productsDB.allProducts.push(new Product(Name, Price, Manufacturer, id, img, description));
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
    constructor(Name, Price, id, Manufacturer, img, description)
    {
        this.Name = Name;

        this.Price = Price;

        this.id = id;

        this.AmountInCart = 0;

        this.img = img;

        this.imgCount = 1;

        this.description = description;

        this.Manufacturer = Manufacturer;

    }
}

class Cart
{
    goods = new Array();
}

let shop = new Shop();

shop.AddNewProductToDB("Персик 'Альберт'", 30, 0, "Khyrgish.inc", ["peach", "peach0", "peach1", "peach2"], "Персики 'Альберт' Самые сочные, свежие и приятно махровые...Конечно же наши персики! Думаю вам уже захотелось попробовать и ощутить этот вкус на своих устах...Чего вы ждёте?");

shop.AddNewProductToDB("Дыня 'Торпеда'", 40, 1, "Khyban.co", ["melon", "melon0", "melon1", "melon2"], "То самое сладкое и при этом приятно освежающее ощущение лета! Почувствуйте настоящий вкус этого дара Азербайджана");

shop.AddNewProductToDB("Виноград 'Изабелла'", 25, 2, "Khyban.co", ["grape", "grape0", "grape1", "grape2"], "Такой же томный и желанный, как настоящая красавица Изабелла из восточных сказок. Для вас только отборный виноград, упругий и свежий!");

shop.AddNewProductToDB("Гранат 'Ачик Анор'", 35, 3, "Khyrgish.inc", ["pome", "pome0", "pome1", "pome2"], "Представьте это ощущение, когда разламываешь гранат, ощущаешь этот аромат и приятную свежесть сока... Зачем представлять, если можно купить и ощутить это самому?");

displayCatalogElems();

function displayCatalogElems()
{
    for (let i = 0; i < shop.productsDB.allProducts.length; i++)
    {
        let product = shop.productsDB.allProducts[i];

        let $productElem = document.createElement("div");

        let $productElemImgBox = document.createElement("div");

        let $productElemImg = document.createElement("img");

        let $productElemList = document.createElement("ul");

        let $addToCartButton = document.createElement("div");

        $productElem.classList.add("catalogElement");

        $productElemImgBox.classList.add("productImgBox");

        $productElemImg.classList.add("productImg");

        $productElemImg.setAttribute("src", `img/${product.img[0]}.png`);

        $productElemImg.addEventListener("click", displayProductPhotos.bind(displayProductPhotos, product));

        $productElemList.classList.add("catalogElementList");

        $addToCartButton.classList.add("addToCartButton");

        $addToCartButton.textContent = `${product.Price} ₽`;

        $addToCartButton.addEventListener("click", shop.AddToCart.bind(shop.AddToCart, shop.productsDB.allProducts[i], shop.cart, shop.CalculateCartPrice, shop.CalculateAmountOfGoods));

        $productElemImgBox.append($productElemImg);

        $productElem.append($productElemImgBox);

        $productElem.append($productElemList);

        $productElem.append($addToCartButton);

        $catalog.append($productElem);

        for (const key in product)
        {
            if (key == "id" || key == "AmountInCart" || key == "img" || key == "imgCount" || key == "Price")
                continue;

            let $productElemListElement = document.createElement("p");

            if (key == "description")
                $productElemListElement.classList.add("productDescription");

            $productElemListElement.classList.add("catalogElementListElement");

            $productElemListElement.textContent = `${product[key]}`;

            $productElemList.append($productElemListElement);
        }

    }
}

$cart.addEventListener("click", showCart.bind(showCart, shop.cart));

let cartIsDisplayed = true;

function showCart()
{
    let $cartMenuExitButton = document.createElement("div");

    $cartMenuExitButton.classList.add("cartMenuExitButton");

    $cartMenuExitButton.textContent = "x";

    $cartMenuExitButton.addEventListener("click", closeCartMenu);

    enumGoodsInsideCart();

    $cartMenuBox.append($cartMenuExitButton);

    if (!orderFormIsDisplayed)
    {
        $cartMenu.classList.add("visible");
    }

    $cartMenuBox.append($cartMenu);

    $cartMenuBox.append($orderForm);

    $wrapper.append($cartMenuBox);

    cartIsDisplayed = false;
}
function enumGoodsInsideCart()
{
    let $cartMenuElementHeader = document.createElement("h2");

    let $cartMenuElementList = document.createElement("ol");

    let $makeOrderButton = document.createElement("a");

    $cartMenuElementHeader.textContent = "В корзине:"; $cartMenuElementHeader.classList.add("cartMenuHeader");

    $makeOrderButton.classList.add("makeOrderButton");

    $makeOrderButton.addEventListener("click", displayOrderForm);

    $makeOrderButton.textContent = "Далее";

    $cartMenu.append($cartMenuElementHeader);

    $cartMenuElementList.classList.add("cartMenuList");

    for (let i = 0; i < shop.cart.goods.length; i++)
    {
        let $cartMenuElementListProduct = document.createElement("p");

        let $cartMenuButtons = document.createElement("div");

        let $addOneButtonInCart = document.createElement("div");

        let $removeOneButtonInCart = document.createElement("div"); $removeOneButtonInCart.textContent = "-";

        $cartMenuElementListProduct.textContent = `${shop.cart.goods[i].Name} - ${shop.cart.goods[i].AmountInCart}. Стоимость ${shop.cart.goods[i].AmountInCart * shop.cart.goods[i].Price} ₽`;

        $cartMenuElementListProduct.classList.add("cartMenuListProduct");

        $cartMenuButtons.classList.add("cartMenuButtons");

        $addOneButtonInCart.addEventListener("click", shop.AddToCart.bind(shop.AddToCart, shop.cart.goods[i], shop.cart, shop.CalculateCartPrice, shop.CalculateAmountOfGoods))

        $addOneButtonInCart.classList.add("addOne"); $addOneButtonInCart.textContent = "+";

        $removeOneButtonInCart.addEventListener("click", shop.RemoveFromCart.bind(shop.RemoveFromCart, shop.cart.goods[i], shop.cart, shop.CalculateCartPrice, shop.CalculateAmountOfGoods))

        $removeOneButtonInCart.classList.add("removeOne");

        $cartMenuButtons.append($addOneButtonInCart, $removeOneButtonInCart);

        $cartMenuElementListProduct.append($cartMenuButtons);

        $cartMenuElementList.append($cartMenuElementListProduct);
    }

    $cartMenu.append($cartMenuElementList);

    if (shop.cart.goods.length != 0)
        $cartMenu.append($makeOrderButton);
}


function enumCartGoogsInHeader(cartPrice, amountOfGoods)
{
    $cart.remove();

    if (amountOfGoods == 0)
    {
        $cart.textContent = "Корзина пуста"
    }
    else if (amountOfGoods == 1)
    {
        $cart.textContent = `В корзине ${amountOfGoods} продукт общей стоимостью в: ${cartPrice} ₽`
    }
    else if (amountOfGoods <= 4)
    {
        $cart.textContent = `В корзине ${amountOfGoods} продукта общей стоимостью в: ${cartPrice} ₽`
    }
    else if (amountOfGoods >= 5)
    {
        $cart.textContent = `В корзине ${amountOfGoods} продуктов общей стоимостью в: ${cartPrice} ₽`
    }

    $headerElements.append($cart);
}

function displayProductPhotos(product)
{
    let $productPhotos = document.createElement("div");

    let $productPhotosExitButton = document.createElement("div");

    let $productPhotoBox = document.createElement("div");

    let $productPhotoPrev = document.createElement("div");

    let $productPhoto = document.createElement("div");

    let $productPhotoImg = document.createElement("img");

    let $productPhotoNext = document.createElement("div");

    $productPhotos.classList.add("productPhotos");

    $productPhotosExitButton.classList.add("productPhotosExitButton");

    $productPhotosExitButton.textContent = "x";

    $productPhotosExitButton.addEventListener("click", closeProductPhotos.bind(closeProductPhotos, $productPhotos));

    $productPhotoBox.classList.add("productPhotoBox");

    $productPhotoPrev.classList.add("productPhotoPrev");

    $productPhotoPrev.addEventListener("click", displayPrevPhoto.bind(displayPrevPhoto, product, $productPhoto, $productPhotoImg));

    $productPhoto.classList.add("productPhoto");

    $productPhoto.id = `${product.id}`;

    $productPhotoImg.classList.add("productPhotoImg");

    $productPhotoImg.setAttribute("src", `img/${product.img[product.imgCount]}.jpg`)

    $productPhotoNext.classList.add("productPhotoNext");

    $productPhotoNext.addEventListener("click", displayNextPhoto.bind(displayNextPhoto, product, $productPhoto, $productPhotoImg));

    $productPhoto.append($productPhotoImg);

    $productPhotoBox.append($productPhotoPrev, $productPhoto, $productPhotoNext);

    $productPhotos.append($productPhotosExitButton, $productPhotoBox);

    $wrapper.append($productPhotos);

    productPhotoIsDisplayed = true;

}
function closeProductPhotos($productPhotos)
{
    $productPhotos.innerHTML = "";

    $productPhotos.remove();

    productPhotoIsDisplayed = false;
}
function displayPrevOrNextPhoto(e)
{
    let keyPressed = e.key;

    if (!(keyPressed == "ArrowLeft" || keyPressed == "ArrowRight"))
        return;

    if (!productPhotoIsDisplayed)
        return;

    let displayedProduct = document.querySelector(".productPhoto");

    for (let i = 0; shop.productsDB.allProducts.length; i++)
    {
        if (i == parseInt(displayedProduct.id))
        {
            if (keyPressed == "ArrowLeft")
            {
                displayPrevPhoto(shop.productsDB.allProducts[i], displayedProduct, document.querySelector(".productPhotoImg"));
            } 
            if (keyPressed == "ArrowRight")
            {
                displayNextPhoto(shop.productsDB.allProducts[i], displayedProduct, document.querySelector(".productPhotoImg"));
            }
            return;
        }

        if (i == shop.productsDB.allProducts.length - 1)
            return;
    }
}

function displayPrevPhoto(product, $productPhoto, $productPhotoImg)
{
    $productPhotoImg.remove();

    if (product.imgCount - 1 == 0)
    {
        product.imgCount = product.img.length - 1;
    } else
    {
        product.imgCount -= 1;
    }

    $productPhotoImg.setAttribute("src", `img/${product.img[product.imgCount]}.jpg`);

    $productPhoto.append($productPhotoImg);
}
function displayNextPhoto(product, $productPhoto, $productPhotoImg)
{
    $productPhotoImg.remove();

    if (product.imgCount + 1 == product.img.length)
    {
        product.imgCount = 1;
    } else
    {
        product.imgCount += 1;
    }

    $productPhotoImg.setAttribute("src", `img/${product.img[product.imgCount]}.jpg`);

    $productPhoto.append($productPhotoImg);
}
function closeCartMenu()
{
    $cartMenu.innerHTML = ""; $cartMenu.remove();

    $cartMenuBox.innerHTML = ""; $cartMenuBox.remove();

    cartIsDisplayed = true;
}

function displayOrderForm()
{
    if (!orderFormIsDisplayed)
    {
        displayOrderFormContent();

        $orderForm.setAttribute("style", "visibility: visible;");

        $cartMenu.classList.remove("visible");

        orderFormIsDisplayed = true;
    } else if (orderFormIsDisplayed)
    {
        $orderForm.innerHTML = "";

        $orderForm.setAttribute("style", "visibility: hidden;");

        $cartMenu.classList.add("visible");

        orderFormIsDisplayed = false;
    }
}

function displayOrderFormContent()
{
    let $cartGoodsListInForm = document.createElement("ul");

    let $deliveryAdress = document.createElement("textArea");

    let $costumerComment = document.createElement("textarea");

    let $orderFormButtons = document.createElement("div");

    let $submitButton = document.createElement("input");

    let $resetButton = document.createElement("input");

    $deliveryAdress.classList.add("deliveryAdress");

    $cartGoodsListInForm.classList.add("cartGoodsListInForm");

    $costumerComment.classList.add("costumerComment");

    $orderFormButtons.classList.add("orderFormButtons");

    $submitButton.classList.add("submitButton");

    $resetButton.classList.add("resetButton");

    $deliveryAdress.setAttribute("placeholder", "Адрес доставки");

    $costumerComment.setAttribute("placeholder", "Пожелания к заказу");

    $submitButton.setAttribute("type", "submit");

    $submitButton.setAttribute("value", "Отправить");

    $resetButton.setAttribute("type", "reset");

    $resetButton.setAttribute("value", "Назад");

    $resetButton.addEventListener("click", displayOrderForm);

    for (let i = 0; i < shop.cart.goods.length; i++)
    {
        let $cartGoodsInForm = document.createElement("div");

        $cartGoodsInForm.classList.add("cartGoodsInForm");

        $cartGoodsInForm.textContent = `${shop.cart.goods[i].Name} - ${shop.cart.goods[i].AmountInCart}`;

        $cartGoodsListInForm.append($cartGoodsInForm);
    }
    $orderFormButtons.append($submitButton, $resetButton);

    $orderForm.append($cartGoodsListInForm, $deliveryAdress, $costumerComment, $orderFormButtons);

}
