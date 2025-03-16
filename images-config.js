/**
 * Scoopcast Images Configuration
 * Edit this file to easily update image sources and names for all sections.
 */

// Configuration for all image sections
const imagesConfig = {
    // Frame section images
    frame: [
        { 
            src: './Guesstheframe/Edge of Tomorrow.png', 
            name: 'Edge of Tomorrow'
        },
        { 
            src: './Guesstheframe/inception.png', 
            name: 'Inception'
        },
        { 
            src: './Guesstheframe/Pirates of the Caribbean At Worlds End.png', 
            name: 'Pirates of the Caribbean At Worlds End'
        },
        { 
            src: './Guesstheframe/The Departed.png', 
            name: 'The Departed'
        },
        { 
            src: './Guesstheframe/The Lord of the Rings The Two Towers.png', 
            name: 'The Lord of the Rings The Two Towers'
        },
        { 
            src: './Guesstheframe/The Wolf of Wall Street.png', 
            name: 'The Wolf of Wall Street'
        },
        { 
            src: './Guesstheframe/Zootopia.png', 
            name: 'Zootopia'
        },
        { 
            src: './Guesstheframe/Eternal Sunshine of the Spotless Mind.png', 
            name: 'Eternal Sunshine of the Spotless Mind'
        },
        { 
            src: './Guesstheframe/Fight Club.png', 
            name: 'Fight Club'
        },
        { 
            src: './Guesstheframe/Harry Potter and the Prisoner of Azkaban.png', 
            name: 'Harry Potter and the Prisoner of Azkaban'
        },
        { 
            src: './Guesstheframe/Law Abiding Citizen.png', 
            name: 'Law Abiding Citizen'
        },
        { 
            src: './Guesstheframe/Pirates of the Caribbean Dead Mans Chest.png', 
            name: 'Pirates of the Caribbean Dead Mans Chest'
        },
        { 
            src: './Guesstheframe/The Avengers (2012).png', 
            name: 'The Avengers (2012)'
        },
        { 
            src: './Guesstheframe/The Truman Show.png', 
            name: 'The Truman Show'
        },
        { 
            src: './Guesstheframe/Snatch.png', 
            name: 'Snatch'
        },
        { 
            src: './Guesstheframe/Deadpool.png', 
            name: 'Deadpool'
        },
        // Add more frame images here as needed
    ],
    
    // Dialogue section images
    dialogue: [
        { 
            src: './Guessthedialogue/1.I\'ll Will be Back.png', 
            name: 'The Terminator (1984)'
        },
        { 
            src: './Guessthedialogue/2.Mogambo khush hua!.png', 
            name: 'Mr. India (1987)'
        },
        { 
            src: './Guessthedialogue/I am king of the world.png', 
            name: 'Titanic (1997)'
        },
        { 
            src: './Guessthedialogue/Pushpa.png', 
            name: 'Amar Prem (1972)'
        },
        { 
            src: './Guessthedialogue/keep your.png', 
            name: 'The Godfather Part II (1974)'
        },
        { 
            src: './Guessthedialogue/May the force.png', 
            name: 'Star Wars (1977)'
        },
        // Add more dialogue images here as needed
    ],
    
    // Eyes section images - Note: Directory currently empty, using placeholder
    eyes: [
        { 
            src:'./Guesstheeyesreveal/Ana de Armas crooped.jpg',
            name: 'Ana de Armas',
            revealSrc:  './Guesstheeyes/Ana de Armas.jpg', 
        },
        { 
            src: './Guesstheeyesreveal/Elizabeth Olsen crooped.jpg', 
            name: 'Elizabeth Olsen',
            revealSrc: './Guesstheeyes/Elizabeth Olsen.jpg',
        },
        { 
            src: './Guesstheeyesreveal/hayley atwell crooped.jpg', 
            name: 'Hayley atwell',
            revealSrc: './Guesstheeyes/hayley atwell.jpg',
        },
        { 
            src: './Guesstheeyesreveal/Mikey madison crooped.jpg', 
            name: 'Mikey Madison',
            revealSrc: './Guesstheeyes/Mikey madison.jpg',
        },
        { 
            src: './Guesstheeyesreveal/Scarlett Johansson cropped.jpg',
            name: 'Scarlett Johansson',
            revealSrc: './Guesstheeyes/Scarlett Johansson.jpg', 
        }, 
        { 
            src: './Guesstheeyesreveal/Sydney sweeny cropped.jpg',
            name: 'Sydney sweeny',
            revealSrc: './Guesstheeyes/Sydney sweeny.jpg', 
        }
    ],
    
    // Curves section images - Note: Directory currently empty, using placeholder
    curves: [
        { 
            src: './GuessTheCurvesReveal/Ana De Armas blur.jpg', 
            name: 'Ana De Armas',
            revealSrc: './GuessTheCurves/Ana De Armas.jpg' 
        },
        { 
            src: './GuessTheCurvesReveal/ariana grande blur.jpg', 
            name: 'Ariana Grande',
            revealSrc: './GuessTheCurves/ariana grande.jpg' 
        },
        { 
            src: './GuessTheCurvesReveal/Brie Larson blur.jpg', 
            name: 'Brie Larson',
            revealSrc: './GuessTheCurves/Brie Larson.jpg' 
        },
        { 
            src: './GuessTheCurvesReveal/Emilia Clarke blur.jpg', 
            name: 'Emilia Clarke',
            revealSrc: './GuessTheCurves/Emilia Clarke.jpg' 
        },
        { 
            src: './GuessTheCurvesReveal/Hailee Steinfeld blur.jpg', 
            name: 'Hailee Steinfeld',
            revealSrc: './GuessTheCurves/Hailee Steinfeld.jpg' 
        },
        { 
            src: './GuessTheCurvesReveal/Jennifer Lawrence blur.jpg', 
            name: 'Jennifer Lawrence',
            revealSrc: './GuessTheCurves/Jennifer Lawrence.jpg' 
        },
        { 
            src: './GuessTheCurvesReveal/Kat dening blur.jpg', 
            name: 'Kat Dening',
            revealSrc: './GuessTheCurves/Kat dening.jpg' 
        },
        { 
            src: './GuessTheCurvesReveal/Rachel Brosnahanblur.jpg', 
            name: 'Rachel Brosnahan',
            revealSrc: './GuessTheCurves/Rachel Brosnahan.jpg' 
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