const search = document.querySelector("#search");
const matchList = document.querySelector("#match-list");

const searchState = async searchText => {
  const res = await fetch("../data/states.json");
  const states = await res.json();

  // Get matches to current text input
  let matches = states.filter(state => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return state.name.match(regex) || state.abbr.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match => `
      <div class="card card-body mb-4">
        <h4><strong>${match.name} (${
          match.abbr
        })</strong> <span class="text-primary">${match.capital}</span></h4>
        <small>Lat: <span class="text-warning">${
          match.lat
        }</span> / Long: <span class="text-warning">${match.long}</span></small>
      </div>
    `
      )
      .join("");

    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => searchState(search.value));
