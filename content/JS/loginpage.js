function loginpage(sect, event) {
    event.preventDefault();

    if (sect == 0) {
        sessionStorage.setItem('register', 0);
        window.location.href = "content/pages/login/index.html"
        return;
    }

    sessionStorage.setItem('register', 1);
    window.location.href = "content/pages/login/index.html"
}