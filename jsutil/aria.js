/*
 * @Author: Satya
 * @Date: 2020-06-27 19:47:48
 * @Last Modified by: Satya
 * @Last Modified time: 2020-06-27 20:28:18
 * doc:前缀
 */

const Aria = new Object();

/**
 * ARIA 状态/属性前缀.
 * @private
 */
Aria.ARIA_PREFIX_ = "aria-";

/**
 * ARIA role 属性.
 * @private
 */
Aria.ROLE_ATTRIBUTE_ = "role";

/** 前缀 角色值 */
Aria.Role = {
  // ARIA role 用于交互式控制表格数据.
  GRID: "grid",

  // ARIA role 网格中的单元格.
  GRIDCELL: "gridcell",

  // ARIA role 一组像树项目兄妹相关元素.
  GROUP: "group",

  // ARIA role 列表框.
  LISTBOX: "listbox",

  // ARIA role 弹出菜单.
  MENU: "menu",

  // ARIA role 菜单项元素.
  MENUITEM: "menuitem",

  // ARIA role 菜单内复选框元素.
  MENUITEMCHECKBOX: "menuitemcheckbox",

  // ARIA role 组合框，列表框，菜单，单选组或树元素的子级的选项.
  OPTION: "option",

  // ARIA role 在没有语义意义的可忽略美化元素中的作用.
  PRESENTATION: "presentation",

  // ARIA role 网格中一行单元格.
  ROW: "row",

  // ARIA role 树.
  TREE: "tree",

  // ARIA role 树项目。有时可能会展开或折叠.
  TREEITEM: "treeitem",
};

/** 状态和属性 */
Aria.State = {
  /**
   * ARIA属性，用于设置元素的当前活动后代，例如列表框中的选定项。
   * Value: ID of an element 值：元素的ID.
   */
  ACTIVEDESCENDANT: "activedescendant",

  /**
   * ARIA属性定义表，网格或treegrid中的列总数.
   * Value: integer. 值：整数
   */
  COLCOUNT: "colcount",

  /**
   * 用于设置是否扩展像树节点这样的元素的ARIA状态
   * Value: one of {true, false, undefined}
   */
  EXPANDED: "expanded",

  /**
   * ARIA状态表明输入的值不符合
   * Value: one of {false, true, 'grammar', 'spelling'}
   */
  INVALID: "invalid",

  /**
   * 提供标签以覆盖用于描述此元素的任何其他文本，值或内容的ARIA属性
   * Value: string
   */
  LABEL: "label",

  /**
   * ARIA属性，用于设置标签的另一个元素的元素
   * Value: space-separated IDs of elements.
   */
  LABELLEDBY: "labelledby",

  /**
   * ARIA属性设置层次结构中的一个元素的级别
   * Value: integer.
   */
  LEVEL: "level",

  /**
   * ARIA属性，指示元素是水平还是垂直
   * Value: one of {'vertical', 'horizontal'}.
   */
  ORIENTATION: "orientation",

  /**
   * ARIA属性，用于定义元素在列表中的位置
   * Value: integer.
   */
  POSINSET: "posinset",

  /**
   * ARIA属性定义表，网格或树形网格中的总行数
   * Value: integer.
   */
  ROWCOUNT: "rowcount",

  /**
   * ARIA状态 用于设置列表中当前所选项目
   * Value: one of {true, false, undefined}.
   */
  SELECTED: "selected",

  /**
   * ARIA属性定义列表中的项目数
   * Value: integer.
   */
  SETSIZE: "setsize",

  /**
   * ARIA属性 滑块最大值的
   * Value: number.
   */
  VALUEMAX: "valuemax",

  /**
   * ARIA属性 滑块最小值
   * Value: number.
   */
  VALUEMIN: "valuemin",
};

/**
 * 设置元素的作用
 * @param {!Element} element DOM node to set role of.
 * @param {!Aria.Role} roleName Role name.
 */
Aria.setRole = function (element, roleName) {
  element.setAttribute(Aria.ROLE_ATTRIBUTE_, roleName);
};

/**
 * 设置元素的状态或属性.
 * @param {!Element} element 设置状态的DOM节点.
 * @param {!Aria.State} stateName 设置状态属性.
 * 如果属性不是额外的属性，则自动在状态名称中添加前缀“ aria-”
 * @param {string|boolean|number|!Array.<string>} value 状态属性的值
 */
Aria.setState = function (element, stateName, value) {
  if (Array.isArray(value)) {
    value = value.join(" ");
  }
  let attrStateName = Aria.ARIA_PREFIX_ + stateName;
  element.setAttribute(attrStateName, value);
};

export default Aria;
