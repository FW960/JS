"use strict";
import _ from "lodash";

let cart =
{
    goods: [100, 200, 300, 600],

    countBasketPrice()
    {
        let wholePrice = 0;

        for (let i = 0; i < this.goods.length; i++)
            wholePrice += this.goods[i];
            
        return wholePrice;
    }

}

console.log(cart.countBasketPrice());
