// ═══════════════════════════════════════════════════════════════════════════════
// Email Verification Service - OTP System
// ═══════════════════════════════════════════════════════════════════════════════

const EmailVerification = {
    // Pending verifications storage
    PENDING_KEY: 'saudicareers_pending_verifications',
    
    // Initialize
    init() {
        // Check if running in Node.js or browser
        this.isNode = typeof window === 'undefined';
    },
    
    // Generate 6-digit OTP
    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    },
    
    // Store pending verification
    storePendingVerification(email, userData, otp) {
        const pending = this.getPendingVerifications();
        pending[email] = {
            userData: userData,
            otp: otp,
            attempts: 0,
            createdAt: Date.now(),
            expiresAt: Date.now() + (15 * 60 * 1000) // 15 minutes
        };
        localStorage.setItem(this.PENDING_KEY, JSON.stringify(pending));
    },
    
    // Get pending verifications
    getPendingVerifications() {
        const stored = localStorage.getItem(this.PENDING_KEY);
        return stored ? JSON.parse(stored) : {};
    },
    
    // Remove pending verification
    removePendingVerification(email) {
        const pending = this.getPendingVerifications();
        delete pending[email];
        localStorage.setItem(this.PENDING_KEY, JSON.stringify(pending));
    },
    
    // Verify OTP
    verifyOTP(email, enteredOTP) {
        const pending = this.getPendingVerifications();
        const verification = pending[email];
        
        if (!verification) {
            return { success: false, error: 'لا يوجد طلب توثيق نشط. يرجى التسجيل مرة أخرى' };
        }
        
        // Check expiry
        if (Date.now() > verification.expiresAt) {
            this.removePendingVerification(email);
            return { success: false, error: 'انتهت صلاحية الرمز. يرجى التسجيل مرة أخرى' };
        }
        
        // Check attempts
        if (verification.attempts >= 3) {
            this.removePendingVerification(email);
            return { success: false, error: 'تم استنفاد المحاولات. يرجى التسجيل مرة أخرى' };
        }
        
        // Verify OTP
        if (verification.otp !== enteredOTP) {
            verification.attempts++;
            pending[email] = verification;
            localStorage.setItem(this.PENDING_KEY, JSON.stringify(pending));
            return { success: false, error: `رمز التوثيق غير صحيح. المحاولات المتبقية: ${3 - verification.attempts}` };
        }
        
        // Success - return user data
        const userData = verification.userData;
        this.removePendingVerification(email);
        return { success: true, userData: userData };
    },
    
    // Send verification email
    // NOTE: In production, this should be handled by a backend server
    // For demo, we'll simulate sending and log the OTP to console
    async sendVerificationEmail(email, otp, name) {
        // In a real implementation, you would call your backend API here
        // Example: POST /api/send-verification-email
        
        const emailData = {
            to: email,
            subject: 'رمز التوثيق - SaudiCareers',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #10B981, #059669); padding: 30px; text-align: center;">
                        <h1 style="color: white; margin: 0;">SaudiCareers 🇸🇦</h1>
                    </div>
                    <div style="padding: 30px; background: #f9fafb;">
                        <h2 style="color: #1f2937;">مرحباً ${name}! 👋</h2>
                        <p style="color: #4b5563; font-size: 16px;">
                            شكراً لتسجيلك في SaudiCareers. لإكمال عملية التسجيل، يرجى استخدام رمز التوثيق التالي:
                        </p>
                        
                        <div style="background: white; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; border: 2px dashed #10B981;">
                            <span style="font-size: 32px; font-weight: bold; color: #10B981; letter-spacing: 8px;">${otp}</span>
                        </div>
                        
                        <p style="color: #6b7280; font-size: 14px;">
                            ⏰ الرمز صالح لمدة 15 دقيقة فقط
                        </p>
                        
                        <p style="color: #9ca3af; font-size: 12px; margin-top: 30px;">
                            إذا لم تطلب هذا التسجيل، يمكنك تجاهل هذا الإيميل.
                        </p>
                    </div>
                    <div style="background: #1f2937; padding: 20px; text-align: center;">
                        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                            © 2026 SaudiCareers. جميع الحقوق محفوظة.
                        </p>
                    </div>
                </div>
            `,
            text: `مرحباً ${name}!\n\nرمز التوثيق الخاص بك: ${otp}\n\nالرمز صالح لمدة 15 دقيقة.\n\nSaudiCareers 🇸🇦`
        };
        
        // For demo purposes - log to console
        console.log('📧 VERIFICATION EMAIL (SIMULATED):');
        console.log('=====================================');
        console.log('To:', email);
        console.log('Subject:', emailData.subject);
        console.log('OTP:', otp);
        console.log('=====================================');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In production, replace with actual API call:
        // return await fetch('/api/send-verification-email', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, otp, name })
        // });
        
        return { success: true, message: 'Email sent (simulated)' };
    },
    
    // Resend OTP
    async resendOTP(email) {
        const pending = this.getPendingVerifications();
        const verification = pending[email];
        
        if (!verification) {
            return { success: false, error: 'لا يوجد طلب توثيق نشط' };
        }
        
        // Generate new OTP
        const newOTP = this.generateOTP();
        verification.otp = newOTP;
        verification.attempts = 0;
        verification.createdAt = Date.now();
        verification.expiresAt = Date.now() + (15 * 60 * 1000);
        
        pending[email] = verification;
        localStorage.setItem(this.PENDING_KEY, JSON.stringify(pending));
        
        // Send new email
        await this.sendVerificationEmail(email, newOTP, verification.userData.name);
        
        return { success: true, message: 'تم إرسال رمز جديد' };
    }
};

// Initialize
EmailVerification.init();
