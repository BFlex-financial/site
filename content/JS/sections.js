const sections = ["home", "about"];
const homeBtn = document.getElementById('homeBtn');
const aboutBtn = document.getElementById('aboutBtn');
var observer;

function initializeObserver(...v) {

    observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {

            if (entry.target.id == 'home' && entry.intersectionRatio > 0.5) {
                aboutBtn.classList.remove('marked');
                homeBtn.classList.add('marked');
                return 0;
            }

            if (entry.target.id == 'about' && entry.intersectionRatio > 0.5) {
                homeBtn.classList.remove('marked');
                aboutBtn.classList.add('marked');
                return 0;
            }

            return 0;
        })
    }, { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] })

    sections.forEach(id => {
        let sectionElement = document.getElementById(id);

        if (sectionElement != undefined) {
            return observer.observe(sectionElement);
        }

        console.warn("Unknow Element")
    })
}

window.addEventListener('DOMContentLoaded', setTimeout(() => { initializeObserver(homeBtn, aboutBtn) }, 500));
window.addEventListener('scroll', initializeObserver(homeBtn, aboutBtn));

async function scroll(section) {
    if (run == true && section !== undefined) {
        run = false;

        await switch (section) {
            case 0:
                document.getElementById(sections[section]).scrollIntoView();
                break
            case 1:
                document.getElementById(sections[section]).scrollIntoView();
                break
            case 2:
                document.getElementById(sections[section]).scrollIntoView();
                break
        }
    }

}