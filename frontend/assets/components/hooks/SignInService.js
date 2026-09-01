const API_URL = "http://localhost:8080";

export const signIn = async (email, password) => {
  if (!email || !password) {
    return {
      success: false,
      message: "Please enter both email and password."
    };
  }

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.trim(), password }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        return {
          success: false,
          message: "Incorrect email or password."
        };
      }
      return {
        success: false,
        message: `Server error: ${response.status}`
      };
    }

    const user = await response.json();
    console.log("Signed in:", user);

    return {
      success: true,
      message: "Signed in successfully",
      user: user
    };
  } catch (e) {
    console.error("Sign in error:", e);
    return {
      success: false,
      message: "An error occurred while signing in."
    };
  }
};