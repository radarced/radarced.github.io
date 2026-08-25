let formManager = (()=>{

    let validities = {
        authorValid : false,
        titleValid : false,
        pageValid : false,
    }

    function resetValidities()
    {
        for(let key in validities)
        {
            validities[key] = false;
        }
    }

    function authorHandler(e)
    {
        let author = e.target;
        author.setCustomValidity("");
        
        if(author.validity.valid)
        { // meaning its not missing and its shorter than its max and longer than its min
            author.setCustomValidity("");
            validities.authorValid = true;
        }else if(author.validity.isMissing)
        {
            author.setCustomValidity("the author of the book must be given");
            validities.authorValid = false;
        }else if(author.validity.tooShort)
        {
            author.setCustomValidity("the value given is too short for an author name");
            validities.authorValid = false;
        }else if(author.validity.tooLong)
        {
            author.setCustomValidity("the value given is too long for an author name");
            validities.authorValid = false;
        }

        author.reportValidity();
    }

    function titleHandler(e)
    {
        let title = e.target;
        title.setCustomValidity("");

        if(title.validity.valid)
        { // meaning its not missing and its shorter than its max and longer than its min
            title.setCustomValidity("");
            validities.titleValid = true;
        }else if(title.validity.isMissing)
        {
            title.setCustomValidity("the title of the book must be given");
            validities.titleValid = false;
        }else if(title.validity.tooShort)
        {
            title.setCustomValidity("the value given is too short for an title name");
            validities.titleValid = false;
        }else if(title.validity.tooLong)
        {
            title.setCustomValidity("the value given is too long for an title name");
            validities.titleValid = false;
        }

        title.reportValidity();
    }

    function pageHandler(e)
    {
        let page = e.target;
        
        page.setCustomValidity("");

        if(page.validity.valid)
        { // meaning its not missing and its shorter than its max and longer than its min
            page.setCustomValidity("");
            validities.pageValid = true;
        }else if(page.validity.isMissing)
        {
            page.setCustomValidity("the page of the book must be given");
            validities.pageValid = false;
        }else if(page.validity.tooShort)
        {
            page.setCustomValidity("the value given is too short for an page name");
            validities.pageValid = false;
        }

        page.reportValidity();
    }

    function isValid()
    {
        let valid = true;
        for(let key in validities)
        {   
            if(!(validities[key]))
            {
                valid = false;
            }
        }
        return valid;
    }

    return {resetValidities,authorHandler,titleHandler,pageHandler,isValid}
})();


export default formManager;