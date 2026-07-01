const products = [
  {
    sku: "ALV-TB-001",
    title: "Emerald Coast Dining Table",
    category: "tables",
    categoryLabel: "Tables",
    material: "Olive wood, turquoise resin, steel base",
    price: "\u20ac4,800",
    image: "assets/images/hero-river-table.jpg",
    description: "A sculptural river table with bright resin depth and live-edge movement.",
  },
  {
    sku: "ALV-TB-002",
    title: "Noir River Dining Table",
    category: "tables",
    categoryLabel: "Tables",
    material: "Burnt pine, black resin, satin finish",
    price: "\u20ac2,900",
    image: "assets/images/table-noir-river.jpg",
    description: "A bold dining table with dark resin and warm visible grain.",
  },
  {
    sku: "ALV-TB-003",
    title: "Laguna Round Table",
    category: "tables",
    categoryLabel: "Tables",
    material: "Olive wood, deep green resin, crossed metal base",
    price: "\u20ac3,200",
    image: "assets/images/table-emerald-round.jpg",
    description: "A round statement table with transparent resin and organic timber islands.",
  },
  {
    sku: "ALV-TB-004",
    title: "Smoked Oak Console",
    category: "tables",
    categoryLabel: "Tables",
    material: "Live-edge wood, clear resin, black steel legs",
    price: "\u20ac2,400",
    image: "assets/images/table-olive-console.jpg",
    description: "A lean console table for entrances, offices and narrow dining spaces.",
  },
  {
    sku: "ALV-AW-001",
    title: "Tyrrhenian Wave Panel",
    category: "artworks",
    categoryLabel: "Artworks",
    material: "Pigmented resin on wood panel",
    price: "\u20ac1,450",
    image: "assets/images/art-tyrrhenian-wave.jpg",
    description: "A textured coastal artwork with dark mineral tones and raised resin movement.",
  },
  {
    sku: "ALV-AW-002",
    title: "Gold Line Relief",
    category: "artworks",
    categoryLabel: "Artworks",
    material: "Wood strips, black resin, gold pigment",
    price: "\u20ac850",
    image: "assets/images/art-gold-line-relief.jpg",
    description: "A graphic relief panel with carved rhythm, shadow and metallic warmth.",
  },
  {
    sku: "ALV-AW-003",
    title: "World Resin Map",
    category: "artworks",
    categoryLabel: "Artworks",
    material: "Carved wood map, blue resin, light detail",
    price: "\u20ac1,200",
    image: "assets/images/art-world-map.jpg",
    description: "A luminous map piece for lounges, studios and hospitality walls.",
  },
  {
    sku: "ALV-AW-004",
    title: "Blue Current Panel",
    category: "artworks",
    categoryLabel: "Artworks",
    material: "Blue resin, white pigment, metallic inserts",
    price: "\u20ac520",
    image: "assets/images/art-blue-current.jpg",
    description: "A compact wall panel with ocean-like motion and glossy finish.",
  },
  {
    sku: "ALV-OB-001",
    title: "Live Edge Wall Clock",
    category: "objects",
    categoryLabel: "Objects",
    material: "Olive wood, steel ring, Roman numerals",
    price: "\u20ac580",
    image: "assets/images/object-live-edge-clock.jpg",
    description: "A handmade wall clock balancing natural edges with a clean metal frame.",
  },
  {
    sku: "ALV-OB-002",
    title: "Burnt Oak Centerpiece",
    category: "objects",
    categoryLabel: "Objects",
    material: "Wood burl, translucent resin, polished top",
    price: "\u20ac690",
    image: "assets/images/table-burnt-oak.jpg",
    description: "A smaller object-scale piece for side tables, reception desks or display.",
  },
];

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const productGrid = document.querySelector("[data-products]");
const filters = document.querySelectorAll("[data-filter]");
const dialog = document.querySelector("[data-dialog]");
const dialogImage = document.querySelector("[data-dialog-image]");
const dialogCategory = document.querySelector("[data-dialog-category]");
const dialogTitle = document.querySelector("[data-dialog-title]");
const dialogMaterial = document.querySelector("[data-dialog-material]");
const dialogDescription = document.querySelector("[data-dialog-description]");
const dialogPrice = document.querySelector("[data-dialog-price]");
const dialogMail = document.querySelector("[data-dialog-mail]");
const dialogClose = document.querySelector("[data-dialog-close]");
const commissionForm = document.querySelector("[data-commission-form]");
const formStatus = document.querySelector("[data-form-status]");
const contactEmail = "info@alverostudio.com";

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

function toggleMenu() {
  const isOpen = nav.classList.toggle("open");
  header.classList.toggle("open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
}

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card" data-category="${product.category}" data-sku="${product.sku}">
          <img src="${product.image}" alt="${product.title}" loading="lazy" />
          <div class="product-card-body">
            <span class="product-meta">${product.categoryLabel} / ${product.sku}</span>
            <h3>${product.title}</h3>
            <p>${product.material}</p>
            <span class="product-price">${product.price}</span>
            <button class="button primary" type="button" data-product="${product.sku}">Request Details</button>
          </div>
        </article>
      `
    )
    .join("");
}

function setFilter(category) {
  filters.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === category);
  });

  document.querySelectorAll(".product-card").forEach((card) => {
    card.hidden = category !== "all" && card.dataset.category !== category;
  });
}

function mailtoFor(product) {
  const subject = encodeURIComponent(`Inquiry: ${product.title} (${product.sku})`);
  const body = encodeURIComponent(
    `Hello ALVERO Studio,\n\nI am interested in ${product.title} (${product.sku}).\nPrice shown: ${product.price}.\n\nPlease send availability, delivery options and payment details.\n\nThank you.`
  );
  return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
}

function openProduct(sku) {
  const product = products.find((item) => item.sku === sku);
  if (!product) return;

  dialogImage.src = product.image;
  dialogImage.alt = product.title;
  dialogCategory.textContent = `${product.categoryLabel} / ${product.sku}`;
  dialogTitle.textContent = product.title;
  dialogMaterial.textContent = product.material;
  dialogDescription.textContent = product.description;
  dialogPrice.textContent = `Starting price ${product.price}`;
  dialogMail.href = mailtoFor(product);

  document.body.classList.add("dialog-open");
  dialog.showModal();
}

function closeProduct() {
  document.body.classList.remove("dialog-open");
  dialog.close();
}

renderProducts();
updateHeader();

window.addEventListener("scroll", updateHeader, { passive: true });

menuToggle.addEventListener("click", toggleMenu);

nav.addEventListener("click", () => {
  nav.classList.remove("open");
  header.classList.remove("open");
  document.body.classList.remove("menu-open");
});

filters.forEach((button) => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-product]");
  if (button) openProduct(button.dataset.product);
});

dialogClose.addEventListener("click", closeProduct);

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeProduct();
});

dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
});

commissionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(commissionForm);
  const subject = encodeURIComponent(`Commission request: ${data.get("type")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nProject type: ${data.get("type")}\nBudget: ${data.get("budget")}\n\nMessage:\n${data.get("message") || ""}`
  );
  formStatus.textContent = "Opening your email draft.";
  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
});
