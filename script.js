// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const phone = contactForm.querySelector('input[type="tel"]').value;
            const package = contactForm.querySelector('select').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !phone || !package) {
                alert('กรุณากรอกข้อมูลให้ครบถ้วน');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('กรุณากรอกอีเมลให้ถูกต้อง');
                return;
            }
            
            // Phone validation (Thai phone number)
            const phoneRegex = /^[0-9]{9,10}$/;
            if (!phoneRegex.test(phone.replace(/-/g, ''))) {
                alert('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (9-10 หลัก)');
                return;
            }
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            contactForm.reset();
        });
    }
});

// Success message function
function showSuccessMessage() {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #10b981, #059669);
            color: white;
            padding: 30px 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            text-align: center;
            font-family: 'Kanit', sans-serif;
            max-width: 400px;
            width: 90%;
        ">
            <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 15px; display: block;"></i>
            <h3 style="margin-bottom: 10px; font-size: 1.3rem;">ส่งคำสั่งซื้อสำเร็จ!</h3>
            <p style="margin-bottom: 20px; opacity: 0.9;">เราจะติดต่อกลับภายใน 24 ชั่วโมง</p>
            <button onclick="closeSuccessMessage()" style="
                background: rgba(255, 255, 255, 0.2);
                border: 2px solid white;
                color: white;
                padding: 10px 20px;
                border-radius: 25px;
                cursor: pointer;
                font-family: 'Kanit', sans-serif;
                font-weight: 600;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='white'; this.style.color='#10b981';" onmouseout="this.style.background='rgba(255, 255, 255, 0.2)'; this.style.color='white';">
                ปิด
            </button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9999;
        " onclick="closeSuccessMessage()"></div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Auto close after 5 seconds
    setTimeout(() => {
        closeSuccessMessage();
    }, 5000);
}

// Close success message function
function closeSuccessMessage() {
    const successMessage = document.querySelector('div[style*="position: fixed"]');
    if (successMessage) {
        successMessage.remove();
    }
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Pricing card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('featured')) {
                this.style.transform = 'scale(1.05)';
            } else {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
});

// Add loading animation to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // ripple origin
            const rect = this.getBoundingClientRect();
            this.style.setProperty('--x', `${e.clientX - rect.left}px`);
            this.style.setProperty('--y', `${e.clientY - rect.top}px`);
            this.classList.add('ripple');
            setTimeout(() => this.classList.remove('ripple'), 350);
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังโหลด...';
            this.style.pointerEvents = 'none';
            
            // Reset after 2 seconds
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
            }, 2000);
        });
    });
});

// Add typing effect to hero title
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after 1 second
        setTimeout(typeWriter, 1000);
    }
});

// Add counter animation for pricing
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Animate counters when pricing section is visible
const pricingObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const priceElements = entry.target.querySelectorAll('.amount');
            priceElements.forEach(el => {
                const target = parseInt(el.textContent);
                animateCounter(el, target);
            });
            pricingObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const pricingSection = document.querySelector('.pricing');
    if (pricingSection) {
        pricingObserver.observe(pricingSection);
    }
});

// Intersection Observer for reveal-on-scroll
document.addEventListener('DOMContentLoaded', () => {
    const revealables = document.querySelectorAll('[data-reveal]');
    if (!revealables.length) return;
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealables.forEach(el => io.observe(el));
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroGraphic = document.querySelector('.hero-graphic');
    
    if (hero && heroGraphic) {
        const rate = scrolled * -0.5;
        heroGraphic.style.transform = `translateY(${rate}px)`;
    }
});

