//
// Global Variables
//
var triolauncher_server = "http://localhost:3000/";
//var geneiobio_server = "http://geneinfo.iobio.io/";

		return "";
	}
}

var selectedSample = "Proband";

$(document).ready(function(){
  $("#test").click(function(){
    $("#value").text(selectedSample);
  });
});

$(document).ready(function() {
  $("#motherButton").click(function() {
    selectedSample = "Proband";
    $("#value").text("bill");
  });
});

$(document).ready(function() {
  $("#motherButton").click(function() {
    selectedSample = "Mother";
  });
});

$(document).ready(function() {
  $("#fatherButton").click(function() {
    selectedSample = "Father";
  });
});