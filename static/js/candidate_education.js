let currentPageEducation = 1;
const itemsPerPageEducation = 5;

function loadEducation(page) {
  $.ajax({
    url: "/candidate/get-education",
    method: "POST",
    data: {
      currentPage: page,
      itemsPerPage: itemsPerPageEducation,
    },
    success: function (response) {
      console.log(response); // Debug print to check the response
      $("#education-tbody").html(response.htmlresponse);
      $("#current-page-display-education").text(response.currentPage);
      $("#total-pages-display-education").text(response.totalPages);

      $("#prev-education").prop("disabled", response.currentPage <= 1);
      $("#next-education").prop(
        "disabled",
        response.currentPage >= response.totalPages
      );

      if (response.isEmpty) {
        $("#no-education-message").show();
        $("#education-table").hide();
      } else {
        $("#no-education-message").hide();
        $("#education-table").show();
      }

      if (response.showPagination) {
        $("#education-pagination").show();
      } else {
        $("#education-pagination").hide();
      }
    },
    error: function () {
      alert(
        "An error occurred while loading education records. Please try again."
      );
    },
  });
}

$("#prev-education").click(function () {
  if (currentPageEducation > 1) {
    currentPageEducation--;
    loadEducation(currentPageEducation);
  }
});

$("#next-education").click(function () {
  if (
    currentPageEducation < parseInt($("#total-pages-display-education").text())
  ) {
    currentPageEducation++;
    loadEducation(currentPageEducation);
  }
});

$(document).ready(function () {
  loadEducation(currentPageEducation);
});
