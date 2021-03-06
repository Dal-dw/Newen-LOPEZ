import { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("LocalCart")) || []
  );

  const addLocalStorage = (products) => {
    localStorage.setItem("LocalCart", JSON.stringify(products));
  };
  addLocalStorage(products);

  const addProducts = (product) => {
    const exist = products.find((x) => x.id === product.id);
    if (exist) {
      setProducts(
        products.map((x) =>
          x.id === product.id
            ? {
                ...exist,
                amount: exist.amount + product.amount,
              }
            : x
        )
      );
    } else {
      setProducts([...products, { ...product, amount: product.amount }]);
    }
  };
  const totalPrice = products.reduce((a, c) => a + c.price * c.amount, 0);

  const data = {
    products,
    addProducts,
    totalPrice,
    setProducts,
  };
  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export { CartProvider };
export default CartContext;
