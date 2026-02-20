// Portfolio Configuration File
const portfolioConfig = {
    // Site information
    siteName: "Samuel Oshunsan | Red Team Portfolio",
    author: "Samuel Oshunsan",
    year: "2025",
    
    // Social links
    social: {
        github: "https://github.com/samuelifeoluwa",
        linkedin: null, // Add when available
        email: null // Add when available
    },
    
    // File paths
    paths: {
        labs: "labs/",
        writeups: "writeups/",
        tools: "tools/",
        images: "assets/images/",
        resume: "assets/resume/samuel-oshunsan-resume.pdf"
    },
    
    // Feature flags
    features: {
        enableAnimations: true,
        enableNotifications: true,
        enableLoadingStates: true
    }
};

// Make config available globally
window.portfolioConfig = portfolioConfig;