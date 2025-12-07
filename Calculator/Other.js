export let NumberArr = [];
export let OperatorArr = [];
// changes to ^^ do transfer over to import files
export function CreateInitialData()
{
    NumberArr.length = 12;
    for(let i =0;i<9;i++)
    {
        NumberArr[i] = `${i + 1}`
    }
    NumberArr[9] = '.';
    NumberArr[10] = '0';
    NumberArr[11] = 'CL';

    OperatorArr = ['+','-','x','/','%','='];
}
export function CreateButtons(Narr,Oarr,NumberBox,OperatorBox)
{
    for(let i = 0;i<Narr.length;i++)
    {
        let Button = document.createElement("div");
        Button.innerText = Narr[i];
        Button.className = "Number";
        Button.id = Narr[i];
        NumberBox.appendChild(Button);
    }
    for(let i = 0;i<Oarr.length;i++)
    {
        let Operator = document.createElement("div");
        Operator.innerText = Oarr[i];
        Operator.className = "Operator";
        Operator.id = Oarr[i];
        OperatorBox.appendChild(Operator);
    }   
}