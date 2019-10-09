module.exports = {
    title: '首页',
    description: '我的个人博客',
    lang: 'zh-CN',
    base: '/', // 这是部署到github相关的配置
    markdown: {
      lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
      editLinks: true,
      docsDir: 'docs',
      editLinkText: '在 GitHub 上编辑此页',
      lastUpdated: '上次更新',
      locales: {
        '/': {
          label: '简体中文',
          selectText: '选择语言',
          ariaLabel: "选择语言",
          editLinkText: '在 GitHub 上编辑此页',
          lastUpdated: '上次更新',
          nav: require('./navbar/zh'),
          sidebar: {
            '/vue/': require('./sidebar/vue'),
            '/standard/': require('./sidebar/standard'),
            // '/flow/': require('./sidebar/flow')
          }
      },
      sidebarDepth: 2, // 侧边栏显示2级
    }
  }
};
