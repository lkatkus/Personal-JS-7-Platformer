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

export const getEventConfig = (
  { gameActions, siteActions },
  { player, worker, cat }
) => [
  {
    id: 'initialEvent',
    row: [41, 41],
    col: [5, 9],
    eventHandler: updateTextBox({
      text: 'Whoo... What is this place?',
      image: player
    }),
    onLeave: onLeaveCallback
  },
  {
    id: 'makeArchitectsGreatAgain',
    row: [41, 41],
    col: [14, 27],
    eventHandler: updateTextBox(
      {
        text:
          'I think that someone has told me that architects make great developers.',
        image: player
      },
      { name: 'About', callback: () => siteActions.openTab('contentAbout') }
    ),
    onLeave: onLeaveCallback
  },
  {
    id: 'moveUp',
    row: [41, 41],
    col: [35, 39],
    eventHandler: updateTextBox({
      text: 'You should try climbing up.',
      image: worker
    }),
    onLeave: onLeaveCallback
  },
  {
    id: 'webPortfolio',
    row: [35, 35],
    col: [35, 39],
    eventHandler: updateTextBox(
      {
        text: 'Hmmm... Not too bad! I think that I should come back later.',
        image: player
      },
      {
        name: 'Portfolio',
        callback: () => siteActions.openTab('contentPortfolio')
      }
    ),
    onLeave: onLeaveCallback
  },
  {
    id: 'gitRedirect',
    row: [35, 35],
    col: [40, 45],
    eventHandler: updateTextBox(
      {
        text:
          '"In case of fire - git add -A, git commit -m "FIRE!", git push origin HEAD --force"',
        image: player
      },
      {
        name: 'Github',
        callback: () => {
          window.open('https://github.com/lkatkus', '_blank');
        }
      }
    ),
    onLeave: onLeaveCallback
  },
  {
    id: 'miscPortfolio',
    row: [35, 35],
    col: [46, 50],
    eventHandler: updateTextBox(
      {
        text:
          'Autocad, Archicad, 3DS MAX, Photoshop, Illustrator, Nikon, Aperture, Bokeh and etc. Lots of fancy words, huh?',
        image: player
      },
      { name: 'Other', callback: () => siteActions.openTab('contentOther') }
    ),
    onLeave: onLeaveCallback
  },
  {
    id: 'catSpeak',
    row: [33, 33],
    col: [13, 24],
    eventHandler: updateTextBox({ text: 'Meow!', image: cat }),
    onLeave: onLeaveCallback
  },
  {
    id: 'initialEvent',
    row: [5, 6],
    col: [10, 12],
    eventHandler: playerRef => {
      if (playerRef.canFly) {
        updateTextBox({ text: 'Meow!', image: cat })();
      } else {
        updateTextBox(
          {
            text:
              'That thing looks interesting...? It seems to be REACTing to something.',
            image: player
          },
          {
            name: 'Touch the strange thing',
            callback: () => {
              gameActions.levelUp();
              gameActions.disableControls();

              updateTextBox(
                {
                  text:
                    'What is this new power, that i feel?! Virtual DOM, Hooks, Redux, GraphQL, Node!',
                  image: cat,
                  shouldUpdate: true
                },
                {
                  name: 'Try out this new power!',
                  callback: () => {
                    gameActions.enableControls();

                    onLeaveCallback();
                  }
                }
              )();
            }
          }
        )();
      }
    },
    onLeave: onLeaveCallback
  }
];
