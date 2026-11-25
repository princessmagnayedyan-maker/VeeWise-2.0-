// ==========================================
// RED FLAG RADAR 
// ==========================================

const radarCards = document.querySelectorAll(".radar-card");

// Additional educational information for each warning sign
const radarInformation = {
    "Urgency and threats": {
        why: "Scammers create pressure so people will make decisions without checking the information first.",
        example: "Your account will be permanently blocked in 10 minutes. Verify now!",
        action: "Pause before responding. Check the claim through the organization's official application or contact information."
    },

    "Requests for OTPs or passwords": {
        why: "Passwords, OTPs, PINs, and recovery codes can give someone access to your personal accounts.",
        example: "Send your OTP so we can confirm your account ownership.",
        action: "Never share your verification codes or passwords. Legitimate support representatives should not ask you to disclose your OTP."
    },

    "Unexpected payment requests": {
        why: "Fraudsters may invent delivery fees, processing charges, or account payments to collect money.",
        example: "Pay this ₱50 delivery fee immediately to release your parcel.",
        action: "Do not pay through unexpected links. Verify the transaction directly with the official company."
    },

    "Unfamiliar links": {
        why: "Fraudulent websites can imitate familiar brands and trick people into entering personal or financial information.",
        example: "Click this link to verify your bank account.",
        action: "Avoid opening unexpected links. Visit the official website by typing its known address or using its official application."
    },

    "Too-good-to-be-true offers": {
        why: "Unrealistic rewards, guaranteed profits, and unusually high salaries can be used to attract victims.",
        example: "Congratulations! You won ₱50,000. Claim your prize now!",
        action: "Research the offer independently. Be cautious of requests for advance payments or sensitive information."
    },

    "Impersonation": {
        why: "Scammers may pretend to be relatives, friends, companies, or government representatives to gain trust.",
        example: "I changed my number. Please send money to this account. It's urgent!",
        action: "Verify the person's identity using a previously trusted phone number or another communication channel."
    }
};

// Create the spotlight overlay
function createRadarModal(card) {

    const title = card.dataset.title;
    const detail = card.dataset.detail;
    const icon = card.querySelector("span").textContent;

    const information = radarInformation[title] || {
        why: detail,
        example: "An unexpected message asks you to take immediate action.",
        action: "Pause and verify the information using a trusted, official channel."
    };

    // Prevent duplicate modal
    if (document.querySelector(".radar-overlay")) return;

    // Create overlay
    const overlay = document.createElement("div");
    overlay.className = "radar-overlay";

    // Create enlarged card
    const modal = document.createElement("div");
    modal.className = "radar-modal";

    // Close button
    const closeButton = document.createElement("button");
    closeButton.className = "radar-close";
    closeButton.textContent = "×";
    closeButton.setAttribute("aria-label", "Close details");

    // Icon
    const modalIcon = document.createElement("div");
    modalIcon.className = "radar-modal-icon";
    modalIcon.textContent = icon;

    // Category label
    const category = document.createElement("p");
    category.className = "radar-category";
    category.textContent = "RED FLAG DETECTED";

    // Title
    const heading = document.createElement("h2");
    heading.textContent = title;

    // Original description
    const description = document.createElement("p");
    description.className = "radar-description";
    description.textContent = detail;

    // Information sections
    function createInfoSection(label, content) {
        const container = document.createElement("div");
        container.className = "radar-info-section";

        const subheading = document.createElement("h3");
        subheading.textContent = label;

        const paragraph = document.createElement("p");
        paragraph.textContent = content;

        container.appendChild(subheading);
        container.appendChild(paragraph);

        return container;
    }

    const whySection = createInfoSection(
        "Why is this a red flag?",
        information.why
    );

    const exampleSection = createInfoSection(
        "Example of a suspicious message",
        information.example
    );

    const actionSection = createInfoSection(
        "What should you do?",
        information.action
    );

    // Footer
    const footer = document.createElement("p");
    footer.className = "radar-footer";
    footer.textContent = "Think before you click. Verify before you trust.";

    // Assemble modal
    modal.appendChild(closeButton);
    modal.appendChild(modalIcon);
    modal.appendChild(category);
    modal.appendChild(heading);
    modal.appendChild(description);
    modal.appendChild(whySection);
    modal.appendChild(exampleSection);
    modal.appendChild(actionSection);
    modal.appendChild(footer);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Prevent background scrolling
    document.body.classList.add("radar-modal-open");

    // Close modal function
    function closeModal() {
        overlay.classList.add("radar-closing");
        modal.classList.add("radar-zoom-out");

        setTimeout(() => {
            overlay.remove();
            document.body.classList.remove("radar-modal-open");
        }, 250);
    }

    closeButton.addEventListener("click", closeModal);

    // Close when clicking outside the enlarged card
    overlay.addEventListener("click", function(event) {
        if (event.target === overlay) {
            closeModal();
        }
    });

    // Close using Escape key
    function handleEscape(event) {
        if (event.key === "Escape") {
            closeModal();
            document.removeEventListener("keydown", handleEscape);
        }
    }

    document.addEventListener("keydown", handleEscape);

    // Focus close button for keyboard accessibility
    closeButton.focus();
}