// Hero canvas animation (IPv4 dark-like)
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.querySelector('.index__animation canvas');
    const container = document.querySelector('.index__animation');
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let dpr = Math.max(1, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;
    let t = 0;

    function resize() {
        // Fit canvas to container
        const rect = container.getBoundingClientRect();
        width = Math.max(300, Math.floor(rect.width)); // ลดขนาดขั้นต่ำสำหรับมือถือ
        height = Math.max(200, Math.floor(rect.height)); // ลดขนาดขั้นต่ำสำหรับมือถือ
        
        // ตรวจสอบว่าเป็นมือถือหรือไม่
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            width = Math.min(width, 400); // จำกัดขนาดบนมือถือ
            height = Math.min(height, 300);
        }
        
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function roundRect(x, y, w, h, r) {
        const rr = Math.min(r, w / 2, h / 2);
        ctx.beginPath();
        ctx.moveTo(x + rr, y);
        ctx.arcTo(x + w, y, x + w, y + h, rr);
        ctx.arcTo(x + w, y + h, x, y + h, rr);
        ctx.arcTo(x, y + h, x, y, rr);
        ctx.arcTo(x, y, x + w, y, rr);
        ctx.closePath();
    }

    function drawLabel(x, y, text) {
        ctx.save();
        ctx.translate(x, y);
        ctx.shadowColor = 'rgba(0,0,0,0.4)';
        ctx.shadowBlur = 10;
        ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
        ctx.lineWidth = 1;
        const paddingX = 14;
        const paddingY = 8;
        ctx.font = '500 12px Kanit, sans-serif';
        const w = ctx.measureText(text).width + paddingX * 2;
        const h = 28;
        roundRect(-w / 2, -h / 2, w, h, 14);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'rgba(203, 213, 225, 0.95)';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(4, 102, 200, 0.3)';
        ctx.shadowBlur = 5;
        ctx.fillText(text, 0, 0);
        ctx.shadowBlur = 0;
        ctx.restore();
    }

    function draw() {
        t += 0.016; // ~60fps
        ctx.clearRect(0, 0, width, height);

        // Fill entire canvas (no frame)
        const pad = 0;
        const cardX = 0;
        const cardY = 0;
        const cardW = width;
        const cardH = height;
        ctx.save();

        // keep canvas background fully transparent

        // Globe-like sphere with dotted longitudes/latitudes
        const cx = width * 0.58;
        const cy = height * 0.53;
        const R = Math.min(width, height) * 0.28;
        const sphereGrad = ctx.createRadialGradient(cx - R * 0.2, cy - R * 0.2, R * 0.2, cx, cy, R);
        sphereGrad.addColorStop(0, 'rgba(59,130,246,0.18)');
        sphereGrad.addColorStop(1, 'rgba(29,78,216,0.06)');
        ctx.fillStyle = sphereGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(59,130,246,0.25)';
        ctx.lineWidth = 1;
        ctx.shadowColor = 'rgba(59,130,246,0.5)';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Dotted latitude/longitude lines (tilt + slow rotation)
        ctx.save();
        const tilt = -0.35;
        const rot = t * 0.25; // medium speed
        ctx.translate(cx, cy);
        ctx.rotate(tilt);
        const dotColor = 'rgba(147, 197, 253, 0.55)';
        for (let i = -60; i <= 60; i += 20) {
            const r = Math.cos(i * Math.PI / 180) * R;
            ctx.beginPath();
            for (let a = 0; a <= Math.PI * 2; a += 0.14) {
                const x = Math.cos(a + rot) * r;
                const y = Math.sin(a + rot) * r * 0.5;
                ctx.moveTo(x + 1, y);
                ctx.arc(x, y, 1.2, 0, Math.PI * 2);
            }
            ctx.fillStyle = dotColor;
            ctx.shadowColor = 'rgba(147, 197, 253, 0.8)';
            ctx.shadowBlur = 3;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
        // meridians
        for (let a = 0; a < Math.PI; a += Math.PI / 10) {
            ctx.beginPath();
            for (let p = -R; p <= R; p += 6) {
                const x = Math.sin(a + rot) * (p);
                const y = Math.cos(a + rot) * (p) * 0.5;
                ctx.moveTo(x + 1, y);
                ctx.arc(x, y, 1.2, 0, Math.PI * 2);
            }
            ctx.fillStyle = dotColor;
            ctx.shadowColor = 'rgba(147, 197, 253, 0.8)';
            ctx.shadowBlur = 3;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
        ctx.restore();
        
        // no vignette fill so the hero gradient remains visible

        // External pinned labels around sphere
        const labels = [
            { text: 'Friendly API', angle: -0.9 },
            { text: '24/7 Support', angle: -2.6 },
            { text: 'HTTP, SOCKS5', angle: -3.6 }
        ];
        labels.forEach((lb, i) => {
            const a = lb.angle + Math.sin(t * 0.5 + i) * 0.05;
            const ex = cx + Math.cos(a) * (R + 18);
            const ey = cy + Math.sin(a) * (R * 0.9);
            // connector
            ctx.beginPath();
            ctx.moveTo(ex, ey);
            ctx.lineTo(ex + (i === 2 ? 40 : -40), ey + (i === 1 ? -10 : 0));
            ctx.strokeStyle = 'rgba(94,234,212,0.28)';
            ctx.lineWidth = 1;
            ctx.shadowColor = 'rgba(94, 234, 212, 0.5)';
            ctx.shadowBlur = 4;
            ctx.stroke();
            ctx.shadowBlur = 0;
            // node
            ctx.beginPath();
            ctx.arc(ex, ey, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(94, 234, 212, 0.9)';
            ctx.shadowColor = 'rgba(94, 234, 212, 1)';
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
            // label
            drawLabel(ex + (i === 2 ? 60 : -60), ey + (i === 1 ? -18 : -18), lb.text);
        });

        // Outer network (dense nodes & links)
        const outerCount = 140; // density
        const netRadius = R * 1.25;
        ctx.strokeStyle = 'rgba(96, 165, 250, 0.25)';
        ctx.fillStyle = 'rgba(96, 165, 250, 0.9)';
        for (let i = 0; i < outerCount; i++) {
            const a = (i / outerCount) * Math.PI * 2 + Math.sin(t * 0.3 + i) * 0.02;
            const rr = netRadius + Math.sin(t * 0.4 + i) * 6;
            const nx = cx + Math.cos(a) * rr;
            const ny = cy + Math.sin(a) * rr * 0.95;
            // node
            ctx.beginPath();
            ctx.arc(nx, ny, 2, 0, Math.PI * 2);
            ctx.shadowColor = 'rgba(96, 165, 250, 0.8)';
            ctx.shadowBlur = 2;
            ctx.fill();
            ctx.shadowBlur = 0;
            // connector to sphere surface
            const sx = cx + Math.cos(a) * R;
            const sy = cy + Math.sin(a) * R * 0.9;
            ctx.beginPath();
            ctx.moveTo(nx, ny);
            ctx.lineTo(sx, sy);
            ctx.shadowColor = 'rgba(96, 165, 250, 0.4)';
            ctx.shadowBlur = 1;
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        // No stroke/frame
        ctx.restore();

        requestAnimationFrame(draw);
    }

    resize();
    
    // ตรวจสอบว่าเป็นมือถือหรือไม่และปรับการแสดงผล
    function checkMobile() {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            // ลดความซับซ้อนของ animation บนมือถือ
            t = t * 0.5; // ช้าลง
        }
    }
    
    // เรียกใช้เมื่อ resize
    window.addEventListener('resize', function() {
        resize();
        checkMobile();
    });
    
    // Initial call to draw
    checkMobile();
    draw();
});
// Pricing Table Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Proxy type tabs
    const proxyButtons = document.querySelectorAll('.proxies__button');
    const priceItems = document.querySelectorAll('.price-item-template');
    
    proxyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            proxyButtons.forEach(btn => {
                btn.classList.remove('proxies__button--active');
                btn.closest('.proxies__advantage').classList.remove('proxies__advantage--active');
            });
            
            // Add active class to clicked button
            this.classList.add('proxies__button--active');
            this.closest('.proxies__advantage').classList.add('proxies__advantage--active');
            
            // Update pricing based on proxy type
            updatePricing(this.dataset.type);
        });
    });
    
    // Country selection
    const countryButtons = document.querySelectorAll('.countries-button');
    
    countryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all country buttons
            countryButtons.forEach(btn => btn.classList.remove('countries-button--active'));
            
            // Add active class to clicked button
            this.classList.add('countries-button--active');
            
            // Update pricing based on country
            updatePricingByCountry(this.dataset.country);
        });
    });
    
    // Custom quantity input
    const quantityInput = document.querySelector('.quantity-select__input-box--input');
    const customPriceDisplay = document.querySelector('.user-quantity__full-price');
    const customPricePerOne = document.querySelector('.user-quantity__price-per-one');
    
    if (quantityInput && customPriceDisplay && customPricePerOne) {
        quantityInput.addEventListener('input', function() {
            const quantity = parseInt(this.value) || 1;
            const pricePerIP = 85; // Base price per IP
            const totalPrice = quantity * pricePerIP;
            
            customPriceDisplay.textContent = `฿${totalPrice.toLocaleString()}`;
            customPricePerOne.textContent = `฿${pricePerIP} /IPs`;
        });
    }
    
    // Price calculation for all price items
    const priceSelects = document.querySelectorAll('.custom__select');
    
    priceSelects.forEach(select => {
        select.addEventListener('change', function() {
            updatePriceForItem(this);
        });
    });
    
    // Buy button functionality
    const buyButtons = document.querySelectorAll('.btn__price-item');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Redirect to LINE for all purchases
            window.open('https://lin.ee/rs19dYB', '_blank');
        });
    });
    
    // Initialize pricing with IPv4 as default
    updatePricing('ipv4');
});

