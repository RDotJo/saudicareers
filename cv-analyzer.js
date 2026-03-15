// ═══════════════════════════════════════════════════════════════════════════════
// CV Analyzer - ATS Compatible Resume Analysis Engine
// Based on 2025-2026 ATS Best Practices
// ═══════════════════════════════════════════════════════════════════════════════

const CVAnalyzer = {
    // OpenAI API Configuration
    apiKey: null,
    
    // ATS Scoring Weights
    weights: {
        keywordMatch: 0.35,
        formatCompliance: 0.25,
        quantifiableResults: 0.20,
        skillsAlignment: 0.20
    },
    
    // Standard ATS Fonts
    atsFonts: ['Arial', 'Calibri', 'Times New Roman', 'Helvetica', 'Georgia'],
    
    // Power verbs for achievement optimization
    powerVerbs: [
        'أدارت', 'طورت', 'نفذت', 'حققت', 'زادت', 'قللت', 'حسنت',
        'Manage', 'Developed', 'Implemented', 'Achieved', 'Increased', 'Reduced', 'Improved',
        'Led', 'Created', 'Designed', 'Optimized', 'Streamlined', 'Delivered'
    ],
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // Initialize with API Key
    // ═══════════════════════════════════════════════════════════════════════════════
    init(apiKey) {
        this.apiKey = apiKey;
        console.log('✅ CV Analyzer initialized');
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // Main Analysis Function
    // ═══════════════════════════════════════════════════════════════════════════════
    async analyzeCV(cvText, targetJob = null) {
        try {
            // Step 1: Basic ATS Format Check
            const formatScore = this.checkFormatCompliance(cvText);
            
            // Step 2: Extract Keywords from CV
            const cvKeywords = this.extractKeywords(cvText);
            
            // Step 3: If target job provided, calculate keyword match
            let keywordMatchScore = 0;
            let jobKeywords = [];
            let matchedKeywords = [];
            let missingKeywords = [];
            
            if (targetJob) {
                jobKeywords = this.extractKeywords(targetJob.description + ' ' + targetJob.requirements.join(' '));
                const keywordAnalysis = this.analyzeKeywordMatch(cvKeywords, jobKeywords);
                keywordMatchScore = keywordAnalysis.score;
                matchedKeywords = keywordAnalysis.matched;
                missingKeywords = keywordAnalysis.missing;
            }
            
            // Step 4: Check for quantifiable results
            const quantScore = this.checkQuantifiableResults(cvText);
            
            // Step 5: Skills analysis
            const skillsAnalysis = this.analyzeSkills(cvText, targetJob);
            
            // Step 6: Call OpenAI for detailed analysis
            const aiAnalysis = await this.getAIAnalysis(cvText, targetJob);
            
            // Calculate overall ATS Score
            const atsScore = Math.round(
                (keywordMatchScore * this.weights.keywordMatch) +
                (formatScore * this.weights.formatCompliance) +
                (quantScore * this.weights.quantifiableResults) +
                (skillsAnalysis.score * this.weights.skillsAlignment)
            );
            
            return {
                success: true,
                atsScore: atsScore,
                breakdown: {
                    keywordMatch: Math.round(keywordMatchScore),
                    formatCompliance: Math.round(formatScore),
                    quantifiableResults: Math.round(quantScore),
                    skillsAlignment: Math.round(skillsAnalysis.score)
                },
                analysis: {
                    strengths: aiAnalysis.strengths,
                    weaknesses: aiAnalysis.weaknesses,
                    suggestions: aiAnalysis.suggestions,
                    keywordOptimization: {
                        matched: matchedKeywords.slice(0, 10),
                        missing: missingKeywords.slice(0, 10),
                        recommendations: this.generateKeywordRecommendations(missingKeywords)
                    }
                },
                matchedJobs: targetJob ? [targetJob] : this.findMatchingJobs(cvKeywords),
                improvedVersion: aiAnalysis.improvedVersion
            };
            
        } catch (error) {
            console.error('CV Analysis Error:', error);
            return {
                success: false,
                error: error.message,
                atsScore: 0
            };
        }
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // Format Compliance Check
    // ═══════════════════════════════════════════════════════════════════════════════
    checkFormatCompliance(cvText) {
        let score = 100;
        const issues = [];
        
        // Check for tables (ATS can't read tables well)
        if (/\|.*\|.*\|/.test(cvText) || /\+[-+]+\+/.test(cvText)) {
            score -= 15;
            issues.push('Contains tables that ATS may not parse correctly');
        }
        
        // Check for images/graphics indicators
        if (/\[صورة\]|\[image\]|📷|🖼️/.test(cvText)) {
            score -= 10;
            issues.push('Contains image references');
        }
        
        // Check for headers/footers indicators
        if (cvText.includes('---') && cvText.indexOf('---') < cvText.length / 4) {
            score -= 5;
            issues.push('Possible header/footer content detected');
        }
        
        // Check for multiple columns (simplified check)
        const lines = cvText.split('\n');
        const shortLines = lines.filter(line => line.length > 5 && line.length < 30);
        if (shortLines.length > lines.length * 0.4) {
            score -= 10;
            issues.push('May have multi-column layout');
        }
        
        // Check for standard section headers
        const standardSections = ['experience', 'education', 'skills', 'summary', 'objective', 'خبرات', 'تعليم', 'مهارات'];
        const hasStandardSections = standardSections.some(section => 
            cvText.toLowerCase().includes(section.toLowerCase())
        );
        
        if (!hasStandardSections) {
            score -= 10;
            issues.push('Missing standard section headers');
        }
        
        return Math.max(0, score);
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // Keyword Extraction
    // ═══════════════════════════════════════════════════════════════════════════════
    extractKeywords(text) {
        // Clean and normalize text
        const cleanText = text.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .replace(/\s+/g, ' ');
        
        // Common technical and soft skills to look for
        const skillKeywords = [
            // Technical Skills
            'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node', 'sql', 
            'nosql', 'mongodb', 'aws', 'azure', 'docker', 'kubernetes', 'git', 'ci/cd',
            'machine learning', 'ai', 'data analysis', 'cloud', 'devops', 'agile', 'scrum',
            'project management', 'pmp', 'itil', 'cobit', 'risk management', 'compliance',
            'cybersecurity', 'network security', 'penetration testing', 'incident response',
            ' governance', 'frameworks', 'auditing', 'assessment', 'consulting',
            'python', 'r', 'tableau', 'power bi', 'excel', 'sap', 'oracle', 'salesforce',
            'html', 'css', 'php', 'laravel', 'django', 'flask', 'spring', 'microservices',
            'rest api', 'graphql', 'websocket', 'redis', 'elasticsearch', 'kafka',
            
            // Soft Skills
            'leadership', 'communication', 'teamwork', 'problem solving', 'analytical',
            'time management', 'negotiation', 'presentation', 'strategic planning',
            'decision making', 'critical thinking', 'creativity', 'adaptability',
            'collaboration', 'mentoring', 'coaching', 'stakeholder management',
            
            // Arabic Skills
            'إدارة', 'تحليل', 'تطوير', 'برمجة', 'أمن سيبراني', 'حوكمة', 'مخاطر',
            'مشروع', 'فريق', 'قيادة', 'تواصل', 'استراتيجية', 'تخطيط', 'تدقيق'
        ];
        
        const foundKeywords = [];
        skillKeywords.forEach(keyword => {
            if (cleanText.includes(keyword.toLowerCase())) {
                foundKeywords.push(keyword);
            }
        });
        
        // Extract bigrams (2-word phrases)
        const words = cleanText.split(' ');
        for (let i = 0; i < words.length - 1; i++) {
            const bigram = words[i] + ' ' + words[i + 1];
            if (bigram.length > 5 && !foundKeywords.includes(bigram)) {
                // Check if it's a meaningful phrase
                if (this.isMeaningfulPhrase(bigram)) {
                    foundKeywords.push(bigram);
                }
            }
        }
        
        return [...new Set(foundKeywords)];
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // Check if phrase is meaningful
    // ═══════════════════════════════════════════════════════════════════════════════
    isMeaningfulPhrase(phrase) {
        const meaningfulPatterns = [
            /management/i, /development/i, /analysis/i, /engineering/i,
            /security/i, /administration/i, /consulting/i, /architecture/i,
            /optimization/i, /automation/i, /integration/i, /migration/i,
            /إدارة/i, /تطوير/i, /تحليل/i, /هندسة/i, /أمن/i
        ];
        
        return meaningfulPatterns.some(pattern => pattern.test(phrase));
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // Keyword Match Analysis
    // ═══════════════════════════════════════════════════════════════════════════════
    analyzeKeywordMatch(cvKeywords, jobKeywords) {
        const matched = [];
        const missing = [];
        
        jobKeywords.forEach(jobKeyword => {
            const isMatched = cvKeywords.some(cvKeyword => 
                cvKeyword.toLowerCase().includes(jobKeyword.toLowerCase()) ||
                jobKeyword.toLowerCase().includes(cvKeyword.toLowerCase())
            );
            
            if (isMatched) {
                matched.push(jobKeyword);
            } else {
                missing.push(jobKeyword);
            }
        });
        
        const score = jobKeywords.length > 0 
            ? (matched.length / jobKeywords.length) * 100 
            : 50;
        
        return {
            score: Math.min(100, score),
            matched: [...new Set(matched)],
            missing: [...new Set(missing)]
        };
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // Check for Quantifiable Results
    // ═══════════════════════════════════════════════════════════════════════════════
    checkQuantifiableResults(cvText) {
        let score = 0;
        const text = cvText.toLowerCase();
        
        // Check for numbers (percentages, amounts, counts)
        const numberPatterns = [
            /\d+%/, // percentages
            /\d+\s*(million|billion|k|thousand)/i, // large numbers
            /\$\d+/, // dollar amounts
            /\d+\s*(users|customers|clients|projects|team members|employees)/i,
            /\d+\s*(years|months)\s*(experience)/i
        ];
        
        numberPatterns.forEach(pattern => {
            if (pattern.test(text)) {
                score += 15;
            }
        });
        
        // Check for power verbs
        this.powerVerbs.forEach(verb => {
            if (text.includes(verb.toLowerCase())) {
                score += 5;
            }
        });
        
        return Math.min(100, score);
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // Skills Analysis
    // ═══════════════════════════════════════════════════════════════════════════════
    analyzeSkills(cvText, targetJob) {
        let score = 50; // Base score
        
        // Check if skills section exists
        const hasSkillsSection = /skills|مهارات|technical skills|core competencies/i.test(cvText);
        if (hasSkillsSection) {
            score += 20;
        }
        
        // Count number of skills mentioned
        const skillCount = (cvText.match(/•|\n-|\*|,/g) || []).length;
        if (skillCount >= 8 && skillCount <= 15) {
            score += 20; // Optimal range
        } else if (skillCount > 15) {
            score += 10; // Too many might be overwhelming
        }
        
        // If target job has specific skills, check alignment
        if (targetJob && targetJob.requirements) {
            const reqText = targetJob.requirements.join(' ').toLowerCase();
            const cvLower = cvText.toLowerCase();
            
            let matchCount = 0;
            targetJob.requirements.forEach(req => {
                if (cvLower.includes(req.toLowerCase())) {
                    matchCount++;
                }
            });
            
            const matchRatio = targetJob.requirements.length > 0 
                ? matchCount / targetJob.requirements.length 
                : 0;
            score += matchRatio * 30;
        }
        
        return {
            score: Math.min(100, Math.round(score)),
            skillCount: skillCount
        };
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // OpenAI Analysis
    // ═══════════════════════════════════════════════════════════════════════════════
    async getAIAnalysis(cvText, targetJob) {
        // If no API key, return mock analysis
        if (!this.apiKey) {
            return this.getMockAnalysis(cvText, targetJob);
        }
        
        try {
            const prompt = this.buildAnalysisPrompt(cvText, targetJob);
            
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [
                        {
                            role: 'system',
                            content: `You are an expert ATS (Applicant Tracking System) consultant and professional resume writer. 
                            Analyze CVs and provide detailed feedback in Arabic.
                            Focus on: 1) ATS compatibility, 2) Keyword optimization, 3) Quantifiable achievements, 4) Professional formatting.`
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 1500
                })
            });
            
            if (!response.ok) {
                throw new Error('OpenAI API error');
            }
            
            const data = await response.json();
            const content = data.choices[0].message.content;
            
            // Parse AI response
            return this.parseAIResponse(content);
            
        } catch (error) {
            console.error('OpenAI Analysis Error:', error);
            return this.getMockAnalysis(cvText, targetJob);
        }
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // Build Analysis Prompt
    // ═══════════════════════════════════════════════════════════════════════════════
    buildAnalysisPrompt(cvText, targetJob) {
        let prompt = `قم بتحليل السيرة الذاتية التالية وتقديم تقييم شامل:

=== السيرة الذاتية ===
${cvText.substring(0, 3000)}

`;
        
        if (targetJob) {
            prompt += `
=== الوظيفة المستهدفة ===
العنوان: ${targetJob.title}
الشركة: ${targetJob.company}
الوصف: ${targetJob.description}
المتطلبات: ${targetJob.requirements.join(', ')}

`;
        }
        
        prompt += `
قدم التحليل بالتنسيق التالي:

نقاط القوة:
- [نقطة 1]
- [نقطة 2]
- [نقطة 3]

نقاط الضعف:
- [نقطة 1]
- [نقطة 2]
- [نقطة 3]

اقتراحات التحسين:
- [اقتراح 1]
- [اقتراح 2]
- [اقتراح 3]

النسخة المحسنة (اكتب نسخة محسنة من الملخص المهني):
[النسخة المحسنة]

رد بالعربية فقط.
`;
        
        return prompt;
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // Parse AI Response
    // ═══════════════════════════════════════════════════════════════════════════════
    parseAIResponse(content) {
        const lines = content.split('\n');
        const strengths = [];
        const weaknesses = [];
        const suggestions = [];
        let improvedVersion = '';
        let currentSection = null;
        
        lines.forEach(line => {
            const trimmed = line.trim();
            
            if (trimmed.includes('نقاط القوة') || trimmed.includes('Strengths')) {
                currentSection = 'strengths';
            } else if (trimmed.includes('نقاط الضعف') || trimmed.includes('Weaknesses')) {
                currentSection = 'weaknesses';
            } else if (trimmed.includes('اقتراحات') || trimmed.includes('Suggestions')) {
                currentSection = 'suggestions';
            } else if (trimmed.includes('النسخة المحسنة') || trimmed.includes('Improved')) {
                currentSection = 'improved';
            } else if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
                const item = trimmed.substring(2).trim();
                if (item && currentSection) {
                    if (currentSection === 'strengths') strengths.push(item);
                    else if (currentSection === 'weaknesses') weaknesses.push(item);
                    else if (currentSection === 'suggestions') suggestions.push(item);
                }
            } else if (currentSection === 'improved' && trimmed.length > 10) {
                improvedVersion += trimmed + ' ';
            }
        });
        
        return {
            strengths: strengths.length > 0 ? strengths : ['خبرة مهنية متنوعة', 'مهارات تقنية قوية'],
            weaknesses: weaknesses.length > 0 ? weaknesses : ['يحتاج لتوضيح الإنجازات الكمية', 'يمكن إضافة المزيد من الكلمات المفتاحية'],
            suggestions: suggestions.length > 0 ? suggestions : ['استخدم أفعال قوية', 'أضف أرقام ونسب مئوية', 'خصص السيرة للوظيفة المستهدفة'],
            improvedVersion: improvedVersion.trim() || 'ملخص مهني محترف مع خبرة واسعة في المجال...'
        };
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // Mock Analysis (Fallback)
    // ═══════════════════════════════════════════════════════════════════════════════
    getMockAnalysis(cvText, targetJob) {
        const text = cvText.toLowerCase();
        const strengths = [];
        const weaknesses = [];
        
        // Check for common strengths
        if (/\d+%|\d+ سنة|\d+ years/.test(text)) {
            strengths.push('استخدام كمي للإنجازات مع أرقام ونسب مئوية');
        }
        if (text.length > 1000) {
            strengths.push('محتوى شاملة وتفاصيل كافية');
        }
        if (/إدارة|management|قيادة|leadership/.test(text)) {
            strengths.push('خبرة في الإدارة والقيادة');
        }
        
        // Check for common weaknesses
        if (!/\d+%/.test(text)) {
            weaknesses.push('نقص الأرقام والإنجازات الكمية - أضف نسب مئوية وأرقام');
        }
        if (text.length < 500) {
            weaknesses.push('السيرة قصيرة جداً - أضف المزيد من التفاصيل');
        }
        if (!/skills|مهارات/i.test(text)) {
            weaknesses.push('لا يوجد قسم مهارات واضح');
        }
        
        return {
            strengths: strengths.length > 0 ? strengths : ['خبرة مهنية متنوعة'],
            weaknesses: weaknesses.length > 0 ? weaknesses : ['يمكن تحسين التنسيق', 'أضف المزيد من الكلمات المفتاحية'],
            suggestions: [
                'استخدم أفعال قوية في بداية كل نقطة (حققت، طورت، أدارت)',
                'أضف قسم "الملخص المهني" في الأعلى',
                'خصص السيرة الذاتية لكل وظيفة تتقدم لها',
                'تأكد من تنسيق الملف بصيغة PDF نصي (ليس صورة)',
                'استخدم خطوط ATS-friendly: Arial, Calibri, Times New Roman'
            ],
            improvedVersion: 'محترف ذو خبرة واسعة في مجال ' + (targetJob ? targetJob.category : 'العمل') + '، يتمتع بسجل حافل من الإنجازات القابلة للقياس. أبحث عن فرصة للمساهمة في نمو الشركة وتحقيق أهدافها الاستراتيجية.'
        };
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // Generate Keyword Recommendations
    // ═══════════════════════════════════════════════════════════════════════════════
    generateKeywordRecommendations(missingKeywords) {
        if (missingKeywords.length === 0) {
            return ['سيرتك الذاتية تحتوي على معظم الكلمات المفتاحية المهمة!'];
        }
        
        return missingKeywords.slice(0, 5).map(keyword => 
            `أضف كلمة "${keyword}" في قسم الخبرات أو المهارات`
        );
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // Find Matching Jobs from Database
    // ═══════════════════════════════════════════════════════════════════════════════
    findMatchingJobs(cvKeywords) {
        if (typeof jobsDatabase === 'undefined') {
            return [];
        }
        
        const matches = jobsDatabase.map(job => {
            const jobText = `${job.title} ${job.description} ${job.requirements.join(' ')}`.toLowerCase();
            let matchCount = 0;
            
            cvKeywords.forEach(keyword => {
                if (jobText.includes(keyword.toLowerCase())) {
                    matchCount++;
                }
            });
            
            return {
                job: job,
                matchScore: matchCount
            };
        });
        
        // Sort by match score and return top 3
        return matches
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, 3)
            .map(m => m.job);
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // Extract Text from PDF (Placeholder - would need PDF.js in production)
    // ═══════════════════════════════════════════════════════════════════════════════
    async extractTextFromPDF(file) {
        // In production, this would use PDF.js or similar library
        // For now, return placeholder
        return `Extracted text from ${file.name} - In production, this would extract actual text from PDF`;
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CVAnalyzer;
}
