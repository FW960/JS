"use strict";

const $field = document.querySelector(".field");

let snakeHeadPos = [5, 5];

let snakeHeadElems = [];

let snakeTailElemsPos = [];

let snakeTailElems = [];

let direction = [1, 0];

let snakeHeadLastPos = [];

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
    $headElem.classList.add("snakeHead");

    snakeHeadElems.push($headElem);

    makeNewApple();
}

function getNewPos()
{
    return [snakeHeadPos[0] + direction[0], snakeHeadPos[1] + direction[1]];
}

function getNewHeadPos()
{
    snakeHeadPos = [snakeHeadPos[0] + direction[0], snakeHeadPos[1] + direction[1]];

    snakeHeadPos = checkIfCrossedBorder(snakeHeadPos);

    return snakeHeadPos;
}

function getPos([x, y])
{
    return $field.querySelector(`#cell-${x}-${y}`);
}

function headStep()
{
    let lastElemPos = [];

    snakeHeadLastPos[0] = snakeHeadPos[0];

    snakeHeadLastPos[1] = snakeHeadPos[1];

    if (snakeTailElems.length == 0)
    {
        lastElemPos[0] = snakeHeadPos[0];

        lastElemPos[1] = snakeHeadPos[1];
    } else if (snakeTailElems.length > 0)
    {
        lastElemPos[0] = snakeTailElemsPos[snakeTailElemsPos.length - 1][0];

        lastElemPos[1] = snakeTailElemsPos[snakeTailElemsPos.length - 1][1];
    }
    snakeHeadPos = getNewHeadPos();

    let newHead = getPos(snakeHeadPos);

    if (newHead.classList.contains("snake"))
    {
        gameOver();

        gameInit();
    }

    newHead.classList.add("snakeHead");

    snakeHeadElems.push(newHead);

    snakeHeadElems.shift().classList.remove("snakeHead");

    if (snakeTailElems.length != 0)
        tailNewPositions(snakeTailElems.length - 1);

    if (newHead.classList.contains("apple"))
    {
        makeTail(lastElemPos);

        newHead.classList.remove("apple");

        makeNewApple();
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

setInterval(headStep, 250);

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
}
function makeTail(lastElemPos)
{
    let newTailElem = getPos(lastElemPos);

    snakeTailElemsPos.push(lastElemPos);

    newTailElem.classList.add("snake");

    snakeTailElems.push(newTailElem);
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
        snakeTailElemsPos[count][0] = snakeHeadLastPos[0];

        snakeTailElemsPos[count][1] = snakeHeadLastPos[1];
    } else
    {
        snakeTailElemsPos[count][0] = snakeTailElemsPos[count - 1][0];

        snakeTailElemsPos[count][1] = snakeTailElemsPos[count - 1][1];
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
}

function checkIfCrossedBorder([x, y])
{
    if (x == -1)
    {
        x = 9;
    }
    if (x == 10)
    {
        x = 0;
    }
    if (y == -1)
    {
        y = 9;
    }
    if (y == 10)
    {
        y = 0;
    }
    return [x, y];

}
