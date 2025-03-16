/**
 * Scoopcast Spin Machine Configuration
 * Controls which images appear in the spin machine.
 */

// Spin Machine Configuration
if (typeof spinConfig === 'undefined') {
    const spinConfig = {
        players: [
            { 
                name: 'Aziz',
                image: './images/aziz.png',
                id: 'aziz2'
            },
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
                image: './images/amesh.png',
                id: 'amesh'
            }
        ],
        referees: ['Aziz', 'Vish', 'Aman', 'Amesh']
    };

    // Make the configuration available globally
    window.spinConfig = spinConfig;
}

// Don't remove this line - it makes the configuration available to other files
if (typeof module !== 'undefined') {
    module.exports = { spinConfig };
} else {
    // For browser context
    window.spinConfig = spinConfig;
} 