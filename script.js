/* ============================================================
   LAZY LOAD VIDEO PREVIEW (INI YANG BARU / PENTING)
   Video di grid tidak akan di-download/play sampai
   benar-benar terlihat di layar (viewport). Ini yang bikin
   HP jadi berat & layar hitam kalau tidak ada ini.
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    const lazyVideos = document.querySelectorAll('.video-preview[data-src]');

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;

            if (entry.isIntersecting) {
                // Video masuk layar -> baru load & play sekarang
                if (!video.src && video.dataset.src) {
                    const source = document.createElement('source');
                    source.src = video.dataset.src;
                    source.type = 'video/mp4';
                    video.appendChild(source);
                    video.load();
                }
                video.play().catch(() => {});
            } else {
                // Video keluar layar -> pause saja (hemat CPU),
                // source tetap ada supaya tidak load ulang kalau di-scroll balik
                video.pause();
            }
        });
    }, {
        root: null,
        rootMargin: '200px', // mulai load sedikit sebelum video kelihatan
        threshold: 0.15
    });

    lazyVideos.forEach(video => videoObserver.observe(video));
});


/* ============================================================
   MODAL (SAMA SEPERTI SEBELUMNYA, tidak ada perubahan logic)
   ============================================================ */
function openModal(src, title, desc) {
    const modal = document.getElementById('videoModal');
    const mediaContainer = document.getElementById('modalMedia');

    mediaContainer.innerHTML = '';
    const isVideo = src.toLowerCase().endsWith('.mp4');
    const isImage = src.toLowerCase().endsWith('.gif') ||
                    src.toLowerCase().endsWith('.jpg') ||
                    src.toLowerCase().endsWith('.png');

    if (isVideo) {
        mediaContainer.innerHTML = `
            <video id="vPlayer" controls autoplay muted loop playsinline preload="auto" style="width:100%;">
                <source src="${src}" type="video/mp4">
            </video>`;
        document.getElementById('vPlayer').load();
    }
    else if (isImage) {
        mediaContainer.innerHTML = `<img src="${src}" style="width:100%;">`;
    }
    else {
        mediaContainer.innerHTML = `
            <iframe
                style="width:100%; aspect-ratio: 16/9;"
                src="https://www.youtube.com/embed/${src}?autoplay=1&mute=1&loop=1&playlist=${src}&rel=0"
                frameborder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowfullscreen>
            </iframe>`;
    }

    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = desc;
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('videoModal');
    const mediaContainer = document.getElementById('modalMedia');
    modal.style.display = 'none';
    mediaContainer.innerHTML = ''; // suara/video modal berhenti saat ditutup
}

window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target == modal) {
        closeModal();
    }
};
