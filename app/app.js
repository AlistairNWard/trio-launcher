//
// Global Variables
//
var triolauncher_server = "http://localhost:3000/";
//var geneiobio_server = "http://geneinfo.iobio.io/";

$(document).ready(function() {
  var selectedSample = "proband";
  var sequenceFiles  = [];
  var alignmentFiles = [];
  var variantFiles   = [];
  var object = {};

  //
  var probandIndices = [];
  var motherIndices  = [];
  var fatherIndices  = [];

  // Functions

  // Define an object associating relevant data with the files
  function setFile(file, fileType, sampleId) {
    var temp = {
      file : file,
      fileType : fileType,
      sampleId : sampleId          
    };
    return temp;
  }

  // Depending on the available data, unhide the appropriate cards and display
  // data
  function addCard(files, text) {

    // Loop over the files and identify the indexes associated with proband, mother and
    // father data
    getIndices(files);

    // Taxonomer
    if (files.length > 0) {
      $("#" + text + "-card").removeClass("hide");

      // Handle proband data
      if (probandIndices.length > 0) {
        $("#" + text + "-proband").removeClass("hide");
      }

      // Handle mother data
      if (motherIndices.length > 0) {
        $("#" + text + "-mother").removeClass("hide");
      }

      // Handle father data
      if (fatherIndices.length > 0) {
        $("#" + text + "-father").removeClass("hide");
      }
    }
  }

  // Get the indices for the proband, mother and father samples
  function getIndices(files) {

    // Clear any stored values from the indices
    probandIndices = [];
    motherIndices  = [];
    fatherIndices  = [];
    for (var i =0; i < files.length; i++) {
      switch(files[i].sampleId) {
        case "Proband":
          probandIndices.push(i);
          break;
        case "Mother":
          motherIndices.push(i);
          break;
        case "Father":
          fatherIndices.push(i);
          break;
        default:
          break;
      }  
    }
  }

  // Function for populating a table.
  function populateTable(tableId, inputId, files, fileType) {
    var value = $("#" + inputId).val();

    // Do not do anything if no value was provided
    if (value.length > 0) {

      // Clear the input field
      document.getElementById(inputId).value = "";

      // If the selectedSample is not 'remove', add a new line
      if (selectedSample != "remove") {
        $("#" + tableId + " tbody").append("<tr><td>" + value + "</td><td>" + selectedSample + "</td></tr>");
        files.push(new setFile(value, fileType, selectedSample));
      }

      // If the row is clicked, update the sample with the value selected in the radio button
      $("#" + tableId + " tbody tr").click(function() {

        // Get the name of the file to be removed
        var file = $(this).find("td:first").text();

        if (selectedSample == "remove") {

          // Remove the table row
          $(this).remove();

          // Remove the file from the file list
          var i;
          for (i = 0; i < files.length; i++) {
            if (files[i].file == file) {break;}
          }
          if (i != -1) {files.splice(i, 1);}
        } else {
          $(this).find("td:last").text(selectedSample);

          // Find the file in the file list and update the sample Id
          var i;
          for (i = 0; i < files.length; i++) {
            if (files[i].file == file) {break;}
          }
          if (i != -1) {files[i].sampleId = selectedSample;}
        }
      });
    }
  }

  // Set radio buttons
  $("#probandButton").click(function() {
    selectedSample = "proband";
  });
  $("#motherButton").click(function() {
    selectedSample = "mother";
  });
  $("#fatherButton").click(function() {
    selectedSample = "father";
  });  
  $("#removeButton").click(function() {
    selectedSample = "remove";
  });

  // Raw sequence file selection
  $("#sequence-input-button").click(function() {
    populateTable("sequence-table", "sequence-input", sequenceFiles, "sequence")
  });

  // Alignment file selection
  $("#alignment-input-button").click(function() {
    populateTable("alignment-table", "alignment-input", alignmentFiles, "alignment")
  });

  // Variant file selection
  $("#variant-input-button").click(function() {
    populateTable("variant-table", "variant-input", variantFiles, "variant")
  });

  // Load additional cards when 'Load' is clicked
  $("#load-button").click(function() {

    // Unhide the necessary cards and populate
    addCard(sequenceFiles, 'taxonomer');
    addCard(alignmentFiles, 'alignment');
    addCard(variantFiles, 'variant');
  });
});