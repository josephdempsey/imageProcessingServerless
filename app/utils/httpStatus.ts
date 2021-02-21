export const error400 = (error: Error) => ({
  body: JSON.stringify({ error: error.message, IS_OFFLINE: process.env.IS_OFFLINE }),
  headers: {
    'Content-Type': 'application/json',
  },
  statusCode: 400,
});

export const error404 = (error: Error) => ({
  body: JSON.stringify({ error: error.message, IS_OFFLINE: process.env.IS_OFFLINE }),
  headers: {
    'Content-Type': 'application/json',
  },
  statusCode: 404,
});

export const error500 = (error: Error) => ({
  body: JSON.stringify({ error: error.message, IS_OFFLINE: process.env.IS_OFFLINE }),
  headers: {
    'Content-Type': 'application/json',
  },
  statusCode: 500,
});

export const created = (info: any) => ({
  body: JSON.stringify({ info, IS_OFFLINE: process.env.IS_OFFLINE }),
  headers: {
    'Content-Type': 'application/json',
  },
  statusCode: 201,
});

export const retrieved = (info: any) => ({
  body: info,
  headers: {
    'Content-Type': 'image/jpeg',
  },
  isBase64Encoded: true,
  statusCode: 200,
});

export const retrievedByType = (info: any, ext: string) => ({
  body: info,
  headers: {
    'Content-Type': `image/${ext}`,
  },
  isBase64Encoded: true,
  statusCode: 200,
});
