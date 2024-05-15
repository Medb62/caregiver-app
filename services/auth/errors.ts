
export const handleErrors = (code: string | undefined) => {
  switch (code) {
    case 'BAD_REQUEST':
      throw new Error('wrong email or password');
    case 'INACTIVE_ACCOUNT':
      throw new Error('your account has been blocked');
    case 'NOT_FOUND':
      throw new Error('account not found');
    case 'SERVER_ERROR':
      throw new Error('something went wrong');
    case 'TOO_MANY_REQUESTS':
      throw new Error(
        'you sent too many requests to reset your password account');

    default:
      throw new Error('unknown error');
  }
};
