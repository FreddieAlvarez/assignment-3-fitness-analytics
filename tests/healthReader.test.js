const path = require("path");
const fs = require("fs/promises");
const { healthMetricsCounter } = require("../src/healthReader");

const TEST_FILE = path.join(__dirname, "test-health.json");
const testData = [
    { name: "Alice", steps: 5000 },
    { name: "Bob", steps: 8000 }
];

beforeAll(async () => {
    await fs.writeFile(TEST_FILE, JSON.stringify(testData));
});

afterAll(async () => {
    try {
        await fs.unlink(TEST_FILE);
    } catch {}
});

describe("healthMetricsCounter", () => {
    test("counts total health entries in a valid file", async () => {
        const result = await healthMetricsCounter(TEST_FILE);
        expect(result).toBe(2);
    });

    test("returns null if the file is missing", async () => {
        const result = await healthMetricsCounter("missing.json");
        expect(result).toBeNull();
    });
});