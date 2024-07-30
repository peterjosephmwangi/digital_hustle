let currentPageWorkExperience = 1;
const itemsPerPageWorkExperience = 5;

function loadWorkExperience(page) {
  $.ajax({
    url: "/candidate/get-work-experience",
    method: "POST",
    data: {
      currentPage: page,
      itemsPerPage: itemsPerPageWorkExperience,
    },
    success: function (response) {
      console.log(response); // Debug print to check the response
      $("#work-experience-tbody").html(response.htmlresponse);
      $("#current-page-display-work-experience").text(response.currentPage);
      $("#total-pages-display-work-experience").text(response.totalPages);

      $("#prev-work-experience").prop("disabled", response.currentPage <= 1);
      $("#next-work-experience").prop(
        "disabled",
        response.currentPage >= response.totalPages
      );

      if (response.isEmpty) {
        $("#no-work-experience-message").show();
        $("#work-experience-table").hide();
      } else {
        $("#no-work-experience-message").hide();
        $("#work-experience-table").show();
      }

      if (response.showPagination) {
        $("#work-experience-pagination").show();
      } else {
        $("#work-experience-pagination").hide();
      }
    },
  });
}

$("#prev-work-experience").click(function () {
  if (currentPageWorkExperience > 1) {
    currentPageWorkExperience--;
    loadWorkExperience(currentPageWorkExperience);
  }
});

$("#next-work-experience").click(function () {
  if (
    currentPageWorkExperience <
    parseInt($("#total-pages-display-work-experience").text())
  ) {
    currentPageWorkExperience++;
    loadWorkExperience(currentPageWorkExperience);
  }
});

$(document).ready(function () {
  loadWorkExperience(currentPageWorkExperience);
});
