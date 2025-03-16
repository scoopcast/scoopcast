/**
 * Scoopcast Images Configuration
 * Edit this file to easily update image sources and names for all sections.
 */

// Function to fix image paths based on environment
function getImagePath(path) {
    // Always return the path as is - no modifications needed
    // since we're using relative paths from the root directory
    return path;
}

// Configuration for all image sections
const imagesConfig = {
    // Frame section images
    frame: [
        { 
            src: getImagePath('Guesstheframe/Edge of Tomorrow.png'), 
            name: 'Edge of Tomorrow'
        },
        { 
            src: getImagePath('Guesstheframe/Inception.png'), 
            name: 'Inception'
        },
        { 
            src: getImagePath('Guesstheframe/Pirates of the Caribbean At Worlds End.png'), 
            name: 'Pirates of the Caribbean At Worlds End'
        },
        { 
            src: getImagePath('Guesstheframe/The Departed.png'), 
            name: 'The Departed'
        },
        { 
            src: getImagePath('Guesstheframe/The Lord of the Rings The Two Towers.png'), 
            name: 'The Lord of the Rings The Two Towers'
        },
        { 
            src: getImagePath('Guesstheframe/The Wolf of Wall Street.png'), 
            name: 'The Wolf of Wall Street'
        },
        { 
            src: getImagePath('Guesstheframe/Zootopia.png'), 
            name: 'Zootopia'
        },
        { 
            src: getImagePath('Guesstheframe/Eternal Sunshine of the Spotless Mind.png'), 
            name: 'Eternal Sunshine of the Spotless Mind'
        },
        { 
            src: getImagePath('Guesstheframe/Fight Club.png'), 
            name: 'Fight Club'
        },
        { 
            src: getImagePath('Guesstheframe/Harry Potter and the Prisoner of Azkaban.png'), 
            name: 'Harry Potter and the Prisoner of Azkaban'
        },
        { 
            src: getImagePath('Guesstheframe/Law Abiding Citizen.png'), 
            name: 'Law Abiding Citizen'
        },
        { 
            src: getImagePath('Guesstheframe/Pirates of the Caribbean Dead Mans Chest.png'), 
            name: 'Pirates of the Caribbean Dead Mans Chest'
        },
        { 
            src: getImagePath('Guesstheframe/The Avengers (2012).png'), 
            name: 'The Avengers (2012)'
        },
        { 
            src: getImagePath('Guesstheframe/The Truman Show.png'), 
            name: 'The Truman Show'
        },
        { 
            src: getImagePath('Guesstheframe/Snatch.png'), 
            name: 'Snatch'
        },
        { 
            src: getImagePath('Guesstheframe/Deadpool.png'), 
            name: 'Deadpool'
        },
        // Add more frame images here as needed
    ],
    
    // Dialogue section images
    dialogue: [
        { 
            src: getImagePath('Guessthedialogue/1.I\'ll Will be Back.png'), 
            name: 'The Terminator (1984)'
        },
        { 
            src: getImagePath('Guessthedialogue/2.Mogambo khush hua!.png'), 
            name: 'Mr. India (1987)'
        },
        { 
            src: getImagePath('Guessthedialogue/I am king of the world.png'), 
            name: 'Titanic (1997)'
        },
        { 
            src: getImagePath('Guessthedialogue/Pushpa.png'), 
            name: 'Amar Prem (1972)'
        },
        { 
            src: getImagePath('Guessthedialogue/keep your.png'), 
            name: 'The Godfather Part II (1974)'
        },
        { 
            src: getImagePath('Guessthedialogue/May the force.png'), 
            name: 'Star Wars (1977)'
        },
        // Add more dialogue images here as needed
    ],
    
    // Eyes section images - Note: Directory currently empty, using placeholder
    eyes: [
        { 
            src: getImagePath('Guesstheeyesreveal/Ana de Armas crooped.jpg'),
            name: 'Ana de Armas',
            revealSrc: getImagePath('Guesstheeyes/Ana de Armas.jpg')
        },
        { 
            src: getImagePath('Guesstheeyesreveal/Elizabeth Olsen crooped.jpg'), 
            name: 'Elizabeth Olsen',
            revealSrc: getImagePath('Guesstheeyes/Elizabeth Olsen.jpg')
        },
        { 
            src: getImagePath('Guesstheeyesreveal/hayley atwell crooped.jpg'), 
            name: 'Hayley atwell',
            revealSrc: getImagePath('Guesstheeyes/hayley atwell.jpg')
        },
        { 
            src: getImagePath('Guesstheeyesreveal/Mikey madison crooped.jpg'), 
            name: 'Mikey Madison',
            revealSrc: getImagePath('Guesstheeyes/Mikey madison.jpg')
        },
        { 
            src: getImagePath('Guesstheeyesreveal/Scarlett Johansson cropped.jpg'),
            name: 'Scarlett Johansson',
            revealSrc: getImagePath('Guesstheeyes/Scarlett Johansson.jpg')
        }, 
        { 
            src: getImagePath('Guesstheeyesreveal/Sydney sweeny cropped.jpg'),
            name: 'Sydney sweeny',
            revealSrc: getImagePath('Guesstheeyes/Sydney sweeny.jpg')
        }
    ],
    
    // Curves section images - Note: Directory currently empty, using placeholder
    curves: [
        {
            src: getImagePath('Guessthecurvesreveal/Ana De Armas blur.jpg'),
            name: 'Ana De Armas',
            revealSrc: getImagePath('Guessthecurves/Ana De Armas.jpg')
        },
        {
            src: getImagePath('Guessthecurvesreveal/ariana grande blur.jpg'),
            name: 'Ariana Grande',
            revealSrc: getImagePath('Guessthecurves/ariana grande.jpg')
        },
        {
            src: getImagePath('Guessthecurvesreveal/Brie Larson blur.jpg'),
            name: 'Brie Larson',
            revealSrc: getImagePath('Guessthecurves/Brie Larson.jpg')
        },
        {
            src: getImagePath('Guessthecurvesreveal/Emilia Clarke blur.jpg'),
            name: 'Emilia Clarke',
            revealSrc: getImagePath('Guessthecurves/Emilia Clarke.jpg')
        },
        {
            src: getImagePath('Guessthecurvesreveal/Hailee Steinfeld blur.jpg'),
            name: 'Hailee Steinfeld',
            revealSrc: getImagePath('Guessthecurves/Hailee Steinfeld.jpg')
        },
        {
            src: getImagePath('Guessthecurvesreveal/Jennifer Lawrence blur.jpg'),
            name: 'Jennifer Lawrence',
            revealSrc: getImagePath('Guessthecurves/Jennifer Lawrence.jpg')
        },
        {
            src: getImagePath('Guessthecurvesreveal/Kat dening blur.jpg'),
            name: 'Kat Dening',
            revealSrc: getImagePath('Guessthecurves/Kat dening.jpg')
        },
        {
            src: getImagePath('Guessthecurvesreveal/Rachel Brosnahanblur.jpg'),
            name: 'Rachel Brosnahan',
            revealSrc: getImagePath('Guessthecurves/Rachel Brosnahan.jpg')
        }
    ]
};

// Placeholder image to use when no images are found
const placeholderImage = { 
    src: './images/placeholder.svg', 
    name: 'No Images Found. Please add some.',
    revealSrc: './images/placeholder.svg'
};

// Don't remove this line - it makes the configuration available to other files
if (typeof module !== 'undefined') {
    module.exports = { imagesConfig, placeholderImage };
} else {
    // For browser context
    window.imagesConfig = imagesConfig;
    window.placeholderImage = placeholderImage;
} 