// Add click events to all radar cards
radarCards.forEach(card => {

    card.addEventListener("click", function() {
        createRadarModal(card);
    });

});

// ==========================================
// REAL OR FAKE - SCAM SIMULATION QUIZ
// ==========================================

const questions = [

    // SCENARIO 1: GCASH SMS SCAM
    {
        type: "sms",
        title: "GCash Account Verification",
        question: "You received an unexpected SMS claiming that your GCash account is restricted.",

        sender: "GCash Security",
        number: "+639123456789",
        time: "9:42 AM",

        message: `
            <strong>GCash Security Alert</strong><br><br>
            Your account has been temporarily restricted
            due to unusual activity.<br><br>
            Verify your account immediately to avoid
            permanent suspension.<br><br>
            <span class="fake-link">
                https://gcash-account-verify.example.invalid
            </span>
        `,

        correct: "fake",

        explanation: `
            <strong>FAKE! This message has phishing warning signs.</strong><br><br>
            • It creates urgency by threatening account suspension.<br>
            • It uses an unfamiliar verification link.<br>
            • It asks you to verify sensitive account information.<br><br>
            Never enter your MPIN, password, or OTP through an unexpected link.
            Check your account using the official GCash app or support channels.
        `
    },


    // SCENARIO 2: MESSENGER AYUDA SCAM
    {
        type: "messenger",
        title: "Emergency Financial Assistance",
        question: "A person claiming to be a community assistance coordinator sends you a private message offering emergency ayuda.",

        sender: "Community Assistance",
        time: "Active now",

        messages: [
            {
                sender: "other",
                text: "Hello! We are giving emergency financial assistance to selected residents."
            },
            {
                sender: "other",
                text: "You are qualified to receive ₱5,000."
            },
            {
                sender: "other",
                text: "Send your full name, account number, and OTP to process your ayuda immediately."
            },
            {
                sender: "me",
                text: "Where can I verify this assistance?"
            },
            {
                sender: "other",
                text: "You must send the details now. The offer will expire soon."
            }
        ],

        status: "Seen 9:45 AM",

        correct: "fake",

        explanation: `
            <strong>FAKE! This is a suspicious financial assistance offer.</strong><br><br>
            • It promises money without reliable verification.<br>
            • It requests sensitive financial information and an OTP.<br>
            • It pressures you to act immediately.<br><br>
            Never share your OTP or banking credentials. Verify government
            assistance through official government offices and announcements.
        `
    },


    // SCENARIO 3: MARKETPLACE TRANSACTION
    {
        type: "marketplace",
        title: "Online Marketplace Purchase",
        question: "You are interested in buying a secondhand study desk from an online seller. Examine the conversation.",

        product: "Secondhand Study Desk",
        price: "₱1,200",
        condition: "Used - Good Condition",
        seller: "Mark's Furniture Finds",

        messages: [
            {
                sender: "seller",
                text: "Hello! Yes, the study desk is still available."
            },
            {
                sender: "buyer",
                text: "Can I see more pictures of the item?"
            },
            {
                sender: "seller",
                text: "Sure! Here are additional pictures. You can also inspect the desk before deciding."
            },
            {
                sender: "buyer",
                text: "Can I pay when I receive and inspect it?"
            },
            {
                sender: "seller",
                text: "Yes. We can arrange a safe pickup and you can inspect the item first."
            }
        ],

        correct: "real",

        explanation: `
            <strong>REALISTICALLY SAFER INTERACTION!</strong><br><br>
            • The seller allows the buyer to inspect the item.<br>
            • The seller does not demand an advance payment.<br>
            • The seller does not request an OTP or sensitive account details.<br><br>
            However, this does not prove that the seller is trustworthy.
            Always verify the seller, inspect the product, and use safe
            transaction methods before paying.
        `
    },


    // SCENARIO 4: FAKE MAYA REWARD
    {
        type: "sms",
        title: "Maya Anniversary Reward",
        question: "You receive an unexpected SMS claiming that you won a cash reward from Maya.",

        sender: "Maya Rewards",
        number: "+639187654321",
        time: "2:15 PM",

        message: `
            <strong>Congratulations!</strong><br><br>
            You have been selected to receive a ₱3,000 anniversary reward!<br><br>
            Claim your prize now. Enter your account details and OTP to receive your reward.<br><br>
            <span class="fake-link">https://maya-rewards.example.invalid</span>
        `,

        correct: "fake",

        explanation: `
            <strong>FAKE! This is a suspicious reward message.</strong><br><br>
            • You were not expecting the reward.<br>
            • It asks for your account details and OTP.<br>
            • It uses an unfamiliar claiming link.<br><br>
            Never share your OTP, MPIN, or password. Verify promotions through official Maya channels.
        `
    },

    // SCENARIO 5: FAKE PARCEL DELIVERY
    {
        type: "sms",
        title: "Parcel Delivery Notification",
        question: "You receive a text saying that your parcel is on hold because of an incomplete delivery address.",

        sender: "Delivery Service",
        number: "+639456789012",
        time: "10:30 AM",

        message: `
            <strong>Delivery Notification</strong><br><br>
            Your parcel is currently on hold due to an incomplete address.<br><br>
            Pay a ₱25 redelivery fee to receive your package.<br><br>
            <span class="fake-link">https://parcel-update.example.invalid</span>
        `,

        correct: "fake",

        explanation: `
            <strong>FAKE! This message has common delivery scam warning signs.</strong><br><br>
            • It requests an unexpected payment.<br>
            • It uses an unfamiliar link.<br>
            • It does not provide reliable shipment verification.<br><br>
            Check your parcel using the official delivery company's website or application.
        `
    },

    // SCENARIO 6: FAKE ONLINE JOB
    {
        type: "messenger",
        title: "Online Task Job Offer",
        question: "A recruiter sends you a message offering high daily earnings for simple online tasks.",

        sender: "Online Hiring Team",
        time: "Active now",

        messages: [
            {
                sender: "other",
                text: "Hello! We are hiring online product reviewers."
            },
            {
                sender: "other",
                text: "Earn ₱3,000 to ₱5,000 daily by liking products and following online stores."
            },
            {
                sender: "me",
                text: "Do I need experience?"
            },
            {
                sender: "other",
                text: "No experience needed! Just pay ₱500 to activate your account."
            },
            {
                sender: "other",
                text: "Deposit now to unlock higher-paying tasks."
            }
        ],

        status: "Seen 10:42 AM",

        correct: "fake",

        explanation: `
            <strong>FAKE! This is a suspicious task-based job offer.</strong><br><br>
            • It promises unusually high earnings for simple tasks.<br>
            • It requires an upfront payment.<br>
            • It asks applicants to deposit money to unlock tasks.<br><br>
            Legitimate employment should not require you to pay money to receive your salary.
        `
    },

    // SCENARIO 7: FAKE RELATIVE EMERGENCY
    {
        type: "messenger",
        title: "Emergency Money Request",
        question: "An unfamiliar account claims to be your relative and urgently asks you to send money.",

        sender: "New Number",
        time: "Active now",

        messages: [
            {
                sender: "other",
                text: "Hello! Ako ito. Nasiraan ako ng phone."
            },
            {
                sender: "other",
                text: "Pahiram muna ng ₱2,500. Emergency lang."
            },
            {
                sender: "me",
                text: "Sino po ito?"
            },
            {
                sender: "other",
                text: "Wala nang time mag-explain. Send mo na sa GCash number na ito."
            },
            {
                sender: "other",
                text: "Please, kailangan ko na ngayon!"
            }
        ],

        status: "Seen 11:05 AM",

        correct: "fake",

        explanation: `
            <strong>FAKE OR UNVERIFIED! Do not send money yet.</strong><br><br>
            • The sender does not clearly identify themselves.<br>
            • They create pressure through an emergency story.<br>
            • They request money through an unfamiliar number.<br><br>
            Contact your relative using a known phone number or another trusted communication channel.
        `
    },

    // SCENARIO 8: FAKE MARKETPLACE ADVANCE PAYMENT
    {
        type: "marketplace",
        title: "Secondhand Gadget Purchase",
        question: "A seller offers a secondhand tablet but demands full payment before showing the actual item.",

        product: "Secondhand Tablet",
        price: "₱2,500",
        condition: "Used - Good Condition",
        seller: "Affordable Gadget Deals",

        messages: [
            {
                sender: "buyer",
                text: "Hello! Can I see the actual pictures of the tablet?"
            },
            {
                sender: "seller",
                text: "The tablet is still available."
            },
            {
                sender: "buyer",
                text: "Can I inspect it before paying?"
            },
            {
                sender: "seller",
                text: "No. You must send full payment first."
            },
            {
                sender: "seller",
                text: "Many buyers are interested. Pay now or I will sell it to someone else."
            }
        ],

        correct: "fake",

        explanation: `
            <strong>FAKE OR HIGHLY SUSPICIOUS TRANSACTION!</strong><br><br>
            • The seller refuses a reasonable inspection.<br>
            • The seller demands full advance payment.<br>
            • The seller pressures the buyer to pay immediately.<br><br>
            Avoid sending money before verifying the seller and the item. Use safer transaction arrangements.
        `
    },

    // SCENARIO 9: FAKE AYUDA REGISTRATION
    {
        type: "messenger",
        title: "Government Financial Assistance",
        question: "A Facebook account posts a financial assistance offer and asks you to provide personal details and an OTP.",

        sender: "Public Assistance Office",
        time: "Active now",

        messages: [
            {
                sender: "other",
                text: "PUBLIC ANNOUNCEMENT! ₱5,000 FREE AYUDA FOR ALL!"
            },
            {
                sender: "other",
                text: "You can register through our private message."
            },
            {
                sender: "me",
                text: "Where can I verify this program?"
            },
            {
                sender: "other",
                text: "Send your full name, birthday, GCash number, and OTP."
            },
            {
                sender: "other",
                text: "Limited slots only. Register immediately!"
            }
        ],

        status: "Seen 1:20 PM",

        correct: "fake",

        explanation: `
            <strong>FAKE! This is a suspicious government assistance offer.</strong><br><br>
            • It makes an unverified promise of financial assistance.<br>
            • It asks for sensitive personal and account information.<br>
            • It uses urgency to pressure applicants.<br><br>
            Verify assistance programs through official government or local government announcements. Never provide your OTP.
        `
    },

    // SCENARIO 10: WRONG SEND SCAM
    {
        type: "messenger",
        title: "Wrong E-Wallet Transfer",
        question: "A stranger claims to have accidentally sent you ₱2,000 and asks you to return it immediately.",

        sender: "Unknown Sender",
        time: "Active now",

        messages: [
            {
                sender: "other",
                text: "Hello po! Nagkamali po ako ng send ng ₱2,000 sa number ninyo."
            },
            {
                sender: "other",
                text: "Paki-send back na lang po sa ibang GCash number."
            },
            {
                sender: "me",
                text: "Wala po akong nakikitang transaction."
            },
            {
                sender: "other",
                text: "Nag-send na po ako ng screenshot. Please return it immediately."
            }
        ],

        status: "Seen 2:30 PM",

        correct: "fake",

        explanation: `
            <strong>SUSPICIOUS! Verify the transaction first.</strong><br><br>
            • A screenshot is not proof that money was received.<br>
            • The sender pressures you to return money.<br>
            • The requested receiving number may not belong to the original sender.<br><br>
            Check your official transaction history. If a genuine mistaken transfer occurred, contact the e-wallet provider through official support.
        `
    },

    // SCENARIO 11: FAKE BALIKBAYAN BOX FEE
    {
        type: "sms",
        title: "Balikbayan Box Delivery",
        question: "You receive an unexpected message claiming that a relative sent you a package from abroad, but you must pay a clearance fee.",

        sender: "Package Delivery",
        number: "+639876543210",
        time: "3:40 PM",

        message: `
            <strong>Package Delivery Notice</strong><br><br>
            A balikbayan box has arrived for you from abroad.<br><br>
            Pay ₱8,500 customs clearance fee today to release your package.<br><br>
            <span class="fake-link">https://package-clearance.example.invalid</span>
        `,

        correct: "fake",

        explanation: `
            <strong>FAKE OR UNVERIFIED! This may be a package fee scam.</strong><br><br>
            • The sender and shipment are not verified.<br>
            • It demands a large unexpected payment.<br>
            • It uses an unfamiliar payment link.<br><br>
            Contact your relative and verify the shipment directly with the legitimate courier before paying anything.
        `
    },

    // SCENARIO 12: SAFER MARKETPLACE TRANSACTION
    {
        type: "marketplace",
        title: "Secondhand School Supplies",
        question: "A seller offers secondhand school supplies and allows you to inspect the items before deciding to buy.",

        product: "School Supplies Bundle",
        price: "₱350",
        condition: "Used - Good Condition",
        seller: "Student Finds Shop",

        messages: [
            {
                sender: "buyer",
                text: "Hello! Are the school supplies still available?"
            },
            {
                sender: "seller",
                text: "Yes! They are still available."
            },
            {
                sender: "buyer",
                text: "Can I inspect the items first?"
            },
            {
                sender: "seller",
                text: "Of course. You can check their condition before deciding."
            },
            {
                sender: "seller",
                text: "No advance payment is needed. We can arrange a safe public pickup."
            }
        ],

        correct: "real",

        explanation: `
            <strong>COMPARATIVELY SAFER INTERACTION!</strong><br><br>
            • The seller allows inspection before purchase.<br>
            • No advance payment is demanded.<br>
            • The seller agrees to arrange a safe pickup.<br><br>
            These are positive signs, but they do not prove the seller is legitimate. Verify the seller and inspect the products before paying.
        `
    },

    // SCENARIO 13: FAKE BANK ACCOUNT ALERT
    {
        type: "sms",
        title: "Bank Account Security Alert",
        question: "You receive a message claiming that your bank account will be blocked unless you verify your details immediately.",

        sender: "Bank Security",
        number: "+639112223344",
        time: "4:15 PM",

        message: `
            <strong>Account Security Warning</strong><br><br>
            Your bank account has been flagged for suspicious activity.<br><br>
            Verify your account immediately to prevent permanent blocking.<br><br>
            Enter your card number, password, and OTP here:<br><br>
            <span class="fake-link">https://bank-security-check.example.invalid</span>
        `,

        correct: "fake",

        explanation: `
            <strong>FAKE! This is a phishing attempt.</strong><br><br>
            • It threatens to block your account.<br>
            • It requests your card number, password, and OTP.<br>
            • It directs you to an unfamiliar website.<br><br>
            Never provide banking credentials through an unexpected link. Contact your bank using its official channels.
        `
    }

];

