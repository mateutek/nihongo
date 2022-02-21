const fs = require('fs');

const unflattenObject = obj =>
  Object.keys(obj).reduce((res, k) => {
    k.split('.').reduce(
      (acc, e, i, keys) =>
        acc[e] ||
        (acc[e] = isNaN(Number(keys[i + 1]))
          ? keys.length - 1 === i
            ? obj[k]
            : {}
          : []),
      res
    );
    return res;
  }, {});

const CSVToJSON = (data, delimiter = ',') => {
  const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
  return data
    .slice(data.indexOf('\n') + 1)
    .split('\n')
    .map(v => {
      const values = v.split(delimiter);
      return titles.reduce(
        (obj, title, index) => ((obj[title] = values[index]), obj),
        {}
      );
    });
};


fs.readFile('import.csv', 'utf8', function(err, data) {
  if (err) throw err;
  data = data.replaceAll('\r','');
  const flatJson = CSVToJSON(data).map(unflattenObject);
  console.log(flatJson);
  fs.writeFile("output.json", JSON.stringify(flatJson), 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });
});
