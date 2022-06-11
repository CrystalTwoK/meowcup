const body = window.document.body;

$(window).on("load", async () => {
  await $(".loader-wrapper").addClass("loader-fadeout");
  $(".loader-wrapper").remove();
  body.style = "border-top: 6px solid #00ff84";
});
