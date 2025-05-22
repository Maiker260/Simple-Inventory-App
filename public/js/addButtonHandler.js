document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".add_button");

    buttons.forEach((button) => {
        button.addEventListener("click", async function (event) {
            event.preventDefault();
            const button = event.currentTarget;
            const { seriesId, seriesType } = button.dataset;

            try {
                const response = await fetch("/add-to-database", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ seriesId, seriesType }),
                });

                const result = await response.json();

                if (response.ok) {
                    button.disabled = true;
                    button.textContent = "Added";
                    button.style.backgroundColor = "#4CAF50";
                    button.style.color = "white";
                } else {
                    alert("Error: " + result.error);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong.");
            }
        });
    });
});
