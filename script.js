let userBalance = 0.00;

const gameNames = Array.from({length: 200}, (_, i) => i === 0 ? "Aviator" : i === 1 ? "JetX" : i === 2 ? "Chicken Road" : i === 3 ? "Keno" : `Game ${i + 1}`);

const sportLeagues = [
    "⚽ Armenia. Premier League", 
    "🏀 Israel. Super League", 
    "🎾 WTA 250. Chennai. Hard. India", 
    "⚽ English Premier League", 
    "⚽ Spanish La Liga"
];

const sportMatches = Array.from({length: 50}, (_, i) => {
    let league = sportLeagues[i % sportLeagues.length];
    return {
        id: i + 1,
        league: league,
        team1: i % 2 === 0 ? "FC Van" : "Hapoel Holon",
        team2: i % 2 === 0 ? "Pyunik" : "Hapoel Galil Elyon",
        score1: Math.floor(Math.random() * 3),
        score2: Math.floor(Math.random() * 3),
        w1: (1.5 + Math.random() * 5).toFixed(2),
        x: (3.0 + Math.random() * 2).toFixed(2),
        w2: (1.2 + Math.random() * 2).toFixed(2)
    };
});

window.onload = function() {
    loadGames();
    loadSports();
    loadScrollingGames();
    startBannerSlider();
};

function loadGames() {
    const grid = document.getElementById('gamesGrid');
    if(!grid) return;
    grid.innerHTML = '';
    
    gameNames.forEach((name, index) => {
        let imgIdx = (index % 20) + 1;
        let card = document.createElement('div');
        card.className = 'game-card';
        card.onclick = () => openGame(name);
        card.innerHTML = `
            <img src="game${imgIdx}.jpg" alt="${name}" onerror="this.src='game1.jpg'">
            <p>${name}</p>
        `;
        grid.appendChild(card);
    });
}

