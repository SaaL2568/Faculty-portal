function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

async function searchProfessor() {
  const name = document.getElementById("searchName").value.trim();
  const infoBox = document.getElementById("infoBox");
  const aboutBox = document.getElementById("aboutBox");
  const profImage = document.getElementById("profImage");

  if (!name) {
    infoBox.innerHTML = "Please enter a name.";
    return;
  }

  try {
    const res = await fetch(`https://faculty-profile-93bu.onrender.com/professors/search/${encodeURIComponent(name)}`);
    if (!res.ok) throw new Error("Network response was not ok");
    const prof = await res.json();

    if (prof && prof.name) {
      aboutBox.innerHTML = `<strong>About:</strong><br>${prof.about || "N/A"}`;
      infoBox.innerHTML = prof.research || "*Topics the faculty is interested in to research*";
      profImage.src = prof.image || "images/turtle.png"; // fallback image
      profImage.alt = prof.name;

      // Optionally store other details for button clicks
      window.currentProf = prof;
    } else {
      aboutBox.innerHTML = "No professor found.";
      infoBox.innerHTML = "";
      profImage.src = "images/turtle.png";
      profImage.alt = "Professor";
      window.currentProf = null;
    }
  } catch (err) {
    console.error(err);
    infoBox.innerHTML = "Error fetching data.";
  }
}

function showInfo(type) {
  if (!window.currentProf) return;
  const infoBox = document.getElementById("infoBox");

  switch (type) {
    case "research":
      infoBox.innerHTML = window.currentProf.research || "N/A";
      break;
    case "publications":
      infoBox.innerHTML = window.currentProf.publications || "N/A";
      break;
    case "courses":
      infoBox.innerHTML = window.currentProf.courses || "N/A";
      break;
    case "contact":
      infoBox.innerHTML = window.currentProf.contact || "N/A";
      break;
  }
}
