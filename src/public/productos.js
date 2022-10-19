document.addEventListener("submit", (e) => {
  e.preventDefault();
});

async function sendProd(url) {
  const response = await fetch(url, {
    method: "POST",
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify(),
  });
  return response.json();
}
