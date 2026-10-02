// ==========================================
// DATA PRODUK
// ==========================================

const products = [
  {
    id: 1,
    name: "Buket Mawar Merah",
    category: "Mawar",
    price: 150000,
    img: "assets/product-1.jpg"
  },
  {
    id: 2,
    name: "Buket Lily Putih",
    category: "Lily",
    price: 175000,
    img: "assets/product-2.jpg"
  },
  {
    id: 3,
    name: "Buket Tulip Pink",
    category: "Tulip",
    price: 200000,
    img: "assets/product-3.jpg"
  },
  {
    id: 4,
    name: "Buket Baby's Breath",
    category: "Baby's Breath",
    price: 125000,
    img: "assets/product-4.jpg"
  },
  {
    id: 5,
    name: "Buket Campuran",
    category: "Mix",
    price: 180000,
    img: "assets/product-5.jpg"
  },
  {
    id: 6,
    name: "Buket Sunflower",
    category: "Sunflower",
    price: 160000,
    img: "assets/product-6.jpg"
  },
  {
    id: 7,
    name: "Buket Mawar Pink",
    category: "Mawar",
    price: 140000,
    img: "assets/product-7.jpg"
  },
  {
    id: 8,
    name: "Buket Lily Pink",
    category: "Lily",
    price: 170000,
    img: "assets/product-8.jpg"
  },
  {
    id: 9,
    name: "Buket Anggrek Ungu",
    category: "Anggrek",
    price: 220000,
    img: "assets/product-9.jpg"
  },
  {
    id: 10,
    name: "Buket Mawar Putih",
    category: "Mawar",
    price: 155000,
    img: "assets/product-10.jpg"
  },
  {
    id: 11,
    name: "Buket Mawar Peach",
    category: "Mawar",
    price: 165000,
    img: "assets/product-11.jpg"
  },
  {
    id: 12,
    name: "Buket Hydrangea Biru",
    category: "Hydrangea",
    price: 210000,
    img: "assets/product-12.jpg"
  },
  {
    id: 13,
    name: "Buket Lavender",
    category: "Lavender",
    price: 145000,
    img: "assets/product-13.jpg"
  },
  {
    id: 14,
    name: "Buket Daisy Putih",
    category: "Daisy",
    price: 120000,
    img: "assets/product-14.jpg"
  },
  {
    id: 15,
    name: "Buket Peony Pink",
    category: "Peony",
    price: 230000,
    img: "assets/product-15.jpg"
  },
  {
    id: 16,
    name: "Buket Tulip Putih",
    category: "Tulip",
    price: 195000,
    img: "assets/product-16.jpg"
  },
  {
    id: 17,
    name: "Buket Sunflower Ceria",
    category: "Sunflower",
    price: 165000,
    img: "assets/product-17.jpg"
  },
  {
    id: 18,
    name: "Buket Baby's Breath Pink",
    category: "Baby's Breath",
    price: 135000,
    img: "assets/product-18.jpg"
  }
];


// ==========================================
// KATEGORI
// ==========================================

const categories = [
  "Semua",
  "Mawar",
  "Lily",
  "Tulip",
  "Baby's Breath",
  "Sunflower",
  "Mix",
  "Anggrek",
  "Hydrangea",
  "Lavender",
  "Daisy",
  "Peony"
];


// ==========================================
// KERANJANG
// ==========================================

let cart = JSON.parse(
  localStorage.getItem("bloomeCart") || "[]"
);


// ==========================================
// HELPER
// ==========================================

const $ = (selector) => {
  return document.querySelector(selector);
};


const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
};


// ==========================================
// TOAST
// ==========================================

const showToast = (message) => {

  const toast = $("#toast");

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 2500);
};


// ==========================================
// SIMPAN KERANJANG
// ==========================================

const saveCart = () => {

  localStorage.setItem(
    "bloomeCart",
    JSON.stringify(cart)
  );

  updateCartCount();
};


