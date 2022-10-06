const addCollectionBtn = document.querySelector("#add-collection-btn");
const saveCollectionBtn = document.querySelector("#save-collection-btn");
const collections = document.querySelector("#wall-tags");

saveCollectionBtn.addEventListener("click", function(e) {
    const collections = getCollectionsFromLocalStorage();

    const collectionOptions = document.querySelector("#collections-to-select");
    collectionOptions.innerHTML = "";
    if (collections.length == 0) {
        collectionOptions.innerHTML = `<p class='text-muted text-center small font-weight-bold'>No collection found. </p>`;
    }
    collections.map((collection) =>
        insertCollectionIntoModal(collection, collectionOptions)
    );
    const saveCollections = document.querySelector("#save-collections");
    // saveCollections.disabled = true;

    saveCollections.addEventListener("click", function(e) {
        Swal.fire({
            position: "center",
            icon: isAnyCollectionSelected() ? "success" : "error",
            title: isAnyCollectionSelected() ?
                "Collection is saved." :
                "Please select collection",
            showConfirmButton: false,
            timer: 1500,
        });
    });
});

function isAnyCollectionSelected() {
    return Array.prototype.some.call(
        document.querySelectorAll(
            '#collections-to-select input[name="collection"]'
        ),
        (collection) => collection.checked
    );
}

function insertCollectionIntoModal(collection, element) {
    const collectionDiv = `<label>
            ${collection.collectionName}
                <input type="radio" name='collection' />
            </label>`;
    element.insertAdjacentHTML("beforeend", collectionDiv);
}

function handleCollectionSelect() {
    const collectionsToSelect = document.querySelectorAll(
        'input[name="collection"]'
    );
    collectionsToSelect.forEach((collection) => {
        collection.addEventListener("click", function() {
            // saveCollections.disabled = false;
        });
    });
}

function isCollectionNameAlreadyExists(collectionName) {
    const collections = getCollectionsFromLocalStorage();
    const collection = collections.find(
        (c) => c.collectionName.toLowerCase() === collectionName.toLowerCase()
    );

    if (collection) return true;
    return false;
}

function addCollection() {
    Swal.fire({
        title: "Name your collection",
        input: "text",
        inputAttributes: {
            autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Create",
        showLoaderOnConfirm: true,
        preConfirm: (collectionName) => {
            if (!collectionName || collectionName.length === 0)
                Swal.showValidationMessage(`Colleciton name can not be empty.`);

            if (isCollectionNameAlreadyExists(collectionName)) {
                Swal.showValidationMessage(
                    `You have already collection with this name.`
                );
            }
        },
        allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: `Collection is created!`,
                text: ` ${result.value} is created successfuly!`,
                icon: "success",
            });
            const collection = {
                id: Date.now(),
                collectionName: result.value,
            };
            appendNewCollectionToUI(collection);
            addCollectionToLocalStorage(collection);
        }
    });
}
addCollectionBtn.addEventListener("click", function() {
    addCollection();
});

const removeCollectionFromUI = (currentCollection) => {
    removeCollectionFromLocalStorage(currentCollection.parentElement.innerText);
    return currentCollection.parentElement.remove();
};

const appendNewCollectionToUI = (collectionToAdd) => {
    const collection = `<div class="wall-tag" id="${collectionToAdd.id}">${collectionToAdd.collectionName}<button id='remove-wall' onClick='removeCollectionFromUI(this);'><i class="fa fa-times" aria-hidden="true"></i></button></div>`;
    collections.insertAdjacentHTML("beforeend", collection);
};

function removeCollectionFromLocalStorage(collectionName) {
    let collections = getCollectionsFromLocalStorage();
    collections = collections.filter(
        (collection) =>
        collection.collectionName.toLowerCase() != collectionName.toLowerCase()
    );

    saveCollectionsToLocalStorage(collections);
}

function addCollectionToLocalStorage(collection) {
    const collections = getCollectionsFromLocalStorage();
    collections.push(collection);
    saveCollectionsToLocalStorage(collections);
}

function saveCollectionsToLocalStorage(collections) {
    return window.localStorage.setItem(
        "collections",
        JSON.stringify(collections)
    );
}

function getCollectionsFromLocalStorage() {
    return window.localStorage.getItem("collections") ?
        JSON.parse(window.localStorage.getItem("collections")) :
        [];
}

document.addEventListener("DOMContentLoaded", function() {
    if (window.localStorage.getItem("selectedCard")) {
        const selectedCard = JSON.parse(
            window.localStorage.getItem("selectedCard")
        );

        addCardToUIOnLoad(selectedCard);
    }

    if (
        window.localStorage.getItem("collections") &&
        getCollectionsFromLocalStorage().length > 0
    ) {
        const collections = getCollectionsFromLocalStorage();
        collections.map((collection) => appendNewCollectionToUI(collection));
    }
});

const addCardToUIOnLoad = (card) => {
    const cardTitle = document.querySelector("#card-title");
    const cardDescription = document.querySelector("#card-description");
    const cardTags = document.querySelector("#preview-tags");
    const updatedAt = document.querySelector("#updatedAt");

    [cardTitle, cardDescription, cardTags, updatedAt].map(
        (element) => (element.innerText = " ")
    );

    cardTitle.innerText = card.title;
    updatedAt.innerText = card.updatedAt;

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

        cardDescription.appendChild(detailDiv);
    });

    if (card.sources.length > 0) {
        const sourcesDiv = document.createElement("div");
        sourcesDiv.classList.add("my-3");
        const sourcesTitle = document.createElement("p");
        const classesToAdd = ["font-weight-bold", "m-0", "p-0"];
        classesToAdd.map((c) => {
            sourcesTitle.classList.add(c);
        });
        sourcesTitle.innerText = "Sources: ";
        const sources = document.createElement("div");
        sources.appendChild(sourcesTitle);
        card.sources.map((source) => {
            const sourceLink = document.createElement("a");
            sourceLink.innerText = source;
            sourceLink.setAttribute("href", source);
            sourceLink.setAttribute("target", "_blank");
            sourceLink.classList.add("d-block");
            sources.appendChild(sourceLink);
        });

        cardDescription.appendChild(sources);
    }

    if (card.tags.length > 0) {
        card.tags.map((tag) => {
            const tagsDiv = document.createElement("div");
            tagsDiv.classList.add("tag");

            tagsDiv.innerText = tag;
            cardTags.appendChild(tagsDiv);
        });
        cardDescription.appendChild(cardTags);
    }
};