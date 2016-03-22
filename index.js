"use strict";
//计算长度
function getlen(text) {
  return (text.length + encodeURI(text).split(/%..|./).length - 1) / 2;
}
//检查函数，并设置标记
function check(value, box, tip, template) {
  if (template.validator(value)) {
    box.className = "box verified";
    tip.setAttribute("data-validation", template.success);
    return true;
  } else {
    box.className = "box error";
    tip.setAttribute("data-validation", template.fail);
    return false;
  }
}
//生成
function genForm() {
  return data.map(template => {
    let box = document.createElement("div");//单个项目的容器
    box.className = "box";

    let label = document.createElement("label");//标签
    label.appendChild(document.createTextNode(template.label));
    box.appendChild(label);

    let tip = document.createElement("div");//提示文本的父元素
    tip.setAttribute("data-info", template.rules);
    tip.className = "tip";

    let valueGetter = null;//保存用于无须遍历DOM树快速查找含有值的元素

    if (template.type == 'radio') {
      let container = document.createElement("div");//单选的父元素
      container.className = 'radio-option';

      let elCache = [];

      for (let option in template.radioExt) {
        let labelContainer = document.createElement("label");//每个选项的标签

        let optionEl = document.createElement("input");//选项
        optionEl.setAttribute("type", "radio");
        optionEl.setAttribute("name", template.name);
        optionEl.setAttribute("value", option);
        optionEl.addEventListener("change", () => check(optionEl.value, box, tip, template));//设置验证器

        elCache.push(optionEl);

        labelContainer.appendChild(optionEl);
        labelContainer.appendChild(document.createTextNode(template.radioExt[option]));

        container.appendChild(labelContainer);
      }

      //catch elCache to lambda function
      valueGetter = () => {
        for (let it of elCache) if (it.checked) return it.value;
        return null;
      };

      box.appendChild(container);
    } else {
      let el = document.createElement("input");//文本框
      el.setAttribute("type", template.type);
      el.setAttribute("name", template.name);

      if (template.attr) {
        for (let key in template.attr) {
          el.setAttribute(key, template.attr[key]);
        }
      }

      el.addEventListener('blur', () => check(el.value, box, tip, template));//设置验证器

      valueGetter = () => el.value;

      box.appendChild(el);
    }

    box.appendChild(tip);

    let validator = () => check(valueGetter(), box, tip, template);

    return {validator, box};
  });
}

let formels = genForm();

function checkAll() {
  for (let formel of formels)
    if (!formel.validator())
      return alert('提交失败');
  return alert('提交成功');
}

window.onload = () => {
  let form = document.getElementById('target');

  for (let formel of formels)
    form.appendChild(formel.box);//逐个加入

  let el = document.createElement("input");//加入按钮
  el.setAttribute("type", "button");
  el.value = "Submit";
  el.addEventListener('click', checkAll);
  console.log(el);
  form.appendChild(el);
}