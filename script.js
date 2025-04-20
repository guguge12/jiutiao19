// 显示等待提示弹窗
function showWaitingModal() {
  const modal = document.getElementById('waitingModal');
  const modalContent = modal.querySelector('.waiting-modal-content');

  // 获取当前滚动位置和视口高度
  const scrollY = window.scrollY || window.pageYOffset;
  const viewportHeight = window.innerHeight;

  // 设置模态框的位置
  modal.style.top = scrollY + 'px';

  // 计算模态框内容的位置
  const modalHeight = modalContent.offsetHeight;
  const centerPosition = (viewportHeight - modalHeight) / 2;

  // 设置模态框内容的位置，确保在视口中心
  modalContent.style.top = centerPosition + 'px';

  // 禁止页面滚动，同时保存滚动位置
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.top = `-${scrollY}px`;

  modal.classList.add('show');
}

// 关闭等待提示弹窗
function closeWaitingModal() {
  const modal = document.getElementById('waitingModal');
  modal.classList.remove('show');

  // 恢复页面滚动
  const scrollY = document.body.style.top;
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
}

document.addEventListener('DOMContentLoaded', function () {
  // 删除卡片动画观察者代码
  /*
  const cards = document.querySelectorAll('.card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        entry.target.classList.remove('hide');
      } else {
        entry.target.classList.remove('show');
        entry.target.classList.add('hide');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '-50px'
  });

  cards.forEach(card => {
    observer.observe(card);
  });
  */

  const scrollToTopBtn = document.querySelector('.scroll-to-top');

  function checkScroll() {
    if (window.scrollY > 200) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  window.addEventListener('scroll', checkScroll);
  scrollToTopBtn.addEventListener('click', scrollToTop);

  // Share functionality
  const shareBtn = document.getElementById('shareBtn');
  const shareModal = document.getElementById('shareModal');
  const closeShare = document.querySelector('.close-share');
  const copyLink = document.getElementById('copyLink');
  const toast = document.getElementById('toast');

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  shareBtn.addEventListener('click', () => {
    shareModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });

  function closeShareModal() {
    shareModal.classList.remove('show');
    document.body.style.overflow = '';
  }

  closeShare.addEventListener('click', closeShareModal);

  shareModal.addEventListener('click', (e) => {
    if (e.target === shareModal) {
      closeShareModal();
    }
  });

  copyLink.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('https://www.jiutiaonanwu.com/');
      showToast('链接已复制到剪贴板');
    } catch (err) {
      showToast('复制失败，请手动复制链接');
    }
  });

  // 添加等待弹窗的点击外部关闭功能
  const waitingModal = document.getElementById('waitingModal');
  waitingModal.addEventListener('click', (e) => {
    if (e.target === waitingModal) {
      closeWaitingModal();
    }
  });
}); 