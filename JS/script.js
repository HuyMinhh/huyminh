// ======================
// DOM Elements cơ bản
// ======================
const particles = document.querySelectorAll('.particle');
const avatar = document.querySelector('.avatar');
const skillTags = document.querySelectorAll('.skill-tag');
const contactBtn = document.querySelector('.contact-btn');
const socialLinks = document.querySelectorAll('.social-link');

// ======================
// Music Player Elements
// ======================
const playBtn = document.querySelector(".play");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const audio = document.getElementById("audio");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const currentTimeEl = document.querySelector(".current-time");
const durationEl = document.querySelector(".duration");

let isPlaying = false;

// ======================
// Hiệu ứng mousemove cho particles
// ======================
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.5;
        const moveX = x * speed * 50;
        const moveY = y * speed * 50;
        particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// ======================
// Hiệu ứng click avatar
// ======================
if (avatar) {
    avatar.addEventListener('click', () => {
        avatar.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            avatar.style.animation = 'pulse 3s ease-in-out infinite';
        }, 500);
    });
}

// ======================
// Hover cho skill tags
// ======================
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.background = 'rgba(255, 255, 255, 0.3)';
        tag.style.transform = 'translateY(-2px) scale(1.05)';
    });
    tag.addEventListener('mouseleave', () => {
        tag.style.background = 'rgba(255, 255, 255, 0.2)';
        tag.style.transform = 'translateY(0) scale(1)';
    });
});

// ======================
// Hiệu ứng click contact button
// ======================
if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: 50%; top: 50%;
            width: 100px; height: 100px;
            margin-left: -50px; margin-top: -50px;
        `;
        contactBtn.style.position = 'relative';
        contactBtn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
        showNotification("Thanks for your interest! I'll get back to you soon.");
    });
}

// ======================
// Function hiển thị thông báo
// ======================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px; right: 20px;
        background: rgba(255,255,255,0.9);
        color: #333;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        backdrop-filter: blur(10px);
        z-index: 1000;
        font-weight: 500;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ======================
// Hover social links
// ======================
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px) rotate(5deg)';
    });
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) rotate(0deg)';
    });
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification("Social link clicked!");
    });
});

// ======================
// Scroll animation cho profile-card
// ======================
function animateOnScroll() {
    const profileCard = document.querySelector('.profile-card');
    if (!profileCard) return;
    const rect = profileCard.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight * 0.8) {
        profileCard.style.opacity = '1';
        profileCard.style.transform = 'translateY(0)';
    }
}

// ======================
// Animation ban đầu
// ======================
document.addEventListener('DOMContentLoaded', () => {
    const profileCard = document.querySelector('.profile-card');
    if (!profileCard) return;
    profileCard.style.opacity = '0';
    profileCard.style.transform = 'translateY(50px)';
    profileCard.style.transition = 'all 0.8s ease';
    setTimeout(() => {
        profileCard.style.opacity = '1';
        profileCard.style.transform = 'translateY(0)';
    }, 300);
});

// ======================
// Ripple CSS keyframes
// ======================
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ======================
// Parallax scroll
// ======================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.background');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ======================
// Particles random
// ======================
function createRandomParticles() {
    const particleContainer = document.querySelector('.particles');
    if (!particleContainer) return;
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 10 + 10) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particleContainer.appendChild(particle);
        setTimeout(() => particle.remove(), 10000);
    }
}
setInterval(createRandomParticles, 5000);

// ======================
// Keyboard accessibility
// ======================
if (avatar) {
    avatar.setAttribute('tabindex', '0');
    avatar.setAttribute('role', 'button');
    avatar.setAttribute('aria-label', 'Click to animate avatar');
}
if (contactBtn) {
    contactBtn.setAttribute('aria-label', 'Contact Designer');
}
skillTags.forEach((tag, index) => {
    tag.setAttribute('tabindex', '0');
    tag.setAttribute('role', 'button');
    tag.setAttribute('aria-label', `Skill: ${tag.textContent}`);
});

// ======================
// MUSIC PLAYER FUNCTIONS
// ======================

// Play / Pause
playBtn.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
        playBtn.classList.replace("fa-pause", "fa-play");
    } else {
        audio.play();
        playBtn.classList.replace("fa-play", "fa-pause");
    }
    isPlaying = !isPlaying;
});

// Cập nhật progress
audio.addEventListener("timeupdate", () => {
    const { currentTime, duration } = audio;
    if (duration) {
        const percent = (currentTime / duration) * 100;
        progress.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(currentTime);
        durationEl.textContent = formatTime(duration);
    }
});

// Click tua nhạc
progressBar.addEventListener("click", (e) => {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

// Nút Next = tua nhanh 10s
nextBtn.addEventListener("click", () => {
    audio.currentTime += 10;
});

// Nút Prev = lùi lại 10s
prevBtn.addEventListener("click", () => {
    audio.currentTime -= 10;
});

// Định dạng thời gian mm:ss
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Volume control
const volumeSlider = document.querySelector(".volume");
audio.volume = 1; // mặc định 100%

volumeSlider.addEventListener("input", (e) => {
    audio.volume = e.target.value;
});

// Tự động play khi load trang
window.addEventListener("load", () => {
    audio.play().then(() => {
        playBtn.classList.replace("fa-play", "fa-pause");
        isPlaying = true;
    }).catch(err => {
        console.log("Autoplay bị chặn bởi trình duyệt:", err);
    });
});

// Overlay click để vào
const overlay = document.getElementById("overlay");

overlay.addEventListener("click", () => {
    overlay.classList.add("hidden");  // Ẩn overlay
    audio.play().then(() => {         // Bắt đầu phát nhạc
        playBtn.classList.replace("fa-play", "fa-pause");
        isPlaying = true;
    }).catch(err => {
        console.log("Autoplay bị chặn:", err);
    });
});

// ======================
// Lặp lại bài hát khi hết
// ======================
audio.addEventListener("ended", () => {
    audio.currentTime = 0; // tua về đầu
    audio.play();          // phát lại
    playBtn.classList.replace("fa-play", "fa-pause");
    isPlaying = true;
});