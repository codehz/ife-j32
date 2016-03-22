"use strict";
//计算长度
function getlen(text) {
  return (text.length + encodeURI(text).split(/%..|./).length - 1) / 2;
}
//检查函数，并设置标记
function check(el, box, tip, template) {
  if (template.validator(el.value)) {
    box.className = "box verified";
    tip.setAttribute("data-validation", template.success);
  } else {
    box.className = "box error";
    tip.setAttribute("data-validation", template.fail);
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

    if (template.type == 'radio') {
      let container = document.createElement("div");//单选的父元素
      container.className = 'radio-option';

      for (let option in template.radioExt) {
        let labelContainer = document.createElement("label");//每个选项的标签

        let optionEl = document.createElement("input");//选项
        optionEl.setAttribute("type", "radio");
        optionEl.setAttribute("name", template.name);
        optionEl.setAttribute("value", option);
        optionEl.addEventListener("change", () => check(optionEl, box, tip, template));//设置验证器

        labelContainer.appendChild(optionEl);
        labelContainer.appendChild(document.createTextNode(template.radioExt[option]));

        container.appendChild(labelContainer);
      }
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
      el.addEventListener('blur', () => check(el, box, tip, template));//设置验证器
      box.appendChild(el);
    }

    box.appendChild(tip);

    return box;
  });
}

let formels = genForm();

window.onload = () => {
  let form = document.getElementById('target');
  for (let el in formels) {
    form.appendChild(formels[el]);//逐个加入
  }
}