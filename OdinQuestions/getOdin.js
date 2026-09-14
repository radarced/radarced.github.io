async function main()
{
// extract all questions from the entire the Odin project
  // let mainPageLinks = await getAllLinks("https://www.theodinproject.com/paths/full-stack-javascript");

  // let prefixedLinks = filter_prefixedStrings(mainPageLinks,"https://www.theodinproject.com/paths/full-stack-javascript/courses"); // reduces the set down to only those with prefix https

  // let sanitizedTopLinks = removeStringDuplicates(prefixedLinks);
// the above code gives you this output minus the last link .

let sanitizedTopLinks = [
  'https://www.theodinproject.com/paths/foundations/courses/foundations',
  'https://www.theodinproject.com/paths/full-stack-javascript/courses/intermediate-html-and-css',
  'https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript',
  'https://www.theodinproject.com/paths/full-stack-javascript/courses/advanced-html-and-css',
  'https://www.theodinproject.com/paths/full-stack-javascript/courses/react',
  'https://www.theodinproject.com/paths/full-stack-javascript/courses/databases',
  'https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs',
  'https://www.theodinproject.com/paths/full-stack-javascript/courses/getting-hired',
];

  console.log(sanitizedTopLinks);
  let questions = {

  }; // grouped by their own course

// looping through all courses
  for(let currentTopLink of sanitizedTopLinks)
  {
    let lessonLinks = await getAllLinks(currentTopLink);
    let prefixedLessonLinks = filter_prefixedStrings(lessonLinks,"https://www.theodinproject.com/lessons/");
    let courseName = getCourseName(currentTopLink); 
      
    questions[courseName] = [];
    for(let lesson of prefixedLessonLinks)
    {
    // call getAllQuestions on every lesson and add them to the current questions courseName property
        let currentQuestions = await getAllQuestions(lesson);
        questions[courseName] = questions[courseName].concat(currentQuestions);
    }
  }
  console.log(JSON.stringify(questions));
}

async function testQuestion()
{
    let questions = await getAllQuestions("https://www.theodinproject.com/lessons/node-path-javascript-organizing-code-with-objects");
}

function filter_prefixedStrings(strings,prefix)
{
    return strings.filter(item=> item.startsWith(prefix));
}

function removeStringDuplicates(strings)
{
    let hashMap = {};

    for(let i = 0;i < strings.length;i++)
    {
        let currentString = strings[i];
        if(Object.hasOwn(hashMap,currentString))
        {
              continue;
        }else
        {
            hashMap[currentString] = 1;
        }
    }

  
    return Object.keys(hashMap);
}

function getCourseName(url)
{
  let pathParams = url.split("/");

  let hypenCaseName = pathParams[pathParams.length - 1];
  return hyphenToCamel(hypenCaseName);
  
}

