document.addEventListener("DOMContentLoaded", function () {
    console.log("views.js loaded!"); // Debugging check

    updateViews(); // Track views
    renderChart(7); // Default: Last 7 days
    animateViewsCounter(); // Start animation

    // Listen for dropdown change
    document.getElementById("daysRange").addEventListener("change", function () {
        renderChart(parseInt(this.value));
    });
});

/**
 * Get the current date in YYYY-MM-DD format based on local time
 * @returns {string} Local date string
 */
function getLocalDate() {
    let date = new Date();
    return date.getFullYear() + "-" + 
           String(date.getMonth() + 1).padStart(2, "0") + "-" + 
           String(date.getDate()).padStart(2, "0");
}

/**
 * Updates the view count in local storage per day
 */
function updateViews() {
    const today = getLocalDate(); // Get the local date
    let viewsData = JSON.parse(localStorage.getItem("portfolioViews")) || {};

    // Increase view count for today
    viewsData[today] = (viewsData[today] || 0) + 1;

    // Save back to local storage
    localStorage.setItem("portfolioViews", JSON.stringify(viewsData));
}

/**
 * Renders the views graph for the last N days
 * @param {number} days Number of days to display
 */
function renderChart(days) {
    let viewsData = JSON.parse(localStorage.getItem("portfolioViews")) || {};
    let labels = [];
    let dataPoints = [];

    for (let i = days - 1; i >= 0; i--) {
        let date = new Date();
        date.setDate(date.getDate() - i);
        let dateString = date.getFullYear() + "-" + 
                         String(date.getMonth() + 1).padStart(2, "0") + "-" + 
                         String(date.getDate()).padStart(2, "0");

        labels.push(dateString);
        dataPoints.push(viewsData[dateString] || 0);
    }

    if (window.myChart) {
        window.myChart.destroy();
    }

    let ctx = document.getElementById("viewsChart").getContext("2d");
    window.myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Portfolio Views",
                    data: dataPoints,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 2,
                    pointRadius: 5,
                    pointBackgroundColor: "rgba(54, 162, 235, 1)",
                },
            ],
        },
        options: {
            responsive: true,
            animation: {
                duration: 1000,
                easing: "easeInOutQuad",
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { maxRotation: 45, minRotation: 45 },
                },
                y: {
                    beginAtZero: true,
                    grid: { color: "rgba(200, 200, 200, 0.3)" },
                },
            },
        },
    });
}

/**
 * Animates the daily views counter
 */
function animateViewsCounter() {
    let viewsData = JSON.parse(localStorage.getItem("portfolioViews")) || {};
    let dates = Object.keys(viewsData).sort();
    let counterElement = document.getElementById("animatedViewsCount");

    if (dates.length === 0) {
        counterElement.textContent = "No views recorded yet.";
        return;
    }

    let index = 0;

    function updateCounter() {
        if (index >= dates.length) index = 0;

        let date = dates[index];
        let views = viewsData[date];
        let formattedDate = new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

        counterElement.textContent = `📅 ${formattedDate}: ${views} views`;

        index++;
        setTimeout(updateCounter, 2000); // Change every 2 seconds
    }

    updateCounter();
}
