let GameManager = (()=>{
    let state = {a : 32};

    function modifyState()
    {
        state.a++
    }

    function getState()
    {
        return state.a;
    }

    function startGame()
    {
        console.log("created a random board");
        console.log("initialized the gameState");
        console.log("added the event handlers to each cell or the entire board and then event delegate ");
    }

    return {modifyState,getState,startGame};
})();

export default GameManager;