const notFound = (req, res) => {
  res.status(404).json({ message: "Route not found" });
};

const errorHandler = (error, req, res, next) => {
  console.error(error);
  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "Image must be smaller than 5 MB" });
  }
  if (error.message === "Only JPG, PNG, and WEBP images are allowed") {
    return res.status(400).json({ message: error.message });
  }
  res.status(error.status || 500).json({
    message: error.message || "Server error",
  });
};

export { errorHandler, notFound };
