function attachCategoryEventListeners() {
    const flowerLinks = document.querySelectorAll('.flower-category-link');
    console.log("Found", flowerLinks.length, "flower category links");

    flowerLinks.forEach(link => {
        console.log("Attaching event listener to link:", link);
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const category = this.getAttribute('data-category');
            console.log("Clicked category:", category);
            if (category === "all") {
                showAllFlowers();
            } else {
                showFlowerCategory(category);
            }
        });
    });
}

const flowerCategories = {
    all: ["flower", "gift", "luxury", "occasions", "plants"],
    flowers: ["flower-box"],
    plants: ["plants-box"],
    occasions: ["occasions-box"],
    gifts: ["gift-box"],
    luxury: ["luxury-box"]
};

function showAllFlowers() {
    console.log("Showing all images");

    document.querySelectorAll('.image-box').forEach(box => {
        box.style.display = "block";
    });

    hideImageDetailsContainer();
}

function showFlowerCategory(category) {
    console.log("Showing images for category:", category);

    document.querySelectorAll('.image-box').forEach(box => {
        box.style.display = "none";
    });

    flowerCategories[category].forEach(cat => {
        document.querySelectorAll(`.${cat}`).forEach(box => {
            box.style.display = "block";
        });
    });

    hideImageDetailsContainer();
}

const imageContainer = document.querySelector('.image-container');
const imageDetailsContainer = document.querySelector('.image-details-container');
const selectedImage = document.getElementById('selected-image');
const imageName = document.getElementById('image-name');
const imagePrice = document.getElementById('image-price');

function handleImageClick(event) {
    const img = event.target;
    const originalSrc = img.getAttribute('data-original-src');
    const hoverSrc = img.getAttribute('data-hover');
    const name = img.parentElement.querySelector('.item-name').textContent;
    const price = img.parentElement.querySelector('.item-price').textContent;

    selectedImage.src = originalSrc;
    imageName.textContent = name;
    imagePrice.textContent = price;

    const additionalImages = document.querySelectorAll('.additional-image');
    additionalImages[0].src = originalSrc;
    additionalImages[1].src = hoverSrc;

    imageContainer.style.display = 'none';
    imageDetailsContainer.style.display = 'block';
}

function hideImageDetailsContainer() {
    imageContainer.style.display = 'block';
    imageDetailsContainer.style.display = 'none';
}

imageContainer.querySelectorAll('.image-box img').forEach(img => {
    let hoverTimer;

    img.addEventListener('mouseenter', function () {
        hoverTimer = setTimeout(() => {
            const hoverImageSrc = img.getAttribute('data-hover');
            img.src = hoverImageSrc;
        }, 1000);
    });

    img.addEventListener('mouseleave', function () {
        clearTimeout(hoverTimer);
        const originalImageSrc = img.getAttribute('data-original-src');
        img.src = originalImageSrc;
    });

    img.addEventListener('click', handleImageClick);
});

document.addEventListener("DOMContentLoaded", function () {
    const giftMessageSelect = document.getElementById("gift-message");
    const giftMessageFields = document.getElementById("gift-message-fields");

    giftMessageSelect.addEventListener("change", function () {
        if (this.value === "yes") {
            giftMessageFields.style.display = "block";
        } else {
            giftMessageFields.style.display = "none";
        }
    });
});

const additionalImages = document.querySelectorAll('.additional-image');

