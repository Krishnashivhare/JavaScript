document.addEventListener('DOMContentLoaded', () => {
    // Task 1: Reverse String
    const reverseBtn = document.getElementById('reverse-btn');
    const stringInput = document.getElementById('string-input');
    const reverseOutput = document.getElementById('reverse-output');
    const reverseResultArea = document.getElementById('reverse-result-area');

    reverseBtn.addEventListener('click', () => {
        const text = stringInput.value.trim();
        
        if (!text) {
            reverseOutput.textContent = "Please enter some text first.";
            reverseOutput.style.color = "var(--error)";
            reverseResultArea.classList.remove('active');
            
            // Shake animation for error
            stringInput.style.animation = "shake 0.4s ease";
            setTimeout(() => stringInput.style.animation = "", 400);
            return;
        }

        // Add a small delay for animation effect
        reverseOutput.style.opacity = '0';
        
        setTimeout(() => {
            // Reversing string logic
            const reversedText = text.split('').reverse().join('');
            
            reverseOutput.textContent = reversedText;
            reverseOutput.style.color = "var(--text-primary)";
            reverseOutput.style.opacity = '1';
            reverseOutput.classList.add('fade-in');
            
            // Clean up animation class
            setTimeout(() => reverseOutput.classList.remove('fade-in'), 400);
            
            reverseResultArea.classList.add('active');
        }, 150);
    });

    // Enter key support for input
    stringInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            reverseBtn.click();
        }
    });

    // Task 2: Count Vowels
    const countBtn = document.getElementById('count-btn');
    const paragraphInput = document.getElementById('paragraph-input');
    const totalVowels = document.getElementById('total-vowels');
    const vowelResultArea = document.getElementById('vowel-result-area');
    
    // Individual counts
    const counts = {
        a: document.getElementById('count-a'),
        e: document.getElementById('count-e'),
        i: document.getElementById('count-i'),
        o: document.getElementById('count-o'),
        u: document.getElementById('count-u')
    };

    countBtn.addEventListener('click', () => {
        const text = paragraphInput.value;
        
        if (!text.trim()) {
            totalVowels.textContent = "0";
            Object.values(counts).forEach(el => el.textContent = "0");
            vowelResultArea.classList.remove('active');
            
            // Shake animation for error
            paragraphInput.style.animation = "shake 0.4s ease";
            setTimeout(() => paragraphInput.style.animation = "", 400);
            return;
        }

        // Initialize counters
        let total = 0;
        let breakdown = { a: 0, e: 0, i: 0, o: 0, u: 0 };

        // Count vowels logic
        const lowerText = text.toLowerCase();
        for (let char of lowerText) {
            if (breakdown[char] !== undefined) {
                breakdown[char]++;
                total++;
            }
        }

        // Animate numbers
        animateValue(totalVowels, parseInt(totalVowels.textContent) || 0, total, 500);
        
        Object.keys(breakdown).forEach(vowel => {
            animateValue(counts[vowel], parseInt(counts[vowel].textContent) || 0, breakdown[vowel], 500);
        });

        vowelResultArea.classList.add('active');
    });

    // Number animation function
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Easing function for smoother animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            obj.innerHTML = Math.floor(easeOutQuart * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end; // Ensure exact final value
            }
        };
        window.requestAnimationFrame(step);
    }
});

// Add shake animation to document dynamically
const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
}
`;
document.head.appendChild(style);
