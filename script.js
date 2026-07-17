function openModal(src, title, desc) {
    const modal = document.getElementById('videoModal');
    const mediaContainer = document.getElementById('modalMedia');
    
    // 1. Bersihkan isi lama
    mediaContainer.innerHTML = '';

    // 2. Deteksi Format File
    const isVideo = src.toLowerCase().endsWith('.mp4');
    const isImage = src.toLowerCase().endsWith('.gif') || 
                    src.toLowerCase().endsWith('.jpg') || 
                    src.toLowerCase().endsWith('.png');

    if (isVideo) {
        // --- FORMAT VIDEO LOKAL ---
        mediaContainer.innerHTML = `
            <video id="vPlayer" controls autoplay muted loop playsinline style="width:100%;">
                <source src="${src}" type="video/mp4">
            </video>`;
        document.getElementById('vPlayer').load();
    } 
    else if (isImage) {
        // --- FORMAT GAMBAR / GIF ---
        mediaContainer.innerHTML = `<img src="${src}" style="width:100%;">`;
    } 
    else {
        // --- FORMAT YOUTUBE (Looping Aktif) ---
        mediaContainer.innerHTML = `
            <iframe 
                style="width:100%; aspect-ratio: 16/9;" 
                src="https://www.youtube.com/embed/${src}?autoplay=1&mute=1&loop=1&playlist=${src}&rel=0" 
                frameborder="0" 
                allow="autoplay; encrypted-media; picture-in-picture" 
                allowfullscreen>
            </iframe>`;
    }

    // 3. Update Teks Deskripsi
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = desc;

    // 4. Tampilkan Modal
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('videoModal');
    const mediaContainer = document.getElementById('modalMedia');
    modal.style.display = 'none';
    mediaContainer.innerHTML = ''; // Penting agar suara video mati saat ditutup
}

// Tutup modal jika area luar kotak diklik
window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target == modal) {
        closeModal();
    }
}
