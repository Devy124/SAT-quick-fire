
import { QuestionData } from './types';

// ... (Existing Question Data kept for fallback)
export const QUESTIONS: QuestionData = {
  math: {
    easy: [
      { q: "2 + 2 = ?", a: ["3", "4", "5", "6"], correct: 1 },
      { q: "10 - 7 = ?", a: ["1","2","3","4"], correct: 2 },
      { q: "5 × 3 = ?", a: ["15", "10", "20", "12"], correct: 0 },
      { q: "15 ÷ 3 = ?", a: ["4", "5", "6", "7"], correct: 1 },
      { q: "7 + 6 = ?", a: ["12", "13", "14", "15"], correct: 1 },
      { q: "9 - 4 = ?", a: ["5", "4", "6", "3"], correct: 0 },
      { q: "8 × 2 = ?", a: ["14", "16", "18", "20"], correct: 1 },
      { q: "12 ÷ 4 = ?", a: ["2", "3", "4", "5"], correct: 1 },
      { q: "6 + 5 = ?", a: ["10", "11", "12", "13"], correct: 1 },
      { q: "3 × 7 = ?", a: ["20", "21", "19", "18"], correct: 1 },
      { q: "10 + 9 = ?", a: ["18", "19", "20", "21"], correct: 1 },
      { q: "14 - 6 = ?", a: ["7", "8", "9", "10"], correct: 1 },
      { q: "2 × 9 = ?", a: ["17", "18", "19", "16"], correct: 1 },
      { q: "8 ÷ 2 = ?", a: ["2", "3", "4", "5"], correct: 2 },
      { q: "11 + 4 = ?", a: ["14", "15", "16", "17"], correct: 1 },
      { q: "15 - 7 = ?", a: ["7", "8", "9", "10"], correct: 1 },
      { q: "5 × 5 = ?", a: ["20", "25", "30", "35"], correct: 1 },
      { q: "20 ÷ 5 = ?", a: ["3", "4", "5", "6"], correct: 2 },
      { q: "7 + 8 = ?", a: ["14", "15", "16", "17"], correct: 1 },
      { q: "9 × 2 = ?", a: ["16", "18", "20", "19"], correct: 1 }
    ],
    medium: [
      { q: "Solve for x: 2x + 5 = 13", a: ["3", "4", "5", "6"], correct: 1 },
      { q: "If x = 4, what is 3x - 2?", a: ["10", "11", "12", "13"], correct: 2 },
      { q: "Area of rectangle with length 5 and width 7?", a: ["30", "35", "40", "45"], correct: 1 },
      { q: "What is 15% of 200?", a: ["25", "30", "35", "40"], correct: 3 },
      { q: "Solve: 5x - 7 = 18", a: ["4", "5", "6", "7"], correct: 3 },
      { q: "The sum of two consecutive numbers is 19. What are the numbers?", a: ["9 & 10", "8 & 11", "10 & 9", "7 & 12"], correct: 0 },
      { q: "A triangle has base 10 and height 5. What is its area?", a: ["20", "25", "30", "15"], correct: 1 },
      { q: "Solve for y: 3y + 4 = 19", a: ["4", "5", "6", "7"], correct: 1 },
      { q: "What is the perimeter of a square with side 6?", a: ["18", "22", "24", "30"], correct: 2 },
      { q: "If 2x = 10, then x = ?", a: ["4", "5", "6", "8"], correct: 1 },
      { q: "Solve: 7 + 3x = 19", a: ["3", "4", "5", "6"], correct: 2 },
      { q: "A rectangle has length 8 and width 3. Find the area.", a: ["22", "24", "25", "26"], correct: 1 },
      { q: "The product of a number and 6 is 42. Find the number.", a: ["6", "7", "8", "9"], correct: 1 },
      { q: "Solve for x: x/5 = 7", a: ["30", "33", "35", "37"], correct: 2 },
      { q: "What is 40% of 150?", a: ["50", "55", "60", "65"], correct: 2 },
      { q: "A triangle has sides 5, 12, and 13. Is it a right triangle?", a: ["Yes", "No", "Cannot tell", "Maybe"], correct: 0 },
      { q: "If x + 3 = 9, then x = ?", a: ["5", "6", "7", "8"], correct: 1 },
      { q: "Solve: 2x + 7 = 15", a: ["3", "4", "5", "6"], correct: 1 },
      { q: "A rectangle has perimeter 20 and length 6. Find width.", a: ["4", "5", "6", "7"], correct: 0 },
      { q: "If 3x = 18, what is x?", a: ["5", "6", "7", "8"], correct: 1 }
    ],
    hard: [
      { q: "Solve for x: 2x² - 8x + 6 = 0", a: ["1 or 3", "2 or 3", "1 or 2", "2 only"], correct: 0 },
      { q: "If f(x) = 3x + 2, what is f(5)?", a: ["15", "16", "17", "18"], correct: 2 },
      { q: "A triangle has sides 5, 12, 13. What is its area?", a: ["30", "60", "36", "50"], correct: 0 },
      { q: "Solve: 4(x-1)² = 16", a: ["1,5", "2,6", "0,4", "3,7"], correct: 2 },
      { q: "If 2^x = 16, what is x?", a: ["2", "3", "4", "5"], correct: 2 },
      { q: "Simplify: (x²y³)(2xy²)", a: ["2x³y⁵", "2x³y⁶", "2x²y⁵", "2x³y⁴"], correct: 0 },
      { q: "Solve for x: x² - 9x + 20 = 0", a: ["4 or 5", "5 or 4", "4 or 6", "5 or 6"], correct: 3 },
      { q: "If y = 2x + 3 and y = 7, find x.", a: ["1", "2", "3", "4"], correct: 1 },
      { q: "Factor: x² - 16", a: ["(x-4)(x+4)", "(x-8)(x+2)", "(x-2)(x+8)", "(x-1)(x+16)"], correct: 0 },
      { q: "Simplify: (3x²y)(4xy³)", a: ["12x³y⁴", "12x³y³", "7x³y⁴", "12x²y³"], correct: 0 },
      { q: "Solve for x: x² + 6x + 9 = 0", a: ["-3", "3", "±3", "0"], correct: 0 },
      { q: "If f(x) = x² - 2x + 1, find f(3).", a: ["4", "3", "2", "1"], correct: 0 },
      { q: "Simplify: (2x²y⁻¹)(-3xy³)", a: ["-6x³y²", "-6x³y³", "-6x²y²", "-6x²y³"], correct: 0 },
      { q: "Solve for x: x² - 4x - 5 = 0", a: ["5, -1", "1, -5", "5, 1", "-5, -1"], correct: 0 },
      { q: "A right triangle has legs 9 and 12. Find the hypotenuse.", a: ["15", "16", "17", "18"], correct: 0 },
      { q: "Simplify: (x² + 2x + 1)/(x+1)", a: ["x+1", "x+2", "x²+1", "x"], correct: 0 },
      { q: "Solve: 3x² - 12 = 0", a: ["±2", "±√4", "±√3", "±√2"], correct: 0 },
      { q: "Factor: x² + 5x + 6", a: ["(x+2)(x+3)", "(x+1)(x+6)", "(x+3)(x+2)", "(x+6)(x+1)"], correct: 0 },
      { q: "Solve for x: 5x² - 20x = 0", a: ["0,4", "0,5", "4,5", "0, -4"], correct: 0 },
      { q: "If 2x + 3y = 12 and x = 3, find y.", a: ["1", "2", "3", "4"], correct: 1 }
    ]
  },
  english: {
    easy: [
      { q: "Choose the correct word: Their/There going to the store.", a: ["Their", "There", "They're", "The're"], correct: 2 },
      { q: "Select the correct spelling:", a: ["Accomodate", "Accommodate", "Acommodate", "Acomodate"], correct: 1 },
      { q: "Pick the right word: Its/It's raining outside.", a: ["Its", "It's", "Its'", "It is'"], correct: 1 },
      { q: "Choose the correct word: To/Too/Two many people came.", a: ["To", "Too", "Two", "Tooo"], correct: 1 },
      { q: "Select the correct sentence:", a: ["She don't like it.", "She doesn't like it.", "She not likes it.", "She doesn't likes it."], correct: 1 },
      { q: "Choose the best synonym for 'happy':", a: ["Sad", "Joyful", "Angry", "Tired"], correct: 1 },
      { q: "Pick the correct word: Affect/Effect of the storm was severe.", a: ["Affect", "Effect", "Affective", "Affected"], correct: 1 },
      { q: "Select the correct sentence:", a: ["I have went there.", "I have gone there.", "I has gone there.", "I go there."], correct: 1 },
      { q: "Choose the correct word: They're/Their going on vacation.", a: ["They're", "Their", "There", "The're"], correct: 0 },
      { q: "Pick the correct word: He did good/well on the test.", a: ["Good", "Well", "Welled", "Goods"], correct: 1 }
    ],
    medium: [
      { q: "Choose the best word to complete: Despite the rain, the picnic went on ___.", a: ["successfully", "successful", "success", "succession"], correct: 0 },
      { q: "Select the correct word: She was ___ to finish the project on time.", a: ["determined", "determine", "determines", "determination"], correct: 0 },
      { q: "Pick the best synonym for 'ambiguous':", a: ["clear", "vague", "obvious", "evident"], correct: 1 },
      { q: "Choose the correct sentence:", a: ["He is more smarter than his brother.", "He is smarter than his brother.", "He is smart than his brother.", "He is the most smarter than his brother."], correct: 1 },
      { q: "Select the correct word: The committee reached a ___ decision.", a: ["unanimous", "unique", "uniform", "unknown"], correct: 0 },
      { q: "Pick the correct word: Her explanation was ___ convincing.", a: ["very", "much", "too", "so"], correct: 0 },
      { q: "Choose the correct sentence:", a: ["Neither of the answers are correct.", "Neither of the answers is correct.", "Neither of the answers were correct.", "Neither of the answer is correct."], correct: 1 },
      { q: "Select the best synonym for 'meticulous':", a: ["careful", "sloppy", "lazy", "hasty"], correct: 0 },
      { q: "Pick the correct word: The scientist made a ___ discovery.", a: ["groundbreaking", "grounded", "ground", "groundedness"], correct: 0 },
      { q: "Choose the correct sentence:", a: ["He suggested to go early.", "He suggested going early.", "He suggested go early.", "He suggested gone early."], correct: 1 }
    ],
    hard: [
      { q: "Choose the most precise word: The scientist provided a ___ analysis of the data.", a: ["meticulous", "careless", "superficial", "ambiguous"], correct: 0 },
      { q: "Select the correct sentence:", a: ["Had I known about the test, I would have studied.", "If I knew about the test, I would have studied.", "Had I knew about the test, I would have studied.", "If I had knew about the test, I would have studied."], correct: 0 },
      { q: "Pick the best synonym for 'cogent':", a: ["convincing", "weak", "unpersuasive", "trivial"], correct: 0 },
      { q: "Choose the correct sentence:", a: ["No sooner had he arrived than the meeting started.", "No sooner he arrived than the meeting started.", "No sooner had he arrive than the meeting started.", "No sooner had he arriving than the meeting started."], correct: 0 },
      { q: "Select the best antonym for 'ephemeral':", a: ["lasting", "brief", "fleeting", "transient"], correct: 0 },
      { q: "Pick the correct word: The CEO emphasized the ___ necessity of innovation.", a: ["paramount", "minor", "negligible", "secondary"], correct: 0 },
      { q: "Choose the correct sentence:", a: ["Seldom have I witnessed such dedication.", "Seldom I have witnessed such dedication.", "Seldom have I witnessing such dedication.", "Seldom I witnessed such dedication."], correct: 0 },
      { q: "Select the best synonym for 'obfuscate':", a: ["confuse", "clarify", "explain", "illuminate"], correct: 0 },
      { q: "Pick the correct word: His argument was ___ persuasive, convincing the jury.", a: ["highly", "most", "very", "extremely"], correct: 0 },
      { q: "Choose the correct sentence:", a: ["Not only did she excel in math, but also in science.", "Not only she excelled in math, but also in science.", "Not only did she excel in math, but she excelled also in science.", "Not only she excelled in math, also in science."], correct: 0 }
    ]
  }
};

