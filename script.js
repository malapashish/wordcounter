let input = document.getElementById("textarea");
let numberOfCharacters = document.getElementById("characters");
let numberOfWords = document.getElementById("words");
let numberOfSentences = document.getElementById("sentences");
let numberOfParagraphs = document.getElementById("paragraphs");
let readingTime = document.getElementById("readingTime");

input.addEventListener('keyup', function () {
    //displayes the number of characters
    numberOfCharacters.innerHTML = input.value.length;

    //count the number of words
    /*
    performs following tests
    /b = matches the word boundaries at the starting and ending of word
    /w+ = matches word characters. + makes one or more characters
    -? = Special case for counting hyphens in word
    + = matches one or more occurances of whole pattern
    i =  makes case insensitive
    g = global search
    */
    let words = input.value.match(/\b[-?(\w+)?]+\b/gi);

    //if match is complete change the value of the variable if not keep it 0
    if (words) {
        numberOfWords.innerHTML = words.length;
    } else {
        numberOfWords.innerHTML = 0;
    }

    //count the numbers of sentences
    if (words) {
        let sentences = input.value.split(/[.|!|?]+/g);
        numberOfSentences.innerHTML = sentences.length - 1;
    } else {
        sentences.innerHTML = 0;
    }

    //count the numbers of paragraphs
    if (words) {
        let paragraphs = input.value.replace(/\n$/gm, '').split(/\n/);
        console.log(paragraphs);
        numberOfParagraphs.innerHTML = paragraphs.length;
    } else {
        numberOfParagraphs.innerHTML = 0;
    }

    //reading time calculation. Readingt is based on 275 words per minute
    if (words) {
        let seconds = Math.floor(words.length * 60 / 275);
        // need to convert seconds to minutes and hours
        if (seconds > 59) {
            var minutes = Math.floor(seconds / 60);
            seconds = seconds - minutes * 60;
            readingTime.innerHTML = minutes + "m " + seconds + "s";
        } else {
            readingTime.innerHTML = seconds + "s";
        }
    } else {
        readingTime.innerHTML = "0s";
    }
})