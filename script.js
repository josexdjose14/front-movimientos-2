const URL_API = "http://localhost:3000/movimientos";
const URL_API_RENDER = "https://miniback-movimientos-2-render.onrender.com/movimientos";

const mainContainer = document.getElementById("mainContainer");
const bodyTable = document.getElementById("table__body");
const footTable = document.getElementById("table__foot");



const content__price = document.getElementsByClassName("content__price");
const content__type = document.getElementsByClassName("content__type");

const getMovimientos = async () => {
  try {

    const { data } = await axios.get(URL_API_RENDER);
    return data;

  } catch (error) {
    console.log(error);
    return [];
  }
}
let total = [];
let subTotal = 0;
document.addEventListener("DOMContentLoaded", async () => {

  const movimientos = await getMovimientos();
  console.log(movimientos);
  movimientos.forEach(element => {


    bodyTable.innerHTML += `
    <tr>
      <td>${element.id}</td>
      <td>${element.description}</td>
      <td class="content__price">${element.price}</td>
      <td class="content__type">${element.type}</td>
    </tr>
    `
    if (element.type == "ingreso") {
      total.push(+element.price);
    } else {
      total.push(-element.price);
    }
    if (total.length == 5) {

      console.log(total)

      total.forEach(conteo => {
        subTotal += conteo;
        footTable.innerHTML = `
      <th>
            <td>  </td>
            <td>${subTotal}</td>
            <td>TOTAL</td>
          </th>
      `
      });
    }
  });

})

/*
      if (content__price.length == 5) {
        console.log("entro");
        let total = 0;
        content__type.forEach(elem, index => {
          console.log(elem);
          if (elem == "ingreso") {
            total += Number(content__price[index]);
          } else {
            total -= Number(content__price[index]);
          }
  
        });
        footTable.innerHTML = `
      <th>
            <td> </td>
            <td> </td>
            <td>${total}</td>
            <td>TOTAL</td>
          </th>
      `
      }
      */