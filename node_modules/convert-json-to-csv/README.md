# Convert-Json-To-Csv
This is an open-source utility that lets you convert json data to a flat csv which can be opened directly by any text editors, excel, etc. 
Note: This utility does not endorse Excel as a default app to open a csv file.

## Installation 
```bash
npm install convert-json-to-csv
```

## Usage
The library offers support for converting two types of json data into csv. The usages for both types, array of arrays and array of objects, is shown below.

###Usage 1- Array of Arrays

```javascript
var jsonToCsv = require('convert-json-to-csv');
var arrayOfArraysCsv = jsonToCsv.convertArrayOfArrays(inputJson);
```
#####Sample inputJson: 
[["Column 1", "Column 2"], ["Row1Column1", "Row1Column2"], ["Row2Column1", "Row2Column2"]]

###Usage 2- Array of Objects

```javascript
var jsonToCsv = require('convert-json-to-csv');
var arrayOfObjectsCsv = convertArrayOfObjects(inputJson, columnDefinitionArray);
```

#####Sample inputJson: 
[{"Column 1" : "Row1Column1", "Column 2" : "Row1Column2"}, 
{"Column 1" : "Row2Column1", "Column 2" : "Row2Column2"}]

#####Sample ColumnDefinitionArray: 
["Column 1", "Column 2"]

## Test
The utility can be tested using the following command
```bash
npm test
```