// Update pricing based on proxy type
function updatePricing(type) {
    const pricingData = {
        ipv4: {
            '1': { price: 198.64, total: 198.64, days: [14, 30] },
            '5': { price: 79.6, total: 398, days: [3, 7, 14, 30] },
            '20': { price: 76.87, total: 1537.3, days: [3, 7, 14, 30] },
            '50': { price: 74.25, total: 3712.6, days: [3, 7, 14, 30] },
            '100': { price: 72.90, total: 7290.3, days: [3, 7, 14, 30] }
        },
        ipv6: {
            '5': { price: 40, total: 200 },
            '10': { price: 40, total: 400 },
            '20': { price: 40, total: 800 },
            '50': { price: 40, total: 2000 },
            '100': { price: 40, total: 4000 }
        },
        isp: {
            '5': { price: 120, total: 600 },
            '10': { price: 110, total: 1100 },
            '20': { price: 100, total: 2000 },
            '50': { price: 90, total: 4500 },
            '100': { price: 80, total: 8000 }
        },
        mobile: {
            '5': { price: 150, total: 750 },
            '10': { price: 140, total: 1400 },
            '20': { price: 130, total: 2600 },
            '50': { price: 120, total: 6000 },
            '100': { price: 110, total: 11000 }
        }
    };
    
    const data = pricingData[type] || pricingData.ipv4;
    
    // Special handling for IPv6 tier pricing (30 days only)
    if (type === 'ipv6') {
        updateIPv6TierPricing();
        return;
    }
    
    // Special handling for IPv4 pricing (multiple days)
    if (type === 'ipv4') {
        updateIPv4Pricing();
        return;
    }
    
    // Reset dropdowns for other types
    resetDropdowns();
    
    // Update price items for other types (ISP, Mobile)
    const priceItems = document.querySelectorAll('.price-item-template:not(.user-quantity):not(.enterprise)');
    const quantities = ['5', '10', '20', '50', '100'];
    
    priceItems.forEach((item, index) => {
        if (quantities[index]) {
            const quantity = quantities[index];
            const priceData = data[quantity];
            
            if (priceData) {
                const quantityElement = item.querySelector('.price-item__quantity');
                const pricePerOneElement = item.querySelector('.price-item__price-per-one');
                const totalPriceElement = item.querySelector('.price-item__full-price');
                
                if (quantityElement) quantityElement.textContent = `${quantity} IPs`;
                if (pricePerOneElement) pricePerOneElement.textContent = `฿${priceData.price} / IP`;
                if (totalPriceElement) totalPriceElement.textContent = `฿${priceData.total.toLocaleString()}`;
            }
        }
    });
}

