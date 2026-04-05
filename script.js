function openModal(src, title, desc) {
    const modal = document.getElementById('videoModal');
    const mediaContainer = document.getElementById('modalMedia');
    
    // Logika deteksi file video atau gambar
    if (src.toLowerCase().endsWith('.mp4')) {
    mediaContainer.innerHTML = `<video controls autoplay style="width:100%; display:block;"><source src="${src}" type="video/mp4"></video>`;
} else {
    mediaContainer.innerHTML = `<img src="${src}" style="width:100%; display:block;">`;
}
    
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = desc;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('videoModal').style.display = 'none';
    document.getElementById('modalMedia').innerHTML = ''; // Stop video saat tutup
}

// Tutup jika klik area hitam di luar gambar
window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target == modal) { closeModal(); }
}
