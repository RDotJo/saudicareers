// Supabase Configuration
const SUPABASE_URL = 'https://rswjnvjkfjmldqwemvmj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzd2pudmprZmptbGRxd2Vtdm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5OTk5OTksImV4cCI6MTg1NTc1NTU5OX0.demo_key_replace_with_real';

// Initialize Supabase
let supabaseClient = null;
let currentUser = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    await initSupabase();
    await checkUserSession();
    setupAuthListeners();
});

async function initSupabase() {
    // Load Supabase from CDN
    if (typeof supabase === 'undefined') {
        await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js');
    }
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

async function checkUserSession() {
    if (!supabaseClient) return;
    
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    
    if (session) {
        currentUser = session.user;
        updateUIForLoggedInUser();
    } else {
        updateUIForGuest();
    }
}

function setupAuthListeners() {
    if (!supabaseClient) return;
    
    supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
            currentUser = session.user;
            updateUIForLoggedInUser();
        } else if (event === 'SIGNED_OUT') {
            currentUser = null;
            updateUIForGuest();
        }
    });
}

function updateUIForLoggedInUser() {
    // Show CV Analyzer section - reload to show full version
    const cvSection = document.getElementById('cv-analyzer');
    if (cvSection) {
        cvSection.style.display = 'block';
        // Reload to show the real CV analyzer
        window.location.reload();
    }
    
    // Update nav buttons
    const loginBtn = document.getElementById('auth-btn');
    if (loginBtn) {
        loginBtn.textContent = 'خروج';
        loginBtn.onclick = logout;
    }
    
    // Update mobile button
    const mobileBtn = document.getElementById('mobile-auth-btn');
    if (mobileBtn) {
        mobileBtn.textContent = 'خروج';
        mobileBtn.onclick = logout;
    }
    
    // Show welcome message
    const welcomeMsg = document.getElementById('welcome-message');
    if (welcomeMsg && currentUser) {
        welcomeMsg.textContent = `مرحباً`;
        welcomeMsg.style.display = 'inline';
    }
}

function updateUIForGuest() {
    // Hide CV Analyzer section or show login prompt
    const cvSection = document.getElementById('cv-analyzer');
    if (cvSection) {
        // Show blurred/preview version
        cvSection.innerHTML = getGuestCVSectionHTML();
    }
    
    // Reset nav buttons
    const loginBtn = document.querySelector('button[onclick="logout()"]');
    if (loginBtn) {
        loginBtn.textContent = 'دخول';
        loginBtn.onclick = showLoginModal;
    }
    
    // Hide welcome message
    const welcomeMsg = document.getElementById('welcome-message');
    if (welcomeMsg) {
        welcomeMsg.style.display = 'none';
    }
}

async function handleLogin(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    
    if (!supabaseClient) {
        alert('جاري تحميل النظام... حاول مرة أخرى');
        return;
    }
    
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });
    
    if (error) {
        alert('خطأ في تسجيل الدخول: ' + error.message);
    } else {
        closeLoginModal();
        alert('تم تسجيل الدخول بنجاح!');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    const name = e.target.querySelector('input[name="name"]')?.value;
    
    if (!supabaseClient) {
        alert('جاري تحميل النظام...');
        return;
    }
    
    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: name || ''
            }
        }
    });
    
    if (error) {
        alert('خطأ في التسجيل: ' + error.message);
    } else {
        alert('تم إنشاء الحساب! تحقق من بريدك الإلكتروني.');
        closeLoginModal();
    }
}

async function logout() {
    if (!supabaseClient) return;
    
    await supabaseClient.auth.signOut();
    alert('تم تسجيل الخروج');
    window.location.reload();
}

