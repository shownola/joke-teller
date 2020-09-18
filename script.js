const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// VoiceRSS Javascript SDK - moved to voice.js file

// Disable/Enable Button so that you cannot start a new joke until the first one has ended.
function toggleButton(){
  button.disabled = !button.disabled;
}

var key = config.key;
// Passing Joke to VoiceRSS API
function tellMe(joke){
  console.log('tell me:', joke);
  VoiceRSS.speech({
    key: key,
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}


async function getJokes(){
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous?blacklistFlags=nsfw,religious,racist,sexist'
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if(data.setup){
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);  // Text to speech
    toggleButton();  // Disable button
  } catch(error){
    console.log('Whoops', error);
  }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
