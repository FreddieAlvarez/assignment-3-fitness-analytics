
const fs = require("fs");
const csv = require("csv-parser");

// Reads CSV and returns rows as objects
function readWorkoutData(filepath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filepath)
      .on("error", (err) => reject(err))
      .pipe(csv())
      .on("data", (row) => results.push(row))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
}

// Processes CSV and logs totals
async function workoutCalculator(filepath) {
  try {
    const data = await readWorkoutData(filepath);
    const totalWorkouts = data.length;

    let totalMinutes = 0;
    for (let i = 0; i < data.length; i++) {
      totalMinutes += parseFloat(data[i].minutes) || 0;
    }

    console.log(`Total workouts: ${totalWorkouts}`);
    console.log(`Total minutes: ${totalMinutes}`);

    return { totalWorkouts, totalMinutes };
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("❌ CSV file not found - check the file path");
    } else {
      console.log("❌ Error processing CSV file:", error.message);
    }
    return null;
  }
}

module.exports = { readWorkoutData, workoutCalculator };