// Update IPv6 with tier pricing
function updateIPv6TierPricing() {
    const priceItems = document.querySelectorAll('.price-item-template:not(.user-quantity):not(.enterprise)');
    
    // IPv6 tier pricing (30 days only)
    const ipv6Tiers = [
        { quantity: '10-99 IP', price: 40, total: 400 },
        { quantity: '100-199 IP', price: 35, total: 3500 },
        { quantity: '200 IP', price: 30, total: 6000 }
    ];
    
    // Hide all price items first
    priceItems.forEach((item, index) => {
        if (index >= 3) {
            item.style.display = 'none';
        } else {
            item.style.display = 'block';
        }
    });
    
    // Update only the first 3 items for IPv6
    priceItems.forEach((item, index) => {
        if (index < 3 && ipv6Tiers[index]) {
            const tier = ipv6Tiers[index];
            const quantityElement = item.querySelector('.price-item__quantity');
            const pricePerOneElement = item.querySelector('.price-item__price-per-one');
            const totalPriceElement = item.querySelector('.price-item__full-price');
            const selectElement = item.querySelector('.custom__select');
            
            if (quantityElement) quantityElement.textContent = tier.quantity;
            if (pricePerOneElement) pricePerOneElement.textContent = `฿${tier.price} / IP`;
            if (totalPriceElement) totalPriceElement.textContent = `฿${tier.total.toLocaleString()}`;
            
            // Set select to 30 days only and disable it
            if (selectElement) {
                selectElement.innerHTML = '<option value="30">30 วัน</option>';
                selectElement.value = '30';
                selectElement.disabled = true;
                selectElement.style.opacity = '0.6';
                selectElement.style.cursor = 'not-allowed';
            }
        }
    });
}