additionalImages.forEach(image => {
    image.addEventListener('click', function () {
        const selectedImage = document.getElementById('selected-image');
        selectedImage.src = this.src;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const openShopping = document.querySelector('.shopping-cart');
    const shoppingContainer = document.querySelector('.shopping-container');
    const closeBtn = document.querySelector('.close-button');
    const body = document.querySelector('body');
    const overlay = document.querySelector('.overlay');
    openShopping.addEventListener('click', function () {
        shoppingContainer.style.right = '0';
        overlay.style.display = 'block';
        body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', function () {
        shoppingContainer.style.right = '-400px';
        overlay.style.display = 'none';
        body.style.overflow = 'auto';
    });

    overlay.addEventListener('click', function () {
        shoppingContainer.style.right = '-400px';
        overlay.style.display = 'none';
        body.style.overflow = 'auto';
    });

    shoppingContainer.addEventListener('transitionend', function (event) {
        if (event.propertyName === 'right' && shoppingContainer.style.right === '-400px') {
            body.style.overflow = 'auto';
        }
    });
});
function attachAddToCartEventListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart, .add-to-cart-button');
    console.log("Found", addToCartButtons.length, "add to cart buttons");

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            let itemBox, imageSrc, itemName, itemPrice;

            if (this.classList.contains('add-to-cart')) {
                itemBox = this.parentElement;
                imageSrc = itemBox.querySelector('img').getAttribute('data-original-src');
                itemName = itemBox.querySelector('.item-name').textContent;
                itemPrice = itemBox.querySelector('.item-price').textContent;
            } else {
                itemBox = this.closest('.image-details-container');
                imageSrc = itemBox.querySelector('#selected-image').src;
                itemName = itemBox.querySelector('#image-name').textContent;
                itemPrice = itemBox.querySelector('#image-price').textContent;
            }

            const item = {
                imageSrc: imageSrc,
                price: itemPrice,
                name: itemName
            };

            addItemToCart(item);
        });
    });
}
function addItemToCart(item) {
    let itemsRemoved = 0;
    const cartItems = document.querySelectorAll('.cart-item');
    let existingCartItem = null;

    cartItems.forEach(cartItem => {
        const itemName = cartItem.querySelector('.item-name').textContent;
        if (itemName === item.name) {
            existingCartItem = cartItem;
        }
    });

    const quantitySelected = parseInt(document.getElementById('flower-quantity').value, 10);

    if (existingCartItem) {
        const itemQuantityElement = existingCartItem.querySelector('.item-quantity');
        let quantity = parseInt(itemQuantityElement.textContent, 10) || 0;
        quantity += quantitySelected;
        itemQuantityElement.textContent = quantity;

        const itemPriceElement = existingCartItem.querySelector('.item-price');
        let itemPrice = parseFloat(item.price.slice(1));

        // Include the prices of the addons
        const addChocolate = document.getElementById('add-chocolate').checked;
        const addBalloon = document.getElementById('add-balloon').checked;
        const addWineSpirits = document.getElementById('add-wine-spirits').checked;

        // Add the price of the flower to the addons first
        if (addChocolate) itemPrice += 4;
        if (addBalloon) itemPrice += 3;
        if (addWineSpirits) itemPrice += 8;

        // Multiply by the quantity
        itemPrice *= quantity;

        const totalPrice = parseFloat(itemPriceElement.textContent.replace(/[^\d.]/g, '')) + itemPrice;
        itemPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

        const deleteButton = existingCartItem.querySelector('.delete-button');
        deleteButton.addEventListener('click', function () {
            existingCartItem.remove();
            calculateTotalPrice();
            calculateAndUpdateTotalQuantity();
        });

    } else {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('item-image');

        const img = document.createElement('img');
        img.src = item.imageSrc;
        img.alt = item.name;

        imageContainer.appendChild(img);

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('item-info');

        const itemName = document.createElement('p');
        itemName.classList.add('item-name');
        itemName.textContent = item.name;

        const itemQuantity = document.createElement('span');
        itemQuantity.classList.add('item-quantity');
        itemQuantity.textContent = quantitySelected;

        const itemPrice = document.createElement('h1');
        itemPrice.classList.add('item-price');
        let totalPrice = parseFloat(item.price.slice(1));

        // Include the prices of the addons
        const addChocolate = document.getElementById('add-chocolate').checked;
        const addBalloon = document.getElementById('add-balloon').checked;
        const addWineSpirits = document.getElementById('add-wine-spirits').checked;

        // Add the price of the flower to the addons first
        if (addChocolate) totalPrice += 4;
        if (addBalloon) totalPrice += 3;
        if (addWineSpirits) totalPrice += 8;

        // Multiply by the quantity
        totalPrice *= quantitySelected;

        itemPrice.textContent = `$${totalPrice.toFixed(2)}`;

        itemPrice.dataset.price = parseFloat(item.price.slice(1));

        infoContainer.appendChild(itemPrice);
        infoContainer.appendChild(itemName);
        infoContainer.appendChild(itemQuantity);


        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

        cartItem.appendChild(imageContainer);
        cartItem.appendChild(infoContainer);
        cartItem.appendChild(deleteButton);

        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.appendChild(cartItem);

        deleteButton.addEventListener('click', function () {
            const itemQuantityElement = cartItem.querySelector('.item-quantity');
            const quantity = parseInt(itemQuantityElement.textContent, 10);
            cartItem.remove();
            calculateTotalPrice();
            calculateAndUpdateTotalQuantity();
        });

    }

    calculateTotalPrice();
    calculateAndUpdateTotalQuantity();

    // Reset checkboxes and quantity after 2 seconds
    setTimeout(() => {
        const addonCheckboxes = document.querySelectorAll('.add-something input[type="checkbox"]');
        addonCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        document.getElementById('flower-quantity').value = 1;
    }, 1500);
}


