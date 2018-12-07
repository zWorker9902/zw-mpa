import $ from 'jquery';
import '../style/index.less';

import { throttle, debounce } from '../utils';

class Index {
  constructor(){
    $('#root').text('Index 你好，啦啦啦');
    this.init();
    this.renderTableBookmark();
    this.renderTable();
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
  }

 renderTableBookmark() {
   const bookmark = [
     [null, 2,    3, null, 5],
     [null, 2,    3, 4,    5],
     [1,    null, 3, null, null],
     [null, 2,    3, 4,    5],
     [null, null, 3, null, 5],
     [1,    null, 3, 4,    5],
     [null, null, 3, null, 5],
     [1,    null, 3, 4,    5],
     [null, 2,    3, null, 5],
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
       rowSpan[0] = rowSpan[elmValidIndex] + rowSpanCount - 1;
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
           tr.push(`<td rowSpan=${rowSpans[j][i]}>${k}</td>`);
         } else {
           tr.push(`<td>${k}</td>`);
         }
       }
     });
     tbody.push(`<tr>${tr.join("")}</tr>`);
   });

   const table = `<table><tbody>${tbody.join("")}</tbody></table>`;
   $('.code-GP0061234567890').replaceWith(table);
 }

  renderTable() {
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
}



$(() => {
  new Index();
});