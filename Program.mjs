"use strict";
import _ from "lodash";

PrimeNumEnum();

function PrimeNumEnum()
{
    let i = 0;

    console.log(2 % 1);

    while (i <= 100) 
    {
        let count = 0;
        for (let j = 0; j <= i; j++)
        {
            if (i % j == 0)
                count++;

            if (count == 2 && j == i)
            {
                console.log(`Prime num: ${i}`);
                break;
            }

        }
        i++;
    }
}