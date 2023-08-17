const time = new Date();

console.log(
  time.toLocaleString("en-BD", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })
);
