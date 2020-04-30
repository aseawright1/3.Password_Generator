var specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.']
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
var lowerCasedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
var upperCasedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

// Function to prompt user for password options
function userOptions() {

    var length = parseInt(
        prompt('How many characters in the password? (Between 8 and 129)')
    );
    // check to see if user provided an actual number
    if (isNaN(length) === true) {
        alert('This value should be a number');
        return;
    }

    // 8 >= pw length >= 129
    if (length <= 8) {
        alert('Specify at least 8 characters for greater security');
    }
    else if (length > 128) {
        alert('Overload! Must be less than 129 characters!')
        return;
    }

    // variables to store user answers
    var specialChars = confirm('Has special characters?');
    var numChars = confirm('Has numeric characters?');
    var lowerChars = confirm('Has lowercase characters?');
    var upperChars = confirm('Has uppercase characters?');

    // user must select at least one option
    if (
        specialChars === false &&
        numChars === false &&
        lowerChars === false &&
        upperChars === false
    ) {
        alert('Select at least one option!');
        return;
    }

    // object to store user input
    var passwordOptions = {
        length: length,
        specialChars: specialChars,
        numChars: numChars,
        lowerChars: lowerChars,
        upperChars: upperChars
    };

    return passwordOptions;
}

// select random element in array
function getRando(arr) {
    var randIndex = Math.floor(Math.random() * arr.length);
    var randElement = arr[randIndex];

    return randElement;
}

// generate password
function genPW() {
    var options = userOptions();
    var result = [];
    var potentialChars = [];
    var realChars = [];

    // add special characters into array of potential chracters
    if (options.specialChars) {
        potentialChars = potentialChars.concat(specialCharacters);
        realChars.push(getRando(specialCharacters));
    }

    // add numbers into potential chars
    if (options.numChars) {
        potentialChars = potentialChars.concat(numericCharacters);
        realChars.push(getRando(numericCharacters));
    }

    // add lowercase into potential chars
    if (options.lowerChars) {
        potentialChars = potentialChars.concat(lowerCasedCharacters);
        realChars.push(getRando(lowerCasedCharacters));
    }

    // add uppercase into potential chars
    if (options.upperChars) {
        potentialChars = potentialChars.concat(upperCasedCharacters);
        realChars.push(getRando(upperCasedCharacters));
    }

    // iterate over password, adding user options into possible chars
    for (var i = 0; i < options.length; i++) {
        var possibleCharacter = getRando(potentialChars);

        result.push(possibleCharacter);
    }

    // add 1+ guaranteed character
    for (var i = 0; i < realChars.length; i++) {
        result[i] = realChars[i];
    }

    // export string into password to display
    return result.join('');
}

var generateBtn = document.querySelector('#generate');

function writePassword() {
    var password = genPW();
    var passwordText = document.querySelector('#password');

    passwordText.value = password;
}

// button click listener
generateBtn.addEventListener('click', writePassword);