// CURRENT QUIZ VARIABLES
let currentQuestion = 0;
let score = 0;
let answered = false;


// ==========================================
// DISPLAY THE CURRENT SCENARIO
// ==========================================

function loadQuestion() {

    answered = false;

    const q = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        `Scenario ${currentQuestion + 1} of ${questions.length}`;

    document.getElementById("question").textContent = q.question;

    document.getElementById("feedback").innerHTML = "";

    document.getElementById("score").textContent = "";

    document.getElementById("nextButton").disabled = true;

    document.getElementById("nextButton").textContent =
        currentQuestion === questions.length - 1
            ? "See Final Score →"
            : "Next Scenario →";


    // DISPLAY DIFFERENT INTERFACE
    if (q.type === "sms") {
        displaySMS(q);
    }

    else if (q.type === "messenger") {
        displayMessenger(q);
    }

    else if (q.type === "marketplace") {
        displayMarketplace(q);
    }


    // REAL OR FAKE BUTTONS
    document.getElementById("answers").innerHTML = `
        <button class="decision-btn real-btn"
            onclick="checkAnswer('real')">
            REAL
        </button>

        <button class="decision-btn fake-btn"
            onclick="checkAnswer('fake')">
            FAKE
        </button>
    `;
}


// ==========================================
// SCENARIO 1: SMS INTERFACE
// ==========================================

