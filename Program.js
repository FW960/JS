
console.log(power(2, 10));

function power(val, pow)
{
    if (pow == 1)
        return val;

    return val * power(val, pow - 1);
}