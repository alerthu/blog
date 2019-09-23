module.exports = {
    title: '首页',
    description: '我的个人博客',
    // head: [ // 注入到当前页面的 HTML <head> 中的标签
    //   ['link', { rel: 'icon', href: '/img/alerthu.jpeg' }], // 增加一个自定义的 favicon(网页标签的图标)
    // ],
    base: '/', // 这是部署到github相关的配置
    markdown: {
      lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
      locales: {
        '/': {}
      },
      // 导航栏（https://vuepress.docschina.org/default-theme-config/#%E5%AF%BC%E8%88%AA%E6%A0%8F-navbar）
      nav: [],
      // 侧边栏（https://vuepress.docschina.org/default-theme-config/#%E4%BE%A7%E8%BE%B9%E6%A0%8F-sidebar）
      sidebar: [
        '/'
      ],
      sidebar: 'auto', // 侧边栏配置
      sidebarDepth: 2, // 侧边栏显示2级
    }
};
// module.exports = {
//   dest: 'vuepress',
//   locales: {
//     '/': {
//       lang: 'zh-CN',
//       title: '支付中心',
//       description: '支付中心组件使用文档'
//     }
//   },
//   serviceWorker: true,
//   theme: 'vue',
//   themeConfig: {
//     repo: 'http://git.tiup.us/hujj/itiup',
//     editLinks: true,
//     docsDir: 'docs',
//     locales: {
//       '/': {
//         label: '简体中文',
//         selectText: '选择语言',
//         editLinkText: '编辑此页',
//         lastUpdated: '上次更新',
//         nav: [
//           {
//             text: '支付中心',
//             link: '/guide/guide',
//           }
//         ],
//         sidebar: {
//           '/guide/': genSidebarConfig('支付中心')
//         }
//       }
//     }
//   }
// }

// function genSidebarConfig (title) {
//   return [
//     {
//       title,
//       collapsable: false,
//       children: [
//         '',
//         'guide',
//         'router',
//         'access',
//         'api',
//         'directive',
//         'mock',
//         'component'
//       ]
//     }
//   ]
// }
