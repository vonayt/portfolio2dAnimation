/**
 * Fungsi untuk membuka Pop-up
 * @param {string} src - Nama file video/gambar
 * @param {string} title - Judul yang akan tampil
 * @param {string} desc - Deskripsi yang akan tampil
 */
function openModal(src, title, desc) {
    const modal = document.getElementById('videoModal');
    const mediaContainer = document.getElementById('modalMedia');
    
    // Deteksi otomatis jika file adalah MP4 atau Gambar
    if (src.toLowerCase().endsWith('.mp4')) {
        mediaContainer.innerHTML = `<video controls autoplay style="width:100%; height:auto;"><source src="${src}" type="video/mp4"></video>`;
    } else {
        mediaContainer.innerHTML = `<img src="${src}" style="width:100%; height:auto;">`;
    }
    
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = desc;
    modal.style.display = 'flex'; // Menampilkan modal
}

// Fungsi menutup Pop-up
function closeModal() {
    const modal = document.getElementById('videoModal');
    const mediaContainer = document.getElementById('modalMedia');
    modal.style.display = 'none';
    mediaContainer.innerHTML = ''; // Penting agar suara video mati saat ditutup
}

// Menutup modal jika klik di area hitam luar kotak
window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target == modal) {
        closeModal();
    }
}
