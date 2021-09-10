const NewThread = require("../../Domains/threads/entities/NewThread");

class AddedThreadUseCase {
  constructor({ threadRepository, authenticationTokenManager }) {
    this._threadRepository = threadRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCasePayload, useCaseAuthentication) {
    const newThread = new NewThread(useCasePayload);
    const { id: credentialId } = useCaseAuthentication;

    return this._threadRepository.addThread(newThread, credentialId);
  }
}

module.exports = AddedThreadUseCase;