function hyphenToCamel(str) {
  const words = str.split('-');
  
  const camelCased = words.map((word, index) => {
    if (index === 0) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return camelCased.join('');
}

async function getHtmlText(url_to_scrape)
{
    return fetch(url_to_scrape)
  .then((response) => response.body)
  .then((rb) => {
    const reader = rb.getReader();

    return new ReadableStream({
      start(controller) {
        // The following function handles each data chunk
        function push() {
          // "done" is a Boolean and value a "Uint8Array"
          reader.read().then(({ done, value }) => {
            // If there is no more data to read
            if (done) {
              controller.close();
              return;
            }
            // Get the data and send it to the browser via the controller
            controller.enqueue(value);
            // Check chunks by logging to the console
            push();
          });
        }

        push();
      },
    });
  })
  .then((stream) =>
    // Respond with our stream
    new Response(stream, { headers: { "Content-Type": "text/html" } }).text(),
  )
}

async function getAllQuestions(url_to_scrape)
{
return getHtmlText(url_to_scrape).then((result) => {
 // the actual code
  // result is a string.
    let allEqualPos = getAllPosChar('=',result);
    let allQuestions = [];
    
    for(let i = 0;i < allEqualPos.length;i++)
    {
        let precedingSpaceIndex; // the characters from this index and allEqualPos[i] represent the attributes name

        // we assume that a space does always exist because it should if the html inputted is normal?.
        for(let j = allEqualPos[i];j >= 0;j--)
        { // go back till you find the space character
            if(result[j] === ' ')
            {
              precedingSpaceIndex = j;
              break;
            }
        }

        let attributeName = result.substring(precedingSpaceIndex + 1,allEqualPos[i])
  
        if(attributeName === "id")
        {
           // find the closing quotation mark for extracting the link.
           let lastQuotationPos;
           
           for(let j = allEqualPos[i] + 2;j < result.length;j++)
           {
              if(result[j] === "\"")
              {
                lastQuotationPos = j;
                break;
              }
           }

            let idValue = result.substring(allEqualPos[i] + 2,lastQuotationPos);

            // there is a knowledge check section in the chapter
            if(idValue === "knowledge-check")
            { // get the contents of all anchor elements in this element
            // find the first li element
            // get all anchor elements till you hit </section> .
            let closestLinkEl = getClosest(lastQuotationPos,result,"<li>");
            let sectionTermination = getClosest(lastQuotationPos,result,"</section>");
            let currentIndex = closestLinkEl; // this code only serves the purpose to ignore the first NON-QUESTION anchor tag .
            let closestAnchorEl = getClosest(currentIndex,result,"<a");
            currentIndex = closestAnchorEl; // this variable keeps track of the index for what is the most recent search

  
          while(sectionTermination > closestAnchorEl)
          {
            let contentStartingIndex = getClosest(closestAnchorEl,result,">");
            currentIndex = contentStartingIndex; // we move forward 
            let contentEndingIndex = getClosest(currentIndex,result,"</a>");
            currentIndex = contentEndingIndex; // move forward again

            let question = result.substring(contentStartingIndex + 1,contentEndingIndex);

            allQuestions.push(question);

            closestAnchorEl = getClosest(currentIndex,result,"<a"); // get the next one;
              
            if(closestAnchorEl === undefined)
            {
                break;
            }
          
          }
          
              break; // exit the most outer loop
            }
        }

    }
      return allQuestions;
  });

}

// returns undefined on no matchingString found case 
function getClosest(startingIndex,string,toCheck)
{
    for(let i = startingIndex;i < string.length;i++)
    {// if the first character of toCheck matches the current string character investigate further else skip
          if(string[i] === toCheck[0])
          {
              let localIndex = i;
              for(let j = 0;j < toCheck.length;j++)
              {
                  if(toCheck[j] !== string[localIndex])
                  {
                        break; // not found
                  }else
                  { // its valid for this particular character of toCheck
                      localIndex++;
                  }

                  if(j === toCheck.length - 1)
                  { // we have successfully validated all characters of toCheck to match the plausible string portion
                      return i;
                  }
              }
          }
    }

    return undefined; // not found 
}

async function getAllLinks(url_to_scrape,onlyHttps = false)
{
return getHtmlText(url_to_scrape).then((result) => {
 // the actual code
  // result is a string.
    let allEqualPos = getAllPosChar('=',result);
    let allLinks = [];
    
    for(let i = 0;i < allEqualPos.length;i++)
    {
        let precedingSpaceIndex; // the characters from this index and allEqualPos[i] represent the attributes name

        // we assume that a space does always exist because it should if the html inputted is normal?.
        for(let j = allEqualPos[i];j >= 0;j--)
        { // go back till you find the space character
            if(result[j] === ' ')
            {
              precedingSpaceIndex = j;
              break;
            }
        }

        let attributeName = result.substring(precedingSpaceIndex + 1,allEqualPos[i])
  
        if(attributeName == "href")
        {
           // find the closing quotation mark for extracting the link.
           let lastQuotationPos;
           
           for(let j = allEqualPos[i] + 2;j < result.length;j++)
           {
              if(result[j] === "\"")
              {
                lastQuotationPos = j;
                break;
              }
           }

            let linkValue = result.substring(allEqualPos[i] + 2,lastQuotationPos);

            if(onlyHttps)
            {
              if(linkValue.startsWith("https"))
              {
                allLinks.push(linkValue);
              }
            }else
            {
              allLinks.push(linkValue);
            }
        
        }

    }
      return allLinks;
  });

}

// returns an array of all positions that a char is in inside another string .
function getAllPosChar(char,string)
{
let positions = [];
    for(let i = 0;i < string.length;i++)
    {
      if(string[i] === char)
      {
        positions.push(i);
      }
    }
    return positions;
}

main();
// testQuestion();
