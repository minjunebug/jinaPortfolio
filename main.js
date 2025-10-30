const wrap = document.getElementsByClassName('wrap')[0];
const sections = Array.from(document.querySelectorAll('.wrap .container'));
const menuLinks = document.querySelectorAll('.menu a');

let page = 0;
const lastPage = sections.length - 1;

function setActive(idx) {
    menuLinks.forEach(a => a.classList.remove('is-active'));
    const id = sections[idx]?.id;
    const link = Array.from(menuLinks).find(a => a.getAttribute('href') === `#${id}`);
    if (link) link.classList.add('is-active');
}

/* 1) 휠 이동 */
window.addEventListener('wheel', (e) => {
    e.preventDefault();
    page += (e.deltaY > 0 ? 1 : -1);
    if (page < 0) page = 0;
    if (page > lastPage) page = lastPage;

    wrap.style.top = page * -100 + 'vh';
    history.replaceState(null, '', '#' + sections[page].id);
    setActive(page);                    // ← 활성 메뉴 표시
}, { passive: false });

/* 2) 메뉴 클릭 이동 */
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').replace('#', '');
        const idx = sections.findIndex(sec => sec.id === targetId);
        if (idx >= 0) {
        page = idx;
        wrap.style.top = page * -100 + 'vh';
        history.replaceState(null, '', '#' + targetId);
        setActive(page);                // ← 활성 메뉴 표시
        }
    });
});

/* 3) 해시 내비/뒤로가기 */
window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    const idx = sections.findIndex(sec => sec.id === id);
    if (idx >= 0) {
        page = idx;
        wrap.style.top = page * -100 + 'vh';
        setActive(page);                  // ← 활성 메뉴 표시
    }
});

/* 4) 초기 로드 시 활성 표시 */
window.addEventListener('load', () => {
    const id = location.hash.slice(1);
    const idx = sections.findIndex(sec => sec.id === id);
    page = idx >= 0 ? idx : 0;
    wrap.style.top = page * -100 + 'vh';
    setActive(page);                    // ← 활성 메뉴 표시
});