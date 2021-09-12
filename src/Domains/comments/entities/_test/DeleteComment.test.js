const DeleteComment = require("../DeleteComment");

describe("a DeleteComment entities", () => {
  it("should throw error when params did not contain any property", () => {
    // Arrange
    const params = null;

    // Action and Assert
    expect(() => new DeleteComment(params)).toThrowError(
      "DELETE_COMMENT.NOT_CONTAIN_ANY_PROPERTY"
    );
  });

  it("should throw error when params did not contain needed property", () => {
    // Arrange
    const params = {
      threadId: "thread-123",
    };

    // Action and Assert
    expect(() => new DeleteComment(params)).toThrowError(
      "DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when params not meet data type specification", () => {
    // Arrange
    const params = {
      threadId: 123,
      commentId: 123,
    };

    // Action & Assert
    expect(() => new DeleteComment(params)).toThrowError(
      "DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create DeleteComment object correctly", () => {
    // Arrange
    const params = {
      threadId: "thread-123",
      commentId: "comment-123",
    };

    // Action
    const { threadId, commentId } = new DeleteComment(params);

    // Assert
    expect(threadId).toEqual(params.threadId);
    expect(commentId).toEqual(params.commentId);
  });
});