// Update IPv4 with specific pricing
function updateIPv4Pricing() {
    const priceItems = document.querySelectorAll('.price-item-template:not(.user-quantity):not(.enterprise)');
    
    // IPv4 pricing from the image
    const ipv4Tiers = [
        { quantity: '1 IP', price: 198.64, total: 198.64, days: [14, 30] },
        { quantity: '5 IP', price: 79.6, total: 398, days: [3, 7, 14, 30] },
        { quantity: '20 IP', price: 76.87, total: 1537.3, days: [3, 7, 14, 30] },
        { quantity: '50 IP', price: 74.25, total: 3712.6, days: [3, 7, 14, 30] },
        { quantity: '100 IP', price: 72.90, total: 7290.3, days: [3, 7, 14, 30] }
    ];
    
    // Show all price items for IPv4
    priceItems.forEach((item, index) => {
        item.style.display = 'block';
    });
    
    priceItems.forEach((item, index) => {
        if (ipv4Tiers[index]) {
            const tier = ipv4Tiers[index];
            const quantityElement = item.querySelector('.price-item__quantity');
            const pricePerOneElement = item.querySelector('.price-item__price-per-one');
            const totalPriceElement = item.querySelector('.price-item__full-price');
            const selectElement = item.querySelector('.custom__select');
            
            if (quantityElement) quantityElement.textContent = tier.quantity;
            if (pricePerOneElement) pricePerOneElement.textContent = `฿${tier.price.toFixed(2)} / IP`;
            if (totalPriceElement) totalPriceElement.textContent = `฿${tier.total.toLocaleString()}`;
            
            // Update dropdown options based on available days and enable it
            if (selectElement) {
                selectElement.innerHTML = '';
                tier.days.forEach(day => {
                    const option = document.createElement('option');
                    option.value = day;
                    option.textContent = `${day} วัน`;
                    selectElement.appendChild(option);
                });
                selectElement.value = tier.days[0]; // Set to first available day
                
                // Enable dropdown for IPv4
                selectElement.disabled = false;
                selectElement.style.opacity = '1';
                selectElement.style.cursor = 'pointer';
            }
        }
    });
}

