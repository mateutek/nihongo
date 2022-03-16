import csv from "csv-parser";
import fs from "fs";

const unflattenObject = (obj) =>
    Object.keys(obj).reduce((res, k) => {
        k.split(".").reduce(
            (acc, e, i, keys) =>
                acc[e] || (acc[e] = isNaN(Number(keys[i + 1])) ? (keys.length - 1 === i ? obj[k] : {}) : []),
            res
        );
        return res;
    }, {});

const results = [];

export function parseDataToJSON() {
    return new Promise((resolve, reject) => {
        fs.createReadStream("import.csv")
            .pipe(csv())
            .on("data", (data) => results.push(unflattenObject(data)))
            .on("end", () => {
                fs.writeFile("output.json", JSON.stringify(results), "utf8", function (err) {
                    if (err) {
                        console.log("An error occured while writing JSON Object to File.");
                        reject(err);
                    }
                    resolve(results);
                    console.log("JSON file has been saved.");
                });
            });
    });
}
