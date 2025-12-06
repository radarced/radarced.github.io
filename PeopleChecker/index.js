const people = [
  "Chris",
  "Anne",
  "Colin",
  "Terri",
  "Phil",
  "Lola",
  "Sam",
  "Kay",
  "Bruce",
];

const admitted = document.querySelector(".admitted");
const refused = document.querySelector(".refused");
admitted.textContent = "Admit: ";
refused.textContent = "Refuse: ";

function decipherPeople()
{
    for(let i = 0;i<people.length;i++)
    {
        if(people[i] === "Phil" || people[i] === "Lola")
        {
            refused.textContent += `${people[i]},`;
        }else
        {
            admitted.textContent += `${people[i]},`;
        }
    }
    admitted.textContent = `${admitted.textContent.slice(0,-1)}.`
    refused.textContent = `${refused.textContent.slice(0,-1)}.`
}

decipherPeople();

// loop starts here

// refused.textContent += ...;
// admitted.textContent += ...;