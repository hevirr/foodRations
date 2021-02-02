function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(e => {
        // e.style.display = 'none';
        e.classList.add('hide');
        e.classList.remove('show', 'fade');
        });

        tabs.forEach(e => {
            e.classList.remove(activeClass);
        });
    }
    function showTabContent(i = 0) {
        // tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (ev) => {
        const t = ev.target;
        if (t && t.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((e, i) => {
                if (t == e) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;