export const DIFFICULTY_SETTINGS = {
  easy: { numQuestions: 10, timePerQ: 60 },
  medium: { numQuestions: 15, timePerQ: 20 },
  hard: { numQuestions: 20, timePerQ: 9 }
};

export const STUDY_LINKS = [
  {
    category: "Official HQ Resources",
    links: [
      { title: "Bluebook™ Testing App (Required)", url: "https://bluebook.collegeboard.org/" },
      { title: "College Board — SAT Suite", url: "https://satsuite.collegeboard.org/sat" },
      { title: "Khan Academy — Official SAT Prep", url: "https://www.khanacademy.org/test-prep/sat" },
      { title: "Full-Length Practice Tests", url: "https://satsuite.collegeboard.org/sat/practice-preparation/practice-tests" },
      { title: "BigFuture College Search", url: "https://bigfuture.collegeboard.org/" }
    ]
  },
  {
    category: "Math: Heart of Algebra",
    links: [
      { title: "Khan — Linear Equations & Inequalities", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:solve-equations-inequalities" },
      { title: "Khan — Systems of Equations", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:systems-of-equations" },
      { title: "Purplemath — Linear Equations", url: "https://www.purplemath.com/modules/solvelin.htm" },
      { title: "Desmos — Graphing Systems", url: "https://www.desmos.com/calculator" },
      { title: "Math is Fun — Algebra Index", url: "https://www.mathsisfun.com/algebra/index.html" }
    ]
  },
  {
    category: "Math: Data & Problem Solving",
    links: [
      { title: "Khan — Ratios, Rates & Proportions", url: "https://www.khanacademy.org/math/pre-algebra/pre-algebra-ratios-rates" },
      { title: "Khan — Probability & Statistics", url: "https://www.khanacademy.org/math/statistics-probability" },
      { title: "Mathbits — Statistics Notebook", url: "https://mathbitsnotebook.com/Algebra1/StatisticsData/StatisticsData.html" },
      { title: "StatTrek — Tutorials", url: "https://stattrek.com/" },
      { title: "Wolfram — Probability Concepts", url: "https://mathworld.wolfram.com/Probability.html" }
    ]
  },
  {
    category: "Math: Passport to Advanced Math",
    links: [
      { title: "Khan — Quadratics & Functions", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratics" },
      { title: "Khan — Exponents & Radicals", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:exponent-rules" },
      { title: "Paul's Online Math Notes — Algebra", url: "https://tutorial.math.lamar.edu/Classes/Alg/Alg.aspx" },
      { title: "Symbolab — Calculator & Steps", url: "https://www.symbolab.com/" },
      { title: "Brilliant — Advanced Algebra", url: "https://brilliant.org/courses/advanced-algebra/" }
    ]
  },
  {
    category: "Math: Geometry & Trig",
    links: [
      { title: "Khan — Geometry Course", url: "https://www.khanacademy.org/math/geometry" },
      { title: "Khan — Trigonometry", url: "https://www.khanacademy.org/math/trigonometry" },
      { title: "Math Open Reference — Geometry", url: "https://www.mathopenref.com/" },
      { title: "Cut The Knot — Interactive Geometry", url: "https://www.cut-the-knot.org/geometry.shtml" },
      { title: "Math is Fun — SOHCAHTOA", url: "https://www.mathsisfun.com/algebra/sohcahtoa.html" }
    ]
  },
  {
    category: "English: Standard Conventions",
    links: [
      { title: "Purdue OWL — Grammar Rules", url: "https://owl.purdue.edu/owl/general_writing/grammar/index.html" },
      { title: "Khan — Grammar & Usage", url: "https://www.khanacademy.org/humanities/grammar" },
      { title: "Grammarly Blog — Tips", url: "https://www.grammarly.com/blog/" },
      { title: "Chomp Chomp Grammar", url: "https://chompchomp.com/" },
      { title: "English Grammar 101", url: "https://www.englishgrammar101.com/" }
    ]
  },
  {
    category: "English: Reading & Vocab",
    links: [
      { title: "New York Times (Complex Text)", url: "https://www.nytimes.com/" },
      { title: "Scientific American", url: "https://www.scientificamerican.com/" },
      { title: "The Atlantic (Argumentative Text)", url: "https://www.theatlantic.com/" },
      { title: "Merriam-Webster Word of the Day", url: "https://www.merriam-webster.com/word-of-the-day" },
      { title: "Project Gutenberg (Classic Lit)", url: "https://www.gutenberg.org/" },
      { title: "Vocabulary.com", url: "https://www.vocabulary.com/" }
    ]
  },
  {
    category: "Tools & Utilities",
    links: [
      { title: "Desmos Graphing Calculator", url: "https://www.desmos.com/calculator" },
      { title: "Pomofocus — Study Timer", url: "https://pomofocus.io/" },
      { title: "Quizlet — Flashcards", url: "https://quizlet.com/" },
      { title: "Anki — Spaced Repetition", url: "https://apps.ankiweb.net/" },
      { title: "WolframAlpha", url: "https://www.wolframalpha.com/" }
    ]
  },
  {
    category: "Mental Game & Wellness",
    links: [
      { title: "Headspace — Mindfulness", url: "https://www.headspace.com/" },
      { title: "Calm — Meditation", url: "https://www.calm.com/" },
      { title: "Sleep Foundation — Teens", url: "https://www.sleepfoundation.org/teens" },
      { title: "Insight Timer (Free)", url: "https://insighttimer.com/" },
      { title: "Exam Anxiety Tips", url: "https://www.princetonreview.com/college-advice/test-anxiety" }
    ]
  },
  {
    category: "Community & Forums",
    links: [
      { title: "Reddit — r/Sat", url: "https://www.reddit.com/r/Sat/" },
      { title: "College Confidential", url: "https://www.collegeconfidential.com/" },
      { title: "Discord — SAT Prep (Search)", url: "https://discord.com/" }
    ]
  }
];

export const STRATEGIES = [
  {
    category: "Digital Format Mastery",
    icon: "Monitor",
    tips: [
      "Master the built-in tools: 'Mark for Review', 'Strikethrough', and the 'Reference Sheet'.",
      "The test is adaptive (multistage). If Module 2 feels significantly harder, that's a GOOD sign—you likely crushed Module 1.",
      "Bring a charging cable and a backup mouse if you're using a laptop. Technical failures are stressful.",
      "Get comfortable with the Bluebook app interface before test day. It shouldn't be new to you.",
      "There is no penalty for guessing. Never leave a blank answer, even if you run out of time."
    ]
  },
  {
    category: "Math: Desmos Hacks",
    icon: "Calculator",
    tips: [
      "System of Equations? Graph both lines. The intersection point is your answer. No algebra needed.",
      "Regression? Type your table of values (x1, y1), then type 'y1 ~ mx1 + b'. It finds m and b for you instantly.",
      "Function values? Define f(x) = 3x^2 + 2, then just type f(5) to get the answer.",
      "Percentages? You can type calculations like '55% of 200' directly into the Desmos calculation bar.",
      "Shift-6 gives you an exponent. Sqrt types a square root. Learn the hotkeys to speed up."
    ]
  },
  {
    category: "Math: Strategy",
    icon: "Brain",
    tips: [
      "Backsolving: Plug the answer choices into the question. Start with the middle value (B or C).",
      "Picking Numbers: If variables are abstract (e.g., 'for all x > 0'), replace x with 2 or 3 and solve.",
      "Figures are not always to scale, BUT they are usually close. Visual estimation can help eliminate obviously wrong answers.",
      "Memorize special right triangles (3-4-5, 5-12-13). They appear constantly.",
      "For 'Circle' questions, always look for the standard equation: (x-h)^2 + (y-k)^2 = r^2."
    ]
  },
  {
    category: "English: Reading Tactics",
    icon: "BookOpen",
    tips: [
      "Read the question stem BEFORE the passage. Know what you are hunting for (Main Idea vs. Detail).",
      "Positive/Negative Charge: Eliminate answer choices that have the wrong emotional tone for the passage.",
      "Extreme Language: Beware of words like 'always', 'never', 'proven', 'impossible'. Correct answers are usually more moderate ('suggests', 'likely').",
      "For 'Vocabulary in Context', cover the word and think of your own synonym before looking at choices.",
      "The 'Main Idea' is rarely a specific detail mentioned in the first sentence. Look for the broader argument."
    ]
  },
  {
    category: "English: Grammar & Writing",
    icon: "PenTool",
    tips: [
      "Shorter is often better. If three choices are wordy and one is concise (and grammatically correct), the concise one is usually right.",
      "Dashes (-) and Colons (:) often act like equals signs. They connect a statement to its explanation.",
      "Semicolons (;) separate two complete independent sentences. If one side isn't a full sentence, the semicolon is wrong.",
      "Transitions: Read the sentence BEFORE and the sentence AFTER. determine the relationship (Contrast? Cause? Continuation?) before picking the word.",
      "Its vs. It's: 'It's' always means 'It is'. If you can't say 'It is', use 'Its'."
    ]
  },
  {
    category: "Mental Game",
    icon: "Smile",
    tips: [
      "Don't linger. If a question stumps you for 60 seconds, mark it and move on. Momentum is everything.",
      "Sleep > Cramming. Your brain consolidates memory during sleep. 8 hours the night before is non-negotiable.",
      "Visualization: Spend 2 minutes visualizing yourself calmly solving problems before you walk in.",
      "Adrenaline dump: If you panic, take 3 deep box breaths (in 4s, hold 4s, out 4s). It resets your nervous system.",
      "Trust your gut. Your first instinct is often based on subconscious pattern recognition."
    ]
  }
];
