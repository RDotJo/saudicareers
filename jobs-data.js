// ═══════════════════════════════════════════════════════════════════════════════
// SaudiCareers - Job Database (700 Jobs)
// ═══════════════════════════════════════════════════════════════════════════════

const JOBS_DATABASE = [
    // ═══════════════════════════════════════════════════════════════════════════════
    // GOVERNMENT SECTOR - الوزارات والجهات الحكومية
    // ═══════════════════════════════════════════════════════════════════════════════
    {
        id: 1,
        title: "مدير مشروع",
        company: "وزارة المالية",
        location: "الرياض",
        type: "حكومي",
        category: "إدارة",
        experience: "5-8 سنوات",
        salary: "18000-25000 ريال",
        description: "إدارة مشاريع التحول الرقمي في الوزارة",
        requirements: ["خبرة في إدارة المشاريع", "شهادة PMP", "إجادة اللغة الإنجليزية"],
        posted: "2026-03-10",
        deadline: "2026-04-10",
        gender: "الكل",
        applyLink: "https://jobs.mof.gov.sa"
    },
    {
        id: 2,
        title: "محلل مالي",
        company: "وزارة الاقتصاد والتخطيط",
        location: "الرياض",
        type: "حكومي",
        category: "مالية",
        experience: "2-4 سنوات",
        salary: "12000-18000 ريال",
        description: "تحليل البيانات المالية وإعداد التقارير",
        requirements: ["بكالوريوس محاسبة أو مالية", "خبرة في Excel", "تحليل البيانات"],
        posted: "2026-03-12",
        deadline: "2026-04-12",
        gender: "الكل",
        applyLink: "https://jobs.mep.gov.sa"
    },
    {
        id: 3,
        title: "مهندس برمجيات",
        company: "وزارة الاتصالات",
        location: "الرياض",
        type: "حكومي",
        category: "تقنية",
        experience: "3-5 سنوات",
        salary: "15000-22000 ريال",
        description: "تطوير أنظمة حكومية إلكترونية",
        requirements: ["خبرة في JavaScript", "React أو Angular", "Node.js"],
        posted: "2026-03-08",
        deadline: "2026-04-08",
        gender: "الكل",
        applyLink: "https://jobs.mcit.gov.sa"
    },
    {
        id: 4,
        title: "أخصائي موارد بشرية",
        company: "وزارة الموارد البشرية",
        location: "الرياض",
        type: "حكومي",
        category: "موارد بشرية",
        experience: "2-5 سنوات",
        salary: "10000-15000 ريال",
        description: "إدارة شؤون الموظفين وإعداد السياسات",
        requirements: ["بكالوريوس موارد بشرية", "خبرة في SAP", "مهارات تواصل"],
        posted: "2026-03-14",
        deadline: "2026-04-14",
        gender: "الكل",
        applyLink: "https://jobs.hrsd.gov.sa"
    },
    {
        id: 5,
        title: "مستشار قانوني",
        company: "وزارة العدل",
        location: "الرياض",
        type: "حكومي",
        category: "قانونية",
        experience: "5-10 سنوات",
        salary: "20000-30000 ريال",
        description: "المراجعة القانونية وصياغة العقود",
        requirements: ["بكالوريوس قانون", "رخصة مزاولة", "خبرة في القضايا المدنية"],
        posted: "2026-03-11",
        deadline: "2026-04-11",
        gender: "الكل",
        applyLink: "https://jobs.moj.gov.sa"
    },
    {
        id: 6,
        title: "مهندس مدني",
        company: "وزارة الشؤون البلدية",
        location: "جدة",
        type: "حكومي",
        category: "هندسة",
        experience: "4-7 سنوات",
        salary: "15000-22000 ريال",
        description: "إشراف على المشاريع البلدية والبنية التحتية",
        requirements: ["بكالوريوس هندسة مدنية", "رخصة هندسية", "خبرة في المشاريع الكبرى"],
        posted: "2026-03-09",
        deadline: "2026-04-09",
        gender: "الكل",
        applyLink: "https://jobs.momra.gov.sa"
    },
    {
        id: 7,
        title: "أخصائي تسويق رقمي",
        company: "وزارة السياحة",
        location: "الرياض",
        type: "حكومي",
        category: "تسويق",
        experience: "2-4 سنوات",
        salary: "12000-18000 ريال",
        description: "إدارة الحملات التسويقية للوجهات السياحية",
        requirements: ["خبرة في Social Media", "Google Ads", "تحليلات البيانات"],
        posted: "2026-03-13",
        deadline: "2026-04-13",
        gender: "الكل",
        applyLink: "https://jobs.mot.gov.sa"
    },
    {
        id: 8,
        title: "محاسب",
        company: "وزارة التعليم",
        location: "مكة المكرمة",
        type: "حكومي",
        category: "محاسبة",
        experience: "1-3 سنوات",
        salary: "8000-12000 ريال",
        description: "إدارة الحسابات والميزانيات المدرسية",
        requirements: ["بكالوريوس محاسبة", "خبرة في البرامج المحاسبية", "دقة عالية"],
        posted: "2026-03-14",
        deadline: "2026-04-14",
        gender: "الكل",
        applyLink: "https://jobs.moe.gov.sa"
    },
    {
        id: 9,
        title: "مدير إداري",
        company: "الديوان الملكي",
        location: "الرياض",
        type: "حكومي",
        category: "إدارة",
        experience: "8-12 سنوات",
        salary: "25000-35000 ريال",
        description: "الإشراف على العمليات الإدارية والتنسيق",
        requirements: ["خبرة إدارية واسعة", "مهارات قيادية", "إجادة الإنجليزية"],
        posted: "2026-03-07",
        deadline: "2026-04-07",
        gender: "الكل",
        applyLink: "https://jobs.royalcourt.gov.sa"
    },
    {
        id: 10,
        title: "مترجم",
        company: "وزارة الخارجية",
        location: "الرياض",
        type: "حكومي",
        category: "ترجمة",
        experience: "3-6 سنوات",
        salary: "12000-18000 ريال",
        description: "الترجمة الفورية والتحريرية للوثائق الرسمية",
        requirements: ["إجادة اللغتين العربية والإنجليزية", "شهادة في الترجمة", "سرعة في الكتابة"],
        posted: "2026-03-10",
        deadline: "2026-04-10",
        gender: "الكل",
        applyLink: "https://jobs.mofa.gov.sa"
    },

    // ═══════════════════════════════════════════════════════════════════════════════
    // ARAMCO - أرامكو السعودية
    // ═══════════════════════════════════════════════════════════════════════════════
    {
        id: 11,
        title: "مهندس بترول",
        company: "أرامكو السعودية",
        location: "الظهران",
        type: "شبه حكومي",
        category: "هندسة",
        experience: "5-10 سنوات",
        salary: "25000-40000 ريال",
        description: "تصميم وإشراف على عمليات الحفر والإنتاج",
        requirements: ["بكالوريوس هندسة بترول", "خبرة في الحقول النفطية", "رخصة مهنية"],
        posted: "2026-03-12",
        deadline: "2026-04-12",
        gender: "الكل",
        applyLink: "https://jobs.aramco.com"
    },
    {
        id: 12,
        title: "مهندس كيميائي",
        company: "أرامكو السعودية",
        location: "الجبيل",
        type: "شبه حكومي",
        category: "هندسة",
        experience: "3-7 سنوات",
        salary: "20000-32000 ريال",
        description: "عمليات التكرير والمعالجة الكيميائية",
        requirements: ["هندسة كيميائية", "خبرة في المصافي", "أمان صناعي"],
        posted: "2026-03-11",
        deadline: "2026-04-11",
        gender: "الكل",
        applyLink: "https://jobs.aramco.com"
    },
    {
        id: 13,
        title: "مهندس كهربائي",
        company: "أرامكو السعودية",
        location: "الظهران",
        type: "شبه حكومي",
        category: "هندسة",
        experience: "4-8 سنوات",
        salary: "18000-28000 ريال",
        description: "صيانة وتحسين الأنظمة الكهربائية",
        requirements: ["هندسة كهربائية", "خبرة في المنشآت الصناعية", "PLC"],
        posted: "2026-03-09",
        deadline: "2026-04-09",
        gender: "الكل",
        applyLink: "https://jobs.aramco.com"
    },
    {
        id: 14,
        title: "فني صيانة",
        company: "أرامكو السعودية",
        location: "الخبر",
        type: "شبه حكومي",
        category: "فنية",
        experience: "2-5 سنوات",
        salary: "10000-15000 ريال",
        description: "صيانة المعدات الثقيلة والآليات",
        requirements: ["دبلوم تقني", "خبرة في المعدات الثقيلة", "رخصة قيادة"],
        posted: "2026-03-13",
        deadline: "2026-04-13",
        gender: "الكل",
        applyLink: "https://jobs.aramco.com"
    },
    {
        id: 15,
        title: "أخصائي أمن سيبراني",
        company: "أرامكو السعودية",
        location: "الظهران",
        type: "شبه حكومي",
        category: "تقنية",
        experience: "4-7 سنوات",
        salary: "22000-35000 ريال",
        description: "حماية البنية التحتية الرقمية والشبكات",
        requirements: ["شهادات CISSP أو CEH", "خبرة في الأمن السيبراني", "تحليل التهديدات"],
        posted: "2026-03-08",
        deadline: "2026-04-08",
        gender: "الكل",
        applyLink: "https://jobs.aramco.com"
    },

    // ═══════════════════════════════════════════════════════════════════════════════
    // SABIC - سابك
    // ═══════════════════════════════════════════════════════════════════════════════
    {
        id: 16,
        title: "مهندس صناعي",
        company: "سابك",
        location: "الجبيل",
        type: "شبه حكومي",
        category: "هندسة",
        experience: "3-6 سنوات",
        salary: "18000-28000 ريال",
        description: "تحسين العمليات الإنتاجية والجودة",
        requirements: ["هندسة صناعية", "Six Sigma", "تحسين العمليات"],
        posted: "2026-03-10",
        deadline: "2026-04-10",
        gender: "الكل",
        applyLink: "https://jobs.sabic.com"
    },
    {
        id: 17,
        title: "كيميائي",
        company: "سابك",
        location: "ينبع",
        type: "شبه حكومي",
        category: "علوم",
        experience: "2-5 سنوات",
        salary: "15000-22000 ريال",
        description: "التحكم في جودة المنتجات الكيميائية",
        requirements: ["بكالوريوس كيمياء", "خبرة مختبرية", "تحليل نتائج"],
        posted: "2026-03-11",
        deadline: "2026-04-11",
        gender: "الكل",
        applyLink: "https://jobs.sabic.com"
    },
    {
        id: 18,
        title: "مهندس ميكانيكي",
        company: "سابك",
        location: "الجبيل",
        type: "شبه حكومي",
        category: "هندسة",
        experience: "4-8 سنوات",
        salary: "16000-25000 ريال",
        description: "صيانة المعدات الميكانيكية والتوربينات",
        requirements: ["هندسة ميكانيكية", "خبرة في المصانع", "CAD"],
        posted: "2026-03-12",
        deadline: "2026-04-12",
        gender: "الكل",
        applyLink: "https://jobs.sabic.com"
    },

    // ═══════════════════════════════════════════════════════════════════════════════
    // NEOM - نيوم
    // ═══════════════════════════════════════════════════════════════════════════════
    {
        id: 19,
        title: "مدير مشروع البنية التحتية",
        company: "نيوم",
        location: "تبوك",
        type: "مشروع رؤية 2030",
        category: "إدارة",
        experience: "10-15 سنوات",
        salary: "35000-50000 ريال",
        description: "إدارة مشاريع البنية التحتية الضخمة في نيوم",
        requirements: ["خبرة واسعة في المشاريع الكبرى", "PMP", "إدارة فرق متعددة"],
        posted: "2026-03-08",
        deadline: "2026-04-08",
        gender: "الكل",
        applyLink: "https://jobs.neom.com"
    },
    {
        id: 20,
        title: "مهندس مدني",
        company: "نيوم",
        location: "تبوك",
        type: "مشروع رؤية 2030",
        category: "هندسة",
        experience: "5-10 سنوات",
        salary: "20000-35000 ريال",
        description: "تصميم وإشراف على المشاريع الإنشائية",
        requirements: ["هندسة مدنية", "خبرة في المشاريع الضخمة", "BIM"],
        posted: "2026-03-09",
        deadline: "2026-04-09",
        gender: "الكل",
        applyLink: "https://jobs.neom.com"
    },
    {
        id: 21,
        title: "أخصائي استدامة",
        company: "نيوم",
        location: "تبوك",
        type: "مشروع رؤية 2030",
        category: "بيئة",
        experience: "4-7 سنوات",
        salary: "18000-28000 ريال",
        description: "تطوير حلول مستدامة وصديقة للبيئة",
        requirements: ["علوم بيئية", "طاقة متجددة", "تقييم الأثر البيئي"],
        posted: "2026-03-10",
        deadline: "2026-04-10",
        gender: "الكل",
        applyLink: "https://jobs.neom.com"
    },
    {
        id: 22,
        title: "مصمم معماري",
        company: "نيوم",
        location: "تبوك",
        type: "مشروع رؤية 2030",
        category: "تصميم",
        experience: "5-8 سنوات",
        salary: "22000-35000 ريال",
        description: "التصميم المعماري للمباني المستقبلية",
        requirements: ["هندسة معمارية", "Revit", "تصميم مستدام"],
        posted: "2026-03-11",
        deadline: "2026-04-11",
        gender: "الكل",
        applyLink: "https://jobs.neom.com"
    },

    // ═══════════════════════════════════════════════════════════════════════════════
    // RED SEA PROJECT - مشروع البحر الأحمر
    // ═══════════════════════════════════════════════════════════════════════════════
    {
        id: 23,
        title: "مدير منتجع",
        company: "مشروع البحر الأحمر",
        location: "أملج",
        type: "مشروع رؤية 2030",
        category: "ضيافة",
        experience: "8-12 سنوات",
        salary: "25000-40000 ريال",
        description: "إدارة منتجع فاخر على البحر الأحمر",
        requirements: ["خبرة في الفنادق الفاخرة", "إدارة الضيافة", "لغات متعددة"],
        posted: "2026-03-12",
        deadline: "2026-04-12",
        gender: "الكل",
        applyLink: "https://jobs.redsea.com"
    },
    {
        id: 24,
        title: "أخصائي حياة برية",
        company: "مشروع البحر الأحمر",
        location: "أملج",
        type: "مشروع رؤية 2030",
        category: "بيئة",
        experience: "3-6 سنوات",
        salary: "15000-22000 ريال",
        description: "حماية وحفظ الحياة البرية والبحرية",
        requirements: ["علوم بيولوجية", "حياة برية", "غوص"],
        posted: "2026-03-13",
        deadline: "2026-04-13",
        gender: "الكل",
        applyLink: "https://jobs.redsea.com"
    },
    {
        id: 25,
        title: "طيار طائرات بدون طيار",
        company: "مشروع البحر الأحمر",
        location: "أملج",
        type: "مشروع رؤية 2030",
        category: "تقنية",
        experience: "2-4 سنوات",
        salary: "12000-18000 ريال",
        description: "تشغيل طائرات الدرون للمسح والتصوير",
        requirements: ["رخصة طيار درون", "تصوير جوي", "خرائط"],
        posted: "2026-03-14",
        deadline: "2026-04-14",
        gender: "الكل",
        applyLink: "https://jobs.redsea.com"
    },

    // ═══════════════════════════════════════════════════════════════════════════════
    // QIDDYA - القدية
    // ═══════════════════════════════════════════════════════════════════════════════
    {
        id: 26,
        title: "مدير ترفيه",
        company: "القدية",
        location: "الرياض",
        type: "مشروع رؤية 2030",
        category: "ترفيه",
        experience: "6-10 سنوات",
        salary: "20000-35000 ريال",
        description: "إدارة مرافق الترفيه والفعاليات",
        requirements: ["خبرة في صناعة الترفيه", "إدارة الفعاليات", "تسويق"],
        posted: "2026-03-08",
        deadline: "2026-04-08",
        gender: "الكل",
        applyLink: "https://jobs.qiddya.com"
    },
    {
        id: 27,
        title: "مهندس ألعاب",
        company: "القدية",
        location: "الرياض",
        type: "مشروع رؤية 2030",
        category: "هندسة",
        experience: "4-8 سنوات",
        salary: "18000-28000 ريال",
        description: "تصميم وصيانة ألعاب الملاهي",
        requirements: ["هندسة ميكانيكية", "أمان الألعاب", "صيانة"],
        posted: "2026-03-09",
        deadline: "2026-04-09",
        gender: "الكل",
        applyLink: "https://jobs.qiddya.com"
    },

    // ═══════════════════════════════════════════════════════════════════════════════
    // STC - الاتصالات السعودية
    // ═══════════════════════════════════════════════════════════════════════════════
    {
        id: 28,
        title: "مهندس شبكات",
        company: "STC",
        location: "الرياض",
        type: "قطاع خاص",
        category: "تقنية",
        experience: "3-6 سنوات",
        salary: "15000-25000 ريال",
        description: "تصميم وصيانة شبكات الاتصالات",
        requirements: ["هندسة اتصالات", "CCNA", "شبكات 5G"],
        posted: "2026-03-10",
        deadline: "2026-04-10",
        gender: "الكل",
        applyLink: "https://jobs.stc.com.sa"
    },
    {
        id: 29,
        title: "مطور تطبيقات",
        company: "STC",
        location: "الرياض",
        type: "قطاع خاص",
        category: "تقنية",
        experience: "2-5 سنوات",
        salary: "14000-22000 ريال",
        description: "تطوير تطبيقات الجوال والويب",
        requirements: ["React Native", "iOS/Android", "APIs"],
        posted: "2026-03-11",
        deadline: "2026-04-11",
        gender: "الكل",
        applyLink: "https://jobs.stc.com.sa"
    },
    {
        id: 30,
        title: "أخصائي تحليل البيانات",
        company: "STC",
        location: "جدة",
        type: "قطاع خاص",
        category: "تقنية",
        experience: "3-5 سنوات",
        salary: "16000-24000 ريال",
        description: "تحليل بيانات العملاء وتطوير نماذج التنبؤ",
        requirements: ["Python", "Machine Learning", "SQL"],
        posted: "2026-03-12",
        deadline: "2026-04-12",
        gender: "الكل",
        applyLink: "https://jobs.stc.com.sa"
    },

    // ═══════════════════════════════════════════════════════════════════════════════
    // MAADEN - معادن
    // ═══════════════════════════════════════════════════════════════════════════════
    {
        id: 31,
        title: "مهندس تعدين",
        company: "معادن",
        location: "الطائف",
        type: "شبه حكومي",
        category: "هندسة",
        experience: "5-10 سنوات",
        salary: "20000-32000 ريال",
        description: "الإشراف على عمليات التعدين والاستكشاف",
        requirements: ["هندسة تعدين", "خريطة جيولوجية", "أمان مناجم"],
        posted: "2026-03-08",
        deadline: "2026-04-08",
        gender: "الكل",
        applyLink: "https://jobs.maaden.com.sa"
    },
    {
        id: 32,
        title: "جيولوجي",
        company: "معادن",
        location: "الطائف",
        type: "شبه حكومي",
        category: "علوم",
        experience: "4-8 سنوات",
        salary: "18000-28000 ريال",
        description: "استكشاف الموارد المعدنية والتقييم",
        requirements: ["جيولوجيا", "خريطة جيولوجية", "نمذجة ثلاثية الأبعاد"],
        posted: "2026-03-09",
        deadline: "2026-04-09",
        gender: "الكل",
        applyLink: "https://jobs.maaden.com.sa"
    },

    // ═══════════════════════════════════════════════════════════════════════════════
    // Saudi Airlines - الخطوط السعودية
    // ═══════════════════════════════════════════════════════════════════════════════
    {
        id: 33,
        title: "طيار",
        company: "الخطوط السعودية",
        location: "جدة",
        type: "شبه حكومي",
        category: "طيران",
        experience: "5-15 سنوات",
        salary: "30000-50000 ريال",
        description: "قيادة رحلات الخطوط السعودية",
        requirements: ["رخصة طيار تجاري", "ATP", "IELTS 5.5"],
        posted: "2026-03-10",
        deadline: "2026-04-10",
        gender: "الكل",
        applyLink: "https://jobs.saudia.com"
    },
    {
        id: 34,
        title: "مضيف جوي",
        company: "الخطوط السعودية",
        location: "جدة",
        type: "شبه حكومي",
        category: "ضيافة",
        experience: "0-3 سنوات",
        salary: "8000-15000 ريال",
        description: "خدمة الركاب على متن الرحلات",
        requirements: ["الثانوية فأعلى", "إجادة الإنجليزية", "مظهر لائق"],
        posted: "2026-03-11",
        deadline: "2026-04-11",
        gender: "الكل",
        applyLink: "https://jobs.saudia.com"
    },
    {
        id: 35,
        title: "مهندس صيانة طائرات",
        company: "الخطوط السعودية",
        location: "جدة",
        type: "شبه حكومي",
        category: "هندسة",
        experience: "4-8 سنوات",
        salary: "18000-28000 ريال",
        description: "صيانة الطائرات والمحركات",
        requirements: ["هندسة ميكانيكية", "رخصة EASA أو FAA", "خبرة في Boeing/Airbus"],
        posted: "2026-03-12",
        deadline: "2026-04-12",
        gender: "الكل",
        applyLink: "https://jobs.saudia.com"
    },

    // ═══════════════════════════════════════════════════════════════════════════════
    // More Government Jobs - وظائف حكومية إضافية
    // ═══════════════════════════════════════════════════════════════════════════════
    {
        id: 36,
        title: "طبيب استشاري",
        company: "وزارة الصحة",
        location: "الرياض",
        type: "حكومي",
        category: "صحية",
        experience: "8-15 سنوات",
        salary: "25000-45000 ريال",
        description: "طبيب استشاري في مستشفى حكومي",
        requirements: ["بكالوريوس طب", "الزمالة", "ترخيص الهيئة"],
        posted: "2026-03-13",
        deadline: "2026-04-13",
        gender: "الكل",
        applyLink: "https://jobs.moh.gov.sa"
    },
    {
        id: 37,
        title: "ممرض",
        company: "وزارة الصحة",
        location: "مكة المكرمة",
        type: "حكومي",
        category: "صحية",
        experience: "1-3 سنوات",
        salary: "8000-12000 ريال",
        description: "رعاية المرضى في المستشفيات",
        requirements: ["بكالوريوس تمريض", "رخصة مزاولة", "العمل بنوبات"],
        posted: "2026-03-14",
        deadline: "2026-04-14",
        gender: "الكل",
        applyLink: "https://jobs.moh.gov.sa"
    },
    {
        id: 38,
        title: "صيدلي",
        company: "وزارة الصحة",
        location: "الدمام",
        type: "حكومي",
        category: "صحية",
        experience: "2-5 سنوات",
        salary: "12000-18000 ريال",
        description: "صرف الأدوية والاستشارات الدوائية",
        requirements: ["بكالوريوس صيدلة", "رخصة هيئة", "إجادة الإنجليزية"],
        posted: "2026-03-10",
        deadline: "2026-04-10",
        gender: "الكل",
        applyLink: "https://jobs.moh.gov.sa"
    },
    {
        id: 39,
        title: "أخصائي علاج طبيعي",
        company: "وزارة الصحة",
        location: "المدينة المنورة",
        type: "حكومي",
        category: "صحية",
        experience: "2-4 سنوات",
        salary: "10000-15000 ريال",
        description: "إعادة التأهيل والعلاج الطبيعي",
        requirements: ["بكالوريوس علاج طبيعي", "رخصة", "صبر وتفاني"],
        posted: "2026-03-11",
        deadline: "2026-04-11",
        gender: "الكل",
        applyLink: "https://jobs.moh.gov.sa"
    },

    // Continue with more jobs to reach 200...
    // Adding abbreviated entries for remaining jobs
];

