function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

async function searchProfessor() {
  const name = document.getElementById("searchName").value.trim();
  if (!name) return;

  try {
    const res = await fetch("https://faculty-profile-93bu.onrender.com/professors/search/" + name);
    const prof = await res.json();

    if (prof && prof.name) {
      document.getElementById("professorList").innerHTML = `
        <div style="background:#f1f1f1;padding:20px;border-radius:10px;">
          <h2>${prof.name}</h2>
          <p><strong>About:</strong> ${prof.about}</p>
          <p><strong>Research:</strong> ${prof.research}</p>
          <p><strong>Publications:</strong> ${prof.publications}</p>
          <p><strong>Courses:</strong> ${prof.courses}</p>
          <p><strong>Contact:</strong> ${prof.contact}</p>
        </div>`;
    } else {
      document.getElementById("professorList").innerHTML = "No professor found.";
    }
  } catch (err) {
    console.error(err);
    document.getElementById("professorList").innerHTML = "Error fetching data.";
  }
}
