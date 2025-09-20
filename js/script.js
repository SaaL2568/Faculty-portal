function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

async function searchProfessor() {
  const name = document.getElementById("searchName").value.trim();
  if (!name) {
    document.getElementById("professorList").innerHTML = "Please enter a name.";
    return;
  }

  try {
    const res = await fetch(`https://faculty-profile-93bu.onrender.com/professors/search/${encodeURIComponent(name)}`);
    if (!res.ok) throw new Error("Network response was not ok");
    const prof = await res.json();

    const output = prof && prof.name ? `
      <div style="background:#f1f1f1;padding:20px;border-radius:10px;">
        <h2>${prof.name}</h2>
        <p><strong>About:</strong> ${prof.about}</p>
        <p><strong>Research:</strong> ${prof.research}</p>
        <p><strong>Publications:</strong> ${prof.publications}</p>
        <p><strong>Courses:</strong> ${prof.courses}</p>
        <p><strong>Contact:</strong> ${prof.contact}</p>
      </div>` : "No professor found.";

    document.getElementById("professorList").innerHTML = output;
  } catch (err) {
    console.error(err);
    document.getElementById("professorList").innerHTML = "Error fetching data.";
  }
}
