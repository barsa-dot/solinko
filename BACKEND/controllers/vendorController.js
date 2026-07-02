const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(process.env.DATABASE_PATH);


// GET ALL VENDORS
const getVendors = (req, res) => {

  db.all(
    "SELECT * FROM vendors",
    [],
    (err, rows) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);

    }
  );

};


// GET SINGLE VENDOR
const getVendorById = (req, res) => {

  const { id } = req.params;

  db.get(
    `
    SELECT *
    FROM vendors
    WHERE id = ?
    `,
    [id],

    (err, row) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (!row) {
        return res.status(404).json({
          message: "Vendor not found"
        });
      }

      // Add missing fields with defaults for frontend compatibility
      const vendor = {
        ...row,
        tagline: row.tagline || "Local vendor on SOLINKO",
        description: row.description || "Serving your neighbourhood with quality and care.",
        area: row.area || row.city || "Local area",
        distanceKm: row.distanceKm || 0.5,
        hours: row.hours || "9 AM - 9 PM",
        image: row.image || "https://via.placeholder.com/100?text=" + encodeURIComponent(row.name.substring(0, 2)),
        banner: row.banner || "https://via.placeholder.com/500?text=" + encodeURIComponent(row.name),
        reviewCount: row.reviewCount || 42,
        gallery: row.gallery || [],
        items: row.items || [],
        reviews: row.reviews || [],
        phone: row.phone || row.email || "Not provided"
      };

      res.json(vendor);

    }
  );

};


// GET ALL CATEGORIES
const getCategories = (req, res) => {

  db.all(
    `
    SELECT DISTINCT category
    FROM vendors
    `,
    [],
    (err, rows) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows.map(row => row.category));

    }
  );

};


// SEARCH VENDORS BY NAME
const searchVendors = (req, res) => {

  const { name } = req.query;

  db.all(
    `
    SELECT * FROM vendors
    WHERE name LIKE ?
    `,
    [`%${name}%`],

    (err, rows) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);

    }
  );

};


// FILTER VENDORS
const filterVendors = (req, res) => {

  const { city, rating } = req.query;

  let query = "SELECT * FROM vendors WHERE 1=1";
  let params = [];

  if (city) {
    query += " AND city = ?";
    params.push(city);
  }

  if (rating) {
    query += " AND rating >= ?";
    params.push(rating);
  }

  db.all(query, params, (err, rows) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(rows);

  });

};


// ADD VENDOR
const addVendor = (req, res) => {

  const {
    name,
    category,
    tagline,
    description,
    city,
    phone,
    email,
    rating,
    image
  } = req.body;

  db.run(
    `
    INSERT INTO vendors
    (
      name,
      category,
      tagline,
      description,
      city,
      phone,
      email,
      rating,
      image
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      name,
      category,
      tagline,
      description,
      city,
      phone,
      email,
      rating,
      image
    ],

    function (err) {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Vendor added successfully",
        id: this.lastID
      });

    }
  );

};


// UPDATE VENDOR
const updateVendor = (req, res) => {

  const { id } = req.params;

  const {
    name,
    category,
    tagline,
    description,
    city,
    phone,
    email,
    rating,
    image
  } = req.body;

  db.run(
    `
    UPDATE vendors
    SET
      name = ?,
      category = ?,
      tagline = ?,
      description = ?,
      city = ?,
      phone = ?,
      email = ?,
      rating = ?,
      image = ?
    WHERE id = ?
    `,
    [
      name,
      category,
      tagline,
      description,
      city,
      phone,
      email,
      rating,
      image,
      id
    ],

    function (err) {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Vendor updated successfully"
      });

    }
  );

};


// DELETE VENDOR
const deleteVendor = (req, res) => {

  const { id } = req.params;

  db.run(
    `
    DELETE FROM vendors
    WHERE id = ?
    `,
    [id],

    function (err) {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Vendor deleted successfully"
      });

    }
  );

};


module.exports = {
  getVendors,
  getVendorById,
  getCategories,
  searchVendors,
  filterVendors,
  addVendor,
  updateVendor,
  deleteVendor
};