"use-strict";

StartGuessTheNum();

function StartGuessTheNum()
{
    alert("Guess the number from 10 to 99.");

    let rndNum = Math.random().toString();

    rndNum = parseInt(rndNum.charAt(rndNum.length - 1) + rndNum.charAt(rndNum.length - 2));

    GuessTheNum(rndNum, 1);
}

function GuessTheNum(toGuessNum, amountOfAttempts)
{
    let userNum = -1;

    while (userNum != toGuessNum)
    {
        if (amountOfAttempts % 10 == 0)
        {
            alert("Are you giving up?");

            if (!userDecisionToContinue("Let's continue.", "Thank you for playing."))
                return;
        }

        userNum = prompt("Guess the num:");

        if (userNum == toGuessNum)
        {
            alert("You are won. Would You like to continue?")

            if (userDecisionToContinue("Thank you for playing.", "Let's continue."))
                return;
            else
                return StartGuessTheNum();
        }
        amountOfAttempts++;
    }
}
function userDecisionToContinue(typeOfChoice1, typeOfChoice2)
{
    while (true)
    {
        let userDecision = prompt("Type 'Yes' or 'No'");

        switch (userDecision)
        {
            case "No":
                alert(typeOfChoice1)
                return true;

            case "Yes":
                alert(typeOfChoice2)
                return false;

            default: break;
        }
    }

}