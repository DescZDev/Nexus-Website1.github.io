
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const openBtn = document.getElementById("open-btn");
    const closeBtn = document.getElementById("close-btn");

    openBtn.addEventListener("click", function () {
        sidebar.style.left = "0"; // Open sidebar
    });

    closeBtn.addEventListener("click", function () {
        sidebar.style.left = "-250px"; // Close sidebar
    });
});
