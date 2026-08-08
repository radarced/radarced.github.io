function convertInteractables(interactables)
{
    let object = {};
    for(let i = 0;i< interactables.length;i++)
    {
        let currInteractable = interactables[i];
        object[currInteractable.classList.item(0)] = currInteractable;
    }
    return object;
}

    function getRowBadge(current_cellRow)
    {
        return Math.floor(current_cellRow / 3);
    }
    
    // both of these have a range of 0-2
    function getColumnBadge(current_cellColumn)
    { // a badge(aka subgrid ) is a 3x3 area the grid is splitted in 
        return Math.floor(current_cellColumn / 3);
    }



export {convertInteractables,getRowBadge,getColumnBadge};