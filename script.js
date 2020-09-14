let input = document.getElementById("textarea");
let numberOfCharacters = document.getElementById("characters");
let numberOfWords = document.getElementById("words");
let numberOfSentences = document.getElementById("sentences");
let numberOfParagraphs = document.getElementById("paragraphs");
let readingTime = document.getElementById("readingTime");
let keyWords = document.getElementById("keywords");

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


    if (words) {
        //step 1 : Remove stop words from the input
        //stop words are the words that you don't you want to ignore. Words like the, in , at, that, which and on.
        let stopWords = ["a", "able", "about", "above", "abst", "accordance", "according", "accordingly", "across", "act", "actually", "added", "adj", "affected", "affecting", "affects", "after", "afterwards", "again", "against", "ah", "all", "almost", "alone", "along", "already", "also", "although", "always", "am", "among", "amongst", "an", "and", "announce", "another", "any", "anybody", "anyhow", "anymore", "anyone", "anything", "anyway", "anyways", "anywhere", "apparently", "approximately", "are", "aren", "arent", "arise", "around", "as", "aside", "ask", "asking", "at", "auth", "available", "away", "awfully", "b", "back", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "begin", "beginning", "beginnings", "begins", "behind", "being", "believe", "below", "beside", "besides", "between", "beyond", "biol", "both", "brief", "briefly", "but", "by", "c", "ca", "came", "can", "cannot", "can't", "cause", "causes", "certain", "certainly", "co", "com", "come", "comes", "contain", "containing", "contains", "could", "couldnt", "d", "date", "did", "didn't", "different", "do", "does", "doesn't", "doing", "done", "don't", "down", "downwards", "due", "during", "e", "each", "ed", "edu", "effect", "eg", "eight", "eighty", "either", "else", "elsewhere", "end", "ending", "enough", "especially", "et", "et-al", "etc", "even", "ever", "every", "everybody", "everyone", "everything", "everywhere", "ex", "except", "f", "far", "few", "ff", "fifth", "first", "five", "fix", "followed", "following", "follows", "for", "former", "formerly", "forth", "found", "four", "from", "further", "furthermore", "g", "gave", "get", "gets", "getting", "give", "given", "gives", "giving", "go", "goes", "gone", "got", "gotten", "h", "had", "happens", "hardly", "has", "hasn't", "have", "haven't", "having", "he", "hed", "hence", "her", "here", "hereafter", "hereby", "herein", "heres", "hereupon", "hers", "herself", "hes", "hi", "hid", "him", "himself", "his", "hither", "home", "how", "howbeit", "however", "hundred", "i", "id", "ie", "if", "i'll", "im", "immediate", "immediately", "importance", "important", "in", "inc", "indeed", "index", "information", "instead", "into", "invention", "inward", "is", "isn't", "it", "itd", "it'll", "its", "itself", "i've", "j", "just", "k", "keep", "keeps", "kept", "kg", "km", "know", "known", "knows", "l", "largely", "last", "lately", "later", "latter", "latterly", "least", "less", "lest", "let", "lets", "like", "liked", "likely", "line", "little", "'ll", "look", "looking", "looks", "ltd", "m", "made", "mainly", "make", "makes", "many", "may", "maybe", "me", "mean", "means", "meantime", "meanwhile", "merely", "mg", "might", "million", "miss", "ml", "more", "moreover", "most", "mostly", "mr", "mrs", "much", "mug", "must", "my", "myself", "n", "na", "name", "namely", "nay", "nd", "near", "nearly", "necessarily", "necessary", "need", "needs", "neither", "never", "nevertheless", "new", "next", "nine", "ninety", "no", "nobody", "non", "none", "nonetheless", "noone", "nor", "normally", "nos", "not", "noted", "nothing", "now", "nowhere", "o", "obtain", "obtained", "obviously", "of", "off", "often", "oh", "ok", "okay", "old", "omitted", "on", "once", "one", "ones", "only", "onto", "or", "ord", "other", "others", "otherwise", "ought", "our", "ours", "ourselves", "out", "outside", "over", "overall", "owing", "own", "p", "page", "pages", "part", "particular", "particularly", "past", "per", "perhaps", "placed", "please", "plus", "poorly", "possible", "possibly", "potentially", "pp", "predominantly", "present", "previously", "primarily", "probably", "promptly", "proud", "provides", "put", "q", "que", "quickly", "quite", "qv", "r", "ran", "rather", "rd", "re", "readily", "really", "recent", "recently", "ref", "refs", "regarding", "regardless", "regards", "related", "relatively", "research", "respectively", "resulted", "resulting", "results", "right", "run", "s", "said", "same", "saw", "say", "saying", "says", "sec", "section", "see", "seeing", "seem", "seemed", "seeming", "seems", "seen", "self", "selves", "sent", "seven", "several", "shall", "she", "shed", "she'll", "shes", "should", "shouldn't", "show", "showed", "shown", "showns", "shows", "significant", "significantly", "similar", "similarly", "since", "six", "slightly", "so", "some", "somebody", "somehow", "someone", "somethan", "something", "sometime", "sometimes", "somewhat", "somewhere", "soon", "sorry", "specifically", "specified", "specify", "specifying", "still", "stop", "strongly", "sub", "substantially", "successfully", "such", "sufficiently", "suggest", "sup", "sure", "t", "take", "taken", "taking", "tell", "tends", "th", "than", "thank", "thanks", "thanx", "that", "that'll", "thats", "that've", "the", "their", "theirs", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "thered", "therefore", "therein", "there'll", "thereof", "therere", "theres", "thereto", "thereupon", "there've", "these", "they", "theyd", "they'll", "theyre", "they've", "think", "this", "those", "thou", "though", "thoughh", "thousand", "throug", "through", "throughout", "thru", "thus", "til", "tip", "to", "together", "too", "took", "toward", "towards", "tried", "tries", "truly", "try", "trying", "ts", "twice", "two", "u", "un", "under", "unfortunately", "unless", "unlike", "unlikely", "until", "unto", "up", "upon", "ups", "us", "use", "used", "useful", "usefully", "usefulness", "uses", "using", "usually", "v", "value", "various", "'ve", "very", "via", "viz", "vol", "vols", "vs", "w", "want", "wants", "was", "wasn't", "way", "we", "wed", "welcome", "we'll", "went", "were", "weren't", "we've", "what", "whatever", "what'll", "whats", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "wheres", "whereupon", "wherever", "whether", "which", "while", "whim", "whither", "who", "whod", "whoever", "whole", "who'll", "whom", "whomever", "whos", "whose", "why", "widely", "willing", "wish", "with", "within", "without", "won't", "words", "world", "would", "wouldn't", "www", "x", "y", "yes", "yet", "you", "youd", "you'll", "your", "youre", "yours", "yourself", "yourselves", "you've", "z", "zero"];
        let nonStopWords = [];
        for (let i = 0; i < words.length; i++) {
            if ((stopWords.indexOf(words[i].toLowerCase()) === -1) && isNaN(words[i])) {
                nonStopWords.push(words[i].toLowerCase());
            }
        }

        //step 2 : Making a keywords object which conatins keywords along with number of times they are repeated
        let keywords = {};
        for (let i = 0; i < nonStopWords.length; i++) {
            if (nonStopWords[i] in keywords) {   //checks it the keywords already exists 
                keywords[nonStopWords[i]] += 1;  //if keywords already exists increase count by me
            } else {
                keywords[nonStopWords[i]] = 1; //if does not exists then keep the count to 1
            }
        }

        //step 3 : Sorting the object by first converting it to a 2D array
        let sortedArray = [];
        for (let keyword in keywords) {
            sortedArray.push([keyword, keywords[keyword]]);  //stores keywords like ["keyword", count];
            sortedArray.sort((a, b) => {
                return b[1] - a[1];
            });
        }

        //step 4 : Displaying top 4 keywords and their count
        topKeywords.innerHTML = "";
        for (let i = 0; i < sortedArray.length && i < 4; i++) {
            let li = document.createElement('li');
            li.innerHTML = "<b>" + sortedArray[i][0] + "</b>: " + sortedArray[i][1];
            topKeywords.appendChild(li);
        }
    }

    //top words keywords calculations
    if (words) {
        keyWords.style.display = "block";
    } else {
        keyWords.style.display = "none";
    }


})

function rotateLogo() {
    let btn = document.getElementById('test_btn');
    let socialMedia = document.getElementById('social_media');
    if (btn.classList.contains('rotate')) {
        btn.classList.remove('rotate');
        socialMedia.style.display = 'block';
    } else {
        btn.classList.add('rotate');
        socialMedia.style.display = 'none';
    }
}