"use strict";
import _ from "lodash";

class Shop 
{
    cart = new Cart();

    productsDB = new ProductsDataBase();

    AddToCart(productId, amount) 
    {
        let product = "";

        for (let i = 0; i < this.productsDB.allProducts.length; i++)
        {
            if (productId == this.productsDB.allProducts[i].id)
            {
                product = this.productsDB.allProducts[i];
                break;


            }

            if (i == this.productsDB.allProducts.length - 1)
                return;
        }

        for (let i = 0; i != amount; i++)
            this.cart.goods.push(product);
    }

    RemoveFromCart(productId, amount) 
    {
        let count = 0;

        for (let i = 0; i < this.cart.goods.length; i++)
        {
            if (count == amount)
                break;

            if (productId == this.cart.goods[i].id)
            {
                this.cart.goods.splice(i, 1); count++; i--;
            }
        }
    }

    CalculateCartPrice()
    {
        let wholePrice = 0;

        for (let i = 0; i < this.cart.goods.length; i++)
            wholePrice += this.cart.goods[i].price;

        return wholePrice;
    }
    AddNewProductToDB(name, price, manufacturer, id)
    {
        for (let i = 0; i < this.productsDB.allProducts.length; i++)
        {
            if (id == this.productsDB.allProducts[i].id)
                return;
        }

        this.productsDB.allProducts.push(new Product(name, price, manufacturer, id));
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
    constructor(name, price, manufacturer, id)
    {
        this.name = name;

        this.price = price;

        this.manufacturer = manufacturer;

        this.id = id;
    }
}

class Cart
{
    goods = new Array();
}

let shop = new Shop();

shop.AddNewProductToDB("Banana", 30, "Khyrgish.inc", 0);

shop.AddNewProductToDB("Apple", 20, "Khyban.co", 10);

shop.AddToCart(0, 2); shop.AddToCart(10, 3); shop.AddToCart(11, 2);

shop.RemoveFromCart(0, 1);

shop.RemoveProductFromDB(10);

console.log(shop.productsDB.allProducts);

console.log(shop.cart.goods);

console.log(shop.CalculateCartPrice());