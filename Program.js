let a = parseInt(Math.random().toString().charAt(2));

let b = parseInt(Math.random().toString().charAt(4));

let conditionNum = parseInt(Math.random().toString().charAt(5));

if (conditionNum > 5)
{
    // Числа остаются положительными.
}
else if (conditionNum < 5)
{
    a = -Math.abs(a); b = -Math.abs(b);
}
else if (conditionNum == 5)
{
    a = -Math.abs(a);
}

if (a >= 0 && b >= 0)
{
    console.log(`Результат вычитания ${a} из ${b}: ${a-b}`);
}
else if (a <= 0 && b <= 0)
{
    console.log(`Результат умножения ${a} на ${b}: ${a*b}`);
}
else
{
    console.log(`Результат сложения ${a} c ${b}: ${a+b}`);
}