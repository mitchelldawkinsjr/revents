/**
 * Created by rohanrayarikar on 10/9/16.
 */
var path = require('path');
var jsonToCsv = require(path.join(__dirname, '../lib/convertJsonToCsv.js'));

describe('exportToExcelApp', function () {
    describe('tests for export to excel/csv functionality', function () {

        it("Check if the data is converted to csv", function () {
            var inputJson = [["Column 1", "Column 2"],
                ["Row1Column1", "Row1Column2"],
                ["Row2Column1", "Row2Column2"]];
            var expectedResult = "\"Column 1\",\"Column 2\"\n\r\"Row1Column1\"," +
                "\"Row1Column2\"\n\r\"Row2Column1\",\"Row2Column2\"\n\r";
            var currentResult = jsonToCsv.convertArrayOfArrays(inputJson);
            expect(currentResult.length).toBe(expectedResult.length);
        });

        it("Check if the column names are converted to csv", function () {
            var inputJson = [["Column 1", "Column 2"]];
            var expectedResult = "\"Column 1\",\"Column 2\"\n\r";
            var currentResult = jsonToCsv.convertArrayOfArrays(inputJson);
            expect(currentResult.length).toBe(expectedResult.length);
        });

        it("Check if the array of objects are converted to csv", function () {
            var inputJson = [{"Column 1": "Row1Column1", "Column 2": "Row1Column2"},
                {"Column 1": "Row2Column1", "Column 2": "Row2Column2"}];
            var expectedResult = "\"Column 1\",\"Column 2\"\n\r\"Row1Column1\"," +
                "\"Row1Column2\"\n\r\"Row2Column1\",\"Row2Column2\"\n\r";
            var currentResults = jsonToCsv.convertArrayOfObjects(inputJson, ["Column 1", "Column 2"]);
            expect(currentResults.length).toBe(expectedResult.length);
        });

        it("Test object call using names", function () {
            var columnName = "Column 1";
            var object = {"Column 1": "Data", "Column 2": "This should not show"};
            expect(object[columnName]).toBe("Data");
        });
    });
});