"use strict";

const $wrapper = document.querySelector(".table");

makeChessTable();

function makeChessTable()
{
    let isBlackCell = false;

    const charsArray = ['A', "B", "C", "D", "E", "F", "G", "H"];

    for (let i = 0; i < 81; i++)
    {

        if (isBlackCell == true)
        {
            crCell("blackCell", isBlackCell, i, charsArray); isBlackCell = false;

        } else if (isBlackCell == false)
        {
            crCell("whiteCell", isBlackCell, i, charsArray); isBlackCell = true;
        }
    }

}
function crCell(cellClass, isBlackCell, count, charsArray)
{

    let cell = document.createElement("div");

    if (count >= 1 && count <= 8)
        cell.textContent = count;

    if (isBlackCell == true)
    {
        cell.style.color = "white";
    }
    else if (isBlackCell == false)
    {
        cell.style.color = "black"
    }


    if (count % 9 == 0 && count != 0)
        cell.textContent = charsArray[count/9-1];

    cell.className = cellClass + " cell";

    $wrapper.append(cell);

}