// Reset dropdowns to normal state
function resetDropdowns() {
    const selectElements = document.querySelectorAll('.custom__select');
    const priceItems = document.querySelectorAll('.price-item-template:not(.user-quantity):not(.enterprise)');
    
    // Show all price items
    priceItems.forEach(item => {
        item.style.display = 'block';
    });
    
    selectElements.forEach(select => {
        select.innerHTML = `
            <option value="3">3 วัน</option>
            <option value="7">7 วัน</option>
            <option value="14">14 วัน</option>
            <option value="30">30 วัน</option>
        `;
        select.value = '3';
        select.disabled = false;
        select.style.opacity = '1';
        select.style.cursor = 'pointer';
    });
}

// Update pricing based on country
function updatePricingByCountry(country) {
    const countryMultipliers = {
        thailand: 1.0,
        usa: 1.2,
        singapore: 1.1
    };
    
    const multiplier = countryMultipliers[country] || 1.0;
    
    // Update all price displays
    const priceElements = document.querySelectorAll('.price-item__full-price, .user-quantity__full-price');
    
    priceElements.forEach(element => {
        const currentPrice = parseInt(element.textContent.replace(/[^\d]/g, ''));
        if (currentPrice) {
            const newPrice = Math.round(currentPrice * multiplier);
            element.textContent = `฿${newPrice.toLocaleString()}`;
        }
    });
}



// Update price for individual item when dropdown changes
function updatePriceForItem(selectElement) {
    const priceItem = selectElement.closest('.price-item-template');
    const quantityElement = priceItem.querySelector('.price-item__quantity');
    const pricePerOneElement = priceItem.querySelector('.price-item__price-per-one');
    const totalPriceElement = priceItem.querySelector('.price-item__full-price');
    
    if (quantityElement && pricePerOneElement && totalPriceElement) {
        const quantityText = quantityElement.textContent.trim();
        const selectedDays = parseInt(selectElement.value);
        
        // Check if this is IPv4 pricing
        if (quantityText.includes('IP') && !quantityText.includes('10-99') && !quantityText.includes('100-199') && !quantityText.includes('200')) {
            updateIPv4PriceForDays(quantityText, selectedDays, pricePerOneElement, totalPriceElement);
        }
    }
}

// Update IPv4 price based on days
function updateIPv4PriceForDays(quantityText, days, pricePerOneElement, totalPriceElement) {
    const ipv4Pricing = {
        '1 IP': {
            14: { price: 198.64, total: 198.64 },
            30: { price: 265.06, total: 265.06 }
        },
        '5 IP': {
            3: { price: 79.6, total: 398 },
            7: { price: 132.24, total: 661.2 },
            14: { price: 198.64, total: 993.2 },
            30: { price: 265.06, total: 1325.3 }
        },
        '20 IP': {
            3: { price: 76.87, total: 1537.3 },
            7: { price: 126.11, total: 2522.2 },
            14: { price: 186.24, total: 3724.7 },
            30: { price: 238.64, total: 4772.8 }
        },
        '50 IP': {
            3: { price: 74.25, total: 3712.6 },
            7: { price: 119.90, total: 5994.8 },
            14: { price: 173.82, total: 8690.9 },
            30: { price: 212.08, total: 10603.9 }
        },
        '100 IP': {
            3: { price: 72.90, total: 7290.3 },
            7: { price: 116.79, total: 11678.9 },
            14: { price: 167.63, total: 16763.3 },
            30: { price: 198.83, total: 19882.5 }
        }
    };
    
    const pricing = ipv4Pricing[quantityText];
    if (pricing && pricing[days]) {
        const data = pricing[days];
        pricePerOneElement.textContent = `฿${data.price.toFixed(2)} / IP`;
        totalPriceElement.textContent = `฿${data.total.toLocaleString()}`;
    }
}

