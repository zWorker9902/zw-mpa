import $ from 'jquery';
import '../style/template.less';

import { throttle, debounce } from '../utils';
import {
  renderBookmark,
  renderTableBookMark,
  renderRowTableBookMark,
  renderColTableBookMark,
  renderMergeTableBookMark,
  checkValidText,
} from '../utils/template';

class Template {
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
    // 函数节流
    $('body').on('mousemove', () => {
      throttle(mouseMove, this, 50, '你好', 2000);
    });
    // 防抖
    $('#input').on('input', () => {
      debounce(onInput, this, 500, {
        text: '你好',
      });
    });

    // fetch
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
      this.renderData();
    });
  }

 renderData() {
   // 普通文本书签替换
   renderBookmark('张三', document.querySelector('.code-GPTextName'));
   renderBookmark('25', document.querySelector('.code-GPTextAge'));

    // 行展开，列展开的书签
   const expandBkName = [
     '张三',
     '李四',
   ];
   const expandBkAge = [
     10,
     20,
     30,
   ];
   // 行展开书签替换
   renderRowTableBookMark(expandBkName, document.querySelector('.code-GPRowTableName1'));
   renderRowTableBookMark(expandBkName, document.querySelector('.code-GPRowTableAge1'));
   renderRowTableBookMark(expandBkName, document.querySelector('.code-GPRowTableName2'));
   renderRowTableBookMark(expandBkName, document.querySelector('.code-GPRowTableAge2'));

   // 列展开书签替换
   renderColTableBookMark(expandBkName, document.querySelector('.code-GPColTableName'));
   renderColTableBookMark(expandBkAge, document.querySelector('.code-GPColTableAge'));

   // 行扩展的书签
   const rowExpanBkName = [];
   const rowExpanBkAge = [];
   renderRowTableBookMark(rowExpanBkName, document.querySelector('.code-GPExpendName'));
   renderRowTableBookMark(rowExpanBkAge, document.querySelector('.code-GPExpendAge'));

    // 普通表格书签替换：列合并
   const tableBookmark = [
     ['姓名', "年龄", '张三', '李四', '王五'],
     [null, 4, null, 4, 4],
     [4, null, null, 4, null],
     [4, null, 4, null, null],
   ];
    // 普通表格书签替换
   renderTableBookMark(tableBookmark, document.querySelector('.code-GPTable'));

    // 需要行合并的书签
   const rowMergeBookmark1 = [
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
   const rowMergeBookmark2 = [
     [null, null, 2],
     [10,   null, 12],
     [null, 12, 22],
     [null, 31, null],
   ];
   renderMergeTableBookMark(rowMergeBookmark2, document.querySelector('.code-GPMergeRow'));
 }
}

$(() => {
  new Template();
});
// slice splice split