const path = require("path");
const fs = require("fs");
const { workoutCalculator, readWorkoutData } = require("../src/workoutReader");

// Test CSV file path
const TEST_CSV_FILE = path.join(__dirname, "test-workouts.csv");

// Sample CSV content
const testCsvData = `date,exercise,minutes
2024-01-01,Running,30
2024-01-02,Cycling,45
2024-01-03,Swimming,60`;

beforeAll(() => {
  // Create test CSV file
  fs.writeFileSync(TEST_CSV_FILE, testCsvData);
});

afterAll(() => {
  // Remove test CSV file after tests
  try { fs.unlinkSync(TEST_CSV_FILE); } catch {}
});

describe("workoutCalculator", () => {
  test("reads and processes valid CSV file", async () => {
    const result = await workoutCalculator(TEST_CSV_FILE);
    expect(result).not.toBeNull();
    expect(result.totalWorkouts).toBe(3);
    expect(result.totalMinutes).toBe(135);
  });

  test("readWorkoutData returns correct data structure", async () => {
    const data = await readWorkoutData(TEST_CSV_FILE);
    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(3);
    expect(data[0]).toHaveProperty("date");
    expect(data[0]).toHaveProperty("exercise");
    expect(data[0]).toHaveProperty("minutes");
  });

  test("returns null if the CSV file is missing", async () => {
    const result = await workoutCalculator("missing.csv");
    expect(result).toBeNull();
  });
});