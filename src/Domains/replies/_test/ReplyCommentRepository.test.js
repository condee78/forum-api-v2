const ReplyCommentRepository = require("../ReplyCommentRepository");

describe("ReplyCommentRepository interface", () => {
  it("should throw error when invoke abstract behavior", async () => {
    // Arrange
    const replyCommentRepository = new ReplyCommentRepository();

    // Action and Assert
    await expect(
      replyCommentRepository.addReplyComment({}, "")
    ).rejects.toThrowError("REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(
      replyCommentRepository.getReplyCommentByCommentId("")
    ).rejects.toThrowError("REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(
      replyCommentRepository.verifyAvailableReplyComment("")
    ).rejects.toThrowError("REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(
      replyCommentRepository.verifyReplyCommentOwner("", "")
    ).rejects.toThrowError("REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  });
});
