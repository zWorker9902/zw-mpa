import $ from 'jquery';
import '../style/index.less';

import { throttle, debounce } from '../utils';

class Index {
  constructor(){
    $('#root').text('Index 你好，啦啦啦');
    this.init();

  }

  init() {
    const mouseMove = (params) => {
      console.log('mouseMove：', params);
    }

    const onInput = (params) => {
      console.log('input:', params);
    }

    $('body').on('mousemove', () => {
      throttle(mouseMove, this, 50, '你好', 2000);
    });

    $('#input').on('input', () => {
      debounce(onInput, this, 500, {
        text: '你好',
      });
    });

    fetch('/api/v1/topics')
      .then(response => {
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`);
          return;
        }

        return response.json()
      })
      .then(res => {
        console.log('res:', res)
      })

    $('#replaceData').on('click', () => {
      this.renderTable1();
      this.renderTable2();
      this.renderTable3();
    });
  }

 renderTable1() {
   /*const bookmark = [
     [null, 2,    3, null, 5],
     [null, 2,    3, 4,    5],
     [1,    null, 3, null, null],
     [null, 2,    3, 4,    5],
     [null, null, 3, null, 5],
     [1,    null, 3, 4,    5],
     [null, null, 3, null, 5],
     [1,    null, 3, 4,    5],
     [null, 2,    3, null, 5],
   ];*/
   const bookmark = [
     [null, null, 2],
     [10,   null, 12],
     [null, 12, 22],
     [null, 31, null],
   ];

   const tbody = [];
   const rowSpans = [];

   // 统计行合并数据
   const rowLength = bookmark.length;
   const colLength = bookmark[0].length;

   // 遍历列
   for(let colIndex = 0; colIndex < colLength; colIndex ++) {
     // 记录有效值的行索引
     let elmValidIndex = 0;
     // 记录合并信息
     let rowSpan = [];
     let rowSpanCount = 1;
     for(let rowIndex = rowLength - 1; rowIndex >=0 ; rowIndex --) {
       rowSpan[rowIndex] = 0;
       if (!!bookmark[rowIndex][colIndex]) {
         elmValidIndex = rowIndex;
         // 不需要合并，配置数据为0
         rowSpan[rowIndex] = rowSpanCount === 1 ? 0 : rowSpanCount;
         rowSpanCount = 1;
       } else {
         rowSpanCount ++;
       }
     }

     if (rowSpanCount > 1) {
       // 针对每列起始数据可能为空的情况，需要交换数据，保证表格合并正确性
       rowSpan[0] = (rowSpan[elmValidIndex] || 1) + rowSpanCount - 1;
       bookmark[0][colIndex] = bookmark[elmValidIndex][colIndex];
       bookmark[elmValidIndex][colIndex] = null;
       rowSpan[elmValidIndex] = 0;
     }
     rowSpans.push(rowSpan);
   }

   // 书签值替换
   bookmark.forEach((d, i) => {
     let tr = [];
     d.forEach((k, j) => {
       if (k) {
         if (rowSpans[j][i]) {
           tr.push(`<td style="padding: 10px" rowSpan='${rowSpans[j][i]}'>${k}</td>`);
         } else {
           tr.push(`<td>${k}</td>`);
         }
       }
     });
     tbody.push(`<tr>${tr.join("")}</tr>`);
   });



   console.log('tbody:', tbody);

   const table = `<table>${tbody.join("")}</table>`;
   $('.code-GP0061234567890').replaceWith(table);
 }

  renderTable2() {
    const bookmark = [
      ['姓名', "年龄", '张三', '李四', '王五'],
      [null, 4, null, 4, 4],
      [4, null, null, 4, null],
      [4, null, 4, null, null],
    ];

    const tbody = [];
    const colSpans = [];

    const colLength = bookmark[0].length;

    // 遍历统计合并单元格
    bookmark.forEach((item, i) => {
      const colSpan = [];
      let colSpanCount = 1;
      let elmValidIndex = 0;
      for(let colIndex = colLength - 1; colIndex >= 0; colIndex--) {
        colSpan[colIndex] = 0;
        if (!!item[colIndex]) {
          colSpan[colIndex] = colSpanCount === 1 ? 0 : colSpanCount;
          elmValidIndex = colIndex;
          colSpanCount = 1;
        } else {
          colSpanCount ++;
        }
      }

      if (colSpanCount > 1) {
        colSpan[0] = colSpan[elmValidIndex] + colSpanCount - 1;
        bookmark[i][0] = bookmark[i][elmValidIndex];
        bookmark[i][elmValidIndex] = null;
      }
      colSpans.push(colSpan);
    });

    // 书签值替换
    bookmark.forEach((d, i) => {
      let tr = [];
      d.forEach((k, j) => {
        if (k) {
          if (colSpans[i][j] !== 0) {
            tr.push(`<td colSpan=${colSpans[i][j]}>${k}</td>`);
          } else {
            tr.push(`<td>${k}</td>`);
          }
        }
      });
      tbody.push(`<tr>${tr.join("")}</tr>`);
    });

    const table = `<table><tbody>${tbody.join("")}</tbody></table>`;
    $('.code-GP0061234567891').replaceWith(table);
  }

  /**
   * 特殊表格书签，按照行向下扩展
   * @params(array) bookmark 书签数据
   * @params(object) dom 被替换的dom元素
   * */
  replaceRowTableBMark(bookmark, dom) {
    let tdDom = this.findParentsNode(dom, 'TD');
    if (!tdDom) {
      return null;
    }
    let trDom = tdDom.parentNode;
    // 获取当前列索引
    const tdIndex = tdDom.cellIndex;
    // 获取当前行索引
    const trIndex = trDom.rowIndex;
    const tBody = trDom.parentNode;

    bookmark.forEach((item, i) => {
      if (i == 0) {
        tdDom.innerHTML = item;
      } else {
        const nextTrDom = trDom.nextElementSibling;
        // 结点已存在，并且已经替换过数据
        if (nextTrDom && nextTrDom.className == 'replaced') {
          nextTrDom.children[tdIndex].innerText = item;
          // 移动到下一行数据
          trDom = nextTrDom;
        } else {
          // 结点不存在，或者未替换数据
          const newTrDom = trDom.cloneNode(true);

          // 清空td单元格内部数据
          const children = newTrDom.children;
          for (let k = 0; k < children.length; k++) {
            children[k].innerText = '';
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
  }

  /**
   * 特殊表格书签，按照列向右扩展
   * @params(array) bookmark 书签数据
   * @params(object) dom 被替换的dom元素
   * */
  replaceColTableBMark(bookmark, dom) {
    let tdDom = this.findParentsNode(dom, 'TD');
    if (!tdDom) {
      return null;
    }
    let trDom = tdDom.parentNode;
    // 获取当前列索引
    const tdIndex = tdDom.cellIndex;
    // 获取当前行索引
    const trIndex = trDom.rowIndex;
    const tBody = trDom.parentNode;
    const trDoms = tBody.children;

    bookmark.forEach((item, i) => {
      if (i == 0) {
        tdDom.innerHTML = item;
      } else {
        const nextTdDom = tdDom.nextElementSibling;
        // 结点已存在，并且已经替换过数据
        if (nextTdDom && nextTdDom.className == 'replaced') {
          nextTdDom.innerText = item;
          // 移动到下一行数据
          tdDom = nextTdDom;
        } else {
          // 结点不存在，或者未替换数据
          // 清空td单元格内部数据
          for(let k=0; k<trDoms.length; k++) {
            const newTdDom = tdDom.cloneNode(true);
            newTdDom.innerText = '';
            newTdDom.className = 'replaced';

            trDoms[k].children[tdIndex+i - 1].after(newTdDom);
          }
          // 填写数据信息
          tdDom = trDoms[trIndex].children[tdIndex+i];
          tdDom.innerText = item;
        }
      }
    });
  }

  /**
   * 普通书签替换，兼容在表格内部，为空则不展示
   * @params(array) bookmark 书签数据
   * @params(object) dom 被替换的dom元素
   * */
  replaceBMark(bookmark, dom) {
    const tdDom = this.findParentsNode(dom, 'TD');
    if (tdDom) {
      let trDom = tdDom.parentNode;
      if (trDom) {
        bookmark === "" ? trDom.classList.add('hide') : trDom.classList.remove('hide');
      }
    }
  }

  renderTable3() {
    const bookmark = [];
    const bmarkName = [
      '张三',
      '李四',
    ];
    const bmarkAge = [
      10,
      20,
      30,
    ];
    const tbody = [];
    const colSpans = [];

    this.replaceRowTableBMark(bmarkName, document.querySelector('.code-GP0061234567801'));
    this.replaceRowTableBMark(bmarkAge, document.querySelector('.code-GP0061234567802'));
    this.replaceRowTableBMark(bmarkName, document.querySelector('.code-GP0061234567803'));
    this.replaceRowTableBMark(bmarkAge, document.querySelector('.code-GP0061234567804'));

    this.replaceColTableBMark(bmarkName, document.querySelector('.code-GP0061234567805'));
    this.replaceColTableBMark(bmarkAge, document.querySelector('.code-GP0061234567806'));

    this.replaceBMark('', document.querySelector('.code-GP1'));
    this.replaceBMark('', document.querySelector('.code-GP2'));
  }

  findParentsNode(dom, TAG) {
    if (dom) {
      const parentNode = dom.parentNode;
      if (parentNode.tagName === 'BODY') {
        return null;
      }
      if (parentNode.tagName === TAG) {
        return parentNode;
      } else {
        dom = this.findParentsNode(parentNode, TAG);
      }
    }
    return dom;
  }
}



$(() => {
  new Index();
});