function calculateTotalPrice() {
    const cartItems = document.querySelectorAll('.cart-item');
    let totalPrice = 0;

    cartItems.forEach(cartItem => {
        const itemPriceElement = cartItem.querySelector('.item-price');
        const itemQuantityElement = cartItem.querySelector('.item-quantity');
        const itemPrice = parseFloat(itemPriceElement.textContent.replace(/[^\d.]/g, ''));
        const itemQuantity = parseInt(itemQuantityElement.textContent, 10);
        totalPrice += itemPrice;
    });

    const totalPriceElement = document.querySelector('.total-price');
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}


function calculateAndUpdateTotalQuantity() {
    const cartItems = document.querySelectorAll('.cart-item');
    let totalQuantity = 0;

    cartItems.forEach(cartItem => {
        const itemQuantityElement = cartItem.querySelector('.item-quantity');
        const itemQuantity = parseInt(itemQuantityElement.textContent, 10);
        totalQuantity += itemQuantity;
    });

    const cardTitleElement = document.querySelector('.Card-title');
    const itemCountElement = cardTitleElement.querySelector('.item-count');
    itemCountElement.textContent = `(${totalQuantity})`;

    const quantityElement = document.querySelector('.quantity');
    quantityElement.textContent = totalQuantity;

    const emptyBasketMessage = document.querySelector('.empty-basket-message');
    const emptyBasketSubmessage = document.querySelector('.empty-basket-submessage');
    const discoverButton = document.querySelector('.discover-button');

    if (totalQuantity === 0) {
        // Show the message and the discover button
        emptyBasketMessage.style.display = 'block';
        emptyBasketSubmessage.style.display = 'block';
        discoverButton.style.display = 'block';
    } else {
        // Hide the message and the discover button
        emptyBasketMessage.style.display = 'none';
        emptyBasketSubmessage.style.display = 'none';
        discoverButton.style.display = 'none';
    }
}
function adjustCartItemsHeight() {
    const cartItems = document.querySelector('.cart-items');
    const totalSection = document.querySelector('.total-section');
    const totalSectionHeight = totalSection.offsetHeight;
    const windowHeight = window.innerHeight;
    const cartItemsMaxHeight = windowHeight - totalSectionHeight - 50; // Adjust this value as needed

    cartItems.style.maxHeight = `${cartItemsMaxHeight}px`;
}

// Call the function initially and whenever the window is resized
window.addEventListener('resize', adjustCartItemsHeight);
adjustCartItemsHeight();

document.addEventListener('DOMContentLoaded', function () {

    const discoverButton = document.querySelector('.discover-button');
    const flowerNav = document.querySelector('.flower-nav');
    const shoppingContainer = document.querySelector('.shopping-container');
    const overlay = document.querySelector('.overlay');
    discoverButton.addEventListener('click', function (event) {

        event.preventDefault();

        shoppingContainer.style.right = '-400px';

        overlay.style.display = 'none';

        setTimeout(function () {
            flowerNav.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded event fired");

    attachCategoryEventListeners();

    showAllFlowers();

    attachAddToCartEventListeners();

});