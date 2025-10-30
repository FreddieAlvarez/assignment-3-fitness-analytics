// load variables
require('dotenv').config(); 

console.log(process.env.USER_NAME); 
console.log(process.env.WEEKLY_GOAL); 

const { healthMetricsCounter } = require("./src/healthReader");
const { workoutCalculator } = require("./src/workoutReader");

async function processFiles() {
  const userName = process.env.USER_NAME;
  const weeklyGoal = Number(process.env.WEEKLY_GOAL);

  console.log(`Processing data for: ${userName}`);
  console.log("📁 Reading workout data...");
  const workoutData = await workoutCalculator("./data/workouts.csv");

  console.log("📁 Reading health data...");
  const healthCount = await healthMetricsCounter("./data/health-metrics.json");

  console.log("\n=== SUMMARY ===");
  console.log(`Workouts found: ${workoutData.totalWorkouts}`);
  console.log(`Total workout minutes: ${workoutData.totalMinutes}`);
  console.log(`Health entries found: ${healthCount}`);
  console.log(`Weekly goal: ${weeklyGoal} minutes`);

  if (workoutData.totalMinutes >= weeklyGoal) {
    console.log(`🎉 Congratulations ${userName}! You have exceeded your weekly goal!`);
  } else {
    console.log(`Keep going ${userName}! You haven't reached your weekly goal yet.`);
  }
}

processFiles();