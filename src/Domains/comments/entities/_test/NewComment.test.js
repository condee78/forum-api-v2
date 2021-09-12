const NewComment = require("../NewComment");

describe("a NewComment entities", () => {
  it("should throw error when payload did not contain any property", () => {
    // Arrange
    const payload = null;

    const params = {
      threadId: "thread-123",
    };

    // Action and Assert
    expect(() => new NewComment(payload, params)).toThrowError(
      "NEW_COMMENT.NOT_CONTAIN_ANY_PROPERTY"
    );
  });

  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {};

    const params = {
      threadId: "thread-123",
    };

    // Action and Assert
    expect(() => new NewComment(payload, params)).toThrowError(
      "NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when params did not contain any property", () => {
    // Arrange
    const payload = {
      content: "new comment",
    };

    const params = null;

    // Action and Assert
    expect(() => new NewComment(payload, params)).toThrowError(
      "NEW_COMMENT.PARAMS_NOT_CONTAIN_ANY_PROPERTY"
    );
  });

  it("should throw error when params did not contain needed property", () => {
    // Arrange
    const payload = {
      content: "new comment",
    };

    const params = {};

    // Action and Assert
    expect(() => new NewComment(payload, params)).toThrowError(
      "NEW_COMMENT.PARAMS_NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should create NewComment object correctly", () => {
    // Arrange
    const payload = {
      content: "new comment",
    };

    const params = {
      threadId: "thread-123",
    };

    // Action
    const { content, threadId } = new NewComment(payload, params);

    // Assert
    expect(content).toEqual(payload.content);
    expect(threadId).toEqual(params.threadId);
  });
});
