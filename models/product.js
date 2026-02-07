const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }

  save() {
    const db = getDb();
    if (this._id) {
      // update the product
      return db.collection("products").updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        {
          $set: {
            title: this.title,
            price: this.price,
            description: this.description,
            imageUrl: this.imageUrl,
          },
        },
      );
    } else {
      // create a new product
      return db.collection("products").insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("products").find().toArray();
  }

  static findById(productId) {
    const db = getDb();
    return db
      .collection("products")
      .find({
        _id: new mongodb.ObjectId(productId),
      })
      .next();
  }
}

module.exports = Product;
