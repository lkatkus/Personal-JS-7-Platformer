const onLeaveCallback = () => document.getElementById('textBoxContainer').className = 'closed';
const updateTextBox = (text) => () => {
    const textBoxContainer = document.getElementById('textBoxContainer');
    const textBox = document.getElementById('textBox');

    if (textBoxContainer.className !== 'open') {
        textBoxContainer.className = 'open';
        textBox.innerHTML = text;
    }
};

export const EVENT_CONFIG = [
    {
        id: 'initialEvent',
        row: [41, 41],
        col: [3, 8],
        eventHandler: updateTextBox('Whoo... What is this place?'),
        onLeave: onLeaveCallback
    },
    {
        id: 'makeArchitectsGreatAgain',
        row: [41, 41],
        col: [14, 27],
        eventHandler: updateTextBox('I think that someone has told me that architects make great developers.'),
        onLeave: onLeaveCallback
    },
    {
        id: 'moveUp',
        row: [41, 41],
        col: [35, 39],
        eventHandler: updateTextBox('You should try climbing up.'),
        onLeave: onLeaveCallback
    },
    {
        id: 'webPortfolio',
        row: [35, 35],
        col: [34, 39],
        eventHandler: updateTextBox('Hmmm... Not too bad! I think that I should come back later.'),
        onLeave: onLeaveCallback
    },
    {
        id: 'gitRedirect',
        row: [35, 35],
        col: [40, 45],
        eventHandler: updateTextBox('"In case of fire - GIT add -A, GIT commit, GIT push --force"'),
        onLeave: onLeaveCallback
    },
    {
        id: 'miscPortfolio',
        row: [35, 35],
        col: [46, 50],
        eventHandler: updateTextBox('Autocad, Archicad, 3DS MAX, Photoshop, Illustrator, Nikon, Aperture, Bokeh and etc. Lots of fancy words, huh?'),
        onLeave: onLeaveCallback
    }
];