// Generate remaining jobs to reach 200
const companies = [
    { name: "وزارة التعليم", type: "حكومي" },
    { name: "وزارة النقل", type: "حكومي" },
    { name: "وزارة الإسكان", type: "حكومي" },
    { name: "صندوق الاستثمارات", type: "حكومي" },
    { name: "البنك المركزي", type: "حكومي" },
    { name: "مدينة الملك عبدالله", type: "شبه حكومي" },
    { name: "مدينة الملك عبدالعزيز", type: "شبه حكومي" },
    { name: "كهرباء السعودية", type: "شبه حكومي" },
    { name: "المياه الوطنية", type: "شبه حكومي" },
    { name: "أسواق العثيم", type: "قطاع خاص" },
    { name: "جرير", type: "قطاع خاص" },
    { name: "التميمي", type: "قطاع خاص" },
    { name: "الراجحي", type: "قطاع خاص" },
    { name: "الأهلي", type: "قطاع خاص" },
    { name: "سامبا", type: "قطاع خاص" },
    { name: "الرياض", type: "قطاع خاص" },
    { name: "الإنماء", type: "قطاع خاص" },
    { name: "دار الأركان", type: "قطاع خاص" },
    { name: "جرير للتسويق", type: "قطاع خاص" },
    { name: "الخزف السعودي", type: "قطاع خاص" }
];

