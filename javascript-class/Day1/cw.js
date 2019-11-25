var languages = [
    'js', 'php', 'java', 'c', 'c++', 'python', 'js', 'php', 'java', 'c', 'python',
    'js', 'php', 'java', 'c', 'c++', 'python', 'go',
    'js', 'php', 'java', 'c', 'c++', 'python', 'js', 'php', 'java', 'ruby'
];

//task 1

var uniqueLanguage = [];

var count = 0;
var status = false;

for (var i = 0; i < languages.length; i++) {
    for (var j = 0; j < uniqueLanguage.length; j++) {
        if (languages[i] == uniqueLanguage[j])
            status = true;
    }
    count++;
    if (count == 1 && status == false) {
        uniqueLanguage.push(languages[i]);
    }
    status = false;
    count = 0;
}
console.log('unique language >>', uniqueLanguage);


//task 2
function counts(array) {
    var occurence = {};
    for (var i = 0; i < array.length; i++) {
        if (occurence[array[i]] == undefined)
            occurence[array[i]] = 0;

        occurence[array[i]]++; //comparision
    }
    console.log('occurence of items >> ', occurence);
}
counts(languages);