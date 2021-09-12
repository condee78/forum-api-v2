const NewThread = require("../NewThread");

describe("a NewThread entities", () => {
  it("should throw error when payload did not contain any property", () => {
    // Arrange
    const payload = null;

    // Action and Assert
    expect(() => new NewThread(payload)).toThrowError(
      "NEW_THREAD.NOT_CONTAIN_ANY_PROPERTY"
    );
  });

  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      body: "abc",
    };

    // Action and Assert
    expect(() => new NewThread(payload)).toThrowError(
      "NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload not meet data type specification", () => {
    // Arrange
    const payload = {
      title: 123,
      body: 123,
    };

    // Action & Assert
    expect(() => new NewThread(payload)).toThrowError(
      "NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create newThread object correctly", () => {
    // Arrange
    const payload = {
      title: "dicoding",
      body: "Dicoding Indonesia",
    };

    const authentication = "Bearer 123";

    // Action
    const { title, body } = new NewThread(payload, authentication);

    // Assert
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
  });
});
