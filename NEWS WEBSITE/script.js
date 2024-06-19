const API_KEY = "16491f19ab62497182da097a48714596";
const url = "https://newsapi.org/v2/everything";

async function fetchData(query) {
    try {
        const response = await fetch(`${url}?q=${query}&apiKey=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return { articles: [] };
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchData("all").then(data => renderMain(data.articles));
});

let mobilemenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");

menuBtn.addEventListener("click", () => {
    mobilemenu.classList.toggle("hidden");
});

function renderMain(arr) {
    let mainHTML = '';
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].urlToImage) {
            mainHTML += ` <div class="card">
                            <a href="${arr[i].url}">
                            <img src="${arr[i].urlToImage}" loading="lazy" />
                            <h4>${arr[i].title}</h4>
                            <div class="publishbyDate">
                                <p>${arr[i].source.name}</p>
                                <span>•</span>
                                <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                            </div>
                            <div class="desc">
                                ${arr[i].description}
                            </div>
                            </a>
                         </div>`;
        }
    }

    document.querySelector("main").innerHTML = mainHTML;
}

const searchFormDesktop = document.getElementById("searchForm");
searchFormDesktop.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchInput = document.getElementById("searchInput").value;
    if (searchInput.trim() !== '') {
        const data = await fetchData(searchInput);
        renderMain(data.articles);
    }
});

const searchFormMobile = document.getElementById("searchFormMobile");
searchFormMobile.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchInputMobile = document.getElementById("searchInputMobile").value;
    if (searchInputMobile.trim() !== '') {
        const data = await fetchData(searchInputMobile);
        renderMain(data.articles);
    }
});

async function Search(query) {
    const data = await fetchData(query);
    renderMain(data.articles);
}
