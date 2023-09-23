const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });

  response.write(JSON.stringify(object));

  response.end();
};
const respondXML = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });

  response.write(object);

  response.end();
};

// success status
const success = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>This is a successful response</message></response>';

    return respondXML(request, response, 200, responseXML);
  }

  const responseJSON = {
    message: 'This is a successful response',
  };

  return respondJSON(request, response, 200, responseJSON);
};

// badRequest status
const badRequest = (request, response, acceptedTypes, params) => {
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response><message>This request has the required parameters</message></response>';

    if (!params.valid || params.valid !== 'true') {
      responseXML = '<response><message>Missing valid query parameter set to true</message><id>badRequest</id></response>';

      return respondXML(request, response, 400, responseXML);
    }

    return respondXML(request, response, 200, responseXML);
  }

  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

// unauthorized status
const unauthorized = (request, response, acceptedTypes, params) => {
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response><message>This request has the required parameters</message></response>';

    if (!params.loggedIn || params.loggedIn !== 'yes') {
      responseXML = '<response><message>Missing loggedIn query parameter set to yes</message><id>unauthorized</id></response>';

      return respondXML(request, response, 401, responseXML);
    }

    return respondXML(request, response, 200, responseXML);
  }

  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';
    return respondJSON(request, response, 401, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

// forbidden status
const forbidden = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>You do not have access to this content.</message><id>forbidden</id></response>';

    return respondXML(request, response, 403, responseXML);
  }

  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  return respondJSON(request, response, 403, responseJSON);
};

// internal status
const internal = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>Internal Server Error. Something went wrong.</message><id>internal</id></response>';

    return respondXML(request, response, 500, responseXML);
  }

  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internal',
  };

  return respondJSON(request, response, 500, responseJSON);
};

// notImplemented status
const notImplemented = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>A get request for this page has not been implemented yet. Check again later for updated content.</message><id>notImplemented</id><response>';

    return respondXML(request, response, 501, responseXML);
  }

  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  return respondJSON(request, response, 501, responseJSON);
};

// notFound status
const notFound = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>The page you are looking for was not found.</message><id>notFound</id></response>';

    return respondXML(request, response, 404, responseXML);
  }

  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
