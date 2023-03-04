const tbody = document.querySelector("tbody");
fetch("http://localhost:3000/products")
  .then((response) => response.json())
  .then((data) => {
    show(data);
    const btnEdit = document.querySelectorAll(".btn-edit");
    for (const btn of btnEdit) {
      const id = btn.dataset.id;
      btn.addEventListener("click", function () {
        return edit(id);
      });
    }
    const btnRemove = document.querySelectorAll(".btn-remove");
    for (const btn of btnRemove) {
      const id = btn.dataset.id;
      btn.addEventListener("click", function () {
        if (confirm("Bạn có muốn xóa?")) {
          return remove(id);
        }
      });
    }
  });

const show = (data) => {
  tbody.innerHTML = data
    .map((product, i) => {
      return `
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      ${i + 1}
      </th>
      <td class="px-6 py-4">
      ${product.productName}
      </td>
      <td class="px-6 py-4">
      ${product.quantity}
      </td>
      <td class="px-6 py-4">
      ${product.price}
      </td>
      <td class="px-6 py-4">
      ${product.category}
      </td>
      <td class="px-6 py-4">
      <button data-id="${product.id}" class="btn-remove">Xóa</button>/
      <button data-id=${product.id} class="btn-edit">Sửa</button>
      </td>
  </tr>
    `;
    })
    .join("");
};

const remove = (id) => {
  fetch(`http://localhost:3000/products/${id}`, {
    method: "DELETE",
  });
};
const fields = ["name", "price", "description", "quantity", "category"];

const formAdd = document.querySelector("#form-add");
const name = document.querySelector("#name");
const quantity = document.querySelector("#quantity");
const price = document.querySelector("#price");
const category = document.querySelector("#category");
const description = document.querySelector("#description");
formAdd.addEventListener("submit", function (e) {
  e.preventDefault();
  let validate = true;
  let data = {};
  fields.forEach((field) => {
    const element = document.querySelector("#" + field);
    const errorElement = document.querySelector(".error-" + field);
    if (!element.value) {
      validate = false;
      errorElement.innerHTML = "Dữ liệu không đươc trống";
    }
    data[field] = element.value;
  });
  const newProduct = {
    productName: name.value,
    quantity: quantity.value,
    price: price.value,
    category: category.value,
    desc: description.value,
  };
  if (validate) {
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
  }
});

const edit = (id) => {
  document.querySelector("body").innerHTML = /*html*/ `
  <form id="form-edit" class="space-y-4">
  <div>
      <label class="" for="name">Tên</label>
      <input class="w-full rounded-lg border-gray-200 p-3 text-sm" placeholder="Tên" type="text"
          id="name" value=""/>
      <div class="error error-name text-rose-600"></div>
  </div>
  <div>
      <label class="" for="quantity">Số lượng</label>
      <input class="w-full rounded-lg border-gray-200 p-3 text-sm" placeholder="" type="number"
          id="quantity" />
      <div class="error error-quantity text-rose-600"></div>
  </div>
  <div>
      <label class="" for="price">Giá</label>
      <input class="w-full rounded-lg border-gray-200 p-3 text-sm" placeholder="" type="number"
          id="price" />
  </div>
  <div class="error error-price text-rose-600"></div>
  <div>
      <label class="" for="category">Loại</label>
      <input class="w-full rounded-lg border-gray-200 p-3 text-sm" placeholder="" type="text"
          id="category" />
  </div>
  <div class="error error-category text-rose-600"></div>
  <div>
      <label class="" for="description">Mô tả</label>

      <textarea class="w-full rounded-lg border-gray-200 p-3 text-sm" placeholder="Mô tả" rows="8"
          id="description"></textarea>
      <div class="error error-description text-rose-600"></div>
  </div>

  <div class="mt-4">
      <button type="submit"
          class="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto">
          Thêm mới
      </button>
  </div>
</form>
  `;
  document.querySelector("#form-edit").addEventListener("submit", function () {
    const name = document.querySelector("#name");
    const quantity = document.querySelector("#quantity");
    const price = document.querySelector("#price");
    const category = document.querySelector("#category");
    const description = document.querySelector("#description");
    const newProduct = {
      productName: name.value,
      quantity: quantity.value,
      price: price.value,
      category: category.value,
      desc: description.value,
    };
    fetch(`http://localhost:3000/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
  });
};
