import type { Comparison } from '../types/status';

export const comparisons: Comparison[] = [
  {
    id: 'c1',
    title: '200 vs 201 vs 204',
    codes: [200, 201, 204],
    description: 'The big three success codes. Knowing when to use which is the foundation of good REST API design.',
    differences: [
      { code: 200, meaning: 'Generic success. A response body is included.' },
      { code: 201, meaning: 'Success, and a new resource was explicitly created as a result.' },
      { code: 204, meaning: 'Success, but the server deliberately has no body to return (common for DELETE).' }
    ]
  },
  {
    id: 'c2',
    title: '400 vs 422',
    codes: [400, 422],
    description: 'Both deal with bad client requests, but they differ in what "bad" means.',
    differences: [
      { code: 400, meaning: 'The request is malformed (e.g., bad JSON syntax) and cannot be parsed.' },
      { code: 422, meaning: 'The request is well-formed (valid JSON), but the data inside fails business validation rules.' }
    ]
  },
  {
    id: 'c3',
    title: '401 vs 403',
    codes: [401, 403],
    description: 'The classic authentication vs authorization confusion.',
    differences: [
      { code: 401, meaning: 'Authentication. "I don\'t know who you are. Please log in."' },
      { code: 403, meaning: 'Authorization. "I know who you are, but you are not allowed to do this."' }
    ]
  },
  {
    id: 'c4',
    title: '404 vs 410',
    codes: [404, 410],
    description: 'When something isn\'t there.',
    differences: [
      { code: 404, meaning: 'The resource cannot currently be found. Maybe it never existed, maybe it will exist later.' },
      { code: 410, meaning: 'The resource is intentionally gone and will not come back. Clients should stop asking for it.' }
    ]
  },
  {
    id: 'c5',
    title: '409 vs 422',
    codes: [409, 422],
    description: 'Both deal with requests that cannot be processed due to the data provided.',
    differences: [
      { code: 409, meaning: 'Conflict with the current state of the server (e.g., trying to use an email that is already registered).' },
      { code: 422, meaning: 'Semantic errors in the data itself (e.g., providing an age of -5 or a missing required field).' }
    ]
  },
  {
    id: 'c6',
    title: '500 vs 502 vs 503 vs 504',
    codes: [500, 502, 503, 504],
    description: 'When things go wrong on the backend.',
    differences: [
      { code: 500, meaning: 'Your application code crashed or hit an unexpected error (e.g., a database connection failed inside your code).' },
      { code: 502, meaning: 'A proxy/gateway (like Nginx) tried to talk to your application, but your application returned an invalid response or closed the connection.' },
      { code: 503, meaning: 'The service is temporarily unavailable, usually due to planned maintenance or severe overload.' },
      { code: 504, meaning: 'A proxy/gateway tried to talk to your application, but your application took too long to respond and the proxy gave up.' }
    ]
  },
  {
    id: 'c7',
    title: '301 vs 308',
    codes: [301, 308],
    description: 'Permanent redirects and HTTP method preservation.',
    differences: [
      { code: 301, meaning: 'Permanent redirect. Historically, clients often change POST requests to GET requests when following this.' },
      { code: 308, meaning: 'Permanent redirect. Strict rule: clients MUST preserve the original HTTP method (POST stays POST).' }
    ]
  },
  {
    id: 'c8',
    title: '302 vs 307',
    codes: [302, 307],
    description: 'Temporary redirects and HTTP method preservation.',
    differences: [
      { code: 302, meaning: 'Temporary redirect. Historically, clients often change POST requests to GET requests when following this.' },
      { code: 307, meaning: 'Temporary redirect. Strict rule: clients MUST preserve the original HTTP method (POST stays POST).' }
    ]
  }
];
