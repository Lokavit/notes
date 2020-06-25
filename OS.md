# RIME 配置
- 軟件安裝完畢，輸入法右鍵選擇「輸入法設定」，對其進行配置，得到文件[weasel.custom.yaml]
```yaml
# weasel.custom.yaml
customization:
  distribution_code_name: Weasel
  distribution_version: 0.14.3
  generator: "Weasel::UIStyleSettings"
  modified_time: "Wed Apr  8 14:26:31 2020"
  rime_version: 1.5.3
patch:
  style/color_scheme: satya # 主題
  style/horizontal: true # 是否横向
  style/font_face: Microsoft YaHei # 字體
  style/font_point: 14  # 字號

# 創建 default.custom.yaml
patch:
    "menu/page_size": 9

# 整理安裝文件夾下 Rime/weasel-0.14.3/data
# preview中刪除不需要的主題預覽圖，對應[weasel.yaml]文件中的主題刪除
# weasel.yaml 更改，添加自定義主題 

# RGB转BGR [67C8EB][0xEBC867],即R[67]与B[EB]交换位置，前缀加0x，即[0xBBGGRR]

preset_color_schemes:
  satya:
    name: Satya
    author: Satya
    text_color: 0xEBC867 # 内选区域 文字
    back_color: 0x000000 # 背景颜色
    border_color: 0xFFFF00 # 背景边框颜色
    hilited_text_color: 0xfecb96 # 内选区域 编码
    hilited_back_color: 0x000000 # 内选区域 背景
    hilited_candidate_text_color: 0xFFFF00 # 激活候选项 文字
    hilited_candidate_back_color: 0x000000 # 激活候选项 背景
    candidate_text_color: 0xCCCC00 # 其它候选项 文字
    comment_text_color: 0xEBC867 # 其它候选项 提示

```



# Win7 键控整理

**　　Win7快捷键操控整理**

**缘起**： 鼠标相继阵亡，只好学键控

### 常用操作

**通用**：
```
F1：显示程式帮助

Ctrl + C：复制选中项
Ctrl + V：粘贴选中项
Ctrl + X：剪切选中项
Ctrl + Z：撤消上一步
Ctrl + Y：单步反撤销

```
**编辑**：
```


```
**浏览器**：
```

```




### 其它操作

**F1 - F12**：
```

F2：重命名选定项
F3：搜索文件or文件夹
F4：在 Windows 资源管理器中显示地址栏列表
F5 
F6：在窗口中或桌面上循环切换屏幕元素
F7 
F8 
F9 
F10
F11 最大化或最小化活动窗口
F12
```

**Ctrl + Key**：
```

Ctrl + E：选中搜索框（定位到搜索框）
Ctrl + T：打开新文件(选项卡)
Ctrl + W：关闭当前文件(选项卡)
Ctrl + F4：关闭文档(允许同时多文档中有效)
Ctrl + Tab：切换文件(选项卡)
```

**Alt + Key**：
```
Alt + D：选中地址栏（定位到地址栏）
Alt + W：锁定当前界面工具栏
Alt + F4：关闭项目或退出程序
Alt + Enter：显示所选项的属性
Alt + space：打开活动窗口快捷菜单
Alt + Tab：在打开的项目之间切换

```

**Win + Key**：
```
Win：打开或关闭开始菜单{Ctrl + Esc}
Win + D：显示桌面
Win + M：最小化所有窗口
Win + E：打开我的电脑
Win + F：搜索文件或文件夹
Win + L：锁定您的计算机或切换用户
Win + R：打开运行对话框
Win + T：切换任务栏上的程序
Win + ↑：最大化窗口
Win + ↓：最小化窗口
Win + ←：最大化到窗口左侧的屏幕上
Win + →：最大化窗口到右侧的屏幕上
Win + U：打开轻松访问中心
Win + X：打开 Windows 移动中心
Win + space：预览桌面
Win + Pause：显示系统属性对话框
Win + Home：最小化所有窗口，除了当前激活窗口
Win + TAB：Aero效果循环切换任务栏上的程序
Win + 数字：位于任务栏指定位置的程式新建or打开实例
Win + Ctrl + F：搜索计算机
Win + Shift + M：还原最小化窗口到桌面上
Win + Shift + ↑：拉伸窗口的到屏幕的顶部和底部
Win + Ctrl + 数字：位于任务栏指定位置的程式，切换到上一次的活动窗口
Win + Alt + 数字：位于任务栏指定位置的程式，显示跳转清单

Win + Ctrl + TAB：方向循环切换任务栏上的程序， Aero效果，可静止

```

