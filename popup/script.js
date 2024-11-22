// 언어 설정
const userLang = navigator.language || navigator.userLanguage; 
const isKorean = userLang.startsWith('ko');

// 다국어 지원 데이터
const translations = {
    title: {
        en: "goUP Tab Popup",
        ko: "goUP Tab 팝업"
    },
    working: {
        en: "goUP Tab is working",
        ko: "goUP Tab이 작동중이에요"
    },
    version: {
        en: "v1.3",
        ko: "v1.3"
    },
    supported: {
        en: "Supported on:<br>Firefox, Librewolf, MullVad, Tor, Brave, Chrome",
        ko: "작동이 확인됨:<br>Firefox, Librewolf, MullVad, Tor, Brave, Chrome"
    }
};

// 텍스트 번역 함수
function translate() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.innerHTML = translations[key][isKorean ? 'ko' : 'en'];
    });
}

// 페이지 로드 시 번역 실행
window.onload = function() {
    translate();
    loadLinks();
};