let currentPageTechnicalSkills = 1;
const itemsPerPageTechnicalSkills = 5;

function loadTechnicalSkills(page) {
  $.ajax({
    url: "/candidate/get-technical-skills",
    method: "POST",
    data: {
      currentPage: page,
      itemsPerPage: itemsPerPageTechnicalSkills,
    },
    success: function (response) {
      $("#technical-skills-tbody").html(response.htmlresponse);
      $("#current-page-display-technical-skills").text(response.currentPage);
      $("#total-pages-display-technical-skills").text(response.totalPages);

      $("#prev-technical-skills").prop("disabled", response.currentPage <= 1);
      $("#next-technical-skills").prop(
        "disabled",
        response.currentPage >= response.totalPages
      );

      if (response.isEmpty) {
        $("#no-technical-skills-message").show();
        $("#technical-skills-table").hide();
      } else {
        $("#no-technical-skills-message").hide();
        $("#technical-skills-table").show();
      }

      if (response.showPagination) {
        $("#technical-skills-pagination").show();
      } else {
        $("#technical-skills-pagination").hide();
      }
    },
  });
}

$("#prev-technical-skills").click(function () {
  if (currentPageTechnicalSkills > 1) {
    currentPageTechnicalSkills--;
    loadTechnicalSkills(currentPageTechnicalSkills);
  }
});

$("#next-technical-skills").click(function () {
  if (
    currentPageTechnicalSkills <
    parseInt($("#total-pages-display-technical-skills").text())
  ) {
    currentPageTechnicalSkills++;
    loadTechnicalSkills(currentPageTechnicalSkills);
  }
});

$(document).ready(function () {
  loadTechnicalSkills(currentPageTechnicalSkills);
});