const jobTitles = [
    "محاسب", "محلل مالي", "مدير مالي", "مراجع داخلي", "مراجع خارجي",
    "مهندس برمجيات", "مطور ويب", "مطور تطبيقات", "مدير تقنية", "أخصائي أمن",
    "مهندس شبكات", "مدير مشروع", "منسق مشروع", "أخصائي جودة", "مدير منتج",
    "أخصائي تسويق", "مدير تسويق", "منسق تسويق", "أخصائي علاقات", "مدير علاقات",
    "موظف استقبال", "سكرتير", "مدير إداري", "منسق إداري", "كاتب",
    "مصمم جرافيك", "مصور", "محرر محتوى", "كاتب محتوى", "مدير محتوى",
    "مدير موارد بشرية", "أخصائي توظيف", "أخصائي تدريب", "محلل بيانات", "باحث",
    "مهندس معماري", "مهندس ديكور", "مصمم داخلي", "مساح", "فني رسم",
    "مدير مبيعات", "مندوب مبيعات", "منسق مبيعات", "مشرف مبيعات", "أخصائي CRM",
    "مدير مستودع", "مشرف مخزون", "منسق لوجستي", "أخصائي مشتريات", "مدير مشتريات",
    "مدير مصنع", "مشرف إنتاج", "فني إنتاج", "مشغل آلة", "فني صيانة",
    "أخصائي سلامة", "مهندس صناعي", "أخصائي جودة", "مفتش جودة", "فني معايرة"
];

const locations = ["الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة", "الطائف", "تبوك", "أبها", "الخبر", "حائل"];
const categories = ["إدارة", "مالية", "تقنية", "هندسة", "تسويق", "موارد بشرية", "صحية", "ضيافة", "تصميم", "فنية", "علوم", "قانونية"];

// Generate jobs 40-700
for (let i = 40; i <= 700; i++) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const title = jobTitles[Math.floor(Math.random() * jobTitles.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const expYears = Math.floor(Math.random() * 10) + 1;
    
    JOBS_DATABASE.push({
        id: i,
        title: title,
        company: company.name,
        location: location,
        type: company.type,
        category: category,
        experience: `${expYears}-${expYears + 3} سنوات`,
        salary: `${(expYears * 2 + 8) * 1000}-${(expYears * 2 + 12) * 1000} ريال`,
        description: `وظيفة ${title} في ${company.name} - فرصة عمل ممتازة`,
        requirements: ["خبرة في المجال", "إجادة اللغة الإنجليزية", "مهارات تواصل"],
        posted: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        deadline: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        gender: "الكل",
        applyLink: "#"
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// Export for use in other files
// ═══════════════════════════════════════════════════════════════════════════════
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JOBS_DATABASE;
}
