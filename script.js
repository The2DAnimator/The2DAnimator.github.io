document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar");

    menuToggle.addEventListener("click", function() {
        sidebar.classList.toggle("show");
    });
});




document.addEventListener("DOMContentLoaded", function () {
    if (!document.body.classList.contains("home")) return; // Apply only to home page

    console.log("Home Page Animations Loaded!");

    // Typing Effect for Professions
    const professions = [
        "2D Animator.",
        "Graphic Designer.",
        "Motion Graphics Artist.",
        "Audio Editor.",
        "Video Editor.",
        "Video & Audio Advertisement."
    ];

    let index = 0;
    const typingContainer = document.querySelector(".typing-container");

    function typeProfession() {
        if (index >= professions.length) index = 0;
        typingContainer.textContent = professions[index];
        index++;
        setTimeout(typeProfession, 2000);
    }

    setTimeout(typeProfession, 1000);
});