function displaySMS(q) {

    document.getElementById("scenarioUI").innerHTML = `

        <div class="phone-simulation">

            <div class="phone-header">
                <div class="phone-icon">💬</div>

                <div>
                    <strong>${q.sender}</strong>
                    <small>${q.number}</small>
                </div>
            </div>

            <div class="phone-screen">

                <p class="simulation-time">${q.time}</p>

                <div class="sms-bubble">
                    ${q.message}
                </div>

                <p class="simulation-caption">
                    Text Message • SMS
                </p>

            </div>

        </div>
    `;
}


// ==========================================
// SCENARIO 2: MESSENGER INTERFACE
// ==========================================

function displayMessenger(q) {

    let chatMessages = "";

    q.messages.forEach(message => {

        const className =
            message.sender === "me" ? "my-message" : "their-message";

        chatMessages += `
            <div class="chat-row ${className}">
                <div class="chat-bubble">
                    ${message.text}
                </div>
            </div>
        `;

    });


    document.getElementById("scenarioUI").innerHTML = `

        <div class="messenger-simulation">

            <div class="messenger-header">

                <div class="messenger-avatar">CA</div>

                <div class="messenger-profile">
                    <strong>${q.sender}</strong>
                    <small>● ${q.time}</small>
                </div>

                <div class="messenger-icons">
                    ☎ &nbsp; ⋮
                </div>

            </div>

            <div class="messenger-chat">

                <p class="chat-date">TODAY</p>

                ${chatMessages}

                <p class="seen-status">${q.status}</p>

            </div>

            <div class="messenger-input">
                Aa <span>➤</span>
            </div>

        </div>
    `;
}


