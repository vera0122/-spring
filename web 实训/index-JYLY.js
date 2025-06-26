// 导航栏滚动效果
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-secondary/95', 'backdrop-blur-md', 'shadow-md');
        navbar.classList.remove('bg-transparent');
    } else {
        navbar.classList.remove('bg-secondary/95', 'backdrop-blur-md', 'shadow-md');
        navbar.classList.add('bg-transparent');
    }
});

// 移动端菜单
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton.addEventListener('click', () => {
    if (mobileMenu.classList.contains('opacity-0')) {
        mobileMenu.classList.remove('opacity-0', '-translate-y-full', 'pointer-events-none');
        mobileMenu.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        mobileMenuButton.innerHTML = '<i class="fa fa-times"></i>';
    } else {
        mobileMenu.classList.add('opacity-0', '-translate-y-full', 'pointer-events-none');
        mobileMenu.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        mobileMenuButton.innerHTML = '<i class="fa fa-bars"></i>';
    }
});

// 登录模态框
const loginButton = document.getElementById('loginButton');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');

loginButton.addEventListener('click', () => {
    loginModal.classList.remove('opacity-0', 'pointer-events-none');
    loginModal.querySelector('div').classList.remove('scale-95');
    loginModal.querySelector('div').classList.add('scale-100');
});

closeModal.addEventListener('click', () => {
    loginModal.classList.add('opacity-0', 'pointer-events-none');
    loginModal.querySelector('div').classList.add('scale-95');
    loginModal.querySelector('div').classList.remove('scale-100');
});

// 点击模态框外部关闭
loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.add('opacity-0', 'pointer-events-none');
        loginModal.querySelector('div').classList.add('scale-95');
        loginModal.querySelector('div').classList.remove('scale-100');
    }
});

// 轮播图
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselIndicators = document.querySelectorAll('.carousel-indicator');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
let currentSlide = 0;

function showSlide(index) {
    // 隐藏所有幻灯片
    carouselSlides.forEach(slide => {
        slide.classList.add('opacity-0');
        slide.classList.remove('opacity-100');
    });

    // 重置所有指示器
    carouselIndicators.forEach(indicator => {
        indicator.classList.remove('bg-white');
        indicator.classList.add('bg-white/50');
    });

    // 显示当前幻灯片
    carouselSlides[index].classList.remove('opacity-0');
    carouselSlides[index].classList.add('opacity-100');

    // 激活当前指示器
    carouselIndicators[index].classList.remove('bg-white/50');
    carouselIndicators[index].classList.add('bg-white');

    // 动画文本
    const carouselTexts = carouselSlides[index].querySelectorAll('.carousel-text');
    carouselTexts.forEach((text, i) => {
        text.style.opacity = '0';
        text.style.transform = 'translateY(20px)';

        setTimeout(() => {
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
        }, 300 + i * 150);
    });

    currentSlide = index;
}

function next() {
    let newIndex = currentSlide + 1;
    if (newIndex >= carouselSlides.length) {
        newIndex = 0;
    }
    showSlide(newIndex);
}

function prev() {
    let newIndex = currentSlide - 1;
    if (newIndex < 0) {
        newIndex = carouselSlides.length - 1;
    }
    showSlide(newIndex);
}

// 初始化显示第一张幻灯片
showSlide(0);

// 轮播图自动播放
let slideInterval = setInterval(next, 5000);

// 点击下一张
nextSlide.addEventListener('click', () => {
    clearInterval(slideInterval);
    next();
    slideInterval = setInterval(next, 5000);
});

// 点击上一张
prevSlide.addEventListener('click', () => {
    clearInterval(slideInterval);
    prev();
    slideInterval = setInterval(next, 5000);
});

// 点击指示器
carouselIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(index);
        slideInterval = setInterval(next, 5000);
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});