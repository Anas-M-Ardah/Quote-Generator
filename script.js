const loader = document.getElementById("loader");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const quoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const quoteContainer = document.getElementById("quote-container");

let apiQuotes = [];

// Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new Quote
function newQuote(){
    loading();
    //Pick a random Quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    //Check if author field is blank and replace it with 'Unknown' if it is blank
    if(quote.author !== null){
        authorText.textContent = quote.author;
    }else{
        authorText.textContent = "Unknown";
    }
    //Check Quote length to determine it's styling
    if(quote.text.length >= 120){
        quoteText.classList.add("long-quote");
    }else{
        quoteText.classList.remove("long-quote");
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
async function getQuotes(){
    loading();
    const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try{
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    }catch(error){
        alert(error);
    }
}

//Tweet Quote
function tweetQuote(){
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

//Event Listeners
quoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On Load
getQuotes();
