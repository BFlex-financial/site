const sections = ["home", "about"];
const homeBtn = document.getElementById('homeBtn');
const aboutBtn = document.getElementById('aboutBtn');
var observer;

function initializeObserver(...v) {

    observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {

            if (entry.target.id == 'home' && entry.intersectionRatio > 0.5) {
                console.log(entry.intersectionRatio)
            }

            console.log(entry)
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

window.addEventListener('DOMContentLoaded', initializeObserver(homeBtn, aboutBtn));
window.addEventListener('scroll', initializeObserver(homeBtn, aboutBtn));