**Windows Explorer**：
```
Ctrl + Shift + N 新建文件夹



```

**文档**：
```
Ctrl + Shift + N 新建文件夹



```

**放大镜**：
```
Win + 加号或减号：放大或缩小
Ctrl + Alt + space：显示鼠标指针
Ctrl + Alt + F：切换到全屏模式
Ctrl + Alt + L：切换到镜头模式
Ctrl + Alt + D：切换到停靠模式
Ctrl + Alt + I：反色
Ctrl + Alt + 方向：按箭头键的方向平移
Win + Esc：退出放大镜
```

**轻松访问**：
```
Win + U：打开轻松访问中心
按住右 Shift 八秒钟：启用和关闭筛选键
按左 Alt + 左 Shift + PrtScn （或 PrtScn）：启用或关闭高对比度
按左 Alt + 左 Shift + Num Lock ：启用或关闭鼠标键
按 Shift 五次：启用或关闭粘滞键
按住 Num Lock 五秒钟：启用或关闭切换键
```

Common：
键盘右侧Ctrl左边的按键：模拟鼠标右键，也就是右键菜单栏
Delete 删除所选项目并将其移动到“回收站”
Shift + Delete 不先将所选项目移动到“回收站”而直接将其删除
　

---

# Linux IN Kylin

**　　基于Linux的银河麒麟**

**准备**：
- Kylin-4.0.2-desktop-sp2_Community-20171127-x86_64.iso
- VMware-workstation-full-12.5.9-7535481.exe

**创建虚拟机**：
```C#
VM虚拟机 - 新建虚拟机向导 - 典型 - 稍后安装操作系统 - Linux - 
Ubuntu64位 - 最大磁盘大小 - 将虚拟磁盘存储为单个文件 - 完成
```
**装载Kylin**：
```C#
启动VM，创建虚拟机，以CD形式导入Kylin镜像包 - 开启此虚拟机
按上下光标选择 安装银河麒麟操作系统 - 中文 -  从光盘安装 - 
创建数据盘 - 快速安装Kylin - 设置用户名及密码
```
**获取权限**：
终端操作时，首先要获取root权限。因root帐号的密码为随机，默认无法使用其登入系统。
```C#
输入命令：sudo -i
出现 [sudo] username 的密码：************
```
输入密码后,则可以在root身份下进行所需操作。
*注：密码为装载系统时建立的账号所匹配的密码*

**装载VMwareTools**
得到root权限，根据Linux虚拟机中安装VMTools的指导安装该程式
```C#
输入命令：mount  检测Linux是否自动装载VMTools虚拟CD映像。
出现：/dev/sr0 on /media/username/VMware Tools type iso9660 (ro,nosuid,nodev……
创建该目录：mkdir /mnt/cdrom
装载CD驱动器：mount /dev/cdrom /mnt/cdrom
转到工作目录：cd /tmp
解压缩安装程序：tar zxpf /mnt/cdrom/VMwareTools-x.x.x-yyyy.tar.gz （直接复制文件名）
运行安装程序并配置VMT：cd vmware-tools-distrib    ./vmware-install.pl  之后全部按照默认敲回车
最后输入重启命令：shutdown -r now
```
**卸载搜狗**：个人神烦软件之一
```C#
终端输入命令：sudo dpkg -l so* 找到sogoupinyin
将其卸载： sudo apt-get purge sogoupinyin
将fcitx卸载：sudo apt-get purge fcitx
彻底卸载fcitx及相关配置：sudo apt-get autoremove
删除搜狗配置文件：sudo rm -R ~/.config/SogouPY
删除SogouPY.users组件：sudo rm -R ~/.config/SogouPy.users
重启系统：sudo pkill Xorg
```
**卸载扫雷**：
在麒麟软件中心里面找到扫雷，点开找到软件包名(gnome-mines)
```C#
在终端输入命令：sudo dpkg -l gnome-mines*
将其卸载：sudo apt-get purge gnome-mines
```
**同理卸载**：*实在忍不住吐槽，装那么多垃圾做什么？！*
四邻、茄子摄像头、Gnome绘画编辑器、ClawsMail电子邮件客户端、Audacious音乐播放器、扫描易、黑白棋、蓝牙管理器、图像管理器(shotwell数码照片)、打印机、WPS办公软件等
*世界都清净了！*