// ==========================================
// JUMLAH KERANJANG
// ==========================================

const updateCartCount = () => {

  const cartCount = $("#cartCount");

  if (!cartCount) return;

  const total = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  cartCount.textContent = total;
};


// ==========================================
// TAMBAH KE KERANJANG
// ==========================================

const addToCart = (id) => {

  const existingItem = cart.find(
    item => item.id === id
  );

  if (existingItem) {

    existingItem.qty += 1;

  } else {

    cart.push({
      id: id,
      qty: 1
    });

  }

  saveCart();

  showToast("Produk berhasil ditambahkan ke keranjang");

};


// ==========================================
// UBAH JUMLAH
// ==========================================

const changeQuantity = (id, delta) => {

  const item = cart.find(
    item => item.id === id
  );

  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {

    cart = cart.filter(
      item => item.id !== id
    );

  }

  saveCart();

  renderCart();
};


// ==========================================
// HAPUS PRODUK
// ==========================================

const removeFromCart = (id) => {

  cart = cart.filter(
    item => item.id !== id
  );

  saveCart();

  renderCart();

  showToast("Produk berhasil dihapus");

};


// ==========================================
// KARTU PRODUK
// ==========================================

const productCard = (product) => {

  return `

    <article class="product-card">

      <img
        src="${product.img}"
        alt="${product.name}"
        loading="lazy"
      >

      <h3>${product.name}</h3>

      <p class="price">
        ${rupiah(product.price)}
      </p>

      <button
        class="add-btn"
        type="button"
        data-add="${product.id}"
      >
        ＋ Tambah
      </button>

    </article>

  `;
};


// ==========================================
// BERANDA
// ==========================================

const renderHome = () => {

  const categoryGrid = $("#categoryGrid");
  const featuredGrid = $("#featuredGrid");

  if (!categoryGrid || !featuredGrid) return;


  const categoryImages = {

    "Mawar": 1,
    "Lily": 2,
    "Tulip": 3,
    "Baby's Breath": 4,
    "Sunflower": 6

  };


  const homeCategories = [
    "Mawar",
    "Lily",
    "Tulip",
    "Baby's Breath",
    "Sunflower"
  ];


  categoryGrid.innerHTML =
    homeCategories.map(category => {

      return `

        <button
          class="category-card"
          type="button"
          data-category="${category}"
        >

          <img
            src="assets/product-${categoryImages[category]}.jpg"
            alt="${category}"
          >

          <strong>
            ${category}
          </strong>

        </button>

      `;

    }).join("");


  featuredGrid.innerHTML =
    products
      .slice(0, 4)
      .map(productCard)
      .join("");

};


// ==========================================
// ISI KATEGORI
// ==========================================

const fillCategories = () => {

  const categorySelect = $("#categorySelect");
  const categorySide = $("#categorySide");

  if (!categorySelect || !categorySide) return;


  categorySelect.innerHTML =
    categories.map(category => {

      return `

        <option value="${category}">
          ${
            category === "Semua"
              ? "Kategori: Semua"
              : category
          }
        </option>

      `;

    }).join("");


  categorySide.innerHTML =
    categories.map(category => {

      const total =
        category === "Semua"

          ? products.length

          : products.filter(
              product =>
                product.category === category
            ).length;


      return `

        <button
          type="button"
          class="${
            category === "Semua"
              ? "active"
              : ""
          }"
          data-cat="${category}"
        >

          <span>${category}</span>

          <span>${total}</span>

        </button>

      `;

    }).join("");

};


// ==========================================
// TAMPILKAN PRODUK
// ==========================================

