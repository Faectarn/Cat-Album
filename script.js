const apiKey = "9b3d7da6-37ff-4eb8-b5f7-fe42d56448f9";
const startUrl = "https://api.thecatapi.com/v1/images/search";
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");
const imageContainer = document.querySelector(".imageContainer");
const pageIndicator = document.querySelector(".pageIndicator");
const numberOfImages = 12;
const order = "asc";
let pageNumber = 0;

async function fetchData() {
    let newUrl = new URL(startUrl);
    newUrl.searchParams.append("page", pageNumber)
    newUrl.searchParams.append("order", order)
    newUrl.searchParams.append("limit", numberOfImages)
    
try {
    const response = await fetch(newUrl,
        {
            headers: {
                "x-api-key": apiKey,
            },
        }
    );

    pageIndicator.textContent = `Showing page: ${pageNumber}`;
    
    const data = await response.json();
    addImages(data); 
    console.log(data);

    disableButtons(0);

    previousButton.disabled = pageNumber === 0;
}
    catch (error) {
        imageContainer.textContent = "Something went wrong while trying to fetch data...";
    }
}

function addImages(images) {
    imageContainer.innerHTML = "";
    images.forEach(image => {
        imageContainer.innerHTML += `<img src="${image.url}">`;
    });
}

previousButton.addEventListener("click", () => {
    pageNumber--;
    loadingMessage();
    if (pageNumber < 0)
        pageNumber = 0;
    fetchData();
});

nextButton.addEventListener("click", () => {
    pageNumber++;
    loadingMessage();
    fetchData();
});

function disableButtons(newUrl) {
    previousButton.disabled = newUrl;
    nextButton.disabled = newUrl;
}

function loadingMessage() {
    pageIndicator.textContent = "Loading page...", disableButtons(!0);
}

fetchData();