**Win7与Kylin之间共享文件**：
- 1.在Win7内创建需要共享的文件夹;
- 2.在VMware的虚拟机-设置-选项-共享文件夹-总是启用-添加步骤1创建的文件夹-确定;
- 3.回到Win7，将步骤1的文件夹右键-共享-可读写；
- 4.在Kylin中 - 我的电脑-文件系统-mnt-hgfs-Sharing Folders;
- 5.将需要共享的文件放入Win7的SF文件夹中，则在Kylin中亦能看到.
*注：若非本机虚拟机，而是双系统or双PC的情况下，则需要网络映射*

**安装rime**：个人最喜欢的软件之一
下载tar.gz ，找到包所在文件夹
```C#
输入命令：cd /tmp
解压缩包：tar zxpf /tmp/mozilla_lokavit0/ibus-rime-1.2.tar.gz
打开解压缩之后的文件夹， 找到install.sh文件，右键选择在终端运行
或在终端输入命令：sudo apt-get install ibus-rime
```
**配置输入法**：
```C#
终端输入命令：ibus-setup  弹出框选择是。在弹出的IBus首选项中，
设置输入法 - 添加 - 汉语 - Rime -  设置快捷键 - 应用 
重启系统：sudo pkill Xorg
```
**卸载命令的区别**：
```C#
apt-get purge 软件包名称  // 删除已安装包，不保留配置文件
apt-get remove 软件包名称    //删除已安装包，保留配置文件
apt-get autoremove:   //删除为满足其他软件依赖而安装，但此时不再需要的软件包。
apt-get autoclean  //定期运行该命令，将已删除的软件包的.deb安装文件从硬盘中删除掉。
apt-get clean  //同上，删除包缓存中的所有包.拨号上网例外
```
*注：当出现依赖关系未满足等问题，建议使用*：
```C#
安装aptitude命令：sudo apt-get install aptitude
然后再输入安装对应包命令：sudo aptitude install 包名
```
以上，即可解决大部分问题。


**各路报错的解决方案记录**：
```C#
无法定位软件包：sudo apt-get update
```

　　**願有生之年，得見麒麟曜煜八紘**　卍　*啥也不说了，一切皆是爱国情怀*
---
title: Linux IN Kylin
date: 
tags:
- Kylin
categories:
- Others
---
**　　基于Linux的银河麒麟**

**准备**：
- Kylin-4.0.2-desktop-sp2_Community-20171127-x86_64.iso
- VMware-workstation-full-12.5.9-7535481.exe

**创建虚拟机**：
```C#
VM虚拟机 - 新建虚拟机向导 - 典型 - 稍后安装操作系统 - Linux - 
Ubuntu64位 - 最大磁盘大小 - 将虚拟磁盘存储为单个文件 - 完成
```
**装载Kylin**：
```C#
启动VM，创建虚拟机，以CD形式导入Kylin镜像包 - 开启此虚拟机
按上下光标选择 安装银河麒麟操作系统 - 中文 -  从光盘安装 - 
创建数据盘 - 快速安装Kylin - 设置用户名及密码
```
**获取权限**：
终端操作时，首先要获取root权限。因root帐号的密码为随机，默认无法使用其登入系统。
```C#
输入命令：sudo -i
出现 [sudo] username 的密码：************
```
输入密码后,则可以在root身份下进行所需操作。
*注：密码为装载系统时建立的账号所匹配的密码*