// Show order modal
function showOrderModal(quantity, price) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        ">
            <div style="
                background: #1a1a1a;
                border-radius: 20px;
                padding: 40px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                border: 1px solid rgba(255, 255, 255, 0.1);
            ">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; color: #0466c8; margin-bottom: 20px; display: block;"></i>
                <h3 style="color: white; margin-bottom: 15px; font-family: 'Kanit', sans-serif;">ยืนยันการสั่งซื้อ</h3>
                <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 20px; font-family: 'Kanit', sans-serif;">
                    จำนวน: ${quantity}<br>
                    ราคา: ${price}
                </p>
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button onclick="closeOrderModal()" style="
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        color: white;
                        padding: 12px 24px;
                        border-radius: 25px;
                        cursor: pointer;
                        font-family: 'Kanit', sans-serif;
                        font-weight: 600;
                    ">ยกเลิก</button>
                    <button onclick="confirmOrder()" style="
                        background: linear-gradient(45deg, #0466c8, #001845);
                        border: none;
                        color: white;
                        padding: 12px 24px;
                        border-radius: 25px;
                        cursor: pointer;
                        font-family: 'Kanit', sans-serif;
                        font-weight: 600;
                    ">ยืนยันสั่งซื้อ</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Close order modal
function closeOrderModal() {
    const modal = document.querySelector('div[style*="position: fixed"]');
    if (modal) {
        modal.remove();
    }
}

// Confirm order
function confirmOrder() {
    closeOrderModal();
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #10b981, #059669);
            color: white;
            padding: 30px 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10001;
            text-align: center;
            font-family: 'Kanit', sans-serif;
            max-width: 400px;
            width: 90%;
        ">
            <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 15px; display: block;"></i>
            <h3 style="margin-bottom: 10px; font-size: 1.3rem;">สั่งซื้อสำเร็จ!</h3>
            <p style="margin-bottom: 20px; opacity: 0.9;">เราจะติดต่อกลับภายใน 24 ชั่วโมง</p>
            <button onclick="closeSuccessMessage()" style="
                background: rgba(255, 255, 255, 0.2);
                border: 2px solid white;
                color: white;
                padding: 10px 20px;
                border-radius: 25px;
                cursor: pointer;
                font-family: 'Kanit', sans-serif;
                font-weight: 600;
            ">ปิด</button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10000;
        " onclick="closeSuccessMessage()"></div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Auto close after 5 seconds
    setTimeout(() => {
        closeSuccessMessage();
    }, 5000);
}

// Close success message
function closeSuccessMessage() {
    const successMessage = document.querySelector('div[style*="position: fixed"]');
    if (successMessage) {
        successMessage.remove();
    }
}

// Add click tracking for analytics (placeholder)
function trackClick(element, action) {
    console.log(`Clicked: ${element}, Action: ${action}`);
    // Here you would integrate with your analytics service
    // Example: gtag('event', 'click', { 'event_category': 'engagement', 'event_label': action });
}

// Add click tracking to buttons
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            trackClick('CTA Button', action);
        });
    });
    
    const pricingButtons = document.querySelectorAll('.btn__price-item');
    pricingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const package = this.closest('.price-item-template').querySelector('.price-item__quantity, .user-quantity__title')?.textContent || 'Custom';
            trackClick('Pricing Package', package);
        });
    });
});
