import { formatDateForInput, formatDateForList } from "../../../utils/helpers";

describe("utils/helpers", () => {
  describe("formatDateForInput", () => {
    it("returns a formatted date string (YYYY-MM-DD) for a valid date", () => {
      // Arrange
      const date = new Date("2025-09-08T00:00:00Z");

      // Act
      const result = formatDateForInput(date);

      // Assert
      expect(result).toBe("2025-09-08");
    });

    it("returns empty string for invalid date", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = formatDateForInput(invalidDate);

      // Assert
      expect(result).toBe("");
    });

    it("returns empty string when date is undefined", () => {
      // Arrange
      const date = undefined;

      // Act
      const result = formatDateForInput(date);

      // Assert
      expect(result).toBe("");
    });

    it("returns empty string when date is null", () => {
      // Arrange
      const date = null;

      // Act
      const result = formatDateForInput(date);

      // Assert
      expect(result).toBe("");
    });
  });

  describe("formatDateForList", () => {
    it("returns a formatted date string including weekday, month, and day number", () => {
      // Arrange
      const date = new Date("2025-09-18T00:00:00Z");

      // Act
      const result = formatDateForList(date);

      // Assert
      expect(result).toMatch(/^Thu,/); // Weekday
      expect(result).toContain("Sep"); // Month
      expect(result).toMatch(/\b18\b/); // Day number
    });

    it("returns undefined for missing date", () => {
      // Arrange
      const date = undefined;

      // Act
      const result = formatDateForList(date);

      // Assert
      expect(result).toBeUndefined();
    });
  });
});
