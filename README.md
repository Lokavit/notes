# 专注内容

{docsify-updated}

- 采用`docsify`构建，目前比较喜欢的发布生成方式。

<script>
    async function getGithubInfo() {
      const response = await fetch('https://api.github.com/users/Lokavit');
      const res = await response.json();
      let section = document.createElement('section');
      section.innerHTML = `
        <h1 style="text-align:center;color:aqua;font-size:xxx-large;margin:0;">${res.name}</h1>
        <span style="text-align:center;color:aqua;">${res.bio}</span>
      `;
      document.querySelector('.app-name').appendChild(section);
    }
    getGithubInfo();
</script>
