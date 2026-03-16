// ═══════════════════════════════════════════════════════════════════════════════
// SaudiCareers Fallback Loader - مولد الطوارئ
// يضمن عمل الموقع حتى لو سقطت جميع الخدمات الخارجية
// ═══════════════════════════════════════════════════════════════════════════════

const FallbackLoader = {
    // التكوين
    config: {
        timeout: 5000,        // 5 ثواني انتظار قبل التحويل للاحتياطي
        retries: 2,           // محاولات إعادة التحميل
        retryDelay: 1000,     // ثانية بين كل محاولة
    },
    
    // حالة التحميل
    status: {
        tailwind: false,
        fonts: false,
        supabase: false,
        icons: false
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // نقطة البداية - Initialize
    // ═══════════════════════════════════════════════════════════════════════════════
    init() {
        console.log('🔌 Fallback Loader initialized - جاري فحص المصادر...');
        this.checkAllResources();
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // فحص جميع المصادر
    // ═══════════════════════════════════════════════════════════════════════════════
    async checkAllResources() {
        const checks = [
            this.checkTailwind(),
            this.checkFonts(),
            this.checkSupabase(),
            this.checkIcons()
        ];
        
        await Promise.all(checks);
        
        // إذا فشلت مصادر أساسية، فعل الاحتياطي
        if (!this.status.tailwind) {
            await this.loadEmergencyCSS();
        }
        
        if (!this.status.supabase) {
            this.enableOfflineMode();
        }
        
        console.log('✅ Fallback check complete:', this.status);
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // 1️⃣ فحص Tailwind
    // ═══════════════════════════════════════════════════════════════════════════════
    async checkTailwind() {
        return new Promise((resolve) => {
            let attempts = 0;
            
            const check = () => {
                attempts++;
                
                // التحقق من وجود Tailwind
                if (window.tailwind || document.documentElement.classList.contains('tailwind-loaded')) {
                    this.status.tailwind = true;
                    console.log('✅ Tailwind loaded');
                    resolve(true);
                    return;
                }
                
                if (attempts < this.config.retries) {
                    setTimeout(check, this.config.retryDelay);
                } else {
                    console.warn('⚠️ Tailwind failed - سيتم تفعيل الCSS الاحتياطي');
                    resolve(false);
                }
            };
            
            // انتظر قليلاً ثم افحص
            setTimeout(check, 500);
        });
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // 2️⃣ فحص الخطوط
    // ═══════════════════════════════════════════════════════════════════════════════
    async checkFonts() {
        return new Promise((resolve) => {
            // تحقق من تحميل Inter
            if (document.fonts) {
                document.fonts.load('1em Inter').then(() => {
                    this.status.fonts = true;
                    console.log('✅ Fonts loaded');
                    resolve(true);
                }).catch(() => {
                    console.warn('⚠️ Fonts failed - سيتم استخدام الخطوط المحلية');
                    resolve(false);
                });
            } else {
                // متصفح قديم - افترض النجاح
                resolve(true);
            }
        });
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // 3️⃣ فحص Supabase
    // ═══════════════════════════════════════════════════════════════════════════════
    async checkSupabase() {
        return new Promise((resolve) => {
            let attempts = 0;
            
            const check = () => {
                attempts++;
                
                if (typeof supabase !== 'undefined' && supabase.createClient) {
                    this.status.supabase = true;
                    console.log('✅ Supabase loaded');
                    resolve(true);
                    return;
                }
                
                if (attempts < this.config.retries) {
                    setTimeout(check, this.config.retryDelay);
                } else {
                    console.warn('⚠️ Supabase failed - سيتم تفعيل وضع عدم الاتصال');
                    resolve(false);
                }
            };
            
            setTimeout(check, 1000);
        });
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // 4️⃣ فحص الأيقونات
    // ═══════════════════════════════════════════════════════════════════════════════
    async checkIcons() {
        // Font Awesome أو أي مكتبة أيقونات
        const hasIcons = document.querySelector('i[class*="fa-"], .fas, .fab, .far') !== null;
        this.status.icons = hasIcons;
        return hasIcons;
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // 🚨 CSS الاحتياطي - Emergency Styles
    // ═══════════════════════════════════════════════════════════════════════════════
    async loadEmergencyCSS() {
        console.log('🚨 Loading emergency CSS...');
        
        const emergencyCSS = `
            /* ═══════════════════════════════════════════════════════════════ */
            /* SaudiCareers Emergency CSS - يعمل بدون Tailwind                 */
            /* ═══════════════════════════════════════════════════════════════ */
            
            * { margin: 0; padding: 0; box-sizing: border-box; }
            
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Tahoma, sans-serif;
                background: #000000;
                color: #ffffff;
                line-height: 1.6;
            }
            
            .container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }
            
            /* Grid fallback */
            .grid { display: flex; flex-wrap: wrap; }
            .grid > * { flex: 1 1 300px; margin: 8px; }
            
            /* Buttons */
            .btn {
                display: inline-block;
                padding: 12px 24px;
                background: #10B981;
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                text-decoration: none;
                transition: opacity 0.2s;
            }
            .btn:hover { opacity: 0.9; }
            .btn-outline {
                background: transparent;
                border: 2px solid #10B981;
            }
            
            /* Cards */
            .card {
                background: #1C1C1E;
                border-radius: 16px;
                padding: 24px;
                margin-bottom: 16px;
            }
            
            /* Typography */
            h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; }
            h2 { font-size: 2rem; font-weight: 700; margin-bottom: 0.75rem; }
            h3 { font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem; }
            p { margin-bottom: 1rem; color: rgba(255,255,255,0.8); }
            
            /* Alerts */
            .alert {
                padding: 16px;
                border-radius: 12px;
                margin-bottom: 16px;
            }
            .alert-warning {
                background: rgba(255, 159, 10, 0.2);
                border: 1px solid #FF9F0A;
                color: #FF9F0A;
            }
            
            /* Navigation */
            nav { 
                background: rgba(28, 28, 30, 0.8); 
                backdrop-filter: blur(20px);
                padding: 16px 0;
                position: sticky;
                top: 0;
                z-index: 100;
            }
            
            /* Mobile */
            @media (max-width: 768px) {
                h1 { font-size: 1.75rem; }
                h2 { font-size: 1.5rem; }
                .grid > * { flex: 1 1 100%; }
            }
            
            /* RTL Support */
            [dir="rtl"] { direction: rtl; text-align: right; }
        `;
        
        // إضافة الـ CSS للصفحة
        const style = document.createElement('style');
        style.id = 'emergency-css';
        style.textContent = emergencyCSS;
        document.head.appendChild(style);
        
        // إظهار تنبيه للمستخدم
        this.showEmergencyBanner();
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // 📡 وضع عدم الاتصال - Offline Mode
    // ═══════════════════════════════════════════════════════════════════════════════
    enableOfflineMode() {
        console.log('📡 Enabling offline mode...');
        
        // تعطيل ميزات تتطلب Supabase
        window.OFFLINE_MODE = true;
        
        // إخفاء أزرار تسجيل الدخول
        const authButtons = document.querySelectorAll('[data-auth-required]');
        authButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // إظهار رسالة للمستخدم
        this.showOfflineBanner();
        
        // تفعيل تخزين local فقط
        this.enableLocalStorageMode();
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // 🔔 رسائل التنبيه
    // ═══════════════════════════════════════════════════════════════════════════════
    showEmergencyBanner() {
        const banner = document.createElement('div');
        banner.className = 'alert alert-warning';
        banner.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 24px;">⚡</span>
                <div>
                    <strong>وضع الطوارئ</strong>
                    <p style="margin: 4px 0 0; font-size: 14px;">
                        بعض الخدمات غير متاحة. الموقع يعمل بشكل محدود.
                    </p>
                </div>
            </div>
        `;
        
        // إدراج في أول الصفحة
        const body = document.body;
        if (body.firstChild) {
            body.insertBefore(banner, body.firstChild);
        } else {
            body.appendChild(banner);
        }
    },
    
    showOfflineBanner() {
        const banner = document.createElement('div');
        banner.className = 'alert';
        banner.style.cssText = `
            background: rgba(16, 185, 129, 0.2);
            border: 1px solid #10B981;
            color: #10B981;
            padding: 16px;
            border-radius: 12px;
            margin-bottom: 16px;
        `;
        banner.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 24px;">🔌</span>
                <div>
                    <strong>وضع عدم الاتصال</strong>
                    <p style="margin: 4px 0 0; font-size: 14px;">
                        يمكنك تصفح الوظائف لكن التسجيل معطل مؤقتاً.
                    </p>
                </div>
            </div>
        `;
        
        const body = document.body;
        if (body.firstChild) {
            body.insertBefore(banner, body.firstChild);
        } else {
            body.appendChild(banner);
        }
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // 💾 وضع التخزين المحلي
    // ═══════════════════════════════════════════════════════════════════════════════
    enableLocalStorageMode() {
        // محاكاة دالة supabase محلياً
        window.mockSupabase = {
            auth: {
                getSession: async () => ({ data: { session: null }, error: null }),
                signIn: async () => ({ error: { message: 'وضع عدم الاتصال' } }),
                signUp: async () => ({ error: { message: 'وضع عدم الاتصال' } })
            },
            from: (table) => ({
                select: () => ({
                    data: JSON.parse(localStorage.getItem(`sc_${table}`) || '[]'),
                    error: null
                }),
                insert: (data) => {
                    const existing = JSON.parse(localStorage.getItem(`sc_${table}`) || '[]');
                    existing.push(data);
                    localStorage.setItem(`sc_${table}`, JSON.stringify(existing));
                    return { error: null };
                }
            })
        };
        
        // استخدام المحاكاة إذا فشل Supabase الحقيقي
        if (!this.status.supabase) {
            window.supabase = window.mockSupabase;
        }
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // 🧪 اختبار الـ Fallback (للتطوير فقط)
    // ═══════════════════════════════════════════════════════════════════════════════
    test() {
        console.log('🧪 Testing fallback systems...');
        
        // محاكاة فشل Tailwind
        this.status.tailwind = false;
        this.loadEmergencyCSS();
        
        // محاكاة فشل Supabase
        setTimeout(() => {
            this.status.supabase = false;
            this.enableOfflineMode();
        }, 2000);
        
        console.log('✅ Test complete - check the banners above');
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// تشغيل تلقائي عند تحميل الصفحة
// ═══════════════════════════════════════════════════════════════════════════════
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => FallbackLoader.init());
} else {
    FallbackLoader.init();
}

// إتاحة الـ API عالمياً
window.FallbackLoader = FallbackLoader;
console.log('🛡️ Fallback Loader ready - اكتب FallbackLoader.test() للاختبار');
