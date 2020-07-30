改变笔记形式

```结构
algorithm
    filter.html 每一个的文件，在README.md表格的对应位置直接链接至此
design-patterns
    command.html 命令模式，链接方式同上
pixijs 一个webgl2d库
    每个示例.html
web-components
    每个自定义组件最终使用处.html
markdown 存放不适合或无必要转化为html的笔记
    csharp.md

jslib 放所有收集js代码的地方，.md文件罗列所有？



// or
一级全部以文件夹分类
每种分类下，包含其文件及md文件
README.md做链接时:以下方式选一
1.每个md链接，单元格对应index.html链接
2.将md引入html，解析。
3.单元格链接.md，该文件内，链接示例。此方式可以去掉每个分类的index.html,改为写在md里
```


检测网络、浏览器、WebGL、操作系统

- devop


<!-- 
Device                           OS               window.navigator.platform
---------------------------------------------------------------------------
iPhone 4                         iOS 7.1          iPhone
iPhone 5                         iOS 7.1.1        iPhone
iPhone 5c                        iOS 7.1          iPhone
iPhone 5s                        iOS 7.1          iPhone

Samsung Galaxy S2                Android 4.1.2    Linux armv7l
Samsung Galaxy S3 Mini           Android 4.1.2    Linux armv7l
Samsung Galaxy S3                Android 4.3      Linux armv7l
Samsung Galaxy S4                Android 4.4.2    Linux armv7l
Samsung Galaxy Note 3            Android 4.4.2    Linux armv7l
Samsung Galaxy S6                Android 5        Linux aarch64

Nexus 4                          Android 4.4.2    Linux armv7l
Nexus 5                          Android 4.4.2    Linux armv7l

HTC One                          Android 4.4.2    Linux armv7l
Sony Xperia Z                    Android 4.2.2    Linux armv7l
Motorola Moto G                  Android 4.4.2    Linux armv7l

Nokia Lumia 1520                 Windows 8.1      Win32

Device                           OS               window.navigator.platform
---------------------------------------------------------------------------
iPad 2nd generation              iOS 6.1.3        iPad
iPad 2nd generation              iOS 7.0.3        iPad
iPad 4th generation              iOS 6.1.2        iPad
iPad 4th generation              iOS 6.1.3        iPad
iPad mini (non retina)           iOS 6.1.3        iPad
iPad mini (retina)               iOS 7.0.3        iPad

Samsung Galaxy Tab 2 7"          Android 4.0.3    Linux armv7l
Samsung Galaxy Tab 3 7"          Android 4.1.2    Linux armv7l
Samsung Galaxy Tab 3             Android 4.2.2    Linux i686
Samsung Galaxy Note 10.1 (2012)  Android 4.1.2    Linux armv7l
Samsung Galaxy Note 10.1 (2014)  Android 4.3      Linux armv7l

Nexus 7 (2012) 7"                Android 4.4.3    Linux armv7l
Nexus 7 (2013) 7"                Android 4.3      Linux armv7l
Nexus 10                         Android 4.4.2    Linux armv7l

Lenovo Yoga                      Android 4.2.2    Linux armv7l
Sony Xperia Z                    Android 4.3      Linux armv7l
Tesco Hudl 7"                    Android 4.2.2    Linux armv7l
Kindle Fire 7" (2012)            Unknown          Linux armv7l
Kindle Fire HDX 7" (2013)        Unknown          Linux armv7l

Asus Transformer Pad TF300T      Android 4.0.3    Linux armv7l

Nokia Lumia 2520                 Windows RT 8.1   Win32
MS Surface Tablet Pro            Windows 8.1 Pro  Win64

Desktop PC (HP)                  Windows 7 Ent.   Win32
Desktop PC (iMac)                OSX 10.8.5       MacIntel

+-----+--------------+--------------------------------------+
| iid | item         | value                                |
+-----+--------------+--------------------------------------+
| 448 | nav_platform | Linux armv7l                         |
| 454 | nav_platform | ARM                                  |
| 455 | nav_platform | Linux x86_64                         |
| 457 | nav_platform | PlayStation 4                        |
| 459 | nav_platform | masking-agent                        |
| 460 | nav_platform | OpenBSD amd64                        |
| 464 | nav_platform | FreeBSD amd64                        |
| 465 | nav_platform | Linux armv5tejl                      |
| 466 | nav_platform | Symbian OS                           |
| 467 | nav_platform | New Nintendo 3DS                     |
| 470 | nav_platform | Linux armv6l                         |
| 471 | nav_platform | FreeBSD                              |
| 472 | nav_platform | Symbian                              |
| 473 | nav_platform | Linux MSM8960_V3.2.1.1_N_R069_Rev:18 |
| 476 | nav_platform | Linux aarch64                        |
| 479 | nav_platform | Linux i686 on x86_64                 |
| 480 | nav_platform | Linux ppc64                          |
+-----+--------------+--------------------------------------+
 -->