const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    return res.render("shop/product-list", {
      prods: products,
      pageTitle: "All products",
      path: "/products",
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductDetails = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.redirect("/");
    }

    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: `/products`,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    return res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (err) {
    next(err);
  }
};

/* exports.getCart = async (req, res, next) => {
  const user = req.user;

  try {
    const cart = await user.getCart();
    const products = await cart.getProducts();

    if (!products) {
      return res.redirect("/");
    }

    res.render("shop/cart", {
      pageTitle: "Your Cart",
      path: "/cart",
      products,
    });
  } catch (err) {
    next(err);
  }
};

exports.postCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await req.user.getCart();
    const productSequelize = await cart.getProducts({
      where: { id: productId },
    });

    const manageProductAndQty = async () => {
      if (productSequelize.length) {
        const product = productSequelize[0];
        const oldQuantity = product.cartItem.quantity;
        const quantity = oldQuantity + 1;
        return { product, quantity };
      } else {
        const product = await Product.findByPk(productId);
        return { product, quantity: 1 };
      }
    };

    const { product, quantity } = await manageProductAndQty();
    await cart.addProduct(product, {
      through: { quantity: quantity },
    });
    await res.redirect("/cart");
  } catch (err) {
    console.log(err);
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const productId = req.body.productId;
  const user = req.user;

  try {
    const cart = await user.getCart();
    const products = await cart.getProducts({ where: { id: productId } });
    const product = products[0];
    await product.cartItem.destroy();
    return res.redirect("/cart");
  } catch (err) {
    next(err);
  }
};

exports.postOrder = async (req, res, next) => {
  const user = req.user;
  let fetchedCart;

  try {
    const cart = await user.getCart();
    fetchedCart = cart;
    const products = await cart.getProducts();
    const order = await user.createOrder();
    await order.addProducts(
      products.map((product) => {
        product.orderItem = { quantity: product.cartItem.quantity };
        return product;
      }),
    );

    await fetchedCart.setProducts(null);

    return res.redirect("/orders");
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  const user = req.user;

  try {
    const orders = await user.getOrders({ include: ["products"] });

    res.render("shop/orders", {
      pageTitle: "Your Orders",
      path: "/orders",
      orders,
    });
  } catch (err) {
    next(err);
  }
};
 */
