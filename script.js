// تفعيل القائمة المتنقلة - من أعلى إلى أسفل
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('menuToggle');
    const nav = document.getElementById('navMenu');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('show');
    });
    
    // إغلاق القائمة عند النقر على رابط
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('show');
        });
    });
    
    // إعداد نموذج الاستفسار
    setupInquiryForm();
    
    // تأثير التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // تفعيل زر تغيير الوضع
    const themeToggle = document.getElementById('themeToggleBottom');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // تحميل الوضع المحفوظ
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // تفعيل الصفحات المنفصلة
    const pageLinks = document.querySelectorAll('.page-link');
    const pageContents = document.querySelectorAll('.page-content');
    
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href').substring(1);
            
            // إخفاء جميع الصفحات
            pageContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // إظهار الصفحة المطلوبة
            document.getElementById(pageId).classList.add('active');
            
            // التمرير إلى الصفحة
            document.getElementById(pageId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // تفعيل أزرار العودة
    const backButtons = document.querySelectorAll('.back-btn');
    
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // إخفاء جميع الصفحات
            pageContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // العودة إلى قسم الصفحات
            document.getElementById('pages').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // جعل بطاقات التواصل قابلة للنقر بالكامل
    makeContactCardsClickable();
    
    // إضافة زر حساب المطور
    addDeveloperContactButton();
});

// جعل بطاقات التواصل قابلة للنقر بالكامل
function makeContactCardsClickable() {
    // روابط بطاقات التواصل
    const contactCardsLinks = {
        'تلجرام': 'https://t.me/QR_l4',
        'واتساب':'https://wa.me/+972569956845', 
        'انستجرام': 'https://instagram.com/x.s_ik',
        'بوت تلجرام': 'https://t.me/QR_l4229BOT'
    };
    
    // إضافة حدث النقر لبطاقات التواصل
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        // الحصول على عنوان البطاقة
        const cardTitle = card.querySelector('h3').textContent.trim();
        
        // إذا كان العنوان موجود في الروابط
        if (contactCardsLinks[cardTitle]) {
            // جعل البطاقة قابلة للنقر
            card.style.cursor = 'pointer';
            
            // إضافة حدث النقر
            card.addEventListener('click', function(e) {
                // منع النقر إذا كان على رابط داخلي
                if (e.target.tagName === 'A' || e.target.closest('a')) {
                    return;
                }
                
                // فتح الرابط
                window.open(contactCardsLinks[cardTitle], '_blank');
            });
        }
    });
    
    // جعل بطاقات القنوات قابلة للنقر
    const channelCards = document.querySelectorAll('.channel-card, .content-card');
    channelCards.forEach(card => {
        const cardTitle = card.querySelector('h4')?.textContent.trim();
        const cardLink = card.querySelector('a');
        
        if (cardLink && cardTitle) {
            // جعل البطاقة قابلة للنقر
            card.style.cursor = 'pointer';
            
            // إضافة حدث النقر
            card.addEventListener('click', function(e) {
                // منع النقر إذا كان على رابط داخلي
                if (e.target.tagName === 'A' || e.target.closest('a')) {
                    return;
                }
                
                // فتح الرابط
                window.open(cardLink.href, '_blank');
            });
        }
    });
    
    // جعل بطاقات البوتات قابلة للنقر
    const botCards = document.querySelectorAll('.bot-card, .content-card');
    botCards.forEach(card => {
        const cardLink = card.querySelector('a');
        
        if (cardLink) {
            // جعل البطاقة قابلة للنقر
            card.style.cursor = 'pointer';
            
            // إضافة حدث النقر
            card.addEventListener('click', function(e) {
                // منع النقر إذا كان على رابط داخلي
                if (e.target.tagName === 'A' || e.target.closest('a')) {
                    return;
                }
                
                // فتح الرابط
                window.open(cardLink.href, '_blank');
            });
        }
    });
}

// إعداد نموذج الاستفسار
function setupInquiryForm() {
    const form = document.getElementById('inquiryForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // تعطيل زر الإرسال أثناء المعالجة
        submitBtn.disabled = true;
        submitBtn.textContent = 'جاري الإرسال...';
        
        // جمع البيانات من النموذج
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            contact: formData.get('contact'),
            type: formData.get('type'),
            message: formData.get('message'),
            rating: formData.get('rating') || 'غير محدد'
        };
        
        try {
            // إرسال البيانات إلى بوت التلجرام
            const botToken = '7692954530:AAGjw5xqcZOFNUrf-lXHmdc1pORHQRUq0Gg';
            const chatId = '8364181455';
            
            const messageText = `
طلب خدمة جديد من موقعك:

👤 الاسم: ${data.name}
📞 وسيلة التواصل: ${data.contact}
📋 نوع الخدمة: ${data.type}
⭐ التقييم: ${data.rating}
💬 تفاصيل الطلب:
${data.message}
            `;
            
            const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: messageText
                })
            });
            
            const result = await response.json();
            
            if (result.ok) {
                // إظهار رسالة النجاح
                formMessage.textContent = 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                
                // إعادة تعيين النموذج
                form.reset();
            } else {
                throw new Error('فشل في إرسال الرسالة');
            }
            
        } catch (error) {
            console.error('Error sending message:', error);
            
            // إظهار رسالة الخطأ
            formMessage.textContent = 'حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
        } finally {
            // إعادة تمكين زر الإرسال
            submitBtn.disabled = false;
            submitBtn.textContent = 'إرسال الطلب';
            
            // إخفاء رسالة النتيجة بعد 5 ثوانٍ
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    });
}