// ==========================================
// SCENARIO 3: MARKETPLACE INTERFACE
// ==========================================

function displayMarketplace(q) {

    let chatMessages = "";

    q.messages.forEach(message => {

        const className =
            message.sender === "buyer" ? "my-message" : "their-message";

        chatMessages += `
            <div class="chat-row ${className}">
                <div class="chat-bubble">
                    ${message.text}
                </div>
            </div>
        `;

    });


    document.getElementById("scenarioUI").innerHTML = `

        <div class="marketplace-simulation">

            <div class="marketplace-header">
                <span>←</span>
                <strong>Marketplace</strong>
                <span>⋮</span>
            </div>

            <div class="product-card">

                <div class="product-image">
                    🪑
                </div>

                <div class="product-details">
                    <strong>${q.price}</strong>
                    <p>${q.product}</p>
                    <small>${q.condition}</small>
                    <small>Seller: ${q.seller}</small>
                </div>

            </div>

            <div class="marketplace-chat-header">
                <strong>${q.seller}</strong>
                <small>Marketplace conversation</small>
            </div>

            <div class="marketplace-chat">
                ${chatMessages}
            </div>

            <div class="messenger-input">
                Write a message...
                <span>➤</span>
            </div>

        </div>
    `;
    
}


// ==========================================
// CHECK ANSWER
// ==========================================

