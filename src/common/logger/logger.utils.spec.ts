import { Request } from 'express';
import { createCurlCommand, maskSensitiveData } from './logger.utils';

describe('logger utilities', () => {
  it('masks sensitive values recursively without mutating the source value', () => {
    const payload = {
      email: 'user@example.com',
      password: 'P@ssw0rd!',
      nested: {
        accessToken: 'signed-token',
      },
    };

    expect(maskSensitiveData(payload)).toEqual({
      email: 'user@example.com',
      password: '********',
      nested: {
        accessToken: '********',
      },
    });
    expect(payload.password).toBe('P@ssw0rd!');
    expect(payload.nested.accessToken).toBe('signed-token');
  });

  it('generates a cURL command without exposing sensitive headers or body fields', () => {
    const request = {
      method: 'POST',
      protocol: 'http',
      originalUrl: '/auth',
      url: '/auth',
      body: {
        email: 'user@example.com',
        password: 'P@ssw0rd!',
      },
      headers: {
        host: 'localhost:3000',
        authorization: 'Bearer signed-token',
        'content-type': 'application/json',
      },
      get: (name: string) => (name === 'host' ? 'localhost:3000' : undefined),
    } as unknown as Request;

    const command = createCurlCommand(request);

    expect(command).toContain("curl --location 'http://localhost:3000/auth'");
    expect(command).toContain('authorization: ********');
    expect(command).toContain('password": "********');
    expect(command).not.toContain('signed-token');
    expect(command).not.toContain('P@ssw0rd!');
  });
});
