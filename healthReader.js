const fs = require("fs/promises");

async function healthMetricsCounter(filepath) {
    try {
        const data = await fs.readFile(filepath, "utf8");
        const healthData = JSON.parse(data);
        console.log("Total health entries:", healthData.length);
        return healthData.length;
    } catch (error) {
        if (error.code === "ENOENT") {
            console.log("File not found - check the file path");
        } else if (error.name === "SyntaxError") {
            console.log("❌ Invalid JSON - check the file format");
        } else {
            console.log("❌ Unknown error:", error.message);
        }
        return null;
    }
}

module.exports = { healthMetricsCounter };