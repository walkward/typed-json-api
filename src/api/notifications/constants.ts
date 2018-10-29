export default {
  POST: {
    201: {
      description: 'Created: request did not include a Client-Generated ID and notification has ' +
      'been created successfully.',
    },
    202: {
      description: 'Accepted: a request to create a notification has been accepted for processing, but the ' +
      'processing has not been completed by the time the server responds.',
    },
    401: {
      description: 'Unauthorized: authentication has failed.',
    },
    403: {
      description: 'Forbidden: unsupported request to create a notification.',
    },
    404: {
      description: 'Not Found: related notification does not exist.',
    },
    409: {
      description: 'Conflict: client-generated ID that already exists or bad notification type.',
    },
  },
};