**装载VMwareTools**
得到root权限，根据Linux虚拟机中安装VMTools的指导安装该程式
```C#
输入命令：mount  检测Linux是否自动装载VMTools虚拟CD映像。
出现：/dev/sr0 on /media/username/VMware Tools type iso9660 (ro,nosuid,nodev……
创建该目录：mkdir /mnt/cdrom
装载CD驱动器：mount /dev/cdrom /mnt/cdrom
转到工作目录：cd /tmp
解压缩安装程序：tar zxpf /mnt/cdrom/VMwareTools-x.x.x-yyyy.tar.gz （直接复制文件名）
运行安装程序并配置VMT：cd vmware-tools-distrib    ./vmware-install.pl  之后全部按照默认敲回车
最后输入重启命令：shutdown -r now
```
**卸载搜狗**：个人神烦软件之一
```C#
终端输入命令：sudo dpkg -l so* 找到sogoupinyin
将其卸载： sudo apt-get purge sogoupinyin
将fcitx卸载：sudo apt-get purge fcitx
彻底卸载fcitx及相关配置：sudo apt-get autoremove
删除搜狗配置文件：sudo rm -R ~/.config/SogouPY
删除SogouPY.users组件：sudo rm -R ~/.config/SogouPy.users
重启系统：sudo pkill Xorg
```
**卸载扫雷**：
在麒麟软件中心里面找到扫雷，点开找到软件包名(gnome-mines)
```C#
在终端输入命令：sudo dpkg -l gnome-mines*
将其卸载：sudo apt-get purge gnome-mines
```
**同理卸载**：*实在忍不住吐槽，装那么多垃圾做什么？！*
四邻、茄子摄像头、Gnome绘画编辑器、ClawsMail电子邮件客户端、Audacious音乐播放器、扫描易、黑白棋、蓝牙管理器、图像管理器(shotwell数码照片)、打印机、WPS办公软件等
*世界都清净了！*

**Win7与Kylin之间共享文件**：
- 1.在Win7内创建需要共享的文件夹;
- 2.在VMware的虚拟机-设置-选项-共享文件夹-总是启用-添加步骤1创建的文件夹-确定;
- 3.回到Win7，将步骤1的文件夹右键-共享-可读写；
- 4.在Kylin中 - 我的电脑-文件系统-mnt-hgfs-Sharing Folders;
- 5.将需要共享的文件放入Win7的SF文件夹中，则在Kylin中亦能看到.
*注：若非本机虚拟机，而是双系统or双PC的情况下，则需要网络映射*

**安装rime**：个人最喜欢的软件之一
下载tar.gz ，找到包所在文件夹
```C#
输入命令：cd /tmp
解压缩包：tar zxpf /tmp/mozilla_lokavit0/ibus-rime-1.2.tar.gz
打开解压缩之后的文件夹， 找到install.sh文件，右键选择在终端运行
或在终端输入命令：sudo apt-get install ibus-rime
```
**配置输入法**：
```C#
终端输入命令：ibus-setup  弹出框选择是。在弹出的IBus首选项中，
设置输入法 - 添加 - 汉语 - Rime -  设置快捷键 - 应用 
重启系统：sudo pkill Xorg
```
**卸载命令的区别**：
```C#
apt-get purge 软件包名称  // 删除已安装包，不保留配置文件
apt-get remove 软件包名称    //删除已安装包，保留配置文件
apt-get autoremove:   //删除为满足其他软件依赖而安装，但此时不再需要的软件包。
apt-get autoclean  //定期运行该命令，将已删除的软件包的.deb安装文件从硬盘中删除掉。
apt-get clean  //同上，删除包缓存中的所有包.拨号上网例外
```
*注：当出现依赖关系未满足等问题，建议使用*：
```C#
安装aptitude命令：sudo apt-get install aptitude
然后再输入安装对应包命令：sudo aptitude install 包名
```
以上，即可解决大部分问题。


**各路报错的解决方案记录**：
```C#
无法定位软件包：sudo apt-get update
```

　　**願有生之年，得見麒麟曜煜八紘**　卍　*啥也不说了，一切皆是爱国情怀*
---
title: Linux IN Kylin
date: 
tags:
- Kylin
categories:
- Others
---
**　　基于Linux的银河麒麟**