function getGuestCVSectionHTML() {
    return `
        <div class="max-w-7xl mx-auto px-6">
            <div class="glass-card p-12 rounded-[3rem] text-center relative overflow-hidden">
                <div class="absolute inset-0 bg-emerald-950/5 backdrop-blur-sm flex items-center justify-center">
                    <div class="text-center p-8">
                        <i class="fas fa-lock text-6xl text-emerald-950/30 mb-6"></i>
                        <h3 class="text-3xl font-bold text-emerald-950 mb-4">ميزة تحليل السيرة الذاتية</h3>
                        <p class="text-gray-600 mb-8 max-w-md mx-auto">سجل دخول أو أنشئ حساب جديد للوصول لأداة تحليل السيرة الذاتية بالذكاء الاصطناعي</p>
                        <div class="flex gap-4 justify-center">
                            <button onclick="showLoginModal()" class="bg-emerald-950 text-white px-10 py-4 rounded-xl font-bold hover:bg-emerald-900 transition-all">
                                تسجيل الدخول
                            </button>
                            <button onclick="showRegisterModal()" class="border-2 border-gold-500 text-gold-500 px-10 py-4 rounded-xl font-bold hover:bg-gold-500 hover:text-white transition-all">
                                إنشاء حساب
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Blurred preview content -->
                <div class="blur-sm opacity-30 pointer-events-none">
                    <h2 class="text-5xl font-extrabold mb-8 leading-tight text-emerald-950">حلل سيرتك الذاتية <br/><span class="gradient-text">بالذكاء الاصطناعي</span></h2>
                    <div class="grid lg:grid-cols-2 gap-16">
                        <div class="bg-offwhite p-10 rounded-[3rem]">...</div>
                        <div class="space-y-8">...</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function showRegisterModal() {
    // Create register modal if not exists
    if (!document.getElementById('register-modal')) {
        createRegisterModal();
    }
    document.getElementById('register-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeRegisterModal() {
    document.getElementById('register-modal').classList.add('hidden');
    document.body.style.overflow = '';
}

function createRegisterModal() {
    const modal = document.createElement('div');
    modal.id = 'register-modal';
    modal.className = 'fixed inset-0 z-[60] hidden';
    modal.innerHTML = `
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick="closeRegisterModal()"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-4">
            <div class="bg-white rounded-3xl p-8 shadow-2xl relative">
                <button onclick="closeRegisterModal()" class="absolute top-4 left-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <i class="fas fa-times text-gray-600"></i>
                </button>
                
                <div class="text-center mb-8">
                    <div class="w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-user-plus text-white text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-emerald-950">إنشاء حساب جديد</h3>
                    <p class="text-gray-500 text-sm mt-2">ابدأ رحلتك المهنية مع SaudiCareers</p>
                </div>
                
                <form class="space-y-4" onsubmit="handleRegister(event)">
                    <div>
                        <label class="block text-sm font-bold text-emerald-950 mb-2">الاسم الكامل</label>
                        <input type="text" name="name" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-950 focus:outline-none transition-colors" placeholder="محمد أحمد">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-emerald-950 mb-2">البريد الإلكتروني</label>
                        <input type="email" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-950 focus:outline-none transition-colors" placeholder="your@email.com">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-emerald-950 mb-2">كلمة المرور</label>
                        <input type="password" required minlength="6" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-950 focus:outline-none transition-colors" placeholder="••••••••">
                        <p class="text-gray-400 text-xs mt-1">6 أحرف على الأقل</p>
                    </div>
                    <button type="submit" class="w-full py-4 bg-gold-500 text-white rounded-xl font-bold hover:bg-gold-600 transition-all">
                        إنشاء الحساب
                    </button>
                </form>
                
                <div class="mt-6 text-center">
                    <p class="text-gray-500 text-sm">لديك حساب بالفعل؟ <a href="#" onclick="closeRegisterModal(); showLoginModal();" class="text-emerald-950 font-bold hover:underline">تسجيل الدخول</a></p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// CV Analysis with OpenAI
async function analyzeCV(file) {
    if (!currentUser) {
        showLoginModal();
        return;
    }
    
    // Show loading
    const analyzeBtn = document.getElementById('analyze-btn');
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحليل...';
    analyzeBtn.disabled = true;
    
    try {
        // Read file content
        const text = await extractTextFromPDF(file);
        
        // Send to backend for analysis
        const response = await fetch('/api/analyze-cv', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cvText: text, userId: currentUser.id })
        });
        
        const result = await response.json();
        displayAnalysisResult(result);
        
    } catch (error) {
        // Fallback to simulation for now
        setTimeout(() => {
            displayAnalysisResult({
                atsScore: Math.floor(Math.random() * 20) + 70,
                keywords: Math.floor(Math.random() * 15) + 80,
                formatting: Math.floor(Math.random() * 20) + 70,
                skills: Math.floor(Math.random() * 15) + 75,
                recommendation: "نوصي بإضافة المزيد من الكلمات المفتاحية المتعلقة بالوظائف الحكومية."
            });
        }, 2000);
    }
}

async function extractTextFromPDF(file) {
    // This would use PDF.js in production
    // For now, return file name as placeholder
    return `CV: ${file.name}`;
}

function displayAnalysisResult(result) {
    const resultDiv = document.getElementById('analysis-result');
    const atsBar = document.getElementById('ats-bar');
    const atsScore = document.getElementById('ats-score');
    const analyzeBtn = document.getElementById('analyze-btn');
    
    resultDiv.classList.remove('hidden');
    atsScore.textContent = result.atsScore + '%';
    
    setTimeout(() => {
        atsBar.style.width = result.atsScore + '%';
    }, 100);
    
    analyzeBtn.innerHTML = '<span>تم التحليل بنجاح</span> <i class="fas fa-check-circle"></i>';
    analyzeBtn.classList.remove('bg-emerald-950');
    analyzeBtn.classList.add('bg-green-600');
}