function checkAnswer(answer) {

    if (answered) return;

    answered = true;

    const q = questions[currentQuestion];

    const feedback = document.getElementById("feedback");

    const answerButtons = document.querySelectorAll(".decision-btn");

    answerButtons.forEach(button => {
        button.disabled = true;
    });


    if (answer === q.correct) {

        score++;

        feedback.innerHTML = `
            <div class="correct-feedback">
                <strong>✓ Correct Answer!</strong><br><br>
                ${q.explanation}
            </div>
        `;

    } else {

        feedback.innerHTML = `
            <div class="wrong-feedback">
                <strong>✕ Not Quite!</strong><br><br>
                ${q.explanation}
            </div>
        `;

    }


    document.getElementById("score").textContent =
        `Current Score: ${score} / ${questions.length}`;

    document.getElementById("nextButton").disabled = false;

}


// ==========================================
// NEXT SCENARIO
// ==========================================

function nextQuestion() {

    if (!answered) return;

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        loadQuestion();

    } else {

        showFinalScore();

    }

}


// ==========================================
// FINAL SCORE
// ==========================================

function showFinalScore() {

    document.getElementById("questionNumber").textContent =
        "Simulation Completed!";

    document.getElementById("question").textContent =
        "You have completed all scam scenarios!";

    document.getElementById("scenarioUI").innerHTML = "";

    document.getElementById("answers").innerHTML = "";

    document.getElementById("feedback").innerHTML = `
        <div class="final-quiz-result">
            <h2>Quiz Results</h2>
            <h1>${score} / ${questions.length}</h1>
            <p>
                ${
                    score === questions.length
    ? "Excellent! You identified all scenarios correctly."
    : score >= Math.ceil(questions.length * 0.8)
    ? "Great job! You have a good understanding of online safety."
    : score >= Math.ceil(questions.length * 0.5)
    ? "Good effort! Keep practicing to improve your scam detection skills."
    : "Keep learning! Review the warning signs and try again."
                }
            </p>
        </div>
    `;

    document.getElementById("nextButton").disabled = true;

    document.getElementById("nextButton").style.display = "none";

    document.getElementById("score").textContent =
        "Thank you for using VeeWise!";

}


// ==========================================
// RESTART QUIZ
// ==========================================

function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    answered = false;

    document.getElementById("nextButton").style.display = "inline-block";

    loadQuestion();

}


// ==========================================
// START QUIZ
// ==========================================

loadQuestion();

// ==========================================
// PASSWORD SAFETY LAB
// ==========================================

const samplePassword = document.getElementById("samplePassword");

const strengthFill = document.getElementById("strengthFill");
const strengthLabel = document.getElementById("strengthLabel");
const strengthAdvice = document.getElementById("strengthAdvice");

const showPassword = document.getElementById("showPassword");

function evaluateSamplePassword() {

    const value = samplePassword.value;

    let score = 0;

    // Check password characteristics
    const hasLength = value.length >= 12;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[^A-Za-z0-9]/.test(value);

    // Update password analysis
    document.getElementById("lengthCheck").textContent =
        "Length (12 or more characters): " + (hasLength ? "Yes" : "No");

    document.getElementById("uppercaseCheck").textContent =
        "Uppercase letters: " + (hasUppercase ? "Yes" : "No");

    document.getElementById("lowercaseCheck").textContent =
        "Lowercase letters: " + (hasLowercase ? "Yes" : "No");

    document.getElementById("numberCheck").textContent =
        "Numbers: " + (hasNumber ? "Yes" : "No");

    document.getElementById("specialCheck").textContent =
        "Special characters: " + (hasSpecial ? "Yes" : "No");


    // Empty password
    if (value.length === 0) {

        strengthFill.style.width = "0%";

        strengthLabel.textContent = "Waiting for password...";

        strengthAdvice.textContent =
            "Enter a sample password to see its strength analysis.";

        return;
    }


    // Calculate score
    if (value.length >= 8) score++;
    if (value.length >= 12) score++;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    // Detect simple common passwords and repeated characters
    const commonPasswords = [
        "123456",
        "password",
        "qwerty",
        "12345678",
        "admin",
        "letmein"
    ];

    const isCommon = commonPasswords.includes(value.toLowerCase());

    const hasRepeatedCharacters =
        /^(.)\1+$/.test(value);

    const hasSimpleSequence =
        /12345|23456|34567|45678|56789|abcdef|qwerty/i.test(value);


    // Determine strength
    let percentage = 0;
    let label = "";
    let advice = "";

    if (isCommon || hasRepeatedCharacters) {

        percentage = 15;
        label = "Very Weak";
        advice =
            "This password uses a common or repetitive pattern. " +
            "Try creating a longer and less predictable password.";

    } else if (score <= 2 || hasSimpleSequence) {

        percentage = 30;
        label = "Weak";
        advice =
            "Your password needs improvement. Use more characters " +
            "and avoid predictable sequences.";

    } else if (score <= 3) {

        percentage = 50;
        label = "Moderate";
        advice =
            "Your password has some good characteristics, but it could " +
            "be stronger. Consider increasing its length.";

    } else if (score <= 5) {

        percentage = 75;
        label = "Strong";
        advice =
            "Good work! Your password has several strong characteristics. " +
            "Make sure it is unique and not reused on other accounts.";

    } else {

        percentage = 100;
        label = "Very Strong Characteristics";
        advice =
            "Excellent! Your sample password meets all the basic " +
            "checks. Remember that length, uniqueness, and unpredictability matter.";
    }


    // Update strength display
    strengthFill.style.width = percentage + "%";

    strengthLabel.textContent = label;

    strengthAdvice.textContent = advice;

}


