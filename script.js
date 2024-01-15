let apiQuotes = [];
let apiQuotesOfDay = [];
let apiRandomQuotes = [];

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn= document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

const quoteContainerOfDay = document.getElementById('quote-container-day');
const quoteTextOfDay = document.getElementById('quote-day');
const authorTextOfDay = document.getElementById('author-day');
const twitterBtnOfDay = document.getElementById('twitter-day');
const newQuoteBtnOfDay = document.getElementById('new-quote-day');
const loaderOfDay = document.getElementById('loader-day');

const quoteContainerRandom = document.getElementById('quote-container-random');
const quoteTextRandom = document.getElementById('quote-random');
const authorTextRandom = document.getElementById('author-random');
const twitterBtnRandom = document.getElementById('twitter-random');
const newQuoteBtnRandom = document.getElementById('new-quote-random');
const loaderRandom = document.getElementById('loader-random');



// Show loading

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true; 
}


function newQuote() {
    loading();

    // Pick a random quote from localQuotes array
    
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with "Unknown"
    if (!quote.author) {
        authorText.textContent = 'Unknown'; 
        
    } else {
        authorText.textContent = quote.author; 
        
    }

    //  Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Set Quote, Hide Loader
    quoteText.textContent = quote.text; 
    complete();
}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://zenquotes.io/api/quotes';
    try {
        const response = await axios.get(apiUrl);
        const newData = response.data;
        apiQuotes = newData.map(quote => ({
            text: quote.q,
            author: quote.a,
        }));
        newQuote();
    } catch (err) {
        alert(err)
        // Catch error here
    }
}

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; 
    window.open(twitterUrl, '_blank');
}

// Event Listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();