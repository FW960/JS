/*
1. Почему код дает именно такие результаты?

 var a = 1, b = 1, c, d; 
 c = ++a; alert(c); // 2 Так как инкремента префиксная и сначала выполняется действия оператора.

 d = b++; alert(d); // 1 Тоже самое, но наоборот. Инкремента постфиксная.

 c = (2+ ++a); alert(c); // 5 Переменная c изначально обладает значением 2. Затем к 2 прибавляется результат префиксной инкременты над переменной a 
над которой ранее уже совершались подобные действия.

 d = (2+ b++); alert(d); // 4 К числу 2 прибавляется значение постфиксной инкременты.

 alert(a); // 3 Ранее с переменной a дважды работала инкремента.

 alert(b); // 3 Тоже самое, что и с переменной а выше.

*/

/*

//  2. Чему будет равен x?
 var a = 2;
 var x = 1 + (a *= 2); 

 x = 5, так как оператор *= умножает значение присваемой переменной на 2.

*/

