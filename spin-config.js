/**
 * Scoopcast Spin Machine Configuration
 * Controls which images appear in the spin machine.
 */

// Configuration for spin machine images
const spinConfig = {
    // Player images for the spin machine
    players: [
        { 
            name: 'Aziz',
            image: './images/aziz2.png',
            id: 'aziz2'
        },
        // Other players are now included
        { 
            name: 'Aman',
            image: './images/aman.png',
            id: 'aman'
        },
        { 
            name: 'Vish',
            image: './images/vish.png',
            id: 'vish'
        },
        { 
            name: 'Amesh',
            image: './images/aamesh2.png',
            id: 'amesh'
        }
    ]
};

// Don't remove this line - it makes the configuration available to other files
if (typeof module !== 'undefined') {
    module.exports = { spinConfig };
} else {
    // For browser context
    window.spinConfig = spinConfig;
} 