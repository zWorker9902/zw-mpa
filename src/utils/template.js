/**
 * 查找指定tagName的父节点（tagName必须为大写）
 * @params(object) 待查找父节点的dom
 * @params(string) 父节点tagName
 * */
export const findParenNode = (dom, TAG) => {
  if (dom) {
    const parentNode = dom.parentNode;
    if (parentNode.tagName === 'BODY') {
      return null;
    }

    if (parentNode.tagName === TAG) {
      return parentNode;
    } else {
      dom = findParenNode(parentNode, TAG);
    }
  }
  return dom;
}
/**
 * 检测dom下是否包含有效文本
 * @params{dom} 待检测的文本
 *
 * @return true表示包含有效文本
 * */
export const checkValidText = (dom) => {
  let result = false;
  if (dom) {
    const text = dom.innerText;
    if (!text) {
      const children = dom.children;
      if (children.length === 0) {
        // 没有子结点，没有有效文本
        result = false;
      } else {
        for (let i = 0; i < children.length; i += 1) {
          result || checkValidText(children[i]);
        }
      }
    } else {
      result = !!text.trim();
    }
  }
  return result;
}

/**
 * 替换普通书签，兼容在表格中，书签内容都为空时，不显示tr
 * @params(string) bookmark 书签内容
 * @params(object) dom 替换结点
 * */
export const renderBookmark = (bookmark, dom) => {
  // 普通字符串替换
  if (typeof(bookmark) === 'string') {
    dom.innerHTML = bookmark;
  }

  // 表格书签替换
  if(Array.prototype.isPrototypeOf(bookmark)) {
    /* const tdDom = findParenNode(dom, 'TD');
    if (tdDom) {
      const trDom = tdDom.parentNode;

      // 检测行数据属否全部为空
      const result = checkValidText(trDom);
      console.log('result:', result);
      if (result) {
        trDom.classList.remove('hide');
      } else {
        trDom.classList.add('hide');
      }
    }*/
  }

}

/**
 * 渲染表格书签
 * @params[array] 被渲染的书签数据
 * @params(object) 渲染到指定结点
 * */
export const renderTableBookMark = (bookmark = [], dom) => {
  if (!dom) {
    return null;
  }
  const tableDom = document.createElement('table');
  tableDom.width = '100%';
  // 计算单元格的宽度
  const colLength = bookmark[0].length || 1;
  const tdUnitWidth = 100 / colLength;
  bookmark.forEach((item) => {
    const trDom = document.createElement('tr');
    trDom.width = '100%';
    let colSpanCount = 1;
    let validElement = null;

    item.forEach((d) => {
      // 数据为空：null 0
      if (!d) {
        colSpanCount += 1;
      } else {
        const tdDom = document.createElement('td');
        tdDom.valign = 'middle';
        tdDom.align = 'center';
        tdDom.innerText = d;
        tdDom.width = `${tdUnitWidth}%`;

        if (colSpanCount > 1) {
          tdDom.colSpan = colSpanCount;
          tdDom.width = `${colSpanCount * tdUnitWidth}%`;
          colSpanCount = 1;
        }
        trDom.appendChild(tdDom);
        validElement = tdDom;
      }
    });

    if (colSpanCount > 1) {
      if (validElement.colSpan) {
        validElement.colSpan = Number(validElement.colSpan) + (colSpanCount - 1);
        validElement.width = `${validElement.colSpan * tdUnitWidth}%`;
      }
    }
    tableDom.appendChild(trDom);
  });
  dom.parentNode.replaceChild(tableDom, dom);
};

/**
 * 渲染特殊书签：按行展开，向下扩展
 * @params[array] 被渲染的书签数据
 * @params(object) 渲染到指定结点
 * */
