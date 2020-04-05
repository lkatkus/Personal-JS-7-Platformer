const onLeaveCallback = () => {
  document.getElementById('textBoxWrapper').className = 'closed';
  document.getElementById('textBox').innerHTML = '';
};

const updateTextBox = (text, image, siteAction) => () => {
  const textBoxWrapper = document.getElementById('textBoxWrapper');
  const textBox = document.getElementById('textBox');
  const imageBox = document.getElementById('textBoxImage');
  const textBoxButton = document.getElementById('textBoxButton');

  if (textBoxWrapper.className !== 'open') {
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

export const getEventConfig = (siteActions, images) => [
  {
    id: 'initialEvent',
    row: [41, 41],
    col: [3, 8],
    eventHandler: updateTextBox('Whoo... What is this place?', images.player),
    onLeave: onLeaveCallback
  },
  {
    id: 'makeArchitectsGreatAgain',
    row: [41, 41],
    col: [14, 27],
    eventHandler: updateTextBox(
      'I think that someone has told me that architects make great developers.',
      images.player,
      { name: 'About', callback: () => siteActions.openTab('contentAbout') }
    ),
    onLeave: onLeaveCallback
  },
  {
    id: 'moveUp',
    row: [41, 41],
    col: [35, 39],
    eventHandler: updateTextBox('You should try climbing up.', images.worker),
    onLeave: onLeaveCallback
  },
  {
    id: 'webPortfolio',
    row: [35, 35],
    col: [35, 39],
    eventHandler: updateTextBox(
      'Hmmm... Not too bad! I think that I should come back later.',
      images.player,
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
      '"In case of fire - git add -A, git commit -m "FIRE!", git push --force"',
      images.player,
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
      'Autocad, Archicad, 3DS MAX, Photoshop, Illustrator, Nikon, Aperture, Bokeh and etc. Lots of fancy words, huh?',
      images.player,
      { name: 'Other', callback: () => siteActions.openTab('contentOther') }
    ),
    onLeave: onLeaveCallback
  },
  {
    id: 'catSpeak',
    row: [33, 33],
    col: [13, 24],
    eventHandler: updateTextBox('Meow!', images.cat),
    onLeave: onLeaveCallback
  }
];