**准备**：
- Kylin-4.0.2-desktop-sp2_Community-20171127-x86_64.iso
- VMware-workstation-full-12.5.9-7535481.exe

**创建虚拟机**：
```C#
VM虚拟机 - 新建虚拟机向导 - 典型 - 稍后安装操作系统 - Linux - 
Ubuntu64位 - 最大磁盘大小 - 将虚拟磁盘存储为单个文件 - 完成
```
**装载Kylin**：
```C#
启动VM，创建虚拟机，以CD形式导入Kylin镜像包 - 开启此虚拟机
按上下光标选择 安装银河麒麟操作系统 - 中文 -  从光盘安装 - 
创建数据盘 - 快速安装Kylin - 设置用户名及密码
```
**获取权限**：
终端操作时，首先要获取root权限。因root帐号的密码为随机，默认无法使用其登入系统。
```C#
输入命令：sudo -i
出现 [sudo] username 的密码：************
```
输入密码后,则可以在root身份下进行所需操作。
*注：密码为装载系统时建立的账号所匹配的密码*

**装载VMwareTools**
得到root权限，根据Linux虚拟机中安装VMTools的指导安装该程式
```C#
输入命令：mount  检测Linux是否自动装载VMTools虚拟CD映像。
出现：/dev/sr0 on /media/username/VMware Tools type iso9660 (ro,nosuid,nodev……
创建该目录：mkdir /mnt/cdrom
装载CD驱动器：mount /dev/cdrom /mnt/cdrom
转到工作目录：cd /tmp
解压缩安装程序：tar zxpf /mnt/cdrom/VMwareTools-x.x.x-yyyy.tar.gz （直接复制文件名）
运行安装程序并配置VMT：cd vmware-tools-distrib    ./vmware-install.pl  之后全部按照默认敲回车
最后输入重启命令：shutdown -r now
```
**卸载搜狗**：个人神烦软件之一
```C#
终端输入命令：sudo dpkg -l so* 找到sogoupinyin
将其卸载： sudo apt-get purge sogoupinyin
将fcitx卸载：sudo apt-get purge fcitx
彻底卸载fcitx及相关配置：sudo apt-get autoremove
删除搜狗配置文件：sudo rm -R ~/.config/SogouPY
删除SogouPY.users组件：sudo rm -R ~/.config/SogouPy.users
重启系统：sudo pkill Xorg
```
**卸载扫雷**：
在麒麟软件中心里面找到扫雷，点开找到软件包名(gnome-mines)
```C#
在终端输入命令：sudo dpkg -l gnome-mines*
将其卸载：sudo apt-get purge gnome-mines
```
**同理卸载**：*实在忍不住吐槽，装那么多垃圾做什么？！*
四邻、茄子摄像头、Gnome绘画编辑器、ClawsMail电子邮件客户端、Audacious音乐播放器、扫描易、黑白棋、蓝牙管理器、图像管理器(shotwell数码照片)、打印机、WPS办公软件等
*世界都清净了！*

**Win7与Kylin之间共享文件**：
- 1.在Win7内创建需要共享的文件夹;
- 2.在VMware的虚拟机-设置-选项-共享文件夹-总是启用-添加步骤1创建的文件夹-确定;
- 3.回到Win7，将步骤1的文件夹右键-共享-可读写；
- 4.在Kylin中 - 我的电脑-文件系统-mnt-hgfs-Sharing Folders;
- 5.将需要共享的文件放入Win7的SF文件夹中，则在Kylin中亦能看到.
*注：若非本机虚拟机，而是双系统or双PC的情况下，则需要网络映射*

