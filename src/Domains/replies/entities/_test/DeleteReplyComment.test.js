const DeleteReplyComment = require("../DeleteReplyComment");

describe("a DeleteReplyComment entities", () => {
  it("should throw error when params did not contain any property", () => {
    // Arrange
    const params = null;

    // Action and Assert
    expect(() => new DeleteReplyComment(params)).toThrowError(
      "DELETE_REPLY_COMMENT.NOT_CONTAIN_ANY_PROPERTY"
    );
  });

  it("should throw error when params did not contain needed property", () => {
    // Arrange
    const params = {
      threadId: "thread-123",
    };

    // Action and Assert
    expect(() => new DeleteReplyComment(params)).toThrowError(
      "DELETE_REPLY_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when params not meet data type specification", () => {
    // Arrange
    const params = {
      threadId: 123,
      commentId: 123,
      replyId: 123,
    };

    // Action & Assert
    expect(() => new DeleteReplyComment(params)).toThrowError(
      "DELETE_REPLY_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create DeleteReplyComment object correctly", () => {
    // Arrange
    const params = {
      threadId: "thread-123",
      commentId: "comment-123",
      replyId: "reply-123",
    };

    // Action
    const { threadId, commentId, replyId } = new DeleteReplyComment(params);

    // Assert
    expect(threadId).toEqual(params.threadId);
    expect(commentId).toEqual(params.commentId);
    expect(replyId).toEqual(params.replyId);
  });
});
