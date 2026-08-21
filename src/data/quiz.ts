import type { QuizQuestion } from '../types/status';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What status code should an API return when a new resource has been successfully created?',
    options: [200, 201, 204, 202],
    correctCode: 201,
    explanation: '201 Created is the specific status code designed to indicate that a request succeeded and a new resource was created.'
  },
  {
    id: 'q2',
    question: 'A client requests a user profile, but the user ID does not exist in the database. What status code is appropriate?',
    options: [400, 401, 404, 410],
    correctCode: 404,
    explanation: '404 Not Found indicates that the server cannot find the requested resource.'
  },
  {
    id: 'q3',
    question: 'A user is logged in, but tries to delete a post that belongs to someone else. They do not have permission. What status code should you return?',
    options: [401, 403, 404, 405],
    correctCode: 403,
    explanation: '403 Forbidden indicates that the client\'s identity is known, but they do not have the necessary access rights to perform the action.'
  },
  {
    id: 'q4',
    question: 'A client sends a DELETE request to remove an item. The item is successfully removed, and the server does not need to send any data back in the response body.',
    options: [200, 202, 204, 205],
    correctCode: 204,
    explanation: '204 No Content means the server successfully fulfilled the request, but there is no additional content to send in the response payload body.'
  },
  {
    id: 'q5',
    question: 'A client submits a registration form. The JSON syntax is perfect, but the "age" field is a negative number, violating business rules. What status code is best?',
    options: [400, 406, 409, 422],
    correctCode: 422,
    explanation: '422 Unprocessable Content is used when the request is well-formed (valid JSON) but contains semantic errors (business rule validation failures).'
  },
  {
    id: 'q6',
    question: 'An unauthenticated client tries to access a protected API endpoint. They need to log in first.',
    options: [401, 403, 407, 426],
    correctCode: 401,
    explanation: '401 Unauthorized means the client must authenticate itself to get the requested response.'
  },
  {
    id: 'q7',
    question: 'A client makes an API request, but your database connection suddenly fails and the code throws an unhandled exception.',
    options: [400, 500, 502, 503],
    correctCode: 500,
    explanation: '500 Internal Server Error is a generic error message given when an unexpected condition was encountered on the server.'
  },
  {
    id: 'q8',
    question: 'A client sends 500 requests per second to your API, exceeding their allowed quota. You block the requests.',
    options: [429, 403, 503, 408],
    correctCode: 429,
    explanation: '429 Too Many Requests indicates the user has sent too many requests in a given amount of time (rate limiting).'
  },
  {
    id: 'q9',
    question: 'You want to take down your API for 10 minutes to run a complex database migration.',
    options: [500, 502, 503, 504],
    correctCode: 503,
    explanation: '503 Service Unavailable explicitly indicates that the server is not ready to handle the request, often due to maintenance.'
  },
  {
    id: 'q10',
    question: 'A client registers with an email address that is already present in your database. You want to reject the request due to this conflict.',
    options: [400, 403, 409, 422],
    correctCode: 409,
    explanation: '409 Conflict is sent when a request conflicts with the current state of the server, such as a unique constraint violation.'
  },
  {
    id: 'q11',
    question: 'A client sends malformed, broken JSON that your JSON parser cannot even read.',
    options: [400, 415, 422, 500],
    correctCode: 400,
    explanation: '400 Bad Request indicates that the server cannot process the request due to a client error like malformed request syntax.'
  },
  {
    id: 'q12',
    question: 'An API endpoint used to exist at /v1/users, but it has permanently moved to /v2/users. You want to redirect clients.',
    options: [301, 302, 304, 307],
    correctCode: 301,
    explanation: '301 Moved Permanently tells the client that the URL of the requested resource has been changed permanently.'
  },
  {
    id: 'q13',
    question: 'A client requests a resource they already have in their cache, and they provide an ETag. The resource has not changed.',
    options: [200, 204, 304, 412],
    correctCode: 304,
    explanation: '304 Not Modified tells the client that the requested resource has not been modified, so they can use their cached version.'
  },
  {
    id: 'q14',
    question: 'An endpoint only supports GET requests, but a client tries to send a POST request to it.',
    options: [400, 404, 405, 501],
    correctCode: 405,
    explanation: '405 Method Not Allowed indicates that the request method is known by the server but is not supported by the target resource.'
  },
  {
    id: 'q15',
    question: 'A reverse proxy (like Nginx) tries to forward a request to your Node.js app, but the Node app has crashed and is offline.',
    options: [500, 502, 503, 504],
    correctCode: 502,
    explanation: '502 Bad Gateway means the proxy server got an invalid response or could not connect to the upstream application server.'
  }
];
