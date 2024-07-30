let currentPageSoftSkills = 1;
const itemsPerPageSoftSkills = 5;

function loadSoftSkills(page) {
  $.ajax({
    url: "/candidate/get-soft-skills",
    method: "POST",
    data: {
      currentPage: page,
      itemsPerPage: itemsPerPageSoftSkills,
    },
    success: function (response) {
      $("#soft-skills-tbody").html(response.htmlresponse);
      $("#current-page-display-soft-skills").text(response.currentPage);
      $("#total-pages-display-soft-skills").text(response.totalPages);

      $("#prev-soft-skills").prop("disabled", response.currentPage <= 1);
      $("#next-soft-skills").prop(
        "disabled",
        response.currentPage >= response.totalPages
      );

      if (response.isEmpty) {
        $("#no-soft-skills-message").show();
        $("#soft-skills-table").hide();
      } else {
        $("#no-soft-skills-message").hide();
        $("#soft-skills-table").show();
      }

      if (response.showPagination) {
        $("#soft-skills-pagination").show();
      } else {
        $("#soft-skills-pagination").hide();
      }

      if (response.unselectedSoftSkills.length > 0) {
        $("#unselected-soft-skills-dropdown").show();
        $("#unselected-soft-skills").html("");
        response.unselectedSoftSkills.forEach((skill) => {
          $("#unselected-soft-skills").append(
            new Option(skill.skill_name, skill.id)
          );
        });
      } else {
        $("#unselected-soft-skills-dropdown").hide();
      }
    },
  });
}

$("#prev-soft-skills").click(function () {
  if (currentPageSoftSkills > 1) {
    currentPageSoftSkills--;
    loadSoftSkills(currentPageSoftSkills);
  }
});

$("#next-soft-skills").click(function () {
  if (
    currentPageSoftSkills <
    parseInt($("#total-pages-display-soft-skills").text())
  ) {
    currentPageSoftSkills++;
    loadSoftSkills(currentPageSoftSkills);
  }
});

$(document).ready(function () {
  loadSoftSkills(currentPageSoftSkills);
});
