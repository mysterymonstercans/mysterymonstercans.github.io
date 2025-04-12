document.addEventListener('DOMContentLoaded', function() {
    // 오디오 컨트롤
    const audioButton = document.getElementById('audio-toggle');
    const audioElement = document.getElementById('background-music');
    let audioPlaying = false;

    // 오디오 버튼 클릭 이벤트
    audioButton.addEventListener('click', function() {
        if (audioPlaying) {
            audioElement.pause();
            audioButton.innerHTML = '<span class="audio-icon">♪</span>';
            audioButton.style.color = 'var(--blue-highlight)';
            audioPlaying = false;
        } else {
            audioElement.play().catch(e => {
                console.log('오디오 재생 불가:', e);
                // 사용자 상호작용 없이 자동재생이 불가능할 수 있어 에러 핸들링
            });
            audioButton.innerHTML = '<span class="audio-icon">■</span>';
            audioButton.style.color = 'var(--text-accent)';
            audioPlaying = true;
        }
    });

    // 고대의 책 클릭 이벤트
    const ancientBook = document.querySelector('.ancient-book-container');
    const secretContent = document.getElementById('secret-content');
    
    ancientBook.addEventListener('click', function() {
        if (secretContent.classList.contains('hidden')) {
            // 비밀 내용 표시 애니메이션
            secretContent.classList.remove('hidden');
            
            // 스크롤 애니메이션
            setTimeout(() => {
                secretContent.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            
            // 책 이미지 효과
            ancientBook.style.transform = 'scale(1.1)';
            setTimeout(() => {
                ancientBook.style.transform = 'scale(1)';
            }, 500);
        } else {
            // 비밀 내용 숨기기
            secretContent.classList.add('hidden');
            
            // 책 이미지 효과
            ancientBook.style.transform = 'scale(0.9)';
            setTimeout(() => {
                ancientBook.style.transform = 'scale(1)';
            }, 500);
        }
    });

    // 그림자 효과 애니메이션
    const addShadowEffects = () => {
        const shadowElements = document.querySelectorAll('.entity-card, .artifact-item, .character-card');
        
        shadowElements.forEach(element => {
            // 랜덤 애니메이션 지연 시간
            const delay = Math.random() * 5;
            element.style.animation = `shadowPulse 4s infinite ease-in-out ${delay}s`;
        });
    };

    // 귀걸이 효과 애니메이션
    const earringElement = document.querySelector('.earring-highlight');
    if (earringElement) {
        earringElement.style.animation = 'glow 3s infinite ease-in-out';
    }

    // 비밀 섹션이 표시될 때 그림자 효과 추가
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (!secretContent.classList.contains('hidden')) {
                    addShadowEffects();
                }
            }
        });
    });

    observer.observe(secretContent, { attributes: true });

    // 이미지 프리로딩
    const preloadImages = () => {
        const imageSources = [
            'https://i.postimg.cc/KKxxXFsW/Shades1.png',
            'https://i.postimg.cc/LYsSXDSB/Shades2.png',
            'https://i.postimg.cc/VSg1mTxk/Shades3.png',
            'https://i.postimg.cc/zHb1wfVy/Echoes1.png',
            'https://i.postimg.cc/9zrVHLJc/Echoes2.png',
            'https://i.postimg.cc/HcPg7MsG/Echoes3.png',
            'https://i.postimg.cc/0zd10F20/Overseers1.png',
            'https://i.postimg.cc/ZCNSC0Gg/Overseers2.png',
            'https://i.postimg.cc/23MYknKh/Overseers3.png',
            'https://i.postimg.cc/bGycCgZc/Shadow-Brother.png',
            'https://i.postimg.cc/w1ddJgHB/The-Forgotten-One.png',
            'https://i.postimg.cc/BtczyHGJ/Boundary-Stone.png',
            'https://i.postimg.cc/zVzQ1vJK/The-Black-Well.png'
        ];
        
        imageSources.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    };
    
    preloadImages();

    // 마우스 움직임에 따른 시차 효과
    document.addEventListener('mousemove', (e) => {
        const headerElement = document.querySelector('header');
        const secretTitleElement = document.querySelector('.secret-title');
        
        if (headerElement) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            
            headerElement.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
        
        if (secretTitleElement && !secretContent.classList.contains('hidden')) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
            
            secretTitleElement.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });

    // 푸른 눈 효과 - 페이지에 들어왔을 때 실행
    setTimeout(() => {
        const blueEyesEffect = document.createElement('div');
        blueEyesEffect.classList.add('blue-eyes-effect');
        blueEyesEffect.style.position = 'fixed';
        blueEyesEffect.style.width = '100%';
        blueEyesEffect.style.height = '100%';
        blueEyesEffect.style.backgroundColor = 'rgba(30, 58, 138, 0.2)';
        blueEyesEffect.style.zIndex = '999';
        blueEyesEffect.style.pointerEvents = 'none';
        blueEyesEffect.style.opacity = '0';
        blueEyesEffect.style.transition = 'opacity 2s ease-in-out';
        
        document.body.appendChild(blueEyesEffect);
        
        setTimeout(() => {
            blueEyesEffect.style.opacity = '1';
            
            setTimeout(() => {
                blueEyesEffect.style.opacity = '0';
                
                setTimeout(() => {
                    blueEyesEffect.remove();
                }, 2000);
            }, 1000);
        }, 100);
    }, 1000);

    // 이미지 확대 모달 구현
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.querySelector('.modal-close');
    const zoomableImages = document.querySelectorAll('.zoomable-img');

    // 각 이미지에 클릭 이벤트 추가
    zoomableImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            
            // 모달이 나타날 때 스크롤 방지
            document.body.style.overflow = 'hidden';
            
            // 이미지 품질 최적화
            modalImg.style.imageRendering = '-webkit-optimize-contrast';
            modalImg.style.maxWidth = isMobile() ? '95%' : '80%'; 
            modalImg.style.objectFit = 'contain';
        });

        // 호버 효과 강화 - 모바일과 데스크탑 환경 구분
        if (!isMobile()) {
            // 데스크탑 환경에서만 호버 효과 적용
            img.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.3s ease';
                this.style.cursor = 'zoom-in';
                this.style.boxShadow = '0 0 10px rgba(30, 58, 138, 0.5)';
            });

            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });
        } else {
            // 모바일에서는 터치 피드백 적용
            img.addEventListener('touchstart', function() {
                this.style.opacity = '0.8';
            }, { passive: true });
            
            img.addEventListener('touchend', function() {
                this.style.opacity = '1';
            }, { passive: true });
        }
    });

    // 모바일 환경 감지 함수
    function isMobile() {
        return window.matchMedia("(max-width: 768px)").matches;
    }

    // 닫기 버튼 이벤트
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        
        // 모달이 닫힐 때 스크롤 허용
        document.body.style.overflow = 'auto';
    });

    // 모달 바깥 영역 클릭 시 닫기
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // ESC 키 누를 때 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // 모바일 화면 방향 변경 시 모달 사이즈 조정
    window.addEventListener('orientationchange', function() {
        if (modal.style.display === 'block') {
            modalImg.style.maxWidth = isMobile() ? '95%' : '80%';
        }
    });
}); 