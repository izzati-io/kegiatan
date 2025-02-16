document.addEventListener("DOMContentLoaded", function () {
  const dataForm = document.getElementById("dataForm");
  const dataList = document.getElementById("dataList");
  let data = JSON.parse(localStorage.getItem("data")) || [];

  function renderData() {
    dataList.innerHTML = "";
    data.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${item.date}</td>
                       <td>${item.tiktok}</td>
                       <td>${item.shopee}</td>
                       <td>${item.tokopedia}</td>
                       <td><button onclick="deleteData(${index})">Hapus</button></td>`;
      dataList.appendChild(row);
    });
  }

  dataForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newData = {
      date: document.getElementById("date").value,
      tiktok: document.getElementById("tiktok").value || 0,
      shopee: document.getElementById("shopee").value || 0,
      tokopedia: document.getElementById("tokopedia").value || 0
    };
    data.push(newData);
    localStorage.setItem("data", JSON.stringify(data));
    renderData();
    dataForm.reset();
  });

  window.deleteData = function (index) {
    data.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(data));
    renderData();
  };

  document.getElementById("clearData").addEventListener("click", function () {
    if (confirm("Hapus semua data?")) {
      localStorage.removeItem("data");
      data = [];
      renderData();
    }
  });

  renderData();
});