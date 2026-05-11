require("dotenv").config();

const app = require("./src/app");
const config = require("./src/config/config");

const PORT = config.PORT || process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