// Evaluate password while typing
samplePassword.addEventListener("input", evaluateSamplePassword);


// Show or hide password
showPassword.addEventListener("change", function () {

    samplePassword.type = this.checked ? "text" : "password";

});


// Initial display
evaluateSamplePassword();

// =============================
// SCAM TESTER
// =============================

function checkMessage() {

    let message = document
        .getElementById("message")
        .value.toLowerCase();

    let result = document.getElementById("result");

    if (message.trim() === "") {

        result.textContent =
            "Please enter a message first.";

        return;

    }

  let warningSigns = {

    "Urgent or threatening language": [
        "urgent", "immediately", "act now",
        "suspended", "blocked", "last chance",
        "within 10 minutes", "within 24 hours",
        "bayad muna", "kailangan ngayon",
        "asikasuhin agad", "huling pagkakataon",
        "mawawala ang account mo", "ma-block ang account",
        "mag-expire na", "hanggang ngayon na lang",
        "bilisan mo", "huwag magpatumpik-tumpik",
        "kailangan agad", "last day na",
        "mawawala ang iyong access"
    ],

    "Requests for sensitive information": [
        "password", "otp", "verification code",
        "one-time pin", "bank details", "card number",
        "ibigay ang otp", "send mo ang otp",
        "pakibigay ang password", "account details",
        "personal information", "birthday at address",
        "send your pin", "ilagay ang iyong otp",
        "i-confirm ang password", "bank account number",
        "atm details", "login credentials",
        "verification number", "security code"
    ],

    "Suspicious payment requests": [
        "processing fee", "redelivery fee",
        "send money", "pay now", "transfer money",
        "magbayad muna", "padala ka muna",
        "mag-send ng pera", "down payment muna",
        "bayad bago makuha", "may bayad na fee",
        "registration fee", "advance payment",
        "delivery fee muna", "mag-deposit ka muna",
        "send payment", "bayaran ang processing fee",
        "magbayad para ma-claim", "cash in muna",
        "gcash payment", "bank transfer muna"
    ],

    "Unexpected link instructions": [
        "click here", "verify your account",
        "claim now", "open this link",
        "nanalo ka", "claim ang premyo",
        "i-click ang link", "pindutin ang link",
        "buksan ang link", "mag-login dito",
        "i-verify ang account", "claim mo na",
        "kunin ang iyong reward", "register here",
        "check this website", "visit this link",
        "i-confirm ang account", "claim your reward",
        "i-click para makuha", "mag-register ngayon"
    ]

};

let detected = [];

    for (let category in warningSigns) {

        let found = warningSigns[category].some(word =>
            message.includes(word)
        );

        if (found) {
            detected.push(category);
        }

    }

    result.innerHTML = "";

    let heading = document.createElement("h3");

    heading.textContent = detected.length
        ? "Possible Warning Signs Detected"
        : "No Listed Warning Signs Detected";

    heading.style.color = "var(--cyan)";

    result.appendChild(heading);

    if (detected.length > 0) {

        let list = document.createElement("ul");

        detected.forEach(item => {

            let li = document.createElement("li");

            li.textContent = item;

            list.appendChild(li);

        });

        result.appendChild(list);

    } else {

        let p = document.createElement("p");

        p.textContent =
            "This does not guarantee that the message is safe. Some scams use wording that this simple checker may not recognize.";

        result.appendChild(p);

    }

    let note = document.createElement("p");

    note.className = "small-note";

    note.textContent =
        "Reminder: This is a basic keyword checker only. It cannot verify links, identify senders, or confirm whether a message is fraudulent.";

    result.appendChild(note);

}

function clearMessage() {

    document.getElementById("message").value = "";

    document.getElementById("result").textContent =
        "Your message has been cleared. Enter another message to check.";

}

/* =========================================
   VEEWISE VISUAL INTERACTION ENHANCEMENTS
   Safe to add alongside existing JavaScript
========================================= */

