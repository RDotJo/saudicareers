// Supabase Configuration
const SUPABASE_URL = typeof window !== 'undefined' && window.ENV?.SUPABASE_URL 
    ? window.ENV.SUPABASE_URL 
    : 'https://vwtjwmojvtfwgpedufik.supabase.co';
const SUPABASE_ANON_KEY = typeof window !== 'undefined' && window.ENV?.SUPABASE_ANON_KEY 
    ? window.ENV.SUPABASE_ANON_KEY 
    : 'sb_publishable_CV3jxAb81cqQaJq_8t615g_CInfO7HB';

// Initialize Supabase
let supabaseClient = null;
let currentUser = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    await initSupabase();
    await checkUserSession();
    setupAuthListeners();
    handleVisitorType();
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

// Check visitor type and show appropriate CTA
function handleVisitorType() {
    // If logged in, don't show visitor CTAs
    if (currentUser) return;
    
    const firstTimeCta = document.getElementById('first-time-cta');
    const authBtn = document.getElementById('auth-btn');
    
    // Check if visited before
    const hasVisited = localStorage.getItem('saudicareers_visited');
    const visitDate = localStorage.getItem('saudicareers_visit_date');
    
    if (!hasVisited) {
        // First time visitor - Show attractive signup CTA
        if (firstTimeCta) firstTimeCta.classList.remove('hidden');
        
        // Mark as visited
        localStorage.setItem('saudicareers_visited', 'true');
        localStorage.setItem('saudicareers_visit_date', new Date().toISOString());
    } else {
        // Returning visitor - Show login button
        if (authBtn) authBtn.classList.remove('hidden');
        
        // Check if it's been more than a week - could show special message
        if (visitDate) {
            const daysSince = Math.floor((Date.now() - new Date(visitDate).getTime()) / (1000 * 60 * 60 * 24));
            if (daysSince > 7) {
                // Returning after a week - could show "Welcome back" message
                console.log('Welcome back after', daysSince, 'days');
            }
        }
    }
}

async function checkUserSession() {
    if (!supabaseClient) return;
    
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    
    if (session) {
        currentUser = session.user;
        updateUIForLoggedInUser();
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
            window.location.reload();
        }
    });
}

function updateUIForLoggedInUser() {
    // Hide visitor CTAs
    const firstTimeCta = document.getElementById('first-time-cta');
    const authBtn = document.getElementById('auth-btn');
    const userSection = document.getElementById('user-section');
    
    if (firstTimeCta) firstTimeCta.classList.add('hidden');
    if (authBtn) authBtn.classList.add('hidden');
    
    // Show user section
    if (userSection) {
        userSection.classList.remove('hidden');
        
        // Update user name
        const userName = document.getElementById('user-name');
        const userInitial = document.getElementById('user-initial');
        
        if (currentUser) {
            const name = currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'مستخدم';
            if (userName) userName.textContent = name;
            if (userInitial) userInitial.textContent = name.charAt(0).toUpperCase();
        }
    }
    
    // Show full CV analyzer
    const cvSection = document.getElementById('cv-analyzer');
    if (cvSection && !window.location.href.includes('profile')) {
        // Reload to show full version if currently showing guest version
        if (cvSection.innerHTML.includes('fa-lock')) {
            window.location.reload();
        }
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
        // Update last login
        localStorage.setItem('saudicareers_last_login', new Date().toISOString());
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
        closeRegisterModal();
        // Mark as registered
        localStorage.setItem('saudicareers_registered', 'true');
        localStorage.setItem('saudicareers_visit_date', new Date().toISOString());
        alert('تم إنشاء الحساب بنجاح! مرحباً بك في SaudiCareers 🎉');
    }
}

async function logout() {
    if (!supabaseClient) return;
    
    await supabaseClient.auth.signOut();
    localStorage.removeItem('saudicareers_last_login');
    window.location.reload();
}

// Modal Functions
function showLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function showRegisterModal() {
    if (!document.getElementById('register-modal')) {
        createRegisterModal();
    }
    const modal = document.getElementById('register-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeRegisterModal() {
    const modal = document.getElementById('register-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
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
                    <div class="w-16 h-16 bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <i class="fas fa-gift text-white text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-emerald-950">ابدأ رحلتك المهنية الآن 🚀</h3>
                    <p class="text-gray-500 text-sm mt-2">جميع الخدمات مجانية - سجل في أقل من دقيقة</p>
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
                    <button type="submit" class="w-full py-4 bg-gradient-to-r from-emerald-950 to-emerald-900 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                        🎉 احصل على جميع الخدمات مجاناً
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

// Guest CV Section
function getGuestCVSectionHTML() {
    return `
        <div class="max-w-7xl mx-auto px-6">
            <div class="glass-card p-12 rounded-[3rem] text-center relative overflow-hidden border-2 border-gold-500/20">
                <!-- Badge -->
                <div class="absolute top-6 right-6 bg-gold-500 text-white text-xs font-bold py-1 px-3 rounded-full animate-pulse">
                    🔒 للأعضاء فقط
                </div>
                
                <div class="relative z-10">
                    <div class="w-24 h-24 mx-auto bg-emerald-950/10 rounded-full flex items-center justify-center mb-6">
                        <i class="fas fa-lock text-5xl text-emerald-950"></i>
                    </div>
                    <h3 class="text-3xl font-bold text-emerald-950 mb-4">أداة تحليل السيرة الذاتية بالذكاء الاصطناعي 🤖</h3>
                    
                    <ul class="text-gray-600 mb-8 space-y-3 max-w-md mx-auto text-right">
                        <li class="flex items-center gap-2"><i class="fas fa-check-circle text-gold-500"></i> تحليل متوافق مع أنظمة ATS</li>
                        <li class="flex items-center gap-2"><i class="fas fa-check-circle text-gold-500"></i> كلمات مفتاحية مخصصة للسوق السعودي</li>
                        <li class="flex items-center gap-2"><i class="fas fa-check-circle text-gold-500"></i> نصائح لتحسين فرصك في رؤية 2030</li>
                        <li class="flex items-center gap-2"><i class="fas fa-check-circle text-gold-500"></i> تقرير مفصل خلال ثوانٍ</li>
                    </ul>
                    
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onclick="showRegisterModal()" class="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-10 py-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all animate-pulse">
                            🚀 اشترك الآن مجاناً
                        </button>
                        <button onclick="showLoginModal()" class="border-2 border-emerald-950 text-emerald-950 px-10 py-4 rounded-xl font-bold hover:bg-emerald-950 hover:text-white transition-all">
                            لدي حساب بالفعل
                        </button>
                    </div>
                    
                    <p class="text-gray-400 text-sm mt-6">✨ أكثر من 1,000 مستفيد حللوا سيرهم الذاتية معنا</p>
                </div>
                
                <!-- Blurred preview in background -->
                <div class="absolute inset-0 blur-sm opacity-10 pointer-events-none -z-10">
                    <div class="bg-offwhite p-10 rounded-[3rem] border border-emerald-950/5"></div>
                </div>
            </div>
        </div>
    `;
}
