const API_URL = "http://localhost:8080";

export const createAccount = async (fullname, email, password) => {
  //1. validating the fields first
  if (!fullname || !email || !password) {
    return { 
      success: false,
      message: "Please enter full name, email, and password."
    }
  }

  // splits the full name into two
  const nameParts = fullname.trim().split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ") || " ";

  //checks if names are present
  if (!firstName || !lastName) {
    return { 
      success: false,
      message: "Please enter your first and last name."
    }
  }

  // create an object
  const user = { 
    firstName: firstName,
    lastName: lastName,
    email: email.trim(),
    password: password
  }; 

  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    //checks for error = server
    if (!response.ok) { 
      if (response.status === 400) {
        return { 
          success: false,
          message: "An account with this email may already exist."
        };
      } else {
        return { 
          success: false,
          message: `Server error: ${response.status}`
        };
      }
    } 
  
    //get the user in spring boot
    const createdUser = await response.json(); 
    console.log("Account created:", createdUser);

    return { 
      success: true,
      message: "User created successfully",
      user: createdUser
    }
  } catch (e) {
    console.error("Create account error:", e);

    return { 
      success: false,
      message: "An error occurred while creating the account."
    }
  }
};


//  if (!response.ok) {
//       if (response.status === 400) {
//         Alert.alert(
//           "Account Creation Failed",
//           "An account with this email may already exist."
//         );
//       } else {
//         Alert.alert(
//           "Account Creation Failed",
//           `Server error: ${response.status}`
//         );
//       }

//       return;
//     }

//     const user = await response.json();

//     console.log("Account created:", user);

//     Alert.alert(
//       "Account Created!",
//       `Welcome, ${user.firstName}!`,
//       [
//         {
//           text: "Continue",
//           onPress: () => router.push("/auth/signin/signin"),
//         },
//       ]
//     );

//   } catch (error) {
//     console.error("Create account error:", error);

//     Alert.alert(
//       "Connection Error",
//       "Could not connect to the server. Make sure your Spring Boot server is running."
//     );
//   }
// };