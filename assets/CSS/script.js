// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    detectDevice();
    setupBackground();
    enhanceButtons();
    setupPS3Helpers();
    
    // Debug device detection
    console.log("Running on:", window.deviceType);
});

// ==================== DEVICE DETECTION ====================
function detectDevice() {
    const ua = navigator.userAgent;
    window.isPS3 = ua.match(/PLAYSTATION 3|PS3/i);
    window.isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
    window.deviceType = isPS3 ? "PS3" : isMobile ? "Mobile" : "Desktop";
}

// ==================== BACKGROUND ANIMATION ====================
function setupBackground() {
    const bg = document.getElementById('movingBg');
    if (!bg) return;

    // PS3: Simple JS animation (no CSS animations)
    if (isPS3) {
        let pos = 0;
        const ps3Animation = setInterval(() => {
            pos -= 0.5;
            bg.style.transform = `translateX(${pos}px)`;
            
            // Reset position to prevent overflow
            if (pos <= -1280) pos = 0;
        }, 100);
        return;
    }

    // Mobile: Add mobile-specific class
    if (isMobile) {
        bg.classList.add('mobile-bg');
    } 
    // Desktop: Add parallax + animation
    else {
        bg.classList.add('desktop-bg');
        window.addEventListener('scroll', handleParallax);
    }
}

function handleParallax() {
    const yPos = window.scrollY * 0.3;
    const container = document.querySelector('.bg-container');
    if (container) {
        container.style.backgroundPositionY = `${yPos}px`;
    }
}

// ==================== BUTTON ENHANCEMENTS ====================
function enhanceButtons() {
    const buttons = document.querySelectorAll('.glowing-button');
    if (!buttons.length) return;

    buttons.forEach(btn => {
        // Hover Effects
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.05)';
            btn.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.8)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
            btn.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
        });

        // Click Effects
        btn.addEventListener('click', function(e) {
            if (!isPS3) {
                createRippleEffect(e, this);
            }
        });
    });
}

function createRippleEffect(e, button) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    Object.assign(ripple.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${x - size/2}px`,
        top: `${y - size/2}px`,
        position: 'absolute',
        background: 'rgba(255, 255, 255, 0.4)',
        borderRadius: '50%',
        transform: 'scale(0)',
        animation: 'ripple 0.6s linear',
        pointerEvents: 'none'
    });
    
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// ==================== PS3 SPECIFIC HELPERS ====================
function setupPS3Helpers() {
    if (!isPS3) return;
    
    // Download helper
    document.querySelectorAll('[href*="download"]').forEach(link => {
        link.onclick = function(e) {
            e.preventDefault();
            alert('[PS3 INSTRUCTIONS]\n1. Press Triangle\n2. Select "Save Link Target"\n3. Choose destination');
        };
    });
    
    // Simplified button feedback
    const buttons = document.querySelectorAll('.glowing-button');
    buttons.forEach(btn => {
        btn.onclick = function() {
            const originalBg = this.style.background;
            this.style.background = originalBg.replace('0.3', '0.6');
            setTimeout(() => {
                this.style.background = originalBg;
            }, 300);
        };
    });
}

// ==================== CLEANUP ====================
// For desktop parallax cleanup
window.addEventListener('beforeunload', function() {
    if (!isPS3 && !isMobile) {
        window.removeEventListener('scroll', handleParallax);
    }
});