// Stats Configuration
if (typeof statsConfig === 'undefined') {
    const statsConfig = {
        'aziz2': { wins: 0, totalScore: 0 },
        'aman': { wins: 0, totalScore: 0 },
        'vish': { wins: 0, totalScore: 0 },
        'amesh': { wins: 0, totalScore: 0 }
    };

    // Make the configuration available globally
    window.statsConfig = statsConfig;
}

// Export the configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = statsConfig;
} 