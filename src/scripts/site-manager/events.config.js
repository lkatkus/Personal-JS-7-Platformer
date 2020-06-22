import PlayerTextureLeveled from './../../assets/textures/player-tile-sheet-leveled.png';
import playerImage from './../../assets/textures/animation-player.gif';
import catImage from './../../assets/textures/animation-cat.gif';
import workerImage from './../../assets/textures/animation-worker.gif';
import roboImage from './../../assets/textures/animation-robo.gif';

const onLeaveCallback = () => {
  document.getElementById('textBoxWrapper').className = 'closed';
  document.getElementById('textBox').innerHTML = '';
};

const updateTextBox = ({ text, image, shouldUpdate }, siteAction) => () => {
  const textBoxWrapper = document.getElementById('textBoxWrapper');
  const textBox = document.getElementById('textBox');
  const imageBox = document.getElementById('textBoxImage');
  const textBoxButton = document.getElementById('textBoxButton');

  if (textBoxWrapper.className !== 'open' || shouldUpdate) {
    textBoxWrapper.className = 'open';
    textBox.innerHTML = text;
    imageBox.src = image;

    if (siteAction) {
      textBoxButton.classList.add('visible');
      textBoxButton.innerHTML = siteAction.name;
      textBoxButton.onclick = siteAction.callback;
    } else {
      textBoxButton.classList.remove('visible');
    }
  }
};

const GAME_EVENTS = {
  levelUp: ({ player }) =>
    player.levelUp(PlayerTextureLeveled, {
      tileCols: 3,
      canFly: true,
      speedX: 20,
      speedY: 20,
    }),
  enableControls: ({ player }) => player.enableControls(),
  disableControls: ({ player }) => player.disableControls(),
};

const getEventConfig = ({ game, page }) => (gameObjects) => [
  {
    id: 'initialEvent',
    row: [41, 41],
    col: [5, 9],
    eventHandler: updateTextBox({
      text: 'Whoo... What is this place?',
      image: playerImage,
    }),
    onLeave: onLeaveCallback,
  },
  {
    id: 'makeArchitectsGreatAgain',
    row: [41, 41],
    col: [14, 27],
    eventHandler: updateTextBox(
      {
        text:
          'I think that someone has told me that architects make great developers.',
        image: playerImage,
      },
      { name: 'About', callback: () => page.openTab('contentAbout') }
    ),
    onLeave: onLeaveCallback,
  },
  {
    id: 'moveUp',
    row: [41, 41],
    col: [35, 39],
    eventHandler: updateTextBox({
      text: 'You should try climbing up.',
      image: workerImage,
    }),
    onLeave: onLeaveCallback,
  },
  {
    id: 'webPortfolio',
    row: [35, 35],
    col: [35, 39],
    eventHandler: updateTextBox(
      {
        text: 'Hmmm... Not too bad! I think that I should come back later.',
        image: playerImage,
      },
      {
        name: 'Portfolio',
        callback: () => page.openTab('contentPortfolio'),
      }
    ),
    onLeave: onLeaveCallback,
  },
  {
    id: 'gitRedirect',
    row: [35, 35],
    col: [40, 45],
    eventHandler: updateTextBox(
      {
        text:
          '"In case of fire - git add -A, git commit -m "FIRE!", git push origin HEAD --force"',
        image: playerImage,
      },
      {
        name: 'Github',
        callback: () => {
          window.open('https://github.com/lkatkus', '_blank');
        },
      }
    ),
    onLeave: onLeaveCallback,
  },
  {
    id: 'miscPortfolio',
    row: [35, 35],
    col: [46, 50],
    eventHandler: updateTextBox(
      {
        text:
          'Autocad, Archicad, 3DS MAX, Photoshop, Illustrator, Nikon, Aperture, Bokeh and etc. Lots of fancy words, huh?',
        image: playerImage,
      },
      { name: 'Other', callback: () => page.openTab('contentOther') }
    ),
    onLeave: onLeaveCallback,
  },
  {
    id: 'catSpeak',
    row: [33, 33],
    col: [13, 24],
    eventHandler: updateTextBox({ text: 'Meow!', image: catImage }),
    onLeave: onLeaveCallback,
  },
  {
    id: 'initialEvent',
    row: [5, 6],
    col: [10, 12],
    eventHandler: (playerRef) => {
      if (playerRef.canFly) {
        updateTextBox({
          text:
            '01010100 01101000 01100001 01101110 01101011 00100000 01111001 01101111 01110101 00100001',
          image: roboImage,
        })();
      } else {
        updateTextBox(
          {
            text:
              'That thing looks interesting...? It seems to be REACTing to something.',
            image: playerImage,
          },
          {
            name: 'Touch the strange thing',
            callback: () => {
              game.levelUp(gameObjects);
              game.disableControls(gameObjects);

              updateTextBox(
                {
                  text:
                    'What is this new power, that i feel?! Virtual DOM, Hooks, Redux, GraphQL, Node!',
                  image: roboImage,
                  shouldUpdate: true,
                },
                {
                  name: 'Try out this new power!',
                  callback: () => {
                    game.enableControls(gameObjects);

                    onLeaveCallback();
                  },
                }
              )();
            },
          }
        )();
      }
    },
    onLeave: onLeaveCallback,
  },
];

export const prepareEvents = function () {
  return getEventConfig({
    game: GAME_EVENTS,
    page: {
      openTab: (tab) => {
        this.toggleContentWrapper(tab, true);
      },
    },
  });
};
