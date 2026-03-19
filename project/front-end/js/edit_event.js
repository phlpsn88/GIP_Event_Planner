const titleError = document.querySelector("#titleError");

document.querySelector("#editForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const eventForm = {
        title: document.querySelector("#title").value,
        description: document.querySelector("#description").value,
        date: document.querySelector("#date").value,
        status: document.querySelector("#status").value
    }
    if (eventForm.title) {
        console.log(eventForm.title);
        titleError.style.display = 'none';
    } else {
        titleError.style.display = 'block';
    }
});