const renderProducts = () => {

  const productGrid = $("#productGrid");

  if (!productGrid) return;


  const searchInput = $("#searchInput");
  const categorySelect = $("#categorySelect");
  const sortSelect = $("#sortSelect");


  const query =
    searchInput
      ? searchInput.value.toLowerCase().trim()
      : "";


  const category =
    categorySelect
      ? categorySelect.value
      : "Semua";


  const sort =
    sortSelect
      ? sortSelect.value
      : "default";


  let list = products.filter(product => {

    const matchCategory =
      category === "Semua" ||
      product.category === category;


    const matchSearch =
      product.name
        .toLowerCase()
        .includes(query);


    return matchCategory && matchSearch;

  });


  if (sort === "low") {

    list.sort(
      (a, b) => a.price - b.price
    );

  }


  if (sort === "high") {

    list.sort(
      (a, b) => b.price - a.price
    );

  }


  if (sort === "name") {

    list.sort(
      (a, b) =>
        a.name.localeCompare(b.name)
    );

  }


  if (!list.length) {

    productGrid.innerHTML = `

      <p class="empty-message">
        Tidak ada produk yang cocok.
      </p>

    `;

  } else {

    productGrid.innerHTML =
      list.map(productCard).join("");

  }


  document
    .querySelectorAll("#categorySide button")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.cat === category
      );

    });

};


// ==========================================
// TAMPILKAN KERANJANG
// ==========================================

const renderCart = () => {

  const cartItems = $("#cartItems");
  const totals = $("#totals");

  if (!cartItems || !totals) return;


  if (!cart.length) {

    cartItems.innerHTML = `

      <div class="empty-cart">

        <p>
          Keranjang masih kosong.
        </p>

        <a
          class="btn btn-primary"
          href="#produk"
        >
          Pilih Bunga
        </a>

      </div>

    `;

    totals.innerHTML = "";

    return;

  }


  cartItems.innerHTML =
    cart.map(item => {

      const product =
        products.find(
          product => product.id === item.id
        );


      if (!product) return "";


      return `

        <article class="cart-row">

          <img
            src="${product.img}"
            alt="${product.name}"
          >

          <div>

            <h3>
              ${product.name}
            </h3>

            <p class="price">
              ${rupiah(product.price)}
            </p>

            <div class="qty">

              <button
                type="button"
                data-minus="${product.id}"
              >
                −
              </button>

              <span>
                ${item.qty}
              </span>

              <button
                type="button"
                data-plus="${product.id}"
              >
                ＋
              </button>

            </div>

          </div>

          <button
            class="remove"
            type="button"
            data-remove="${product.id}"
          >
            🗑
          </button>

        </article>

      `;

    }).join("");


  const subtotal =
    cart.reduce((total, item) => {

      const product =
        products.find(
          product => product.id === item.id
        );

      if (!product) return total;

      return total +
        product.price * item.qty;

    }, 0);


  const shipping =
    subtotal > 0 ? 25000 : 0;


  const total =
    subtotal + shipping;


  totals.innerHTML = `

    <div class="total-line">

      <span>
        Subtotal
      </span>

      <span>
        ${rupiah(subtotal)}
      </span>

    </div>

    <div class="total-line">

      <span>
        Ongkos Kirim
      </span>

      <span>
        ${rupiah(shipping)}
      </span>

    </div>

    <div class="total-line grand">

      <span>
        <strong>Total</strong>
      </span>

      <span>
        <strong>${rupiah(total)}</strong>
      </span>

    </div>

  `;

};


// ==========================================
// PINDAH KE PRODUK
// ==========================================

const goProducts = (category = "Semua") => {

  location.hash = "produk";

  const categorySelect =
    $("#categorySelect");

  if (categorySelect) {

    categorySelect.value = category;

  }

  renderProducts();

};


// ==========================================
// ROUTING HALAMAN
// ==========================================

