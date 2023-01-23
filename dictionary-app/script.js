const wrapper = document.querySelector(".wrapper");
const searchInput = wrapper.querySelector("input");
const synonyms = wrapper.querySelector(".synonyms .list");
const infoText = wrapper.querySelector(".info-text");
const volumnIcon = wrapper.querySelector(".word i");
const removeIcon = wrapper.querySelector(".search span");
let audio;

//data function
function data(result, word){
    if(result.title){
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>, Please, try to search for another word.`;
    }else{
        console.log(result);
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0],
        phonetics = `${result[0].meanings[0].partOfSpeech} / ${result[0].phonetics[0].text}/`;
        
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phonetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;
        audio = new Audio("https:" + result[0].phonetics[0].audio);


        if(definitions.synonyms[0] == undefined){
            synonyms.parentElement.style.display = "none";
        }else{
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for(let i = 0; i < 5; i++){
                let tag = `<span onClick=search('${definitions.synonyms[i]}')>${definitions.synonyms[i]},</span>`;
                synonyms.insertAdjacentHTML("beforeend", tag); 
            }
        }
    }
}

function search(word){
    searchInput.value = word;
    fetchApi(word);
}

//fetch api function
function fetchApi(word){
    wrapper.classList.remove("active");
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    //fetching api response and returning it with parsing into js obj and in nother then
    //method calling data function with passing api response and searched word as an argument
    fetch(url).then(res => res.json()).then(result => data(result, word));
}

searchInput.addEventListener("keyup", e => {
    if(e.key === "Enter" && e.target.value){
        fetchApi(e.target.value);
    }

});

volumnIcon.addEventListener("click", () => {
    audio.play();
});

removeIcon.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "#9a9a9a";
    infoText.innerHTML = "Type a word and press enter to get meaning, example, pronunciation, and synonyms of that typed word.";
});
