const removeCardButtons = document.querySelectorAll(".remove-card-btn");
const collectionBody = document.querySelector(".collection-body");

const removeCards = () => {
    removeCardButtons.forEach((removeCardBtn) => {
        removeCardBtn.addEventListener("click", function(e) {
            this.parentElement.remove();
        });
    });
};

function removeCard(card) {
    card.parentElement.remove();
}

function clearModalData(modalFields) {
    return modalFields.map((modalField) => (modalField.innerText = ""));
}

function getModalDetails(card) {
    const modalTitle = document.querySelector("#modalTitle");
    const updatedAt = document.querySelector("#updatedAt");
    const modalBody = document.querySelector("#modalBody");

    clearModalData([modalTitle, updatedAt, modalBody]);

    modalTitle.innerText = card.title;
    updatedAt.innerText = card.updatedAt;

    const modalDetailsDiv = document.createElement("div");

    modalDetailsDiv.classList.add("my-2");
    if (card.descriptionBody.length > 0) {
        card.descriptionBody.map((detail) => {
            const detailDiv = document.createElement("div");
            if (detail.title.length > 0) {
                const detailTitleDiv = document.createElement("div");
                detailTitleDiv.classList.add("font-weight-bold");
                detailTitleDiv.innerText = detail.title;
                detailDiv.appendChild(detailTitleDiv);
            }

            if (detail.description.length > 0) {
                const descriptionList = document.createElement("ul");
                detail.description.map((description) => {
                    let descriptionListItem;
                    if (detail.description.length == 1) {
                        descriptionListItem = document.createElement("div");
                    } else {
                        descriptionListItem = document.createElement("li");
                    }

                    descriptionListItem.innerText = description;
                    if (detail.description.length == 1) {
                        detailDiv.appendChild(descriptionListItem);
                    } else {
                        descriptionList.appendChild(descriptionListItem);
                    }
                });
                detailDiv.appendChild(descriptionList);
            }

            modalDetailsDiv.appendChild(detailDiv);
        });
    }

    if (card.sources.length > 0) {
        const sourcesDiv = document.createElement("div");
        sourcesDiv.classList.add("my-3");
        const sourcesTitle = document.createElement("p");
        const classesToAdd = ["font-weight-bold", "m-0", "p-0"];
        classesToAdd.map((c) => {
            sourcesTitle.classList.add(c);
        });
        sourcesTitle.innerText = "Sources:";
        const sources = document.createElement("div");
        sources.appendChild(sourcesTitle);
        card.sources.map((source) => {
            const sourceLink = document.createElement("a");
            sourceLink.innerText = source;
            sourceLink.setAttribute("href", source);
            sourceLink.setAttribute("target", "_blank");
            sources.appendChild(sourceLink);
        });

        modalDetailsDiv.appendChild(sources);
    }

    if (card.id === "terminologyModal") {
        const expandMoreBtn = document.createElement("a");
        const buttonClassList = ["btn", "btn-sm", "btn-primary", "my-2"];
        buttonClassList.map((cls) => expandMoreBtn.classList.add(cls));
        expandMoreBtn.innerText = "Expand";
        expandMoreBtn.setAttribute("href", "index.html");
        expandMoreBtn.setAttribute("target", "_blank");
        modalDetailsDiv.appendChild(expandMoreBtn);
    }

    modalBody.appendChild(modalDetailsDiv);
}

function openModalOnClick(thisBtn, id) {
    const card = cards.find((c) => c.id === id);
    thisBtn.setAttribute("data-target", "#cardModal");
    thisBtn.setAttribute("data-toggle", "modal");
    getModalDetails(card);
    window.localStorage.setItem("selectedCard", JSON.stringify(card));
}

function getCollectionCardsOnLoad() {
    document.addEventListener("DOMContentLoaded", function() {
                cards.map((card) => {
                            const cardView = `  <div class="collection-card ${
        card.id === "proofPrintModal" ? "proofPrintCard" : ""
      } blog p-3">
    <div class="card-title my-0 py-0  d-flex align-items-center">
       
        <div class="title my-0 py-0">${card.title}
        </div>

    </div>
    ${
      card.id != "proofPrintModal"
        ? `    <div class="card-description">
        <div class="description">
           ${card.shortDescription}
        </div>
    </div>`
        : ""
    }

  
    <div class="card-buttons d-flex justify-content-between ">
        <div class="description-label my-2">
          ${card.tags.reduce(
            (acc, tag) => acc + `<div class="tag terms">${tag}</div>`,
            ""
          )}
        </div>
        <button  onClick="openModalOnClick(this,'${
          card.id
        }');" class="card-btn more-btn mr-2">More</button>
    </div>
    <button onClick="removeCard(this)" class="remove-card-btn  action-btn"><i
            class="fas fa-times remove-button-color"></i></button>
</div>`;

      collectionBody.insertAdjacentHTML("afterbegin", cardView);
    });
  });
}

function eventListeners() {
  getCollectionCardsOnLoad();
  removeCards();
}

eventListeners();