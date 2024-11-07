let profileData = {};

// Save profile changes
function saveProfile() {
    // Update profileData with edited values
    editableFields.forEach(field => {
        const key = field.getAttribute("data-key");

        if (key.includes("-label")) {
            const baseKey = key.replace("-label", "");
            profileData[baseKey].label = field.innerText;
        } else {
            profileData[key] = field.innerText;
        }
    });

    // For local development, log updated data (saving requires server-side code)
    console.log("Updated profile data:", profileData);

    // TODO: Implement server-side code to persist the updated profileData to data.json.
}

// Add new data to profile
function addNewData(event) {
    event.preventDefault(); // Prevent form submission

    const newKey = document.getElementById("new-key").value.trim();
    const newValue = document.getElementById("new-value").value.trim();
    const newLink = document.getElementById("new-link").value.trim();

    // Check if the key is unique
    if (profileData.hasOwnProperty(newKey)) {
        alert("Key already exists. Please use a unique key.");
        return;
    }

    // Add new data to profileData
    profileData[newKey] = newLink ? { label: newValue, link: newLink } : newValue;

    // Display updated profile
    displayProfile(profileData);

    // Clear form fields
    document.getElementById("new-key").value = "";
    document.getElementById("new-value").value = "";
    document.getElementById("new-link").value = "";

    console.log("Updated profile data with new entry:", profileData);
}

// Capitalize first letter of a word
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// Display profile data in the container
function displayProfile(data) {
    const profileContainer = document.getElementById("profile-container");
    profileContainer.innerHTML = '';

    for (let key in data) {
        let value = data[key];
        let displayText = `${capitalize(key)}: ${value}`;

        // If the value is an object with a 'link' property, format it as a link
        if (typeof value === 'object' && value.link) {
            displayText = `${capitalize(key)}: <a href="${value.link}" target="_blank">${value.label}</a>`;
        }

        profileContainer.innerHTML += `<p data-key="${key}">${displayText}</p>`;
    }
}
