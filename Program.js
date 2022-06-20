"use strict";

const $field = document.querySelector(".field");

let snakeHeadPos = [5, 5];

let snakeHeadElems = [];

let snakeTailElemsPos = [];

let snakeTailElems = [];

let direction = [1, 0];

let newTailToCreate = 0;

let isEaten = true;

makeField();

function makeField()
{
    for (let y = 0; y < 10; y++)
    {
        for (let x = 0; x < 10; x++)
        {
            let $cell = document.createElement("div");

            $cell.setAttribute("id", `cell-${y}-${x}`); $cell.classList.add("cell");

            $field.append($cell);
        }
    }

}
function gameInit()
{
    $field.innerHTML = "";
    makeField();

    const $headElem = $field.querySelector(`#cell-${snakeHeadPos[0]}-${snakeHeadPos[1]}`);
    $headElem.classList.add("snake");

    snakeHeadElems.push($headElem);

    makeNewApple();
}

function getNewPos()
{
    return [snakeHeadPos[0] + direction[0], snakeHeadPos[1] + direction[1]]
}

function getPos([x, y])
{
    return $field.querySelector(`#cell-${x}-${y}`);
}

function headStep()
{
    snakeHeadPos = getNewPos();

    if (checkBorder(snakeHeadPos))
    {
        gameOver();

        gameInit();
    }

    let newHead = getPos(snakeHeadPos);

    if (newHead.classList.contains("snake"))
    {
        gameOver();

        gameInit();
    }
    
    newHead.classList.add("snake");

    snakeHeadElems.push(newHead);

    snakeHeadElems.shift().classList.remove("snake");

    if (snakeTailElems.length != 0)
        tailNewPositions(snakeTailElems.length - 1);

    if (newHead.classList.contains("apple"))
    {
        newHead.classList.remove("apple"); isEaten = true;

        makeTail(false);
    }

    if (isEaten == true)
        makeNewApple();

    if (newTailToCreate > 0)
    {
        if (makeTail(true))
            newTailToCreate--;
    }
    
}
function checkBorder([x, y])
{
    if (x < 0 || x > 9 || y < 0 || y > 9)
    {
        snakeHeadPos[0] = 5; snakeHeadPos[1] = 5;

        return true;
    }

    return false;
}

gameInit();

setInterval(headStep, 200);

document.addEventListener("keydown", changeDirection);

function changeDirection(e)
{
    if (e.keyCode == '38')
    {
        if (direction[0] == 1)
            return;

        direction[0] = -1; direction[1] = 0;
    }
    else if (e.keyCode == '40')
    {
        if (direction[0] == -1)
            return;

        direction[0] = 1; direction[1] = 0;
    }
    else if (e.keyCode == '37')
    {
        if (direction[1] == 1)
            return;

        direction[0] = 0; direction[1] = -1;
    }
    else if (e.keyCode == '39')
    {
        if (direction[1] == -1)
            return;

        direction[0] = 0; direction[1] = 1;
    }
}
function makeNewApple()
{
    let applePos = [parseInt(Math.random().toString()[3]), parseInt(Math.random().toString()[2])];

    let $apple = getPos(applePos);

    if ($apple.classList.contains("snake"))
    {
        makeNewApple();
        return;
    }

    $apple.classList.add("apple");

    isEaten = false;
}
function makeTail(couldntMakeNewTail)
{
    let newTailPos = [];

    if (snakeTailElems.length == 0)
    {
        newTailPos[0] = snakeHeadPos[0] - direction[0];

        newTailPos[1] = snakeHeadPos[1] - direction[1];

        snakeTailElemsPos.push(newTailPos);
    }
    else
    {
        
        newTailPos[0] = snakeTailElemsPos[snakeTailElems.length - 1][0] - direction[0];

        newTailPos[1] = snakeTailElemsPos[snakeTailElems.length - 1][1] - direction[1];

        if (newTailPos[0] < 0 || newTailPos[0] > 9 || newTailPos[1] < 0 || newTailPos[1] > 9)
        {
            if (couldntMakeNewTail == false)
                newTailToCreate++;

            return false;
        }
    }

    let newTail = getPos(newTailPos);

    if (newTail.classList.contains("snake"))
    {
        if (couldntMakeNewTail == false)
            newTailToCreate++;

        return false;
    }

    newTail.classList.add("snake");

    snakeTailElemsPos.push(newTailPos);

    snakeTailElems.push(newTail);

    return true;
}
function tailStep(count)
{
    if (count == snakeTailElems.length)
        return;

    snakeTailElems[count] = getPos(snakeTailElemsPos[count]);

    snakeTailElems[count].classList.add("snake");

    tailStep(++count);

}
function tailNewPositions(count)
{
    if (count == -1)
    {
        tailStep(0);
        return
    }

    if (count == 0)
    {
        snakeTailElemsPos[count] = [snakeHeadPos[0] - direction[0], snakeHeadPos[1] - direction[1]];
    } else
    {
        snakeTailElemsPos[count] = snakeTailElemsPos[count - 1];
    }

    snakeTailElems[count].classList.remove("snake");

    --count;

    tailNewPositions(count);
}

function gameOver()
{
    snakeHeadPos = [5, 5];

    snakeHeadElems = [];

    snakeTailElemsPos = [];

    snakeTailElems = [];

    direction = [1, 0];

    isEaten = true;

    newTailToCreate = 0;
}

function checkIfHeadCollapsedWithTail()
{
    for (let i = 0; i < snakeTailElemsPos.length; i++)
    {
        if (snakeHeadPos[0] == snakeTailElemsPos[i][0] && snakeHeadPos[1] == snakeTailElemsPos[i][1])
            return true;
    }
    return false;
}