
/* --- DATOS INICIALES --- */

const products = [
  {
    name: 'HP 15-fd0080ns Intel Core i5‑1334U/16GB/512GB SSD/15.6"',
    price: 549,
    stars: 4.6,
    reviews: 766,
    seller: 'PcComponentes',
    image: './src/ordenador1.webp'
  },
  {
    name: 'HP Victus 16-s0011ns AMD Ryzen 7 7840HS/32GB/1TB SSD/RTX 4060',
    price: 1099,
    stars: 4.6,
    reviews: 271,
    seller: 'PcComponentes',
    image: './src/ordenador2.webp'
  },
  {
    name: 'Lenovo IdeaPad Slim 3 Gen 8 i5‑13420H/16GB/1TB SSD/15.6"',
    price: 489,
    stars: 4.6,
    reviews: 278,
    seller: 'PcComponentes',
    image: './src/ordenador3.webp'
  },
  {
    name: 'Lenovo LOQ 15IRH8 i5‑12450HX/24GB/512GB SSD/RTX 3050',
    price: 649,
    stars: 4.5,
    reviews: 63,
    seller: 'PcComponentes',
    image: './src/ordenador4.webp'
  },
  {
    name: 'Dell Inspiron 3530 i5‑1334U/16GB/512GB SSD/15.6"',
    price: 599,
    stars: 4.5,
    reviews: 12,
    seller: 'PcComponentes',
    image: './src/ordenador5.webp'
  },
  {
    name: 'Acer Gaming Nitro V 15 (Ryzen 7 7735HS/32GB/1TB SSD/RTX 4060)',
    price: 899,
    stars: 4.4,
    reviews: 1410,
    seller: 'PcComponentes',
    image: './src/ordenador6.webp'
  },
  {
    name: 'Asus TUF Gaming A15 FA506NCR (Ryzen 7 7435HS/16GB/512GB SSD/RTX 3050)',
    price: 639,
    stars: 4.5,
    reviews: 528,
    seller: 'PcComponentes',
    image: './src/ordenador7.webp'
  },
  {
    name: 'HP 255 G10 Ryzen 7 7730U/32GB/1TB SSD/15.6"',
    price: 805.17,
    stars: 4.4,
    reviews: 9,
    seller: 'PcComponentes',
    image: './src/ordenador8.webp'
  },
  {
    name: 'Lenovo LOQ 15IRX9 i7‑13650HX/24GB/1TB SSD/RTX 3050',
    price: 699,
    stars: 4.5,
    reviews: 668,
    seller: 'PcComponentes',
    image: './src/ordenador9.webp'
  },
  {
    name: 'HP Envy 17‑da0003ns i7‑155U/32GB/1TB SSD/RTX 3050',
    price: 1799,
    stars: 4.6,
    reviews: 75,
    seller: 'PcComponentes',
    image: './src/ordenador10.webp'
  }
];
const naming = "PC Shop";
const date = new Date();
const yearActual = date.getFullYear();

/* --- COMPONENTES HTML --- */

const HEADER = (naming) => `
  <header>
    <h1>${naming}</h1>
  </header>
`;

const FILTER = () => `
<form>
  <div>
    <label for="text">Búsqueda de filtros</label>
    <input type="text" id="inputText" placeholder="Buscar por texto">
  </div>

  <div>
    <label for="filter">Ordenar</label>
    <select name="filter" id="filter">
      <option value="default" selected> - Ordenar - </option>
      <option value="AToZ">Nombre de A - Z</option>
      <option value="ZToA">Nombre de Z - A</option>
      <option value="HighPrice">Precio más alto</option>
      <option value="LowPrice">Precio más bajo</option>
      <option value="Ranking">Mejor valorados</option>
    </select>
  </div>
</form>
`;

const CARD = (product) => {
  const keys = Object.keys(product);
  return `
  <article class="product-card">
    <img class="card-${keys[5]}" src="${product.image}" alt="${product.name}"></img>
    <h2 class="card-${keys[0]}">${product.name}</h2>
    <h3 class="card-${keys[1]}">${product.price}€</h3>
    <ul>
    <li class="card-${keys[2]}">${product.stars}/5 ⭐</li>
    <li class="card-${keys[3]}">${product.reviews} opiniones</li>
    </ul>
    <p class="card-${keys[4]}">vendedor: ${product.seller}</p>
  </article>
`};

const FOOTER = (naming, yearActual) => `
  <footer>
    <p>Copyright&copy ${yearActual} - ${naming}</p>
  </footer>
`;

/* --- FUNCIONES ---*/

// funcion para renderizar las tarjetas.
const renderProductCards = (products) => {
  let productCardsHTML = "";

  if (products.length > 0){
    for (const product of products){
    productCardsHTML += CARD(product);
    }
  } else {
    productCardsHTML = "<h3>No hay ninguna coincidencia.</h3>";
  }
  
  return productCardsHTML;
};

// funcion para el filtrado
const filterFunction = (list) => {
  const inputText = document.querySelector("#inputText").value.toLowerCase();
  const selectElement = document.querySelector("#filter").value;
  
  let listFiltered = list.filter((product) =>
    product.name.toLowerCase().includes(inputText)
  );

  if (selectElement === "AToZ"){
    listFiltered.sort((a, b) => a.name.localeCompare(b.name));
  } else if(selectElement === "ZToA"){
    listFiltered.sort((a, b) => b.name.localeCompare(a.name));
  } else if (selectElement === "HighPrice"){
    listFiltered.sort((a, b) => b.price - a.price);
  } else if (selectElement === "LowPrice"){
    listFiltered.sort((a, b) => a.price - b.price);
  } else if (selectElement === "Ranking"){
    listFiltered.sort((a, b) => b.stars - a.stars);
  };

  return listFiltered;
};

// funcion para actualizar las tarjetas.
const updateProductCards = () => {
  const section = document.querySelector(".product-cards-section");
  section.innerHTML = renderProductCards(filterFunction(products));
};

/* --- Renderizador del HTML---*/
const init = () => {
  document.body.innerHTML = `
  ${HEADER(naming)}
  <main>
    <section class="filter">
      ${FILTER()}
    </section>
    <section class="product-cards-section">
    </section>
  </main>
  ${FOOTER(naming, yearActual)}
  `;

  updateProductCards();

  document.querySelector("#inputText").addEventListener("input", updateProductCards);
  document.querySelector("#filter").addEventListener("change", updateProductCards);
};

init();