export const renderRowTableBookMark = (bookmark = [], dom) => {
  const tdDom = findParenNode(dom, 'TD');
  if (!tdDom) {
    return null;
  }
  let trDom = tdDom.parentNode;
  const tdIndex = tdDom.cellIndex;
  // 当书签长度为0，检测该行是否有有效文本

  bookmark.forEach((item, i) => {
    if (i === 0) {
      tdDom.innerText = item;
      tdDom.align = 'center';
    } else {
      const nextTrDom = trDom.nextElementSibling;
      // 结点已存在，并且已经替换过数据
      if (nextTrDom && nextTrDom.className === 'replaced') {
        nextTrDom.children[tdIndex].innerText = item;
        // 移动到下一行数据
        trDom = nextTrDom;
      } else {
        // 结点不存在，或者未替换数据
        const newTrDom = trDom.cloneNode(true);

        // 清空单元格数据
        const children = newTrDom.children;
        for (let k = 0; k < children.length; k += 1) {
          children[k].innerText = '';
          children[k].align = 'center';
        }
        children[tdIndex].innerText = item;
        newTrDom.className = 'replaced';
        // 在当前行的后面新插入一行数据
        trDom.after(newTrDom);
        // 移动到下一行数据
        trDom = newTrDom;
      }
    }
  });

  if (bookmark.length === 0) {
    tdDom.innerText = '';
    const result = checkValidText(trDom);
    if (result) {
      trDom.classList.remove('hide');
    } else {
      trDom.classList.add('hide');
    }
  }
};

/**
 * 渲染特殊书签：按列展开，向右扩展
 * @params[array] 被渲染的书签数据
 * @params(object) 渲染到指定结点
 * */
export const renderColTableBookMark = (bookmark = [], dom) => {
  let tdDom = findParenNode(dom, 'TD');
  if (!tdDom) {
    return null;
  }
  const trDom = tdDom.parentNode;
  // 获取当前列索引
  const tdIndex = tdDom.cellIndex;
  // 获取当前行索引
  const trIndex = trDom.rowIndex;
  const tBody = trDom.parentNode;
  const trDoms = tBody.children;

  bookmark.forEach((item, i) => {
    if (i === 0) {
      tdDom.innerHTML = item;
      tdDom.align = 'center';
    } else {
      const nextTdDom = tdDom.nextElementSibling;
      // 结点已存在，并且已经替换过数据
      if (nextTdDom && nextTdDom.className === 'replaced') {
        nextTdDom.innerText = item;
        // 移动到下一行数据
        tdDom = nextTdDom;
      } else {
        // 结点不存在，或者未替换数据
        // 清空td单元格内部数据
        for (let k = 0; k < trDoms.length; k += 1) {
          const newTdDom = tdDom.cloneNode(true);
          newTdDom.innerText = '';
          newTdDom.className = 'replaced';
          newTdDom.align = 'center';

          trDoms[k].children[tdIndex + (i - 1)].after(newTdDom);
        }
        // 填写数据信息
        tdDom = trDoms[trIndex].children[tdIndex + i];
        tdDom.innerText = item;
      }
    }
  });
};

/**
 * 渲染合并表格特殊书签：行合并（规则：向下合并）
 * @params[array] 被渲染的书签数据(二维数组)
 * @params(object) 渲染到指定结点
 * */
export const renderMergeTableBookMark = (bookmark = [], dom) => {
  const tbody = [];
  // 统计行合并数据
  const rowSpans = [];

  const rowLength = bookmark.length;
  const colLength = bookmark[0].length;

  for (let colIndex = 0; colIndex < colLength; colIndex += 1) {
    // 记录有效值的行索引
    let elmValidIndex = 0;
    const rowSpan = [];
    let rowSpanCount = 1;
    for (let rowIndex = rowLength - 1; rowIndex >= 0; rowIndex -= 1) {
      rowSpan[rowIndex] = 0;
      if (bookmark[rowIndex][colIndex]) {
        elmValidIndex = rowIndex;
        rowSpan[rowIndex] = rowSpanCount;
        rowSpanCount = 1;
      } else {
        rowSpanCount += 1;
      }
    }

    if (rowSpanCount > 1) {
      rowSpan[0] = rowSpan[elmValidIndex] + (rowSpanCount - 1);
      bookmark[0][colIndex] = bookmark[elmValidIndex][colIndex];
      bookmark[elmValidIndex][colIndex] = null;
      rowSpan[elmValidIndex] = 0;
    }
    rowSpans.push(rowSpan);
  }

  bookmark.forEach((d, i) => {
    const tr = [];
    d.forEach((k, j) => {
      if (k) {
        if (rowSpans[j][i] > 1) {
          tr.push(`<td align="center" rowSpan='${rowSpans[j][i]}'>${k}</td>`);
        } else {
          tr.push(`<td align="center">${k}</td>`);
        }
      }
    });
    tbody.push(`<tr>${tr.join('')}</tr>`);
  });
  const tableDom = document.createElement('table');
  tableDom.width = '100%';
  tableDom.innerHTML = `<tbody>${tbody.join('')}</tbody>`;

  dom.parentNode.replaceChild(tableDom, dom);
};