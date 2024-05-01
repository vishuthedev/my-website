import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { environmentConfig } from '../../server/config/environmentConfig';

// Define an interface for the user type, representing the structure of decoded user information from the JWT
export interface UserType {
  userId: string;
}

// Extend the 'next' module to include a 'user' property of type 'UserType' in the 'NextApiRequest' interface
declare module 'next' {
  interface NextApiRequest {
    user?: UserType;
  }
}

// Define the authentication middleware function
const authMiddleware = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    // Get the token from the request headers or cookies
    const authHeader = req.headers.authorization || req.cookies.token;

    // If the authorization header is not found, return a 401 Unauthorized response
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header not found' });
    }

     // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];

     // If no token is found, return a 401 Unauthorized response
    if (!token) {
      return res.status(401).json({
        message: 'You are not authenticated!',
        success: false,
      });
    }

    // Verify the token using the secret key from the environment configuration
    const decodedToken = jwt.verify(token, environmentConfig.SECRET_KEY);

    // If the decoded token is not an object or is null, return a 401 Unauthorized response
    if (typeof decodedToken !== 'object' || decodedToken === null) {
      return res.status(401).json({
        message: 'Invalid token!',
        success: false,
      });
    }

     // Attach the decoded user information to the request object for later use
    req.user = decodedToken as UserType;


  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

// Export the authentication middleware function
export default authMiddleware;
