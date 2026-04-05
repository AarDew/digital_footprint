async function test() {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAClOyEYGHzGFSZJNJBnD58-fNUByCxT4k";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Hello" }] }]
      })
    });
    console.log("Status:", response.status);
    const text = await response.text();
    console.log("Response:", text);
  } catch (e) {
    console.error("Error:", e);
  }
}
test();
