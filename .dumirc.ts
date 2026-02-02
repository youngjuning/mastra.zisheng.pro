import { defineConfig } from 'dumi';

export default defineConfig({
  favicons: ['https://mastra.ai/favicon/new-brand/icon-192.png'],
  autoAlias: false,
  themeConfig: {
    name: 'Mastra',
    logo: 'https://mastra.ai/favicon/new-brand/icon-192.png',
    prefersColor: { default: 'auto' },
    editLink:
      'https://github.com/youngjuning/mastra.zisheng.pro/edit/main/{filename}',
    socialLinks: {
      github: 'https://github.com/youngjuning/mastra.zisheng.pro'
    },
    hd: { rules: [] },
    footer: `
<div>Made with ❤️ by <a href="https://github.com/youngjuning" target="_blank">紫升</a></div>
<div>
  本页访问量 <span id="busuanzi_value_page_pv"></span> | 本站总访问量 <span id="busuanzi_value_site_pv"></span> | 本站总访人数 <span id="busuanzi_value_site_uv"></span>
</div>`,
  },
  theme: {
    '@c-primary': '#2bd439',
  },
  publicPath: '/',
  analytics: {
    ga_v2: 'G-XSL4QXVXDB',
  },
  sitemap: {
    hostname: 'https://mastra.zisheng.pro',
  },
  hash: true,
  exportStatic: {},
  ...(process.env.NODE_ENV === 'development' ? {} : { ssr: {} }),
  headScripts: [
    process.env.NODE_ENV !== 'development' ? {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5641491107630454',
      async: true,
      crossorigin: 'anonymous',
    } : { src:"" },
    {
      src: '/busuanzi.pure.min.js',
      async: true,
      crossorigin: 'anonymous',
    },
  ],
});
