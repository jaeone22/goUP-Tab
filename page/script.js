// 모달 가져오기
const modal = document.getElementById('link-modal');
const modalcontent = document.getElementById('modal-content');
const closeModalBtn = document.querySelector('.close');
const addLinkBtn = document.getElementById('add-link-btn');
const saveLinkBtn = document.getElementById('save-link-btn');
const deleteLinkBtn = document.getElementById('delete-link-btn');
const siteNameInput = document.getElementById('site-name');
const siteURLInput = document.getElementById('site-url');
const container = document.querySelector('.container');
const openTelegramModalBtn = document.getElementById('openTelegramModal');
const telegramModal = document.getElementById('telegram-modal');
const closeTelegramModalBtn = telegramModal.querySelector('.close');
let currentEditLink = null;

// 로컬스토리지에서 링크 가져오기
window.onload = function() {
    loadLinks();
};

// 모달 열기
addLinkBtn.addEventListener('click', function() {
    currentEditLink = null;
    siteNameInput.value = '';
    siteURLInput.value = '';
    deleteLinkBtn.style.display = 'none';
    
    modal.style.display = 'flex';
    container.style.filter = 'blur(20px)';

    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
});

// 모달 닫기
closeModalBtn.addEventListener('click', function() {
    modal.classList.remove('show');
    container.style.filter = 'none';

    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
});

saveLinkBtn.addEventListener('click', function() {
    let siteName = siteNameInput.value.trim();
    let siteURL = siteURLInput.value.trim();

    if (!siteURL.match(/^https?:\/\//i)) {
        siteURL = 'http://' + siteURL;
    }

    if (siteName && siteURL) {
        if (currentEditLink) {
            updateLink(currentEditLink, siteName, siteURL);
        } else {
            addNewLink(siteName, siteURL);
        }
        saveLinksToLocalStorage();

        modal.classList.remove('show');
        container.style.filter = 'none';

        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
});


// 링크 삭제
deleteLinkBtn.addEventListener('click', function() {
    if (currentEditLink) {
        deleteLink(currentEditLink);
        saveLinksToLocalStorage();
        modal.classList.remove('show');
        container.style.filter = 'none';

        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
});

// 링크 추가 함수
function addNewLink(name, url) {
    const linkContainer = document.getElementById('links-container');
    const linkElement = createLinkElement(name, url);
    linkContainer.appendChild(linkElement);
}

// 링크 수정 모달 열기
function openEditLinkModal(linkElement) {
    currentEditLink = linkElement;
    siteNameInput.value = linkElement.dataset.name;
    siteURLInput.value = linkElement.dataset.url;
    deleteLinkBtn.style.display = 'block';
    modal.style.display = 'flex';
    container.style.filter = 'blur(20px)';

    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// 링크 수정 함수
function updateLink(linkElement, name, url) {
    linkElement.href = url;
    linkElement.dataset.name = name;
    linkElement.dataset.url = url;
    linkElement.querySelector('img').src = `https://www.google.com/s2/favicons?domain=${url}`;
    linkElement.querySelector('span').textContent = name;
}

// 링크 삭제 함수
function deleteLink(linkElement) {
    linkElement.remove();
}

// 링크 생성 함수
function createLinkElement(name, url) {
    const linkElement = document.createElement('a');
    linkElement.href = '#';
    linkElement.dataset.name = name;
    linkElement.dataset.url = url;

    const favicon = document.createElement('img');
    favicon.src = `https://www.google.com/s2/favicons?domain=${url}`;
    
    const linkText = document.createElement('span');
    linkText.textContent = name;

    linkElement.appendChild(favicon);
    linkElement.appendChild(linkText);

    linkElement.addEventListener('click', function(e) {
        e.preventDefault();
        window.open(url, '_self');
    });

    linkElement.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        openEditLinkModal(linkElement);
    });

    return linkElement;
}

// 로컬스토리지에 링크 로드
function loadLinks() {
    const linksData = JSON.parse(localStorage.getItem('quickLinks')) || [];
    const linkContainer = document.getElementById('links-container');
    linksData.forEach(link => {
        const linkElement = createLinkElement(link.name, link.url);
        linkContainer.appendChild(linkElement);
    });
}

// 로컬스토리지에 링크 저장
function saveLinksToLocalStorage() {
    const linkContainer = document.getElementById('links-container');
    const links = linkContainer.querySelectorAll('a');
    const linksData = Array.from(links).map(link => ({
        name: link.dataset.name,
        url: link.dataset.url
    }));
    localStorage.setItem('quickLinks', JSON.stringify(linksData));
}

// 모달 열기
openTelegramModalBtn.addEventListener('click', function() {
    /*
    telegramModal.style.display = 'flex';

    setTimeout(() => {
        telegramModal.querySelector('.modal-content').scrollTop = 0;
        telegramModal.classList.add('show');
    }, 10);
    */
    window.open('https://t.me/theanskr_news/26');
});

// 모달 닫기
closeTelegramModalBtn.addEventListener('click', function() {
    telegramModal.classList.remove('show');

    setTimeout(() => {
        telegramModal.style.display = 'none';
    }, 300);
});

// 모달 닫기
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        modal.classList.remove('show');
        document.querySelector('.container').style.filter = 'none';

        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });
});