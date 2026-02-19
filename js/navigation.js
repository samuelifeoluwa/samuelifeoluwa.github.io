// js/navigation.js
let isDetailPageActive = false;

// Cache to store loaded content so we don't fetch multiple times
const contentCache = {};

// Function to load HTML content from external file
async function loadDetailContent(pageId, filePath) {
    // Return cached content if available
    if (contentCache[pageId]) {
        return contentCache[pageId];
    }
    
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        contentCache[pageId] = html; // Cache the content
        return html;
    } catch (error) {
        console.error('Error loading detail page:', error);
        return `<div class="detail-content"><div class="step"><h3>Error Loading Content</h3><p>Could not load ${filePath}. Please make sure the file exists.</p></div></div>`;
    }
}

// Function to show detail page
async function showDetail(pageId) {
    isDetailPageActive = true;
    
    // Map pageId to file path
    const fileMap = {
        'lab-detail-1': 'labs/lab-detail-1.html',
        'lab-detail-2': 'labs/lab-detail-2.html',
        'lab-detail-3': 'labs/lab-detail-3.html',
        'lab-detail-4': 'labs/lab-detail-4.html',
        'lab-detail-5': 'labs/lab-detail-5.html',
        'lab-detail-6': 'labs/lab-detail-6.html',
        'lab-detail-7': 'labs/lab-detail-7.html',
        'writeup-detail-1': 'writeups/writeup-detail-1.html',
        'writeup-detail-2': 'writeups/writeup-detail-2.html',
        'tool-detail-1': 'tools/tool-detail-1.html',
        'tool-detail-2': 'tools/tool-detail-2.html'
    };
    
    // Hide all sections
    document.querySelectorAll('section').forEach(el => {
        el.style.display = 'none';
    });
    
    // Hide all detail pages first
    document.querySelectorAll('.detail-page').forEach(el => {
        el.style.display = 'none';
    });
    
    // Show the selected detail page container
    const detailPage = document.getElementById(pageId);
    if (detailPage) {
        detailPage.style.display = 'block';
        
        // Check if we need to load content
        if (detailPage.children.length === 0 && fileMap[pageId]) {
            // Show loading indicator
            detailPage.innerHTML = '<div class="detail-content"><div class="step"><h3>Loading...</h3></div></div>';
            
            // Load the content
            const content = await loadDetailContent(pageId, fileMap[pageId]);
            detailPage.innerHTML = content;
            
            // Re-attach back button event listeners
            detailPage.querySelectorAll('.back-button').forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    hideDetail();
                });
            });
        }
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Function to hide detail page and show main content
function hideDetail() {
    isDetailPageActive = false;
    
    // Hide all detail pages
    document.querySelectorAll('.detail-page').forEach(el => {
        el.style.display = 'none';
    });
    
    // Show all sections
    document.querySelectorAll('section').forEach(el => {
        el.style.display = 'block';
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Setup navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Setup nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // If we're on a detail page, hide it first
            if (isDetailPageActive) {
                hideDetail();
                
                // Small delay to ensure sections are visible before scrolling
                setTimeout(() => {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            } else {
                // Regular smooth scroll
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Setup lab cards
    document.querySelectorAll('.lab-card, .writeup-card, .tool-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const detailId = this.getAttribute('data-detail');
            showDetail(detailId);
        });
    });
    
    // Setup download button
    const downloadBtn = document.querySelector('.download-button');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Resume PDF will be available soon!');
        });
    }
});