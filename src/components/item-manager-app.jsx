import { useRef, useState } from "react";
import "./item-manager-app.css";

import deleteLogo from "../assets/delete.svg";
import stationaryLogo from "../assets/ink_pen.svg";
import kitchenwareLogo from "../assets/flatware.svg";
import applianceLogo from "../assets/electrical_services.svg";

const categoryIcon = {
  Stationary: stationaryLogo,
  Kitchenware: kitchenwareLogo,
  Appliance: applianceLogo,
};

export default function ItemManager() {
  /**
   * !!! IMPORTANT !!!
   * - You MUST use the given states and refs in your code.
   * - You MUST preserve the given id and className attributes.
   */

  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // You must use this ref for the item name input
  const itemName = useRef(null);

  const [category, setCategory] = useState(""); 
  const [price, setPrice] = useState(0);
  const nextId = useRef(1);

  function validate(name, cat, p) {
    if (!name || name.trim().length === 0) {
      return "Item name must not be empty";
    }

    const duplicated = items.some(
      (it) => it.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
    if (duplicated) {
      return "Item must not be duplicated";
    }

    if (!cat) {
      return "Please select a category";
    }

    if (Number.isNaN(p) || p <= 0) {
      return "Price must not be less than 0";
    }

    return "";
  }

  function handleAddItem() {
    const name = (itemName.current?.value ?? "").trim();
    const cat = category;
    const p = Number(price);

    const msg = validate(name, cat, p);
    if (msg) {
      setErrorMsg(msg);
      return;
    }

    setErrorMsg("");

    const newItem = {
      id: nextId.current++,
      name,
      category: cat,
      price: p,
    };

    setItems((prev) => [...prev,newItem]);

    if (itemName.current) itemName.current.value = "";
    setCategory("");
    setPrice(0);
  }

  function handleDelete(id) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  return (
    <>
      <div id="h1">Item Management</div>

      <div id="data-area">
        <table id="item-table" className="item-table">
          <thead>
            <tr>
              <th id="col-item-id">ID</th>
              <th id="col-item-name">Name</th>
              <th id="col-item-category">Category</th>
              <th id="col-item-price">Price</th>
              <th id="col-item-action">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* Data rows */}
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>{item.name}</td>

                <td>
                  <img
                    src={categoryIcon[item.category]}
                    alt={item.category}
                    className="category-logo"
                  />
                </td>

                <td>{item.price}</td>

                <td>
                  <img
                    src={deleteLogo}
                    alt="delete"
                    className="delete-logo"
                    onClick={() => handleDelete(item.id)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}

            <tr>
              <td>-</td>
              <td>
                <input
                  ref={itemName}
                  type="text"
                  placeholder="Item name"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddItem();
                  }}
                />
              </td>

              <td>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="Stationary">Stationary</option>
                  <option value="Kitchenware">Kitchenware</option>
                  <option value="Appliance">Appliance</option>
                </select>
              </td>

              <td>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </td>

              <td>
                <button type="button" className="add-btn" onClick={handleAddItem}>
                  Add Item
                </button>
              </td>
            </tr>

          </tbody>
        </table>

        {/* You MUST display the errorMsg state here. */}
        {errorMsg && <div id="error-message">{errorMsg}</div>}
      </div>
    </>
  );
}