(() => {
    "use strict";

    // Avoid running the enhancements more than once.
    if (window.veewiseVisualsInitialized) return;
    window.veewiseVisualsInitialized = true;

    document.addEventListener("DOMContentLoaded", () => {

        /* =================================
           1. SCROLL REVEAL ANIMATION
        ================================= */

        const revealElements = document.querySelectorAll(
            "section:not(#home) h2, " +
            "section:not(#home) .card, " +
            "section:not(#home) .mission-card, " +
            "section:not(#home) .achievement-card, " +
            "section:not(#home) .feature-heading, " +
            "section:not(#home) .command-stat"
        );

        revealElements.forEach(element => {
            element.classList.add("vw-reveal");
        });

        if ("IntersectionObserver" in window) {

            const revealObserver = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {

                        if (entry.isIntersecting) {
                            entry.target.classList.add("vw-visible");
                            revealObserver.unobserve(entry.target);
                        }

                    });
                },
                {
                    threshold: 0.12
                }
            );

            revealElements.forEach(element => {
                revealObserver.observe(element);
            });

        } else {

            revealElements.forEach(element => {
                element.classList.add("vw-visible");
            });

        }


        /* =================================
           2. ACTIVE NAVIGATION HIGHLIGHT
        ================================= */

        const navigationLinks = document.querySelectorAll(
            'header nav a[href^="#"]'
        );

        const pageSections = document.querySelectorAll(
            "main section[id], body > section[id]"
        );

        if ("IntersectionObserver" in window) {

            const sectionObserver = new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        const currentId = entry.target.id;

                        navigationLinks.forEach(link => {

                            const isActive =
                                link.getAttribute("href") === "#" + currentId;

                            link.classList.toggle("vw-active-link", isActive);

                        });

                    });

                },
                {
                    rootMargin: "-35% 0px -55% 0px"
                }
            );

            pageSections.forEach(section => {
                sectionObserver.observe(section);
            });

        }


        /* =================================
           3. HERO BUTTON INTERACTIONS
        ================================= */

        const heroButtons = document.querySelectorAll(
            ".hero-buttons a"
        );

        heroButtons.forEach(button => {

            button.addEventListener("click", () => {

                button.style.transform = "scale(0.96)";

                setTimeout(() => {
                    button.style.transform = "";
                }, 150);

            });

        });


        /* =================================
           4. CYBER CORE STATUS ANIMATION
        ================================= */

        const coreStatus = document.querySelector(".core-status");

        if (coreStatus) {

            const statusMessages = [
                "SYSTEM ACTIVE",
                "AWARENESS ENABLED",
                "STAY ALERT ONLINE"
            ];

            let statusIndex = 0;

            const updateCoreStatus = () => {

                statusIndex =
                    (statusIndex + 1) % statusMessages.length;

                const dot = coreStatus.querySelector(".live-dot");

                coreStatus.textContent = statusMessages[statusIndex];

                if (dot) {
                    coreStatus.prepend(dot);
                }

            };

            // Change the display periodically without affecting site features.
            let statusTimer = setInterval(updateCoreStatus, 4000);

            document.addEventListener("visibilitychange", () => {

                if (document.hidden) {
                    clearInterval(statusTimer);
                } else {
                    clearInterval(statusTimer);
                    statusTimer = setInterval(updateCoreStatus, 4000);
                }

            });

        }


        /* =================================
           5. ACTIVE LINK APPEARANCE
        ================================= */

        const activeLinkStyle = document.createElement("style");

        activeLinkStyle.textContent = `
            header nav a.vw-active-link {
                color: #00e5ff !important;
                text-shadow: 0 0 12px rgba(0, 229, 255, 0.6);
            }

            .vw-reveal.vw-visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;

        document.head.appendChild(activeLinkStyle);


        console.log("VeeWise visual enhancements initialized.");

    });

})();

// STAR RATING FUNCTIONALITY

const stars = document.querySelectorAll("#starRating .star");
const submitRating = document.getElementById("submitRating");
const ratingText = document.getElementById("ratingText");
const ratingMessage = document.getElementById("ratingMessage");

let selectedRating = 0;

// Select a star
stars.forEach((star) => {
    star.addEventListener("click", function () {
        selectedRating = Number(this.dataset.value);

        stars.forEach((item) => {
            const value = Number(item.dataset.value);

            item.classList.toggle(
                "active",
                value <= selectedRating
            );
        });

        ratingText.textContent =
            `You selected ${selectedRating} out of 5 stars.`;

        submitRating.disabled = false;
        ratingMessage.textContent = "";
    });
});

// Submit rating
submitRating.addEventListener("click", function () {
    if (selectedRating === 0) return;

    ratingMessage.textContent =
        `Thank you for rating VeeWise ${selectedRating} out of 5 stars!`;

    submitRating.disabled = true;
});
