import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user.model';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

// Cookie Option
const options = {
  httpOnly: true,
  secure: true,
  sameSite: 'none' as const,
};

const generateAccessAndRefreshTokens = async (
  userId: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    if (!accessToken || !refreshToken) {
      throw new ApiError(500, 'Failed to generate tokens');
    }

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Token Generation Error:', error);
    throw new ApiError(
      500,
      'Server error generating access and refresh tokens.'
    );
  }
};

const signUp = asyncHandler(async (req, res) => {
  if (!req.body) {
    throw new ApiError(400, 'Request data is missing.');
  }

  const { name, email, password } = req.body;

  // Validate request body
  if (!name || !email || !password) {
    throw new ApiError(400, 'Name, Email and Password are required!');
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(400, 'User already exists!');
  }

  // Create new user
  await User.create({ name, email, password });

  res.status(200).json(new ApiResponse(200, 'User created successfully.'));
});

const signIn = asyncHandler(async (req, res) => {
  if (!req.body) {
    throw new ApiError(400, 'Request data is missing.');
  }

  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    throw new ApiError(400, 'Email and Password are required!');
  }

  // Check user exists
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, 'User not found!');
  }

  // Check password
  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(400, 'Invalid password!');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id.toString()
  );

  res
    .status(200)
    .cookie('refreshToken', refreshToken, options)
    .cookie('accessToken', accessToken, options)
    .json(
      new ApiResponse(200, 'User signed in successfully.', {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      })
    );
});

const signOut = asyncHandler(async (req: AuthenticatedRequest, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    { new: true }
  );

  res
    .status(200)
    .clearCookie('refreshToken', options)
    .clearCookie('accessToken', options)
    .json(new ApiResponse(200, 'User signed out successfully.'));
});

const currentUser = asyncHandler(async (req: AuthenticatedRequest, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, 'User fetched successfully.', req.user));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!refreshToken) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    throw new ApiError(401, 'No refresh token found');
  }

  let decoded;
  try {
    decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as JwtPayload;
  } catch (error) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    throw new ApiError(401, 'Invalid or expired refresh token');
  }

  const user = await User.findById(decoded._id);
  if (!user) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    throw new ApiError(400, 'User not found');
  }

  const accessToken = user.generateAccessToken();

  res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .json(
      new ApiResponse(200, 'Access token refreshed successfully', accessToken)
    );
});

export const userController = {
  generateAccessAndRefreshTokens,
  refreshAccessToken,
  currentUser,
  signOut,
  signUp,
  signIn,
};
