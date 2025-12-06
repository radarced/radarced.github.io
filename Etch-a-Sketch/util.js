export function getRandomColor()
{
    let HexColor = "#";
    for(let i = 0;i<2;i++)
    {
    let RandomR = GetHex(Math.floor(Math.random() * 15));
    let RandomG = GetHex(Math.floor(Math.random() * 15));
    let RandomB = GetHex(Math.floor(Math.random() * 15));

    HexColor = `${HexColor}${RandomR}${RandomG}${RandomB}`;
    }
    return HexColor;
}

function GetHex(n)
{ // n 1-15;
    if(n > 9)
    {
        switch(n)
        {
            case 10 :
            return 'A';
            case 11 :
            return 'B';
            case 12 :
            return 'C';
            case 13 :
            return 'D';
            case 14 :
            return 'E';
            case 15 :
            return 'F';
        }
    }
    return `${n}`;
}

export function getRandBounded(a)
{
    return Math.floor(Math.random() * a);
}