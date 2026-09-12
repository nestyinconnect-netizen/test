const searchInput = document.getElementById("searchInput");
const filters = document.querySelectorAll(".filter");

function filterCards() {
  const searchText = searchInput.value.toLowerCase().trim();

  const activeFilter =
    document.querySelector(".filter.active").dataset.filter;

  const cards = document.querySelectorAll(".searchable");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();

    const searchMatch = text.includes(searchText);

    let filterMatch = true;

    if (activeFilter === "case") {
      filterMatch = card.classList.contains("case-item");
    }

    if (activeFilter === "project") {
      filterMatch = card.classList.contains("project-item");
    }

    if (activeFilter === "public") {
      filterMatch = card.classList.contains("public-item");
    }

    if (activeFilter === "private") {
      filterMatch = card.classList.contains("private-item");
    }

    card.style.display =
      searchMatch && filterMatch ? "" : "none";
  });
}

if (searchInput) {
  searchInput.addEventListener("input", filterCards);
}

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));

    filter.classList.add("active");

    filterCards();
  });
});


/*
 * TEST CLOUDFLARE WORKER
 */

async function testWorker() {

  const testData = {
    name: "Test User",
    email: "test@example.com",
    experience: "5 years",
    resume: "https://drive.google.com/test",
    solution: "https://1drv.ms/test"
  };

  try {

    const response = await fetch(
      "https://test.nestyinconnect.workers.dev",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(testData)
      }
    );

    const result = await response.json();

    console.log("Worker response:", result);

    alert(
      result.success
        ? "Worker POST test successful!"
        : "Worker test failed."
    );

  } catch (error) {

    console.error(error);

    alert(
      "Could not connect to Cloudflare Worker."
    );
  }
}
