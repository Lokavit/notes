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