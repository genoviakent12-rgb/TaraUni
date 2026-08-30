const API_URL = "http://localhost:8080/api";

// create carpool
export const createCarpool = async (carpool) => {
  try {
    const response = await fetch(`${API_URL}/carpools`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carpool),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create carpool: ${response.status}`
      );
    }

    const data = await response.json();

    return data;
  } catch (e) {
    console.error("Error creating carpool:", e);
    throw e;
  }
};

//gets the carpools
export const getCarpools = async () => { 
  try { 
    const response = await fetch(`${API_URL}/carpools`);

  //checks if there is a carpool to fetch
  if(!response.ok) { 
    throw new Error(`Failed to fetch carpools: ${response.status}`);
  }

  //now puts response in data
  const data = await response.json(); 

  return data;
  } catch (e) { 
    console.error("Error fetching carpools:", e);
    throw e;
  }
}

//finds the game by id
export const getCarpoolById = async (id) =>  {
  try { 
    const response = await fetch(`${API_URL}/carpools/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch carpool: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Error fetching carpool:", e);
    throw e;
  }
}

//join a carpool
export const joinCarpool = async (id) =>  {

  try { 
    const response = await fetch(`${API_URL}/carpools/${id}/join`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    });

    if(!response.ok) { 
      throw new Error(`Failed to join carpool: ${response.status}`);
    }
  } catch (e) {
    console.error("Error joining carpool:", e);
    throw e;
  }
}

//remove a carpool
export const removeCarpool = async (carpools, currentUserId) =>  {
  try { 
    const response = await fetch(`${API_URL}/carpools/${carpools.id}?userId=${currentUserId}`, { 
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json"
      }
    });

    if(!response.ok) { 
      throw new Error(`Failed to remove carpool: ${response.status}`);
    }
  } catch (e) {
    console.error("Error removing carpool:", e);
    throw e;
  }
}