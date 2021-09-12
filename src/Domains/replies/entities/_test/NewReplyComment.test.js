const NewReplyComment = require("../NewReplyComment");

describe("a NewReplyComment entities", () => {
  it("should throw error when payload did not contain any property", () => {
    // Arrange
    const payload = null;

    const params = {
      threadId: "thread-123",
      commentId: "comment-123",
    };

    // Action and Assert
    expect(() => new NewReplyComment(payload, params)).toThrowError(
      "NEW_REPLY_COMMENT.NOT_CONTAIN_ANY_PROPERTY"
    );
  });

  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {};

    const params = {
      threadId: "thread-123",
      commentId: "comment-123",
    };

    // Action and Assert
    expect(() => new NewReplyComment(payload, params)).toThrowError(
      "NEW_REPLY_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when params did not contain any property", () => {
    // Arrange
    const payload = {
      content: "reply comment",
    };

    const params = null;

    // Action and Assert
    expect(() => new NewReplyComment(payload, params)).toThrowError(
      "NEW_REPLY_COMMENT.PARAMS_NOT_CONTAIN_ANY_PROPERTY"
    );
  });

  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      content: "reply comment",
    };

    const params = {
      threadId: "thread-123",
    };

    // Action and Assert
    expect(() => new NewReplyComment(payload, params)).toThrowError(
      "NEW_REPLY_COMMENT.PARAMS_NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should create NewReplyComment object correctly", () => {
    // Arrange
    const payload = {
      content: "reply comment",
    };

    const params = {
      threadId: "thread-123",
      commentId: "comment-123",
    };

    // Action
    const { content, threadId, commentId } = new NewReplyComment(
      payload,
      params
    );

    // Assert
    expect(content).toEqual(payload.content);
    expect(threadId).toEqual(params.threadId);
    expect(commentId).toEqual(params.commentId);
  });
});
