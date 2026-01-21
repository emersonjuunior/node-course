const { where } = require("sequelize");
const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;

  try {
    await req.user.createProduct({
      title,
      imageUrl,
      description,
      price,
    });

    return res.redirect("/admin/products");
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
    const products = await req.user.getProducts({ where: { id: productId } });
    const product = products[0];

    if (!product) {
      return res.redirect("/");
    }

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  } catch (err) {
    next(err);
  }
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, description, price } = req.body;

  Product.findByPk(productId)
    .then((product) => {
      product.title = title;
      product.price = price;
      product.description = description;
      product.imageUrl = imageUrl;

      // update on db
      return product.save();
    })
    .then(() => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await req.user.getProducts();

    return res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  } catch (err) {
    next(err);
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.body;

    await Product.destroy({ where: { id: productId } });

    return res.redirect("/admin/products");
  } catch (err) {
    next(err);
  }
};
