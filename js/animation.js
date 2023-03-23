$(document).ready(function () {
  $(".cart").click(function () {
    let div = $(".animation");
    div.animate({ fontSize: "1.5em" }, "slow");
    div.animate({ fontSize: "1em" }, "slow");
  });
});
