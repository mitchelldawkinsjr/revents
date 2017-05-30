/**
 * Created by rohanrayarikar on 10/10/16.
 */

/**
 * Given a json data in terms of array of arrays, returns a flat csv file
 * which can be exported as excel or csv
 *
 * Sample input jsonData
 * [["Column 1", "Column 2"], ["Row1Column1", "Row1Column2"], ["Row2Column1", "Row2Column2"]];
 *
 * @param jsonData
 * @returns {string}
 */
function convertArrayOfArrays(jsonData) {
    var outputCsv = "";
    for (var arrayIndex = 0; arrayIndex < jsonData.length; arrayIndex++) {
        var eachLine = "";
        for (var eachElement = 0; eachElement < jsonData[arrayIndex].length; eachElement++) {
            eachLine += "\"" + jsonData[arrayIndex][eachElement].toString().trim() + "\",";
        }
        eachLine = eachLine.slice(0, eachLine.length - 1);
        outputCsv += eachLine + "\r\n";
    }
    return outputCsv;
}

/**
 * Given a json data in terms of array of objects, returns a flat csv file
 * which can be exported as excel or csv
 *
 * Sample input jsonData
 *[{"Column 1" : "Row1Column1", "Column 2" : "Row1Column2"}, {"Column 1" : "Row2Column1", "Column 2" : "Row2Column2"}];
 *
 * @param jsonData
 * @param jsonColumnDefArray
 * @returns {string}
 */
function convertArrayOfObjects(jsonData, jsonColumnDefArray) {
    var outputCsv = "";
    // set the column names
    for (var columnIndex = 0; columnIndex < jsonColumnDefArray.length; columnIndex++) {
        outputCsv += "\"" + jsonColumnDefArray[columnIndex].toString().trim() + "\",";
    }
    outputCsv = outputCsv.slice(0, outputCsv.length - 1);
    outputCsv += "\r\n";
    // set the data
    for (var objectIndex = 0; objectIndex < jsonData.length; objectIndex++) {
        var eachLine = "";
        var row = jsonData[objectIndex];
        for (var columnIndex = 0; columnIndex < jsonColumnDefArray.length; columnIndex++) {
            var columnName = jsonColumnDefArray[columnIndex];
            eachLine += "\"" + row[columnName].toString().trim() + "\",";
        }
        eachLine = eachLine.slice(0, eachLine.length - 1);
        outputCsv += eachLine + "\r\n";
    }
    return outputCsv;
}

module.exports = {
    convertArrayOfArrays: convertArrayOfArrays,
    convertArrayOfObjects: convertArrayOfObjects
};