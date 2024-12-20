export enum HttpResponse {
    // Sign Up Responses
    SIGNUP_SUCCESS = "201:Sign up successful",
    SIGNUP_EMAIL_CONFLICT = "409:Email already exists. Please sign in.",
    SIGNUP_FAILED = "500:Sign up failed",

    // Sign In Responses
    SIGNIN_SUCCESS = "200:Sign in successful",
    SIGNIN_EMAIL_NOT_FOUND = "404:Email not found",
    SIGNIN_INVALID_PASSWORD = "401:Invalid password",
    SIGNIN_FAILED = "500:Sign in failed",

    INVALID_OR_EXPIRED_TOKEN="401:invalid or expired token",
    TOKEN_REQUIRED="401:Authorization token is required",

    CONTENT_ADDED_SUCCESSFULLY="200:content added successfully",
    CONTENT_CREATION_FAILED="500:failed to add content"
  }

export const getFormattedHttpResponse = (response: HttpResponse) => {
    const [statusCode, message] = response.split(":");
    return { statusCode: parseInt(statusCode), message };
};