function loadSports() {
    const grid = document.getElementById('sportsGrid');
    if(!grid) return;
    grid.innerHTML = '';
    
    sportMatches.forEach((match) => {
        let card = document.createElement('div');
        card.className = 'sport-match-card';
        card.innerHTML = `
            <div class="match-league">${match.league}</div>
            <div class="match-teams">
                <div style="display:flex; justify-content:space-between;"><span>${match.team1}</span> <span><b>${match.score1}</b></span></div>
                <div style="display:flex; justify-content:space-between;"><span>${match.team2}</span> <span><b>${match.score2}</b></span></div>
            </div>
            <div class="match-odds-grid">
                <div class="odd-box" onclick="openGame('${match.team1} vs ${match.team2}')">
                    <span>W1</span>
                    <strong>${match.w1}</strong>
                </div>
                <div class="odd-box" onclick="openGame('${match.team1} vs ${match.team2}')">
                    <span>X</span>
                    <strong>${match.x}</strong>
                </div>
                <div class="odd-box" onclick="openGame('${match.team1} vs ${match.team2}')">
                    <span>W2</span>
                    <strong>${match.w2}</strong>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function loadScrollingGames() {
    const scrollBar = document.getElementById('scrollingGames');
    if(!scrollBar) return;
    scrollBar.innerHTML = '';
    for(let i=0; i<10; i++) {
        let item = document.createElement('div');
        item.className = 'scroll-item';
        item.onclick = () => openGame(gameNames[i]);
        item.innerHTML = `
            <img src="game${i+1}.jpg" alt="Game" onerror="this.src='game1.jpg'">
            <p>${gameNames[i]}</p>
        `;
        scrollBar.appendChild(item);
    }
}

let currentSlide = 0;
function startBannerSlider() {
    const slides = document.querySelectorAll('.banner-slider .slide');
    if(slides.length === 0) return;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 3500);
}

function openGame(gameName) {
    document.getElementById('activeGameTitle').innerText = gameName;
    document.getElementById('gameMessage').innerText = "Insufficient Balance!";
    openModal('gameModal');
}
function filterGames() {
    let input = document.getElementById('gameSearch').value.toLowerCase();
    let cards = document.querySelectorAll('.game-card');
    cards.forEach(card => {
        let title = card.querySelector('p').innerText.toLowerCase();
        card.style.display = title.includes(input) ? 'block' : 'none';
    });
}

function submitCoupon() {
    let code = document.getElementById('couponInput').value.trim();
    let msg = document.getElementById('couponMsg');
    if(!code) {
        msg.style.color = "red";
        msg.innerText = "Please enter a code";
        return;
    }
    msg.style.color = "red";
    msg.innerText = "this code das not exist";
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active-section'));
    document.querySelectorAll('.bottom-nav-bar button').forEach(btn => btn.classList.remove('active-tab'));
    
    let bannerSec = document.getElementById('mainBannerSection');
    let scrollSec = document.getElementById('mainScrollSection');
    let quickSec = document.querySelector('.quick-icons-bar');
    let searchSec = document.getElementById('searchSection');
    
    if(tabId === 'depositTab' || tabId === 'promotionTab') {
        if(bannerSec) bannerSec.style.display = 'none';
        if(scrollSec) scrollSec.style.display = 'none';
        if(quickSec) quickSec.style.display = 'none';
        if(searchSec) searchSec.style.display = 'none';
    } else {
        if(bannerSec) bannerSec.style.display = 'block';
        if(scrollSec) scrollSec.style.display = 'block';
        if(quickSec) quickSec.style.display = 'flex';
        if(searchSec) searchSec.style.display = 'block';
    }

    document.getElementById(tabId).classList.add('active-section');
    
    if(tabId === 'sportTab') document.getElementById('tabBtnSport').classList.add('active-tab');
    if(tabId === 'gamesTab') document.getElementById('tabBtnGames').classList.add('active-tab');
    if(tabId === 'promotionTab') document.getElementById('tabBtnPromotion').classList.add('active-tab');
    if(tabId === 'depositTab') document.getElementById('tabBtnDeposit').classList.add('active-tab');
    if(tabId === 'kenoTab') document.getElementById('tabBtnKeno').classList.add('active-tab');
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function toggleProfileMenu() {
    let menu = document.getElementById('profileDropdown');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

function registerUser() {
    let phone = document.getElementById('regPhone').value;
    if(!phone) { alert("Please enter mobile number"); return; }
    closeModal('registerModal');
    loginSuccess(phone);
}

function loginUser() {
    let phone = document.getElementById('loginPhone').value;
    if(!phone) { alert("Please enter mobile number"); return; }
    closeModal('loginModal');
    loginSuccess(phone);
}

function loginSuccess(phone) {
    document.getElementById('navButtons').style.display = 'none';
    document.getElementById('userPanel').style.display = 'flex';
    userBalance = 0.00;
    updateBalanceDisplay();
}

function logout() {
    document.getElementById('navButtons').style.display = 'flex';
    document.getElementById('userPanel').style.display = 'none';
    document.getElementById('profileDropdown').style.display = 'none';
    userBalance = 0.00;
    updateBalanceDisplay();
}

function updateBalanceDisplay() {
    document.getElementById('userBalance').innerText = userBalance.toFixed(2);
}

function copyPhone() {
    navigator.clipboard.writeText("0997791266");
    alert("Phone number copied: 0997791266");
}

function submitDepositStep1() {
    let amt = document.getElementById('depositAmountInput').value;
    if(!amt) { alert("Please enter amount"); return; }
    document.getElementById('smsSection').style.display = 'block';
}

function submitSmsCode() {
    let sms = document.getElementById('smsInput').
    value;
    if(!sms) { alert("Please paste SMS message"); return; }
    document.getElementById('waitingMsg').style.display = 'block';
}

function requestWithdraw() {
    let amt = parseFloat(document.getElementById('withdrawAmount').value) || 0;
    
    if(amt <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    if(amt > userBalance || userBalance <= 0) {
        alert("Insufficient Balance!");
        return;
    }

    userBalance -= amt;
    updateBalanceDisplay();
    alert("Withdrawal request sent via Telebirr (Agent: 0997791266)");
    closeModal('withdrawModal');
}

function openSupport() {
    window.open("https://t.me/0997791266", "_blank");
}
