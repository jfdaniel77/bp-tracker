import { withSentry } from "@sentry/nextjs";
import { fetchData, saveData, fetchDataByDate } from "../../util/mongodb";

function prepareRecord(data) {
  return {
    dateTaken: data.date,
    systolic: data.systolic,
    diastolic: data.diastolic,
    timestamp: new Date().getTime(),
  };
}

// Validates that the input string is a valid date formatted as "yyyy-mm-dd"
function isValidDate(dateString) {
  // First check for the pattern
  if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(dateString)) return false;

  // Parse the date parts to integers
  var parts = dateString.split("-");
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[0], 10);
  var day = parseInt(parts[2], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
}

function validateRecord(data) {
  if (!data.systolic || !data.diastolic || !data.date) {
    return false;
  }

  if (!isValidDate(data.date)) {
    return false;
  } else {
    var currentDate = new Date();
    var givenDate = new Date(data.date);

    if (givenDate > currentDate) {
      return false;
    }
  }

  if (data.systolic < 100 || data.systolic > 250) {
    return false;
  }

  if (data.diastolic < 50 || data.diastolic > 200) {
    return false;
  }

  return true;
}

const handler = async (req, res) => {
  return new Promise(async function (resolve) {
    if (req.method === "POST") {
      if (!validateRecord(req.body)) {
        res.status(400).json({
          status: 0,
          message: "Invalid input parameters",
        });
        return resolve();
      }

      const respValidation = await fetchDataByDate(req.body.date)

      if (respValidation && respValidation.length > 0) {
        res.status(400).json({
          status: 0,
          message: `Record with this date has been recorded.`,
        });
        return resolve();
      }

      const data = prepareRecord(req.body);
      const resp = await saveData(data);
      
      if (resp && resp.acknowledged == true) {
        res.status(200).json({
          status: 1,
          message: "Record saved successfully",
        });
      } else {
        res.status(500).json({
          status: 0,
          message: "Error saving data",
        });
      }
    } else if (req.method === "GET") {
      const jsonData = await fetchData();
      if (jsonData) {
        res.status(200).json(jsonData);
      } else {
        res.status(200).json({
          message: "No data found",
        });
      }
    } else {
      res.status(405).json({
        message: "Method not allowed",
      });
    }
    return resolve();
  });
};

export default withSentry(handler);
