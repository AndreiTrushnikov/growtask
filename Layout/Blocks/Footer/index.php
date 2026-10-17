</main>
<footer class="footer-wrapper">
    <div class="container">
        <div class="footer">
            <div class="line"></div>
            <div class="footer__info">
                <div class="copyright">@ Company name 2026</div>
                <a href="/" class="footer__logo logo">
                    <img src="/assets/icons/logo.svg" alt="Logo">
                </a>
            </div>
        </div>
    </div>
</footer>
</body>
<script>
    document.write(`
        <div class="preloader" id="page-preloader">
            <svg width="128" height="128" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
                <circle fill='#F23051' stroke='#F23051' stroke-width='3' r='15' cx='40' cy='100'>
                    <animate attributeName='opacity' calcMode='spline' dur='1.3' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.4'></animate>
                </circle>
                <circle fill='#F23051' stroke='#F23051' stroke-width='3' r='15' cx='100' cy='100'>
                    <animate attributeName='opacity' calcMode='spline' dur='1.3' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.2'></animate>
                </circle>
                <circle fill='#F23051' stroke='#F23051' stroke-width='3' r='15' cx='160' cy='100'>
                    <animate attributeName='opacity' calcMode='spline' dur='1.3' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='0'></animate>
                </circle>
            </svg>
        </div>
        `);

    // Скрытие прелоадера после загрузки
    window.addEventListener("load", function () {
        const preloader = document.getElementById("page-preloader");
        if (preloader) {
            preloader.style.opacity = "0";
            setTimeout(() => {
                if (preloader && preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 300);
        }
    });
</script>
<?php require_once $_SERVER['DOCUMENT_ROOT'] . '/scripts.php'; ?>
</html>