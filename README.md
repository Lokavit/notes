# 主页

<!--
- 主页侧边栏只显示一级
- 如WEB等含有二级的项，做在其对应README.md中

- 可以把超链接的列项，做在这里。
- 例如: [WEB](docs/web/README.md) -->

## 前端不死，折腾不止

<script>
    async function getGithubInfo() {
      const response = await fetch('https://api.github.com/users/Lokavit');
      const res = await response.json();
      console.log('res:', res);
      let section = document.createElement('section');
      section.innerHTML = `
        <img src="${res.avatar_url}"/>
        <h1>${res.name}</h1>
        <h3>${res.bio}</h3>
      `;
      document.querySelector('.markdown-section h2').appendChild(section);
    }
    getGithubInfo();
</script>
