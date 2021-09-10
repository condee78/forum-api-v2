const NewThread = require("../../Domains/threads/entities/NewThread");
const DetailThread = require("../../Domains/threads/entities/DetailThread");

class ThreadUseCase {
  constructor({ threadRepository, commentRepository, replyCommentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyCommentRepository = replyCommentRepository;
  }

  async addThread(useCasePayload, useCaseAuthentication) {
    const newThread = new NewThread(useCasePayload);
    const { id: credentialId } = useCaseAuthentication;

    return this._threadRepository.addThread(newThread, credentialId);
  }

  async getThread(usecaseParams) {
    const detailThread = new DetailThread(usecaseParams);

    const thread = await this._threadRepository.getThreadById(
      detailThread.threadId
    );

    const comment = await this._commentRepository.getCommentByThreadId(
      detailThread.threadId
    );

    const replies =
      await this._replyCommentRepository.getReplyCommentByCommentId(
        comment[0].id
      );

    comment[0].replies = replies;
    thread.comments = comment;

    return thread;
  }
}

module.exports = ThreadUseCase;