const route = () => {

  let page =
    location.hash.replace("#", "");


  if (!page) {

    page = "beranda";

  }


  const allowedPages = [
    "beranda",
    "produk",
    "pesanan"
  ];


  if (!allowedPages.includes(page)) {

    page = "beranda";

  }


  document
    .querySelectorAll(".page")
    .forEach(section => {

      section.classList.toggle(
        "active",
        section.id === page
      );

    });


  document
    .querySelectorAll(".main-nav a")
    .forEach(link => {

      link.classList.toggle(
        "active",
        link.dataset.page === page
      );

    });


  if (page === "produk") {

    renderProducts();

  }


  if (page === "pesanan") {

    renderCart();

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

};


// ==========================================
// EVENT KATEGORI BERANDA
// ==========================================

const categoryGrid = $("#categoryGrid");

if (categoryGrid) {

  categoryGrid.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          "[data-category]"
        );


      if (!button) return;


      goProducts(
        button.dataset.category
      );

    }
  );

}


// ==========================================
// EVENT PRODUK & KERANJANG
// ==========================================

document.addEventListener(
  "click",
  event => {

    const addButton =
      event.target.closest("[data-add]");


    const minusButton =
      event.target.closest("[data-minus]");


    const plusButton =
      event.target.closest("[data-plus]");


    const removeButton =
      event.target.closest("[data-remove]");


    if (addButton) {

      addToCart(
        Number(addButton.dataset.add)
      );

    }


    if (minusButton) {

      changeQuantity(
        Number(minusButton.dataset.minus),
        -1
      );

    }


    if (plusButton) {

      changeQuantity(
        Number(plusButton.dataset.plus),
        1
      );

    }


    if (removeButton) {

      removeFromCart(
        Number(removeButton.dataset.remove)
      );

    }

  }
);


// ==========================================
// SEARCH
// ==========================================

const searchInput = $("#searchInput");

if (searchInput) {

  searchInput.addEventListener(
    "input",
    renderProducts
  );

}


// ==========================================
// FILTER KATEGORI
// ==========================================

const categorySelect =
  $("#categorySelect");

if (categorySelect) {

  categorySelect.addEventListener(
    "change",
    renderProducts
  );

}


// ==========================================
// SORT
// ==========================================

const sortSelect =
  $("#sortSelect");

if (sortSelect) {

  sortSelect.addEventListener(
    "change",
    renderProducts
  );

}


// ==========================================
// TOMBOL KERANJANG
// ==========================================

const cartButton =
  $("#cartButton");

if (cartButton) {

  cartButton.addEventListener(
    "click",
    () => {

      location.hash = "pesanan";

    }
  );

}


// ==========================================
// SIDEBAR KATEGORI
// ==========================================

const categorySide =
  $("#categorySide");

if (categorySide) {

  categorySide.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          "button[data-cat]"
        );


      if (!button) return;


      const category =
        button.dataset.cat;


      const categorySelect =
        $("#categorySelect");


      if (categorySelect) {

        categorySelect.value =
          category;

      }


      renderProducts();

    }
  );

}


// ==========================================
// FORM PESANAN
// ==========================================

const orderForm =
  $("#orderForm");


if (orderForm) {

  orderForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      // CEK KERANJANG

      if (!cart.length) {

        showToast(
          "Keranjang masih kosong"
        );

        return;

      }


      // AMBIL DATA FORM

      const formData =
        new FormData(orderForm);


      const name =
        formData.get("name");


      const payment =
        formData.get("payment");


      // VALIDASI NAMA

      if (!name) {

        showToast(
          "Silakan isi nama terlebih dahulu"
        );

        return;

      }


      // VALIDASI PEMBAYARAN

      if (!payment) {

        showToast(
          "Silakan pilih metode pembayaran"
        );

        return;

      }


      // ==================================
      // PESANAN BERHASIL
      // ==================================

      showToast(
        `Pesanan berhasil dibuat! Terima kasih, ${name}.`
      );


      // KOSONGKAN KERANJANG

      cart = [];


      saveCart();


      // UPDATE TAMPILAN

      renderCart();


      // RESET FORM

      orderForm.reset();

    }
  );

}


// ==========================================
// HASH CHANGE
// ==========================================

window.addEventListener(
  "hashchange",
  route
);


// ==========================================
// JALANKAN PROGRAM
// ==========================================

renderHome();

fillCategories();

renderProducts();

updateCartCount();

route();