**安装rime**：个人最喜欢的软件之一
下载tar.gz ，找到包所在文件夹
```C#
输入命令：cd /tmp
解压缩包：tar zxpf /tmp/mozilla_lokavit0/ibus-rime-1.2.tar.gz
打开解压缩之后的文件夹， 找到install.sh文件，右键选择在终端运行
或在终端输入命令：sudo apt-get install ibus-rime
```
**配置输入法**：
```C#
终端输入命令：ibus-setup  弹出框选择是。在弹出的IBus首选项中，
设置输入法 - 添加 - 汉语 - Rime -  设置快捷键 - 应用 
重启系统：sudo pkill Xorg
```
**卸载命令的区别**：
```C#
apt-get purge 软件包名称  // 删除已安装包，不保留配置文件
apt-get remove 软件包名称    //删除已安装包，保留配置文件
apt-get autoremove:   //删除为满足其他软件依赖而安装，但此时不再需要的软件包。
apt-get autoclean  //定期运行该命令，将已删除的软件包的.deb安装文件从硬盘中删除掉。
apt-get clean  //同上，删除包缓存中的所有包.拨号上网例外
```
*注：当出现依赖关系未满足等问题，建议使用*：
```C#
安装aptitude命令：sudo apt-get install aptitude
然后再输入安装对应包命令：sudo aptitude install 包名
```
以上，即可解决大部分问题。


**各路报错的解决方案记录**：
```C#
无法定位软件包：sudo apt-get update
```

　　**願有生之年，得見麒麟曜煜八紘**　卍　*啥也不说了，一切皆是爱国情怀*
---
title: Linux IN Kylin
date: 
tags:
- Kylin
categories:
- Others
---
**　　基于Linux的银河麒麟**

**准备**：
- Kylin-4.0.2-desktop-sp2_Community-20171127-x86_64.iso
- VMware-workstation-full-12.5.9-7535481.exe

**创建虚拟机**：
```C#
VM虚拟机 - 新建虚拟机向导 - 典型 - 稍后安装操作系统 - Linux - 
Ubuntu64位 - 最大磁盘大小 - 将虚拟磁盘存储为单个文件 - 完成
```
**装载Kylin**：
```C#
启动VM，创建虚拟机，以CD形式导入Kylin镜像包 - 开启此虚拟机
按上下光标选择 安装银河麒麟操作系统 - 中文 -  从光盘安装 - 
创建数据盘 - 快速安装Kylin - 设置用户名及密码
```
**获取权限**：
终端操作时，首先要获取root权限。因root帐号的密码为随机，默认无法使用其登入系统。
```C#
输入命令：sudo -i
出现 [sudo] username 的密码：************
```
输入密码后,则可以在root身份下进行所需操作。
*注：密码为装载系统时建立的账号所匹配的密码*

**装载VMwareTools**
得到root权限，根据Linux虚拟机中安装VMTools的指导安装该程式
```C#
输入命令：mount  检测Linux是否自动装载VMTools虚拟CD映像。
出现：/dev/sr0 on /media/username/VMware Tools type iso9660 (ro,nosuid,nodev……
创建该目录：mkdir /mnt/cdrom
装载CD驱动器：mount /dev/cdrom /mnt/cdrom
转到工作目录：cd /tmp
解压缩安装程序：tar zxpf /mnt/cdrom/VMwareTools-x.x.x-yyyy.tar.gz （直接复制文件名）
运行安装程序并配置VMT：cd vmware-tools-distrib    ./vmware-install.pl  之后全部按照默认敲回车
最后输入重启命令：shutdown -r now
```
**卸载搜狗**：个人神烦软件之一
```C#
终端输入命令：sudo dpkg -l so* 找到sogoupinyin
将其卸载： sudo apt-get purge sogoupinyin
将fcitx卸载：sudo apt-get purge fcitx
彻底卸载fcitx及相关配置：sudo apt-get autoremove
删除搜狗配置文件：sudo rm -R ~/.config/SogouPY
删除SogouPY.users组件：sudo rm -R ~/.config/SogouPy.users
重启系统：sudo pkill Xorg
```
**卸载扫雷**：
在麒麟软件中心里面找到扫雷，点开找到软件包名(gnome-mines)
```C#
在终端输入命令：sudo dpkg -l gnome-mines*
将其卸载：sudo apt-get purge gnome-mines
```
**同理卸载**：*实在忍不住吐槽，装那么多垃圾做什么？！*
四邻、茄子摄像头、Gnome绘画编辑器、ClawsMail电子邮件客户端、Audacious音乐播放器、扫描易、黑白棋、蓝牙管理器、图像管理器(shotwell数码照片)、打印机、WPS办公软件等
*世界都清净了！*

