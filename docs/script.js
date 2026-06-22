// 牍 — GitHub Page · 渐进增强脚本
// 滚动揭示：默认内容全可见（无 JS / SEO / 截图稳），JS 加载后才设隐藏待揭。
// 依 wen PLAYBOOK 坑#3——reveal 默认态必须可见，JS 只负责"加上隐藏待揭"的增强。

(function () {
  'use strict';

  // 为各 band 的内容卡片加 reveal 类（首屏 hero 不揭，避免首屏闪）
  var bands = document.querySelectorAll('.band-inner');
  bands.forEach(function (inner) {
    // band-lead 与各 grid/list 的直接子元素揭示
    var children = inner.querySelectorAll(':scope > .band-lead, :scope > * > *');
    children.forEach(function (el) { el.classList.add('reveal'); });
  });

  // 加 reveal-init 类，激活 CSS 的隐藏待揭态
  document.documentElement.classList.add('reveal-init');

  // IntersectionObserver 入视即显
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          // 错落揭示：子元素按序加 delay
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.reveal').forEach(function (el, i) {
      // 同 band 内的卡片按序 delay，造铸字逐字浮现感
      el.style.transitionDelay = (i % 6) * 90 + 'ms';
      io.observe(el);
    });
  } else {
    // 无 IO 支持：直接全显
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-in');
    });
  }
})();
