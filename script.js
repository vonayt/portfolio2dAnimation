/**
 * FUNGSI HYBRID: Bisa memutar video lokal (.mp4), gambar (.gif/.jpg), 
 * dan Video YouTube (ID) dalam satu fungsi.
 */
function openModal(src, title, desc) {
    const modal = document.getElementById('videoModal');
    const mediaContainer = document.getElementById('modalMedia');
    
    // 1. Bersihkan isi modal agar tidak menumpuk dengan video sebelumnya
    mediaContainer.innerHTML = '';

    // 2. DETEKSI FORMAT FILE
    const isVideo = src.toLowerCase().endsWith('.mp4');
    const isImage = src.toLowerCase().endsWith('.gif') || 
                    src.toLowerCase().endsWith('.jpg') || 
                    src.toLowerCase().endsWith('.png');

    if (isVideo) {
        // --- FORMAT UNTUK VIDEO REPOSITORY GITHUB (.mp4) ---
        mediaContainer.innerHTML = `
            <video controls autoplay muted loop playsinline style="width:100%; aspect-ratio: 16/9; object-fit: cover;">
                <source src="${src}" type="video/mp4">
            </video>`;
    } 
    else if (isImage) {
        // --- FORMAT UNTUK GAMBAR ATAU GIF ---
        mediaContainer.innerHTML = `
            <img src="${src}" style="width:100%; aspect-ratio: 16/9; object-fit: cover;">`;
    } 
    } else {
    // FORMAT YOUTUBE: Ditambahkan parameter loop & playlist agar bisa mengulang
    // playlist=${src} wajib ada agar fitur loop YouTube aktif untuk video tunggal
    mediaContainer.innerHTML = `
        <iframe 
            style="width:100%; aspect-ratio: 16 / 9; display: block; object-fit: cover;" 
            src="https://www.youtube.com/embed/${src}?autoplay=1&mute=1&loop=1&playlist=${src}&controls=1&rel=0" 
            frameborder="0" 
            allow="autoplay; encrypted-media; picture-in-picture" 
            allowfullscreen>
        </iframe>`;
}
    }
    
    // 3. Masukkan Judul dan Deskripsi
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = desc;
    
    // 4. Tampilkan Modal
    modal.style.display = 'flex';
}

// Fungsi untuk menutup modal
function closeModal() {
    const modal = document.getElementById('videoModal');
    const mediaContainer = document.getElementById('modalMedia');
    modal.style.display = 'none';
    mediaContainer.innerHTML = ''; // Mematikan suara video saat ditutup
}

// Menutup modal jika area hitam di luar kotak di-klik
window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target == modal) {
        closeModal();
    }
}
