const { chromium } = require("playwright");
const path = require("path");

(async () => {
  const browser = await chromium.launch();

  const page = await browser.newPage();

  const htmlPath = path.resolve("public/resume.html");
  const pdfPath = path.resolve("public/resume.pdf");

  await page.goto(`file://${htmlPath}`, {
    waitUntil: "networkidle",
  });

  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: {
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
    },
  });

  await browser.close();

  console.log("✅ Resume PDF generated successfully!");
  console.log(`📄 ${pdfPath}`);
})();