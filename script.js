const btnEl = document.getElementById('generateBtn');
const jokeSelectEl = document.getElementById('jokeSelection');
const generatedJokesEl = document.getElementById('generatedJokes');
const setupJokeEl = document.getElementById('setupJoke');
const punchlineJokeEl = document.getElementById('punchlineJoke');
const jokeLabel = document.querySelectorAll('.jokelabel');
const mainContainer = document.querySelector('.main-content');
const memeImg = document.querySelector('.random-img');



const memeImgArr = [
  'https://uploads.dailydot.com/2023/05/beetlejuice-just-hangng-around.jpg?q=65&auto=format&w=1600&ar=2:1&fit=crop', 
  'https://res.cloudinary.com/goosed-ie/images/f_webp,q_auto:good/v1616806618/mxseiyhroc901/mxseiyhroc901.png?_i=AA', 
  'https://us-tuna-sounds-images.voicemod.net/6b6d6a55-d64d-4305-aafc-2f013b23a68b-1705811417406.png', 
  'https://us-tuna-sounds-images.voicemod.net/6bdc8057-6918-4257-8bba-83b71077dd2f-1721050825226.png', 
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShYeFfIUMJpHQVa5e8qjvnB8OrfCeX-RSS_A&s',
'https://i.ytimg.com/vi/4S41VkLB3Vg/maxresdefault.jpg', 'https://i.ytimg.com/vi/RiUaCjOJcrw/mqdefault.jpg', 'https://i.ytimg.com/vi/LTyAa7_GxwI/mqdefault.jpg?sqp=-oaymwEmCMACELQB8quKqQMa8AEB-AH-BIAC4AOKAgwIABABGHIgQyhAMA8=&rs=AOn4CLBCV3ipyN40IqqubmJiBqcKoDkzeQ'];



jokeLabel.forEach(item => {
  item.style.opacity = 0;
});

async function getJokesApi() {
  try {
    let response = await fetch(
      'https://official-joke-api.appspot.com/jokes/random/25'
    );

    if (!response) {
      throw `HTML error status: ${response.status}`;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}



let selectedJokeType;
async function main() {

  const jokesData = await getJokesApi();
  selectedJokeType = jokeSelectEl.value;


  try {

    if (selectedJokeType === 'general' || selectedJokeType === 'programming') {
      document.getElementById('usecase-container').style.display = 'none';
      document.querySelector('.grid-wrapper').style.display = 'grid';
      jokeLogic(jokesData);
    } else {
      alert('Choose type of jokes!');

      document.getElementById('usecase-container').style.display = 'grid';
      document.querySelector('.grid-wrapper').style.display = 'none';
    }

  } catch (error) {
    console.error(error);
  }
}

function jokeLogic(data) {
  const type = data.filter(item => item.type === `${selectedJokeType}`);


  jokeLabel.forEach(item => {
    item.style.opacity = 1;
  });

  const setup = [];
  const punchLine = [];

  const randomJokes = Math.floor(Math.random() * type.length);
  const randomMeme = Math.floor(Math.random() * memeImgArr.length); 

  type.forEach((item, i) => {
    setup.push(item.setup);
    punchLine.push(item.punchline);
  });


  memeImg.src = memeImgArr[randomMeme];
  setupJokeEl.textContent = setup[randomJokes];
  punchlineJokeEl.textContent = punchLine[randomJokes];
}



btnEl.addEventListener('click', main);

document.addEventListener('keydown', (e) => {

if (e.keyCode == 32) {
 main()
}
})

