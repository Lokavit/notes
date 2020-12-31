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
      let section = document.createElement('section');
      section.innerHTML = `
        <h1 style="text-align:center;color:aqua;">${res.name}</h1>
        <small style="text-align:center;color:aqua;">${res.bio}</small>
      `;
      document.querySelector('.app-name').appendChild(section);
    }
    getGithubInfo();
</script>
