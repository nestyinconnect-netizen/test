const searchInput =
  document.getElementById("searchInput");


const filters =
  document.querySelectorAll(".filter");


const cards =
  document.querySelectorAll(".searchable");



function filterCards() {

  const searchText =
    searchInput.value
      .toLowerCase()
      .trim();


  const activeFilter =
    document
      .querySelector(".filter.active")
      .dataset.filter;


  cards.forEach(card => {

    const text =
      card.innerText.toLowerCase();


    const searchMatch =
      text.includes(searchText);


    let filterMatch = true;


    if (activeFilter === "case") {

      filterMatch =
        card.classList.contains(
          "case-item"
        );

    }


    if (activeFilter === "project") {

      filterMatch =
        card.classList.contains(
          "project-item"
        );

    }


    if (activeFilter === "public") {

      filterMatch =
        card.classList.contains(
          "public-item"
        );

    }


    if (activeFilter === "private") {

      filterMatch =
        card.classList.contains(
          "private-item"
        );

    }


    card.style.display =
      searchMatch && filterMatch
        ? ""
        : "none";

  });

}



searchInput.addEventListener(
  "input",
  filterCards
);



filters.forEach(filter => {

  filter.addEventListener(
    "click",
    () => {

      filters.forEach(item => {

        item.classList.remove(
          "active"
        );

      });


      filter.classList.add(
        "active"
      );


      filterCards();

    }
  );

});