**Win7与Kylin之间共享文件**：
- 1.在Win7内创建需要共享的文件夹;
- 2.在VMware的虚拟机-设置-选项-共享文件夹-总是启用-添加步骤1创建的文件夹-确定;
- 3.回到Win7，将步骤1的文件夹右键-共享-可读写；
- 4.在Kylin中 - 我的电脑-文件系统-mnt-hgfs-Sharing Folders;
- 5.将需要共享的文件放入Win7的SF文件夹中，则在Kylin中亦能看到.
*注：若非本机虚拟机，而是双系统or双PC的情况下，则需要网络映射*

**安装rime**：个人最喜欢的软件之一
下载tar.gz ，找到包所在文件夹
```C#
输入命令：cd /tmp
解压缩包：tar zxpf /tmp/mozilla_lokavit0/ibus-rime-1.2.tar.gz
打开解压缩之后的文件夹， 找到install.sh文件，右键选择在终端运行
或在终端输入命令：sudo apt-get install ibus-rime
```
**配置输入法**：
```C#
终端输入命令：ibus-setup  弹出框选择是。在弹出的IBus首选项中，
设置输入法 - 添加 - 汉语 - Rime -  设置快捷键 - 应用 
重启系统：sudo pkill Xorg
```
**卸载命令的区别**：
```C#
apt-get purge 软件包名称  // 删除已安装包，不保留配置文件
apt-get remove 软件包名称    //删除已安装包，保留配置文件
apt-get autoremove:   //删除为满足其他软件依赖而安装，但此时不再需要的软件包。
apt-get autoclean  //定期运行该命令，将已删除的软件包的.deb安装文件从硬盘中删除掉。
apt-get clean  //同上，删除包缓存中的所有包.拨号上网例外
```
*注：当出现依赖关系未满足等问题，建议使用*：
```C#
安装aptitude命令：sudo apt-get install aptitude
然后再输入安装对应包命令：sudo aptitude install 包名
```
以上，即可解决大部分问题。


**各路报错的解决方案记录**：
```C#
无法定位软件包：sudo apt-get update
```

---
---

# Unity IN Kylin

**　　Kylin系统上装载Unity**

Unity Liunx版本获取地址:https://forum.unity.com/threads/unity-on-linux-release-notes-and-known-issues.350256/

**装载Unity2017.1.2f.1**： 
```C#
打开文件夹：cd /mnt/hgfs/SF/UL……
输入安装软件命令：sudo dpkg -i package_name(软件包名.deb)
若提示软件依赖问题，输入命令：sudo apt-get -f install
```
**依赖lib32gcc1**：
```C#
输入命令：sudo aptitude install lib32gcc1
显示libc6-i386 : 依赖: libc6 (= 2.23-0kord4k1) 但是 2.23-0kord10 已安装。
输入命令：sudo apt-get install libc6=2.23-0kord4k1  *注意此处*
输入命令：sudo aptitude install lib32gcc1
```
**再次尝试装载Unity**：
```C#
cd到目录，输入安装命令：sudo dpkg -i unity-editor_amd64-2017.1.2f1.deb
   // 得到以下结果：
dpkg: 依赖关系问题使得 unity-editor 的配置工作不能继续：
 unity-editor 依赖于 lib32stdc++6 (>= 4.6)；然而：
  未安装软件包 lib32stdc++6。
 unity-editor 依赖于 libpango1.0-0 (>= 1.22.0)；然而：
  未安装软件包 libpango1.0-0。
 unity-editor 依赖于 libpq5；然而：
  未安装软件包 libpq5。
 unity-editor 依赖于 npm；然而：
  未安装软件包 npm。………………

输入命令：sudo aptitude -f install
选择N ，选择Y，选择Y

最后，安装unity：sudo dpkg -i unity-editor_amd64-2017.1.2f1.deb
```
终于成功啦！*然而*Unity并不能好好哒运行，尝试给Kylin虚拟机重新分配内存为4G，仍旧无法解决。除了启动反人类地慢之外，不显示任何视图，尝试通过工具栏切换视图，程式崩溃，直接罢工。


