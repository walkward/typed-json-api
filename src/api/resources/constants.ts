export default {
  GET: {
    200: {
      description: 'Ok:  successful request to fetch an individual resource or resource collection.',
    },
    401: {
      description: 'Unauthorized: authentication has failed.',
    },
    404: {
      description: 'Not Found: resource(s) does not exist.',
    },
  },
  DELETE: {
    200: {
      description: 'Ok: deletion request is successful and the server responds with only top-level meta data.',
    },
    202: {
      description: 'Accepted: a request to delete a resource has been accepted for processing, but the ' +
      'processing has not been completed by the time the server responds.',
    },
    204: {
      description: 'No Content: deletion request is successful and no content is returned.',
    },
    401: {
      description: 'Unauthorized: authentication has failed.',
    },
    404: {
      description: 'Not Found: deletion request fails due to the resource not existing.',
    },
  },
  PUT: {
    200: {
      description: 'OK: Includes a representation of the updated resource if the server accepts ' +
      'the update but also changes the resource(s) in ways. Otherwise no resource is included.',
    },
    202: {
      description: 'Accepted: a request to update a resource has been accepted for processing, but the ' +
      'processing has not been completed by the time the server responds.',
    },
    204: {
      description: 'No Content: update is successful but server did not update any attributes.',
    },
    401: {
      description: 'Unauthorized: authentication has failed.',
    },
    403: {
      description: 'Forbidden: unsupported request to create a resource.',
    },
    404: {
      description: 'Not Found: resource does not exist.',
    },
    409: {
      description: 'Conflict: client-generated ID that already exists or bad resource type.',
    },
  },
  POST: {
    201: {
      description: 'Created: request did not include a Client-Generated ID and resource has ' +
      'been created successfully.',
    },
    202: {
      description: 'Accepted: a request to create a resource has been accepted for processing, but the ' +
      'processing has not been completed by the time the server responds.',
    },
    401: {
      description: 'Unauthorized: authentication has failed.',
    },
    403: {
      description: 'Forbidden: unsupported request to create a resource.',
    },
    404: {
      description: 'Not Found: related resource does not exist.',
    },
    409: {
      description: 'Conflict: client-generated ID that already exists or bad resource type.',
    },
  },
};
