const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;

  try {
    const product = new Product(title, price, description, imageUrl);

    await product.save();

    res.redirect("/admin/products");
  } catch (err) {
    next(err);
  }
};

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.redirect("/");
    }

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product,
    });
  } catch (err) {
    next(err);
  }
};

exports.postEditProduct = async (req, res, next) => {
  const { productId, title, imageUrl, description, price } = req.body;

  try {
    const product = new Product(title, price, description, imageUrl, productId);
    await product.save();

    res.redirect("/admin/products");
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();

    return res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  } catch (err) {
    next(err);
  }
};

/* exports.postDeleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.body;

    await Product.destroy({ where: { id: productId } });

    return res.redirect("/admin/products");
  } catch (err) {
    next(err);
  }
}; */
