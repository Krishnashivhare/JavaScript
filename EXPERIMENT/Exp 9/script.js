document.addEventListener('DOMContentLoaded', () => {
    // --- Local Storage Elements ---
    const themeBtns = document.querySelectorAll('.theme-btn');
    const accentColorInput = document.getElementById('accentColor');
    const userNameInput = document.getElementById('userName');
    const clearLocalBtn = document.getElementById('clearLocalBtn');

    // --- Session Storage Elements ---
    const sessionNotesInput = document.getElementById('sessionNotes');
    const viewCountSpan = document.getElementById('viewCount');
    const clearSessionBtn = document.getElementById('clearSessionBtn');

    // ==========================================
    // LOCAL STORAGE LOGIC (Persistent)
    // ==========================================

    // 1. Load preferences
    const loadLocalPreferences = () => {
        // Theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);

        // Accent Color
        const savedColor = localStorage.getItem('accentColor') || '#3b82f6';
        applyAccentColor(savedColor);

        // User Name
        const savedName = localStorage.getItem('userName') || '';
        userNameInput.value = savedName;
    };

    // 2. Apply theme to UI and DOM
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update buttons
        themeBtns.forEach(btn => {
            if (btn.dataset.theme === theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    };

    // 3. Apply accent color to CSS variables
    const applyAccentColor = (color) => {
        document.documentElement.style.setProperty('--accent-color', color);
        accentColorInput.value = color;
    };

    // Event Listeners for Local Storage
    themeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selectedTheme = e.target.dataset.theme;
            applyTheme(selectedTheme);
            localStorage.setItem('theme', selectedTheme);
        });
    });

    accentColorInput.addEventListener('input', (e) => {
        const color = e.target.value;
        applyAccentColor(color);
        localStorage.setItem('accentColor', color);
    });

    userNameInput.addEventListener('input', (e) => {
        localStorage.setItem('userName', e.target.value);
    });

    clearLocalBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to clear your persistent preferences?")) {
            localStorage.clear();
            // Reset to defaults
            applyTheme('light');
            applyAccentColor('#3b82f6');
            userNameInput.value = '';
        }
    });

    // ==========================================
    // SESSION STORAGE LOGIC (Temporary)
    // ==========================================

    // 1. Manage View Count
    const manageViewCount = () => {
        let count = sessionStorage.getItem('viewCount');
        count = count ? parseInt(count) + 1 : 1;
        sessionStorage.setItem('viewCount', count);
        viewCountSpan.textContent = count;
    };

    // 2. Load Draft Notes
    const loadSessionDraft = () => {
        const savedNotes = sessionStorage.getItem('sessionNotes') || '';
        sessionNotesInput.value = savedNotes;
    };

    // Event Listeners for Session Storage
    sessionNotesInput.addEventListener('input', (e) => {
        sessionStorage.setItem('sessionNotes', e.target.value);
    });

    clearSessionBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to clear session data?")) {
            sessionStorage.clear();
            // Reset UI
            sessionNotesInput.value = '';
            
            // Re-initialize view count for this active session
            sessionStorage.setItem('viewCount', 1);
            viewCountSpan.textContent = 1;
        }
    });

    // ==========================================
    // INITIALIZATION
    // ==========================================
    loadLocalPreferences();
    loadSessionDraft();
    manageViewCount();
});
