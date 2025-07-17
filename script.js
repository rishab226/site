// Your Firebase config here
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

function uploadToFirebase() {
  const file = document.getElementById("uploadFile").files[0];
  if (!file) return alert("Please select a file!");
  const ref = storage.ref('shared_files/' + file.name);
  ref.put(file).then(() => {
    alert("Uploaded successfully!");
    listFiles();
  });
}

function listFiles() {
  const listRef = storage.ref('shared_files/');
  const fileListDiv = document.getElementById("fileList");
  fileListDiv.innerHTML = "<h3>📁 Shared Files:</h3>";
  listRef.listAll().then(res => {
    res.items.forEach(itemRef => {
      itemRef.getDownloadURL().then(url => {
        const link = document.createElement('a');
        link.href = url;
        link.target = "_blank";
        link.textContent = "📎 " + itemRef.name;
        link.className = "file-link";

        const container = document.createElement("div");
        container.className = "file-item";
        container.appendChild(link);
        fileListDiv.appendChild(container);
      });
    });
  });
}

window.onload = listFiles;
