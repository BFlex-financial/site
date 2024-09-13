document.getElementById('gayButton').addEventListener("click", () => {
    var response = prompt("What's your name?");

    if (!response.match(/heitor/i)) {
        return alert('You ARE gay');
    }

    return alert("You're NOT gay");
});
