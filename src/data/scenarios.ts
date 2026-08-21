import type { Scenario } from '../types/status';

export const scenarios: Scenario[] = [
  {
    id: 's1',
    question: 'The request succeeded and you are returning data.',
    answerCode: 200,
    explanation: '200 OK is the standard response for successful HTTP requests that contain a response body.',
    wrongOptions: [
      { code: 201, why: '201 Created should be used when a new resource was created.' },
      { code: 204, why: '204 No Content must not contain a response body.' }
    ]
  },
  {
    id: 's2',
    question: 'The user was successfully created in the database.',
    answerCode: 201,
    explanation: '201 Created specifically indicates that the request was successful and resulted in the creation of a new resource.',
    wrongOptions: [
      { code: 200, why: 'While technically a success, 200 doesn\'t communicate that something was actually created.' },
      { code: 202, why: '202 Accepted implies the creation will happen later asynchronously.' }
    ]
  },
  {
    id: 's3',
    question: 'The request was successful, but you have no body to return.',
    answerCode: 204,
    explanation: '204 No Content is exactly for this: a successful request (like a DELETE) where the server has nothing to send back.',
    wrongOptions: [
      { code: 200, why: '200 OK implies a response body is present.' },
      { code: 404, why: '404 is an error indicating the resource wasn\'t found, not a success.' }
    ]
  },
  {
    id: 's4',
    question: 'The user hasn\'t logged in.',
    answerCode: 401,
    explanation: '401 Unauthorized means the client must authenticate itself to get the requested response.',
    wrongOptions: [
      { code: 403, why: '403 Forbidden means they ARE logged in, but aren\'t allowed to do this.' },
      { code: 400, why: '400 Bad Request is for malformed syntax, not authentication.' }
    ]
  },
  {
    id: 's5',
    question: 'The user is logged in, but doesn\'t have admin permissions.',
    answerCode: 403,
    explanation: '403 Forbidden indicates the server understands the request and knows who the user is, but refuses to authorize it.',
    wrongOptions: [
      { code: 401, why: '401 Unauthorized means the server doesn\'t know who the user is.' },
      { code: 404, why: 'Sometimes 404 is used to hide resources, but 403 explicitly communicates lack of permission.' }
    ]
  },
  {
    id: 's6',
    question: 'The resource requested does not exist.',
    answerCode: 404,
    explanation: '404 Not Found is the standard response when the server cannot find the requested resource.',
    wrongOptions: [
      { code: 400, why: 'The request might be perfectly valid, just asking for an ID that doesn\'t exist.' },
      { code: 410, why: '410 Gone means you know it used to exist but was intentionally removed. 404 is more general.' }
    ]
  },
  {
    id: 's7',
    question: 'The user sends a syntactically invalid email address in a JSON payload.',
    answerCode: 422,
    explanation: '422 Unprocessable Content is perfect for semantic validation errors (the JSON is valid, but the data rules are broken).',
    wrongOptions: [
      { code: 400, why: '400 Bad Request is better for when the JSON itself is broken or malformed.' },
      { code: 500, why: 'This is a client error (bad input), not a server crash.' }
    ]
  },
  {
    id: 's8',
    question: 'The user tries to register with an email that is already taken.',
    answerCode: 409,
    explanation: '409 Conflict indicates that the request could not be completed due to a conflict with the current state of the target resource (like a unique constraint).',
    wrongOptions: [
      { code: 422, why: 'While a form of validation, 409 more accurately describes a state conflict in the database.' },
      { code: 400, why: 'The syntax of the request was completely fine.' }
    ]
  },
  {
    id: 's9',
    question: 'The user sent too many API requests in the last minute.',
    answerCode: 429,
    explanation: '429 Too Many Requests is the standard response for rate limiting. You should usually include a Retry-After header.',
    wrongOptions: [
      { code: 503, why: '503 means the whole server is down or overloaded, 429 specifically means THIS client is being rate limited.' },
      { code: 400, why: 'The requests themselves might be perfectly valid.' }
    ]
  },
  {
    id: 's10',
    question: 'Your backend database crashed while processing the request.',
    answerCode: 500,
    explanation: '500 Internal Server Error is a catch-all for unexpected server-side failures (bugs, crashes, database connection failures).',
    wrongOptions: [
      { code: 400, why: 'The client did nothing wrong; it was your server\'s fault.' },
      { code: 502, why: '502 Bad Gateway is used when an upstream proxy/gateway receives a bad response from your app, not by your app itself.' }
    ]
  },
  {
    id: 's11',
    question: 'Nginx failed to reach your Node.js application.',
    answerCode: 502,
    explanation: '502 Bad Gateway is typically returned by reverse proxies (like Nginx) when the application server they try to reach is down or returns garbage.',
    wrongOptions: [
      { code: 500, why: 'The Node app didn\'t crash while handling the request; the proxy couldn\'t even talk to it.' },
      { code: 404, why: 'The route might exist in the proxy, but the upstream is failing.' }
    ]
  },
  {
    id: 's12',
    question: 'The API is down for planned maintenance.',
    answerCode: 503,
    explanation: '503 Service Unavailable explicitly communicates that the server is temporarily unable to handle the request due to maintenance or overload.',
    wrongOptions: [
      { code: 500, why: '500 implies an unexpected crash or bug, whereas 503 can be a planned and temporary state.' },
      { code: 404, why: 'The API exists, it\'s just not currently available.' }
    ]
  }
];
