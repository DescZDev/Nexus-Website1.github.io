document.getElementById("open-btn").addEventListener("click", function () {
    document.getElementById("sidebar").classList.add("sidebar-active");
});

document.getElementById("close-btn").addEventListener("click", function () {
    document.getElementById("sidebar").classList.remove("sidebar-active");
});
