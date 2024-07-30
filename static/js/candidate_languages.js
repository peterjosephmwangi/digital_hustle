let currentPageLanguages = 1;
const itemsPerPageLanguages = 5;

function loadLanguages(page) {
  $.ajax({
    url: "/candidate/get-languages",
    method: "POST",
    data: {
      currentPage: page,
      itemsPerPage: itemsPerPageLanguages,
    },
    success: function (response) {
      $("#languages-tbody").html(response.htmlresponse);
      $("#current-page-display-languages").text(response.currentPage);
      $("#total-pages-display-languages").text(response.totalPages);

      $("#prev-languages").prop("disabled", response.currentPage <= 1);
      $("#next-languages").prop(
        "disabled",
        response.currentPage >= response.totalPages
      );

      if (response.isEmpty) {
        $("#no-languages-message").show();
        $("#languages-table").hide();
      } else {
        $("#no-languages-message").hide();
        $("#languages-table").show();
      }

      if (response.showPagination) {
        $("#languages-pagination").show();
      } else {
        $("#languages-pagination").hide();
      }
    },
  });
}

$("#prev-languages").click(function () {
  if (currentPageLanguages > 1) {
    currentPageLanguages--;
    loadLanguages(currentPageLanguages);
  }
});

$("#next-languages").click(function () {
  if (
    currentPageLanguages < parseInt($("#total-pages-display-languages").text())
  ) {
    currentPageLanguages++;
    loadLanguages(currentPageLanguages);
  }
});

$(document).ready(function () {
  loadLanguages(currentPageLanguages);
});
